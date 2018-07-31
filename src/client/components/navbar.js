import React from 'react';
import { Link } from 'react-router';

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = () => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  const filterItemBaseCls = `${baseCls}__item`;

  const filterItemActiveCls = `${filterItemBaseCls}--active`;

  return (
    <div className={baseCls}>
      {['all', 'active', 'completed', 'archived'].map(filter => {
        const filterFragment = `/${'all' === filter ? '' : filter}`;
        return (
          <Link
            to={filterFragment}
            className={filterItemBaseCls}
            activeClassName={filterItemActiveCls}
            key={`filter-${filter}`}
          >
            {filter.replace(/^\w/, match => match.toUpperCase())}
          </Link>
        )
      })}
    </div>
  );
};

export default Navbar;
