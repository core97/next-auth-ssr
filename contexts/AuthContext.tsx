import { useState, useEffect, useContext, createContext } from 'react';
import { User, getAuth } from 'firebase/auth';
import nookies from 'nookies';
import { onIdTokenChanged } from 'libs/firebaseClient';

const AuthContext = createContext<{ user: User | null }>({
  user: null,
});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onIdTokenChanged(async changedUser => {
      if (!changedUser) {
        setUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      } else {
        const token = await changedUser.getIdToken();
        setUser(changedUser);
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
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
}
