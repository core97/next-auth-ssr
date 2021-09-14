import { useContext, createContext } from 'react';
import { User } from 'types/bussines';

export const UserContext = createContext<{
  user: User | undefined;
  onChangeUser: (uid: string, email: string) => void;
}>({
  user: undefined,
  onChangeUser: () => {},
});

export default function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error(
      'useUser must be used with a UserProvider. You should wrap the component in "withAuthRequiredClient" hoc.'
    );
  }

  return context;
}
