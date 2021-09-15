import Link from 'next/link';
import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode | Array<React.ReactNode>;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navItems}>
          <Link href="/">Home</Link>
          <Link href="/login">Login</Link>
          <Link href="/protected">🔒 Página Protegida</Link>
        </div>
        <div>
          <button type="button" onClick={() => {}}>
            Cerrar sesión
          </button>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
