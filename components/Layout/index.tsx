import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'libs/firebaseClient';
import { useAuth } from 'contexts/AuthContext';
import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode | Array<React.ReactNode>;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();
  const { user, onResetUser } = useAuth();

  const handleOnSignOut = async () => {
    await signOut();
    onResetUser();
    router.push('/');
  };

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navItems}>
          <Link href="/">Home</Link>
          <Link href="/protected">🔒 Página Protegida</Link>
        </div>
        <div>
          {user ? (
            <button type="button" onClick={handleOnSignOut}>
              Cerrar sesión
            </button>
          ) : (
            <button type="button" onClick={() => router.push('/login')}>
              Iniciar sesión
            </button>
          )}
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
