
import React, { useEffect } from 'react';
import LoginForm from '../../../components/Login/LoginForm';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { inLogginContext, isLoggedContext } from '../../../context/AppContext';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { setIsLogin } = inLogginContext();
  const { isLogged, setIsLogged } = isLoggedContext();

  const handleLoginSuccess = () => {
    setIsLogged(true);
    localStorage.setItem("isLogged", "true");
    router.push('/');
  };
  
  useEffect( () => {
      setIsLogin(false);
      localStorage.removeItem("token");
    }
    , [ ]);
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
