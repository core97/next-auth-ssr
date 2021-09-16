import type { NextPage } from 'next';
import withAuthRequiredSSR from 'hocs/withAuthRequiredSSR';
import withUser from 'hocs/withUser';
import Layout from 'components/Layout';
import { useAuth } from 'contexts/AuthContext';

const ProtectedPage: NextPage = () => {
  const { user, onSignOut } = useAuth();

  return (
    <Layout isAuth={!!user} onSignOut={onSignOut}>
      <div>
        <h1>Enhorabuena 🎉🎉 estás autenticado</h1>
      </div>
    </Layout>
  );
};

export default withUser(ProtectedPage);

export const getServerSideProps = withAuthRequiredSSR()();
