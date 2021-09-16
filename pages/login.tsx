import type { NextPage } from 'next';
import { signInWithGoogle } from 'libs/firebaseClient';
import Layout from 'components/Layout';
import withUser from 'hocs/withUser';

const LoginPage: NextPage = () => (
  <Layout>
    <div>
      <button type="button" onClick={signInWithGoogle}>
        Loguearse con Google
      </button>
    </div>
  </Layout>
);

export default withUser(LoginPage);
