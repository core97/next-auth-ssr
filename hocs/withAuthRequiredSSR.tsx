import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import nookies from 'nookies';
import firebaseAdmin from 'libs/firebaseAdmin';

const withAuthRequiredSSR =
  (/* Aqui le podemos pasar parámetros */) =>
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (ctx: GetServerSidePropsContext) => {
    let returnedData = { props: {} };

    try {
      const cookies = nookies.get(ctx);
      const { token, hasUser: hasUserDetailsInClientApp } = cookies;
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

      const { uid, email } = decodedToken;

      if (!hasUserDetailsInClientApp) {
        // Recuperar aquí todos los detalles del usuario
      }

      let returnData = { props: { user: { uid, email } } };
      nookies.set(undefined, 'hasUser', JSON.stringify(true));

      if (getServerSidePropsFunc) {
        const composedProps = (await getServerSidePropsFunc(ctx)) || {};

        if (composedProps) {
          if (composedProps.props) {
            returnData = { ...composedProps };
          } else if (composedProps.notFound || composedProps.redirect) {
            /**
             * Si 'composedProps' devuelve una clave de 'notFound' o 'redirect'
             * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
             */
            ctx.res.writeHead(302, { Location: '/login' });
          }
        }
      }

      return returnData;
    } catch (error) {
      // el 'token' NO existe o la verificación de token ha fallado
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    return returnedData;
  };

export default withAuthRequiredSSR;
