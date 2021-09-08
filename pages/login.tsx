import type { NextPage } from 'next';
import Link from 'next/link';
import { signInWithGoogle } from 'libs/firebaseClient';

const Login: NextPage = () => (
  <div>
    <h1>Login</h1>
    <Link href="/">Ir a la home</Link>
    <button type="button" onClick={signInWithGoogle}>Loguearse con google</button>
  </div>
);

export default Login;
