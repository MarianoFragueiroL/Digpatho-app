import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar'; // Asegúrate de que la ruta al componente Navbar es correcta
import { AppProvider } from '../context/AppContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider>
        <Navbar />
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default MyApp;
