import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import firebaseAdmin from 'libs/firebaseAdmin';

const withAuthRequiredSSR =
  (/* Aqui le podemos pasar parámetros */) =>
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (ctx: GetServerSidePropsContext) => {
    let returnedData = { props: {} };

    try {
      const cookies = nookies.get(ctx);
      const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

      const { uid, email } = token;

      if (getServerSidePropsFunc) {
        ctx.user = { uid, email };
        
        const composedProps = (await getServerSidePropsFunc(ctx)) || {};

        if (composedProps.props) {
          returnedData = { ...composedProps };
        } else if (composedProps.notFound || composedProps.redirect) {
          /**
           * Si 'composedProps' devuelve una clave de 'notFound' o 'redirect'
           * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
           */
          ctx.res.writeHead(302, { Location: '/login' });
        }
      }
    } catch (error) {
      // el 'token' NO existe o la verificación de token ha fallado
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    return returnedData;
  };

export default withAuthRequiredSSR;
