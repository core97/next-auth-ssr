import type { NextPage } from 'next';
import { useAuth } from 'contexts/AuthContext';

const HomePage: NextPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>
        Next.js Auth SSR
        <br /> with 🔥Firebase
      </h1>
      {user && <h3>Hello {user?.email} 🖖</h3>}
    </div>
  );
};

export default HomePage;
