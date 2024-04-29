import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definir el tipo para el contexto
interface AppContextInterface {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}


// Hook personalizado para el contexto
export const useAppContext = () => useContext(AppContext);

// Crear el provider del contexto
interface AppProviderProps {
    children: ReactNode;
}
const defaultContextValue: AppContextInterface = {
    isLogin: false,
    setIsLogin: () => {}, // No-op function for default
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    
    return (
        <AppContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AppContext.Provider>
  );
};

// Crear el contexto con un valor predeterminado
const AppContext = createContext<AppContextInterface>(defaultContextValue);
