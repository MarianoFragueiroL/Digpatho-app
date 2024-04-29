import React, { useState, FormEvent } from 'react';
import API from '../../utils/API';

interface LoginProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
      <div>
        <label>Username:</label>
        <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      {error && <div>{error}</div>}
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
};

export default LoginForm;
