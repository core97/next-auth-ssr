import { useContext, createContext } from 'react';
import { AuthContextValues } from 'types/app';

export const AuthContext = createContext<AuthContextValues | undefined>(
  undefined
);

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used with a AuthContextProvider. You should wrap the component in "withUser" hoc.'
    );
  }

  return context;
}
