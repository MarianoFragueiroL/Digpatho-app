
import { AuthContextType, AuthProviderProps } from '@/types/login/interfaces';
import API from '../API'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export const verifyToken = async (token: string, apiUrl: string = '/api/token/verify'): Promise<boolean> => {
    try {

        const response = await API(apiUrl);
        if (response.data.ok) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};
  
const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION
  : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

const AuthContext = createContext<AuthContextType | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string>(() => Cookie.get('token') || '');
  
    const login = async (username: string, password: string) => {
      try {
        const response = await axios.post(baseURL+'api/token', { username, password });
        const { access } = response.data;
        setToken(access);
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', access);
            console.log('Token stored in localStorage:', localStorage.getItem('token')); // Debug
          }
        await localStorage.setItem('token', response.data.access);        
        Cookie.set('token', access, { expires: 1, secure: process.env.NODE_ENV === 'production' });
        if (typeof document !== 'undefined') {
            const cookies = cookie.parse(document.cookie);
            console.log('Token stored in cookies:', cookies.token); // Debug
          }
      } catch (err) {
        throw err;
      }
    };
  
    const logout = () => {
      setToken('');
      Cookie.remove('token');
    };
  
    return (
      <AuthContext.Provider value={{ token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };

  export const getServerSideProps: GetServerSideProps = async (context) => {
      
    const isAuthenticated = await API('/api/token/verify');
    if (!isAuthenticated) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  
    return {
      props: { isAuthenticated },
    };
  };