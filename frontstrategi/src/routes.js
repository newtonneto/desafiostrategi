import React from 'react';
import { Route, BrowserRouter, Switch, Redirect, Router } from 'react-router-dom';

import SignIn from './pages/SignIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;