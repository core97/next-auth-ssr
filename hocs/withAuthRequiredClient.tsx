import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Component, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useAuthHelper } from 'contexts/AuthHelperContext';
import { User } from 'types/bussines';

type Props = { user: User } & Record<string, any>;

const withAuthRequiredClient = (WrappedComponent: NextPage) => {
  const WithAuthUser = (props: Props) => {
    const { userAuth, onChangeUserAuth } = useAuthHelper();
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
      <AuthContext.Provider
        value={{
          user: userAuth || { uid: props.user.uid, email: props.user.email },
          onChangeUser: (uid: string, email: string) => {
            onChangeUserAuth(uid, email);
          },
        }}
      >
        <ChildComponent {...props} />
      </AuthContext.Provider>
    );
  };

  return WithAuthUser;
};

export default withAuthRequiredClient;
