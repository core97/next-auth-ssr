import { GetServerSideProps, GetServerSidePropsContext } from 'next';

const withAuthRequiredSSR =
  (name: string) =>
  (getServerSidePropsFunc?: GetServerSideProps) =>
  async (ctx: GetServerSidePropsContext) => {
    console.log('---- CONTEXT ----');
    console.log(name);
    console.log(ctx);
  };

export default withAuthRequiredSSR;
