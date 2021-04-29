import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Clients from '../pages/Clients';

const AppRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/clients" component={Clients} />
      <Route path="/" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default AppRoutes;