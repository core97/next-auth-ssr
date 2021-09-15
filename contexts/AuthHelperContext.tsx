import { useContext, createContext } from 'react';
import { User } from 'types/bussines';

export const AuthHelperContext = createContext<{
  user: User | undefined;
  onChangeUser: (uid: string, email: string) => void;
}>({
  user: undefined,
  onChangeUser: () => {},
});

export default function useUser() {
  const context = useContext(AuthHelperContext);

  if (context === undefined) {
    throw new Error(
      'useUser must be used with a UserProvider. You should wrap the component in "withAuthRequiredClient" hoc.'
    );
  }

  return context;
}
