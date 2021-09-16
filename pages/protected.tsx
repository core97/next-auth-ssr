import type { NextPage } from 'next';
import withAuthRequiredSSR from 'hocs/withAuthRequiredSSR';
import withUser from 'hocs/withUser';
import Layout from 'components/Layout';

const ProtectedPage: NextPage = () => (
  <Layout>
    <div>
      <h1>Enhorabuena 🎉🎉 estás autenticado</h1>
    </div>
  </Layout>
);

export default withUser(ProtectedPage);

export const getServerSideProps = withAuthRequiredSSR()();
