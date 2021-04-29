import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (refreshToken && accessToken) {
      console.log('2');
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      setIsAuthenticated(true);
    }
  }, []);

  async function SignIn( username, password ) {
    try {
      const response = await api.post('login/', {
        username: username,
        password: password
      });

      api.defaults.headers.Authorization = `Bearer ${response.data.access}`;
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("accessToken", response.data.access);
      setIsAuthenticated(true);
      SuccessToast('Bem-vindo');

      
    } catch (error) {
      ErrorToast('Credenciais inválidas');
    };
  };

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        isAuthenticated
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