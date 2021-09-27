import type { NextPage } from 'next';
import { useAuth } from 'contexts/AuthContext';

const LoginPage: NextPage = () => {
  const { onSignIn } = useAuth();

  return (
    <div>
      <button type="button" onClick={onSignIn}>
        Loguearse con Google
      </button>
    </div>
  );
};

export default LoginPage;
