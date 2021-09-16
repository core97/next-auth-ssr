import { User } from 'types/bussines';

export interface AuthContextValues {
  user: User | undefined;
  onChangeUser: (uid: string, email: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}
