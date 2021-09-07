/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { AuthProvider } from 'contexts/AuthContext';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );

  /* return <Component {...pageProps} />; */
}

export default MyApp;
