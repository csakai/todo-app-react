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

let nextId = todos.length + 1;
app.get('/todos', function(req, res) {
  res.json(todos);
});

app.get('/todos/:id', function(req, res) {
  const id = Number.parseInt(req.params.id, 10);
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

  var id = nextId;
  nextId++;
  var newTodo = { "id": id, "text": text, "status": "active" };
  todos.push(newTodo);

  res.json(todos);
});

app.delete('/todos/:id', function(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(({id: todoId}) => id === todoId);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
  return res.status(200).json({id})
});

app.put('/todos/:id', function(req, res) {
  const id = Number.parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(({id: todoId}) => todoId === id);
  if (todoIndex > -1) {
    const todo = todos[todoIndex];
    let status;
    let message;
    const newTodo = req.body.data;
    if (newTodo.archive) {
      if (todo.status === 'complete') {
        todos[todoIndex] = {
          ...newTodo,
          id
        };
        status = 200;
        body = todos[todoIndex];
      }  else {
        status = 400;
        body = {
          message: 'Cannot archive an active Todo'
        };
      }
    } else {
      todos[todoIndex] = {
        ...newTodo,
        id
      }
      status = 200;
      body = todos[todoIndex];
    }
    res.status(status).json(body);
  }
});

app.patch('/todos', function(req, res) {
  let status;
  let body = {};
  if (req.query.id == null) {
    status = 400;
    body.message = 'Bad request';
  } else {
    const idMap = todos.reduce((acc, todo) => ({
      ...acc,
      [todo.id]: todo
    }), {});
    const patchObj = req.body.data;
    let notFound = false;
    const ids = [].concat(req.query.id);
    ids.forEach((idString, index) => {
      const id = Number.parseInt(idString, 10);
      const todo = idMap[id];
      if (index === 0) {
        notFound = !todo;
      } else {
        notFound = notFound && !todo;
      }
      if (todo) {
        Object.keys(patchObj).forEach(key => {
          if (key !== 'id') {
            todo[key] = patchObj[key];
          }
        });
      }
    });
    if (notFound) {
      status = 404;
      body.message = 'Not found'
    } else {
      status = 200;
      body = todos;
    }
  }
  res.status(status).json(body);
});

app.use('/images', express.static(path.resolve(__dirname, '../client/images')));
app.get('*', function(req, res) {
  var bundle = `//${req.hostname}:8080/public/bundle.js`;

  res.render('index', {bundle});
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
