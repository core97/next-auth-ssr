import type { NextPage } from 'next';
import withAuthRequiredSSR from 'hocs/withAuthRequiredSSR';

const ProtectedPage: NextPage = () => (
    <div>
      <h1>Enhorabuena 🎉🎉 estás autenticado</h1>
    </div>
  );

export default ProtectedPage;

export const getServerSideProps = withAuthRequiredSSR();
