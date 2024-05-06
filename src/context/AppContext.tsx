import { AppContextInterface, AppProviderProps, AppAllowedContextInterface, AppAllowedProviderProps, AppLoggedContextInterface, AppLoggedProviderProps } from '@/types/login/interfaces';
import React, { createContext, useContext, useState } from 'react';



// Hook personalizado para el contexto
export const useLoginContext = () => useContext(AppContext);
export const useAllowedContext = () => useContext(AppAllowedContext);
export const useLoggedContext = () => useContext(AppuseLoggedContext);


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
  const [isLogged, setIsLogged] = useState<boolean>(false);

    return (
        <AppuseLoggedContext.Provider value={{ isLogged, setIsLogged }}>
          {children}
        </AppuseLoggedContext.Provider>
  );
};

const AppContext = createContext<AppContextInterface>(defaultContextValue);
const AppAllowedContext = createContext<AppAllowedContextInterface>(defaultAllowedContextValue);
const AppuseLoggedContext = createContext<AppLoggedContextInterface>(defaultLoggedContextValue);

