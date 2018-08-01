import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  isComplete: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  isComplete: false,
  onClick: noop,
  text: '',
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ isComplete, text, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo__wrapper';

  const checkboxWrapperCls = `${baseCls}__checkbox-wrapper`;

  const checkboxBaseCls = `${checkboxWrapperCls}__checkbox`;

  const checkboxCompleteCls = ` ${checkboxBaseCls}--status-complete`;

  const checkboxCls = `${checkboxBaseCls}${isComplete ? checkboxCompleteCls : ''}`;

  const linkCls = `${baseCls}__link`;

  const completeCls = ` ${linkCls}--status-complete`;

  const cls = `${linkCls}${isComplete ? completeCls : ''}`;

  return (
    <div className={baseCls} onClick={onClick}>
      <div className={checkboxWrapperCls}>
        <div className={checkboxCls}>
        </div>
      </div>
      <div className={cls}>
        {text}
      </div>
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
