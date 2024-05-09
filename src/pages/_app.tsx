import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/Navbar';
import { AppProvider, IsLoggedProvider, IsAllowedProvider } from '../context/AppContext';
import React from 'react';
import { LoaderProvider } from '../context/LoaderContext';
import { AuthProvider } from '@/utils/auth/auth';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <AuthProvider>
      <AppProvider>
        <IsAllowedProvider>
          <IsLoggedProvider>
            <LoaderProvider>
              <Navbar />
              <Component {...pageProps} />
            </LoaderProvider>
          </IsLoggedProvider>
        </IsAllowedProvider>
      </AppProvider>
    </AuthProvider>
    </>
  );
}

export default MyApp;
