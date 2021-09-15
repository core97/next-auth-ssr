import type { NextPage } from 'next';
import { signInWithGoogle } from 'libs/firebaseClient';

const LoginPage: NextPage = () => (
  <div>
    <button type="button" onClick={signInWithGoogle}>Loguearse con Google</button>
  </div>
);

export default LoginPage;
