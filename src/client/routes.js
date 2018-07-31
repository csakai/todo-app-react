import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';

const routes = (
  <Route path="/(:filter)" component={App} />
);

export default routes;
