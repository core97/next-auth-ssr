import type { NextPage } from 'next';
import Layout from 'components/Layout';
import withUser from 'hocs/withUser';
import { useAuth } from 'contexts/AuthContext';

const LoginPage: NextPage = () => {
  const { user, onSignOut, onSignIn } = useAuth();

  return (
    <Layout isAuth={!!user} onSignOut={onSignOut}>
      <div>
        <button type="button" onClick={onSignIn}>
          Loguearse con Google
        </button>
      </div>
    </Layout>
  );
};

export default withUser(LoginPage);
