import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, isArchive, onClickArchive, onClickDelete, onClickTodo, status, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'container--todo';
  const isComplete = status === 'complete';

  const todoContainerCls = `container ${baseCls} ${filtered ? ' container--todo-filtered' : ''}`;

  return (
    <li className={todoContainerCls}>
      <div className={`${baseCls}__left`}>
        <TodoLink
          text={text}
          isComplete={isComplete}
          onClick={onClickTodo}
        />
        {isComplete && (
          <Button
            extraClass="button--modify"
            text={isArchive ? 'Unarchive' : 'Archive'}
            onClick={onClickArchive}
          />
        )}
      </div>
      <div className={`${baseCls}__right`}>
        <Button
          extraClass="button--remove"
          text="X"
          onClick={onClickDelete}
        />
      </div>
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
