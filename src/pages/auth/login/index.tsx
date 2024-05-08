
import React, { useEffect } from 'react';
import LoginForm from '../../../components/auth/Login/LoginForm';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { useLoginContext, useLoggedContext } from '../../../context/AppContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setIsLogin } = useLoginContext();
  const { isLogged, setIsLogged } = useLoggedContext();

  const handleLoginSuccess = async () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", "true");
    await router.push('/');
  };
  
    useEffect(() => {    
      setIsLogin(true);
      localStorage.removeItem("token");
    return () => {
      setIsLogin(false);
    };
  }, [ setIsLogin]);

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
