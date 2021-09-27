/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps, AppContext } from 'next/app';
import nookies from 'nookies';
import { AuthContextProvider } from 'contexts/AuthContext';
import Layout from 'components/Layout';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider
      user={
        pageProps.user
          ? { email: pageProps.user.email, uid: pageProps.user.uid }
          : undefined
      }
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

MyApp.getInitialProps = async ({ ctx, Component }: AppContext) => {
  const cookies = nookies.get(ctx);
  const { token } = cookies;
  const isServer =
    typeof window === 'undefined' &&
    //  /_next/data/ are the client page calls to the server
    ctx.req?.url?.indexOf('/_next/data/') === -1;
  const pageProps: any = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  };

  if (token && isServer) {
    const res = await fetch('http://localhost:3000/api/user', {
      headers: {
        authorization: token,
      },
    });
    if (res.ok) {
      const resJson = await res.json();
      pageProps.user = {
        email: resJson.email,
        uid: resJson.uid,
      };
    }
  }

  return { pageProps };
};

export default MyApp;
