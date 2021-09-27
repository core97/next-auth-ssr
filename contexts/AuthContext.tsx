import { useRouter } from 'next/router';
import {
  useContext,
  useState,
  useCallback,
  useEffect,
  createContext,
} from 'react';
import nookies from 'nookies';
import { getAuth } from 'firebase/auth';
import {
  onIdTokenChanged,
  signOut,
  signInWithGoogle,
} from 'libs/firebaseClient';
import { User } from 'types/bussines';

export interface AuthContextValues {
  user: User | undefined;
  onChangeUser: (uid: string, email: string) => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export const AuthContext = createContext<AuthContextValues | undefined>(
  undefined
);

interface AuthContextProviderProps {
  user: User | undefined;
  children: React.ReactNode | Array<React.ReactNode>;
}

export function AuthContextProvider({
  user,
  children,
}: AuthContextProviderProps) {
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined);
  const router = useRouter();

  const handleOnChangeUser = useCallback((uid: string, email: string) => {
    setUserDetails({ uid, email });
  }, []);

  const handleOnSignIn = useCallback(async () => {
    const { uid, email } = await signInWithGoogle();
    handleOnChangeUser(uid, email);
    router.push(process.env.NEXT_PUBLIC_APP_PAGE_URL);
  }, [handleOnChangeUser, router]);

  const handleOnSignOut = useCallback(async () => {
    await signOut();
    setUserDetails(undefined);
    router.push(process.env.NEXT_PUBLIC_APP_PAGE_URL);
  }, [router]);

  useEffect(() => {
    onIdTokenChanged(async changedUser => {
      if (!changedUser) {
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await changedUser.getIdToken();
        /**
         * Todas las solicitudes API como la navegación de páginas
         * contendrá el token de identificación del usuario como una cookie
         *
         * Pasar la opción { path: '/' } en nookies.set para evitar que la aplicación
         * cree un nuevo token cada vez que se ejecuta este código
         */
        nookies.set(undefined, 'token', token, { path: '/' });
      }
    });

    /**
     * Fuerza a refrescar el token cada 10 minutos
     *
     * 👀👀 Firebase actualiza el token Id automáticamente solo si mantiene
     * una conexión activa a Firestore o Realtime Database. Si no se está
     * usando unos de estos servicios, debemos actualizar nosotros mismos el token
     */
    const handle = setInterval(async () => {
      const { currentUser } = getAuth();
      if (currentUser) await currentUser.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    if (user) handleOnChangeUser(user.uid, user.email);
  }, [handleOnChangeUser, user]);

  return (
    <AuthContext.Provider
      value={{
        user: userDetails,
        onChangeUser: handleOnChangeUser,
        onSignIn: handleOnSignIn,
        onSignOut: handleOnSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used with a AuthContextProvider');
  }

  return context;
}
