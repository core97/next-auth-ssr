import type { NextPage } from 'next';
import Layout from 'components/Layout';
import withUser from 'hocs/withUser';
import { useAuth } from 'contexts/AuthContext';

const HomePage: NextPage = () => {
  const { user, onSignOut } = useAuth();

  return (
    <Layout isAuth={!!user} onSignOut={onSignOut}>
      <div>
        <h1>
          Next.js Auth SSR
          <br /> with 🔥Firebase
        </h1>
      </div>
    </Layout>
  );
};

export default withUser(HomePage);
