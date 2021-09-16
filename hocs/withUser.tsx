/* eslint-disable react/jsx-props-no-spreading */
import { NextPage } from 'next';
import { Component, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useAuthHelper } from 'contexts/AuthHelperContext';
import { User } from 'types/bussines';

type Props = { user: User } & Record<string, any>;

const withUser = (WrappedComponent: NextPage) => {
  const WithUserComponent = (props: Props) => {
    const authHelper = useAuthHelper();
    const { onChangeUser } = authHelper;
    const ChildComponent = WrappedComponent as typeof Component;
    const { user } = props;

    useEffect(() => {
      if (user) {
        onChangeUser(user.uid, user.email);
      }
    }, [user]);

    return (
      <AuthContext.Provider
        value={{
          ...authHelper,
          user: authHelper.user || user ? { ...user } : undefined,
        }}
      >
        <ChildComponent {...props} />
      </AuthContext.Provider>
    );
  };

  return WithUserComponent;
};

export default withUser;
