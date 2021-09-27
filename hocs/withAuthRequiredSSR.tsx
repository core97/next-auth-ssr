import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import nookies from 'nookies';
import firebaseAdmin from 'libs/firebaseAdmin';

type ReturnedDataSSR = { props: Record<string, any> } | Record<string, any>;

const withAuthRequiredSSR =
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (ctx: GetServerSidePropsContext) => {
    let returnedData: ReturnedDataSSR = { props: {} };

    try {
      const cookies = nookies.get(ctx);
      const { token } = cookies;

      await firebaseAdmin.auth().verifyIdToken(token);

      if (getServerSidePropsFunc) {
        const composedProps: any = (await getServerSidePropsFunc(ctx)) || {};

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
