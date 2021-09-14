import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Component, useState } from 'react';
import { UserContext } from 'contexts/UserContext';
import { User } from 'types/bussines';

type Props = User & Record<string, any>;

const withAuthRequiredClient = (WrappedComponent: NextPage) => {
  const WithAuthUser = (props: Props) => {
    const [user, setUser] = useState<User | undefined>(undefined);
    const router = useRouter();
    const ChildComponent = WrappedComponent as typeof Component;

    if (!props.user) {
      if (typeof window !== undefined) router.push('/login');
    }

    return (
      <UserContext.Provider
        value={{
          user: user || { uid: props.user.uid, email: props.user.email },
          onChangeUser: (uid: string, email: string) => {
            setUser({ uid, email });
          },
        }}
      >
        <ChildComponent {...props} />
      </UserContext.Provider>
    );
  };

  return WithAuthUser;
};

export default withAuthRequiredClient;
