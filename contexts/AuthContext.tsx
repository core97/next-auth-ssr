import { useContext, useState, useEffect, createContext } from 'react';
import nookies, { destroyCookie, parseCookies } from 'nookies';
import { getAuth } from 'firebase/auth';
import { onIdTokenChanged } from 'libs/firebaseClient';
import { User } from 'types/bussines';

export const AuthContext = createContext<{
  isAuth: Boolean | undefined;
  userAuth: User | undefined;
  onChangeUserAuth: (uid: string, email: string) => void;
}>({
  isAuth: undefined,
  userAuth: undefined,
  onChangeUserAuth: () => {},
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
}) {
  const [userAuth, setUserAuth] = useState<User | undefined>(undefined);
  const [isAuth, setIsAuth] = useState<Boolean | undefined>(undefined);

  useEffect(() => {
    onIdTokenChanged(async changedUser => {
      if (!changedUser) {
        nookies.set(undefined, 'token', '', { path: '/' });
        setIsAuth(false);
      } else {
        const token = await changedUser.getIdToken();
        setIsAuth(true);
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
    nookies.set(undefined, 'hasUser', JSON.stringify(!!userAuth));
  }, [userAuth]);

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        isAuth,
        onChangeUserAuth: (uid: string, email: string) => {
          setUserAuth({ uid, email });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useUAuth must be used with a AuthProvider');
  }

  return context;
}
