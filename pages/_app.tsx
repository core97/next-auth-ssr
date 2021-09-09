/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { AuthProvider } from 'contexts/AuthContext';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />;
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

/**
 * TODO:
 * 
 * - Crear el UserContext (con redireccionamiento 'onAuthState')
 *   https://kentcdodds.com/blog/authentication-in-react-applications
 *
 * - Envolver el 'getServerSideProps' en un HOC para que sea reutilizable
 */

export default MyApp;
