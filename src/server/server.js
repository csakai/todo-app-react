var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('views', path.resolve('src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var todos = [
  {"id": 1, "text": "Hello, world!", "status": "active"},
  {"id": 2, "text": "Pick up groceries", "status": "complete"}
];

app.get('/', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
});

app.get('/todos', function(req, res) {
  res.json(JSON.stringify(todos));
});

app.get('/todos/:id', function(req, res) {
  var id = req.params.id;
  var index = todos.findIndex(function(todo) {
    return todo.id === id;
  });

  let status;
  let body;
  if (index > -1) {
    status = 200;
    body = todos[index];
  } else {
    status = 404;
    body = {
      message: 'Not found'
    };
  }
  res.status(status).json(body);
});

app.post('/todos', function(req, res) {
  var text = req.body.data.text;
  if (!text) {
    return res.status(400).json({"message": "text is required"});
  }

  var id = todos.length + 1;
  var newTodo = { "id": id, "text": text, "status": "active" };
  todos.push(newTodo);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  const todoIndex = todos.findIndex(({id}) => id === req.params.id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
    return res.status(204).send()
});

app.patch('/todos/:id', function(req, res) {
  const todoIndex = todos.findIndex(({id}) => id === req.params.id);
  if (todoIndex > -1) {
    const todo = todos[todoIndex];
    let status;
    let message;
    if (req.body.archived) {
      if (todo.status === 'completed') {
        todo.archived = true;
        status = 204;
      }  else {
        status = 400;
        message = 'Cannot archive an active Todo';
      }
    } else if (req.body.status === 'active' || req.body.status === 'complete') {
      todo.status = req.body.status;
      status = 204;
    }
    res.status(status).json({ message });
  }
});

app.patch('/todos?id', function(req, res) {
  const idMap = todos.reduce((acc, todo) => ({
    ...acc,
    [todo.id]: todo
  }), {});
  let notFound = false;
  req.query.id.forEach((id, index) => {
    const todo = idMap[id];
    if (index === 0) {
      notFound = !todo;
    } else {
      notFound = notFound && !todo;
    }
    if (todo) {
      todo.status = 'complete';
    }
  });
  let status;
  let message;
  if (notFound) {
    status = 404;
    message = 'Not found'
  } else {
    status = 204;
  }
  res.status(status).json({ message });
});

// Node server.
var port = 3000;
var server = app.listen(port, function() {
  console.log('SERVER STARTED LISTENING ON PORT ' + port);
});

// Dev server.
var devServer = require('../../tools/development-server');
var devPort = 8080;

devServer.listen(devPort, '0.0.0.0', () => {});
