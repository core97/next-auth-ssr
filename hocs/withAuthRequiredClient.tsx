import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Component } from 'react';
import { User, AuthProvider } from 'contexts/AuthContext';

type Props = User & Record<string, any>;

const withAuthRequiredClient = (WrappedComponent: NextPage) => {
  const WithAuthUser = (props: Props) => {
    const ChildComponent = WrappedComponent as typeof Component;
    /**
     * TODO:
     * - Si viene el usuario desde las props => meterlo en el contexto en caso de
     * el estado del contexto sea nulo
     *
     * - Si NO viene el usuario desde las props y el estado del contexto es nulo,
     * se debe de redirigir al /login
     */
    console.log('--- props ---');
    console.log(props);
    return (
      <AuthProvider>
        <ChildComponent {...props} />
      </AuthProvider>
    );
  };

  return WithAuthUser;
};

export default withAuthRequiredClient;
