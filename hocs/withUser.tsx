/* eslint-disable react/jsx-props-no-spreading */
import { NextPage } from 'next';
import { Component, useEffect } from 'react';
import { AuthContext } from 'contexts/AuthContext';
import { useAuthHelper } from 'contexts/AuthHelperContext';
import { AuthRequiredPropsSSR } from 'hocs/withAuthRequiredSSR';

const withUser = (WrappedComponent: NextPage) => {
  const WithUserComponent = (props: AuthRequiredPropsSSR) => {
    const authHelper = useAuthHelper();
    const { onChangeUser } = authHelper;
    const ChildComponent = WrappedComponent as typeof Component;
    const { userFromSSR } = props;

    useEffect(() => {
      if (userFromSSR) {
        onChangeUser(userFromSSR.uid, userFromSSR.email);
      }
    }, [onChangeUser, userFromSSR]);

    return (
      <AuthContext.Provider
        value={{
          ...authHelper,
          user: authHelper.user || userFromSSR || undefined,
        }}
      >
        <ChildComponent {...props} />
      </AuthContext.Provider>
    );
  };

  return WithUserComponent;
};

export default withUser;
