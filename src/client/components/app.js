import React from 'react';

import TodosPage from './todos-page';
import Header from './header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  params: React.PropTypes.shape({
    filter: React.PropTypes.string
  })
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ params: { filter } }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'app';

  return (
    <div className={baseCls}>
      <Header />

      <TodosPage filterBy={filter} />
    </div>
  );
};

App.propTypes = propTypes;

export default App;
