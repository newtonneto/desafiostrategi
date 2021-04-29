import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

const AppRoutes = () => (
  <BrowserRouter>
    <Route path="/" component={Dashboard} />
  </BrowserRouter>
);

export default AppRoutes;