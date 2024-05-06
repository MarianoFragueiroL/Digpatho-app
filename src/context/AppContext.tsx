import { AppContextInterface, AppProviderProps, AppAllowedContextInterface, AppAllowedProviderProps, AppLoggedContextInterface, AppLoggedProviderProps } from '@/types/login/interfaces';
import React, { createContext, useContext, useState } from 'react';



// Hook personalizado para el contexto
export const inLogginContext = () => useContext(AppContext);
export const isAllowedContext = () => useContext(AppAllowedContext);
export const isLoggedContext = () => useContext(AppIsLoggedContext);


const defaultContextValue: AppContextInterface = {
    isLogin: false,
    setIsLogin: () => {}, // No-op function for default
};
const defaultAllowedContextValue: AppAllowedContextInterface = {
  isAllowed: true, //Set as true for the first beginning
  setIsAllowed: () => {},
};
const defaultLoggedContextValue: AppLoggedContextInterface = {
  isLogged: false,
  setIsLogged: () => {},
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    
    return (
        <AppContext.Provider value={{ isLogin, setIsLogin }}>
        {children}
      </AppContext.Provider>
  );
};

export const IsAllowedProvider: React.FC<AppAllowedProviderProps> = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState<boolean>(true);
    
    return (
        <AppAllowedContext.Provider value={{ isAllowed, setIsAllowed }}>
          {children}
        </AppAllowedContext.Provider>
  );
};

export const IsLoggedProvider: React.FC<AppLoggedProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(() => {
    try{
      const storedIsLogged = localStorage.getItem('isLogged');
      return storedIsLogged === "true";
    }
    catch{
      return false
    }
  });
    console.log('in is logged context', isLogged);
    
    
    return (
        <AppIsLoggedContext.Provider value={{ isLogged, setIsLogged }}>
          {children}
        </AppIsLoggedContext.Provider>
  );
};

// Crear el contexto con un valor predeterminado
const AppContext = createContext<AppContextInterface>(defaultContextValue);
const AppAllowedContext = createContext<AppAllowedContextInterface>(defaultAllowedContextValue);
const AppIsLoggedContext = createContext<AppLoggedContextInterface>(defaultLoggedContextValue);


