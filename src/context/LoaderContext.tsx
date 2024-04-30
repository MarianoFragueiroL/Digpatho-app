import React, { createContext, useContext, useState, ReactNode } from 'react';
import {LoaderContextType} from '../types/loader/interfaces'
import '../styles/global.css';

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

export const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
        {loading && (
            <div className="c-loader">
            <div className="loader"></div>
            </div>
        )}
      {children}
    </LoaderContext.Provider>
  );
};
