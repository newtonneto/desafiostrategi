import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const ErrorToast = (text) => {
    toast.error(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const SuccessToast = (text) => {
    toast.success(text, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };


  async function SignIn( username, password ) {
    try {
      const response = await api.post('login/', {
        username: username,
        password: password
      });
      SuccessToast('Bem-vindo')
    } catch (error) {
      ErrorToast('Credenciais inválidas');
    };
  };

  return (
    <AuthContext.Provider
      value={{
        SignIn,
      }}
    >
      <>
        <ToastContainer/>
        {children}
      </>
    </AuthContext.Provider>
  );
};

function UseAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('No AuthContext');
  };

  return context;
};

export { AuthProvider, UseAuth };