
import React, { useEffect } from 'react';
import LoginForm from '../../../components/Login/LoginForm';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { useAppContext } from '../../../context/AppContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setIsLogin } = useAppContext();

  const handleLoginSuccess = () => {
    router.push('/');
  };
  useEffect(() => {
    // Cuando el componente se monta, establecer isLogin en true
    setIsLogin(true);
    
    // Cuando el componente se desmonta, establecer isLogin en false
    return () => setIsLogin(false);
  }, [setIsLogin]);
  return (
    <div className={styles.logincontainer}>
      <div className=''>
        <img src="/images/Logo4.jpg" alt="Logo" className={styles.loginLogo}  />
        <p>EARLY DETECTION, EMPOWERED TREATMENT.</p>
      </div>
      <div className={styles.loginForm}>
          <LoginForm  onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default LoginPage;
