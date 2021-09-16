import { useContext, createContext } from 'react';
import { User } from 'types/bussines';

export const AuthContext = createContext<{
  user: User | undefined;
  onChangeUser: (uid: string, email: string) => void;
  onResetUser: () => void;
}>({
  user: undefined,
  onChangeUser: () => {},
  onResetUser: () => {},
});

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      'useAuth must be used with a AuthContextProvider. You should wrap the component in "withAuthRequiredClient" hoc.'
    );
  }

  return context;
}
