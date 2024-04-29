
import React from 'react';
import LoginForm from '../../../components/Login/LoginForm';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/dashboard'); // Redirigir al usuario al dashboard después del login
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
