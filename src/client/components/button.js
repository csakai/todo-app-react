import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  extraClass: React.PropTypes.string,
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ extraClass, text, onClick }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button';
  const cls = [baseCls, extraClass].join(' ');

  return (
    <button className={cls} onClick={onClick}>
      {text}
    </button>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
