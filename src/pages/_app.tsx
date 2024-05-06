import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { AppProvider, IsLoggedProvider, IsAllowedProvider } from '../context/AppContext';
import React from 'react';
import { LoaderProvider } from '../context/LoaderContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <IsLoggedProvider>
      <IsAllowedProvider>
        <LoaderProvider>
          <AppProvider>
            <Navbar />
            <Component {...pageProps} />
          </AppProvider>
        </LoaderProvider>
      </IsAllowedProvider>
    </IsLoggedProvider>
    </>
  );
}

export default MyApp;
