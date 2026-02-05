import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import { useAuth } from '../context/AuthContext';
import inputStyles from '../components/auth/InputField.module.scss';
import styles from './LoginPage.module.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loggedInUser: any = await login(email, password);
      if (loggedInUser?.slots && loggedInUser.slots.length > 0) {
        navigate('/scheduled');
      } else {
        navigate('/calendar');
      }
    } catch (error) {
      // Error is already logged in AuthContext
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit}>
        <div className={inputStyles.container}>
          <label className={inputStyles.label}>Email Id</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyles.input}
          />
        </div>

        <div className={inputStyles.container}>
          <label className={inputStyles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyles.input}
          />
        </div>

        <div className={styles.linkContainer}>
          <a href="/signup" className={styles.createAccountLink}>
            Create a new account
          </a>
        </div>

        <button
          type="submit"
          className={styles.loginButton}
          disabled={loading}
        >
          Login
        </button>
      </form>
    </AuthCard>
  );
}