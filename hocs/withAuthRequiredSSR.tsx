import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import firebaseAdmin from 'libs/firebaseAdmin';
import { User } from 'types/bussines';

export type AuthRequiredPropsSSR = {
  userFromSSR?: User;
};

type ReturnedDataSSR = { props: AuthRequiredPropsSSR } | Record<string, any>;

const withAuthRequiredSSR =
  (/* Aqui le podemos pasar parámetros */) =>
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (ctx: GetServerSidePropsContext) => {
    let returnedData: ReturnedDataSSR = { props: {} };

    try {
      const cookies = nookies.get(ctx);
      const { token, hasUser: hasUserDetailsInClientApp } = cookies;
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

      const { uid, email } = decodedToken;

      if (!hasUserDetailsInClientApp) {
        // Recuperar aquí todos los detalles del usuario
      }

      returnedData = { props: { userFromSSR: { uid, email } } };
      nookies.set(undefined, 'hasUser', JSON.stringify(true));

      if (getServerSidePropsFunc) {
        const composedProps = (await getServerSidePropsFunc(ctx)) || {};

        if (composedProps) {
          if (composedProps.props) {
            returnedData = { ...composedProps };
          } else if (composedProps.notFound || composedProps.redirect) {
            /**
             * Si 'composedProps' devuelve una clave de 'notFound' o 'redirect'
             * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
             */
            ctx.res.writeHead(302, {
              Location: process.env.NEXT_PUBLIC_LOGIN_PAGE_URL,
            });
          }
        }
      }

      return returnedData;
    } catch (error) {
      /**
       * el 'token' NO existe o la verificación de token ha fallado
       */
      ctx.res.writeHead(302, {
        Location: process.env.NEXT_PUBLIC_LOGIN_PAGE_URL,
      });
      ctx.res.end();
    }

    return returnedData;
  };

export default withAuthRequiredSSR;
