import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Component, useEffect } from 'react';
import nookies from 'nookies';
import { AuthHelperContext } from 'contexts/AuthHelperContext';
import useAuth from 'contexts/AuthContext';
import { User } from 'types/bussines';

type Props = { user: User } & Record<string, any>;

const withAuthRequiredClient = (WrappedComponent: NextPage) => {
  const WithAuthUser = (props: Props) => {
    const { userAuth, onChangeUserAuth } = useAuth();
    const router = useRouter();
    const ChildComponent = WrappedComponent as typeof Component;

    useEffect(() => {
      if (props.user) {
        const { user } = props;
        onChangeUserAuth(user.uid, user.email);
      }
    }, [props]);

    if (!props.user) {
      if (typeof window !== undefined) router.push('/login');
    }

    return (
      <AuthHelperContext.Provider
        value={{
          user: userAuth || { uid: props.user.uid, email: props.user.email },
          onChangeUser: (uid: string, email: string) => {
            onChangeUserAuth(uid, email);
          },
        }}
      >
        <ChildComponent {...props} />
      </AuthHelperContext.Provider>
    );
  };

  return WithAuthUser;
};

export default withAuthRequiredClient;
