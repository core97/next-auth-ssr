import { useContext, useState, useEffect, createContext } from 'react';
import nookies from 'nookies';
import { getAuth } from 'firebase/auth';
import { onIdTokenChanged } from 'libs/firebaseClient';

export const AuthContext = createContext<{
  isAuth: Boolean | undefined;
}>({
  isAuth: undefined,
});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode | Array<React.ReactNode>;
}) {
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

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useUAuth must be used with a AuthProvider');
  }

  return context;
}
