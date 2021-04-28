import React from 'react';
import { AuthProvider } from './authProvider';

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>{children}</AuthProvider>
  );
};

export default AppProvider;