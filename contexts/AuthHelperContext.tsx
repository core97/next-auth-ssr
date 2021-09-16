import { useRouter } from 'next/router';
import { useContext, useState, useEffect, createContext } from 'react';
import nookies from 'nookies';
import { getAuth } from 'firebase/auth';
import {
  onIdTokenChanged,
  signOut,
  signInWithGoogle,
} from 'libs/firebaseClient';
import { User } from 'types/bussines';
import { AuthContextValues } from 'types/app';

export const authContextDefaultValues = {
  user: undefined,
  onChangeUser: () => {},
  onSignIn: () => {},
  onSignOut: () => {},
};

export const AuthHelperContext = createContext<AuthContextValues>(
  authContextDefaultValues
);

export function AuthHelperContextProvider({
  children,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
}) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const router = useRouter();

  const handleOnChangeUser = (uid: string, email: string) => {
    setUser({ uid, email });
  };

  const handleOnSignIn = async () => {
    const { uid, email } = await signInWithGoogle();
    handleOnChangeUser(uid, email);
    router.push('/');
  };

  const handleOnSignOut = async () => {
    await signOut();
    setUser(undefined);
    router.push('/');
  };

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
  }, []);

  useEffect(() => {
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
    nookies.set(undefined, 'hasUser', JSON.stringify(!!user));
  }, [user]);

  return (
    <AuthHelperContext.Provider
      value={{
        user,
        onChangeUser: handleOnChangeUser,
        onSignIn: handleOnSignIn,
        onSignOut: handleOnSignOut,
      }}
    >
      {children}
    </AuthHelperContext.Provider>
  );
}

export function useAuthHelper() {
  const context = useContext(AuthHelperContext);

  if (context === undefined) {
    throw new Error(
      'useAuthHelper must be used with a AuthHelperContextProvider'
    );
  }

  return context;
}
