import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';

type Props = {
  isAuth: boolean;
  onSignOut: () => void;
  children: React.ReactNode | Array<React.ReactNode>;
};

const Layout = ({ isAuth, onSignOut, children }: Props) => {
  const router = useRouter();

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navItems}>
          <Link href="/">Home</Link>
          <Link href="/protected">🔒 Página Protegida</Link>
        </div>
        <div>
          {isAuth ? (
            <button type="button" onClick={onSignOut}>
              Cerrar sesión
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                router.push(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL)
              }
            >
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
