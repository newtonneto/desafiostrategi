import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const AuthRoutes = () => (
  <BrowserRouter>
    <Route path="/" component={SignIn} />
  </BrowserRouter>
)

export default AuthRoutes;