import React from 'react';

import { UseAuth } from '../hooks/authProvider';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Routes = () => {
  const { isAuthenticated } = UseAuth();

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;