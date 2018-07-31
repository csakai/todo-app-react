import React from 'react';
import { Link } from 'react-router';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'container--header';
  const containerCls = `container ${baseCls}`;
  const anchorCls = `${baseCls}__header--link`;
  const headerCls = `${baseCls}__header`;

  return (
    <div className={containerCls}>
      <Link className={anchorCls} to="/">
        <h1 className={headerCls}>
          MyTodos
        </h1>
      </Link>
    </div>
  )
};

export default Header;
