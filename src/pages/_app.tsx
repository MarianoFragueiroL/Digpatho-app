import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import { AppProvider } from '../context/AppContext';
import React, { useState, useEffect } from 'react';
import Router from 'next/router';


function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

  return () => {
    Router.events.off('routeChangeStart', start);
    Router.events.off('routeChangeComplete', end);
    Router.events.off('routeChangeError', end);
  };
}, []);
  return (
    <>
      {loading && (
        <div className="c-loader">
          <div className="loader">
          </div>
        </div>
      )}
      <AppProvider>
        <Navbar />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
