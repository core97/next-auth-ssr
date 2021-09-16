/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { AuthHelperContextProvider } from 'contexts/AuthHelperContext';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthHelperContextProvider>
      <Component {...pageProps} />
    </AuthHelperContextProvider>
  );
}

export default MyApp;

/**
 * TODO:
 * - crear constants/config con una variable de las rutas
 * 
 * - revisar eslint y prettier
 */
