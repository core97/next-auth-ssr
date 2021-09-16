import { NextPage } from 'next';
import { Component, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useAuthHelper } from 'contexts/AuthHelperContext';
import { User } from 'types/bussines';

type Props = { user: User } & Record<string, any>;

const withUser = (WrappedComponent: NextPage) => {
  const WithAuthUser = (props: Props) => {
    const { userAuth, onChangeUser, onResetUser } = useAuthHelper();
    const ChildComponent = WrappedComponent as typeof Component;

    useEffect(() => {
      if (props.user) {
        const { user } = props;
        onChangeUser(user.uid, user.email);
      }
    }, [props]);

    return (
      <AuthContext.Provider
        value={{
          user: userAuth || props.user ? { ...props.user } : undefined,
          onChangeUser,
          onResetUser,
        }}
      >
        <ChildComponent {...props} />
      </AuthContext.Provider>
    );
  };

  return WithAuthUser;
};

export default withUser;
