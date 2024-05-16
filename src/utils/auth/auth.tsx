
import { AuthContextType, AuthProviderProps } from '@/types/login/interfaces';
import API from '../API'
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookie from 'js-cookie';
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

export const verifyToken = async ( apiUrl: string = '/api/token/verify'): Promise<boolean> => {
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
  

const baseURL: string = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_API_URL_PRODUCTION!
  : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT!;


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
          }
        await localStorage.setItem('token', response.data.access);        
        Cookie.set('token', access, { expires: 1, secure: process.env.NODE_ENV === 'production' });
        if (typeof document !== 'undefined') {
            const cookies = cookie.parse(document.cookie);
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

//   export const getServerSideProps: GetServerSideProps = async (context) => {
      
//     let isAuthenticated = await API(baseURL+'/api/token/verify');
//     if (!isAuthenticated) {
//       return {
//         redirect: {
//           destination: '/auth/login',
//           permanent: false,
//         },
//       };
//     }
  
//     return {
//       props: { isAuthenticated },
//     };
//   };