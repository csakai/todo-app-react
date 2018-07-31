import React from 'react';
import { Link } from 'react-router';

import Button from './button';

const propTypes = {
  onClickArchiveAll: React.PropTypes.func,
  onClickCompleteAll: React.PropTypes.func,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({onClickArchiveAll, onClickCompleteAll}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  const filterItemBaseCls = `${baseCls}__item`;

  const buttonItemBaseCls = `${filterItemBaseCls}--button`;

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
              <div>
                {filter.replace(/^\w/, match => match.toUpperCase())}
              </div>
          </Link>
        )
      })}
      <div className={buttonItemBaseCls}>
        <Button
          text="Complete all Active"
          onClick={onClickCompleteAll}
          extraClass="button--modify"
        />
      </div>
      <div className={buttonItemBaseCls}>
        <Button
          text="Archive all Completed"
          onClick={onClickArchiveAll}
          extraClass="button--modify"
        />
      </div>
    </div>
  );
};

Navbar.propTypes = propTypes;
export default Navbar;
