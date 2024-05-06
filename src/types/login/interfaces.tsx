import React, { ReactNode } from 'react';


export interface LoginProps {
    onLoginSuccess: () => void;
  }

export interface AppAllowedContextInterface {
  isAllowed: boolean;
  setIsAllowed: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AppContextInterface {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface AppLoggedContextInterface {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AppAllowedProviderProps {
  children: ReactNode;
}
export interface AppProviderProps {
  children: ReactNode;
}
export interface AppLoggedProviderProps {
  children: ReactNode;
}