import type { NextPage } from 'next';
import withAuthRequiredSSR from 'hocs/withAuthRequiredSSR';
import withAuthRequiredClient from 'hocs/withAuthRequiredClient';

const ProtectedPage: NextPage = () => (
  <div>
    <h1>
      Enhorabuena 🎉🎉 estás autenticado
    </h1>
  </div>
);

export default withAuthRequiredClient(ProtectedPage);

export const getServerSideProps = withAuthRequiredSSR()();
