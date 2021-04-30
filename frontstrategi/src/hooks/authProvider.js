import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [agent, setAgent] = useState();

  const ErrorToast = (text) => {
    toast.error(text, {
      position: "top-right",
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
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  useEffect(() => {
    let isMounted = true;
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");

    if (refreshToken && accessToken) {
      api.defaults.headers.Authorization = `Bearer ${accessToken}`;
      if (isMounted) {
        setIsAuthenticated(true);
      };
    };

    return () => isMounted = false;
  }, []);

  //Extrai dados do token
  const parseJwt = (token) => {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  async function SignIn( username, password ) {
    try {
      const response = await api.post('login/', {
        username: username,
        password: password
      });

      api.defaults.headers.Authorization = `Bearer ${response.data.access}`;
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("accessToken", response.data.access);
      const { user_id } = parseJwt(response.data.access);
      setAgent(user_id);
      setIsAuthenticated(true);
      SuccessToast('Bem-vindo');
    } catch (error) {
      ErrorToast('Credenciais inválidas');
    };
  };

  async function SignOut() {
    setIsAuthenticated(false);

    sessionStorage.removeItem('@App:refreshToken');
    sessionStorage.removeItem('App:accessToken');
  }

  return (
    <AuthContext.Provider
      value={{
        SignIn,
        SignOut,
        isAuthenticated,
        agent
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