import React, { useState, FormEvent } from 'react';
import API from '../../utils/API';
import styles from '../../pages/auth/login/Login.module.css';
import {LoginProps} from '../../types/login/interfaces'
import { useLoader } from '../../context/LoaderContext';
import {EyeClosedIcon, EyeOpenIcon} from '../eyeicon'

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [sendingCredentials, setSendingCredentials] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoader();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSendingCredentials(true);
    try {
      const response = await API.post('/api/token', { username, password });
      localStorage.setItem('token', response.data.access);
      onLoginSuccess();
    } catch (err) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className={styles.formDataContainer}>
        <label className={styles.formLabel}>Username</label>
        <input className={styles.formInput} type="username" value={username} placeholder='User Name' onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className={styles.formDataContainer}>
        <label className={styles.formLabel}>Password</label>
        <input className={styles.formInput} type={showPassword ? "text" : "password"} 
        value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} required />
        <button type="button" onClick={togglePasswordVisibility} className={styles.togglePasswordButton}>
          {/* Icono de ojo - puedes usar un SVG, Font Awesome, o similar */}
          {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </button>
        
      </div>
      {error && <div>{error}</div>}
      <button className={styles.buttonLogin} type="submit" disabled={sendingCredentials}>Login</button>
    </form>
  );
};

export default LoginForm;
