import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    filterBy: React.PropTypes.string,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: false,
      todos: [],
      tasksRemaining: 0
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this._onCallPatch = this._onCallPatch.bind(this);
    this.onClickCompleteAll = this.onClickCompleteAll.bind(this);
    this.onClickArchiveAll = this.onClickArchiveAll.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }
  /**
   * Generic method for calling patch and disabling/enabling buttons
   */
  _onCallPatch(condition, patchObj) {
    if (this.state.btnDisabled) {
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      btnDisabled: true
    }));
    const cb = data => {
      this.updateTodos(data);
      this.setState(prevState => ({
        ...prevState,
        btnDisabled: false
      }));
    };
    const id = this.state.todos.reduce((acc, todo) => {
      if (condition(todo.status)) {
        return [...acc, todo.id];
      }
      return acc;
    }, []);
    api('PATCH', {
      id,
      ...patchObj
    }, cb);
  }
  /**
   * Mark all active todos as complete
   *
   */
  onClickCompleteAll(event) {
    event.preventDefault();
    this._onCallPatch(
      status => status !== 'complete',
      { status: 'complete' }
    );
  }
  /**
   * Archive all completed todos
   *
   */
  onClickArchiveAll() {
    this._onCallPatch(
      status => status === 'complete',
      { archive: true }
    );
  }
  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    const todos = [...json];
    this.updateTodos(todos);
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    const tasksRemaining = todos.reduce((acc, {status}) => {
      if (status !== 'complete') {
        return 1 + acc;
      }
      return acc;
    }, 0);
    this.setState({
      todos,
      tasksRemaining
    });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const { filterBy = 'all' } = this.props;
    return (
      <div className={this.baseCls}>
        <Navbar
          onClickArchiveAll={this.onClickArchiveAll}
        />

        <div className="container container--remaining">
          <h3 className="remaining-header">
            {`${this.state.tasksRemaining} tasks remaining`}
          </h3>
          <a
            href="#"
            onClick={this.onClickCompleteAll}
            className="remaining-link"
          >
            Complete All
          </a>
        </div>

        <TodoForm onSubmit={this.addTodo} />
        <Todos
          filterBy={filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;
