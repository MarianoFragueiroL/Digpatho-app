import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { AppProvider } from '../context/AppContext';
import React from 'react';
import { LoaderProvider } from '../context/LoaderContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <LoaderProvider>
        <AppProvider>
          <Navbar />
          <Component {...pageProps} />
        </AppProvider>
      </LoaderProvider>
    </>
  );
}

export default MyApp;
