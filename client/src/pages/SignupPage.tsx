import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import { useAuth } from '../context/AuthContext';
import inputStyles from '../components/auth/InputField.module.scss';
import styles from './SignupPage.module.scss';

export default function SignupPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const name = `${firstName} ${lastName}`.trim();
        try {
            await signup(name, email, password);
            navigate('/calendar');
        } catch (error) {
            // Error is already logged in AuthContext
        }
    };

    return (
        <AuthCard title="Sign Up" className={styles.signupCard}>
            <form onSubmit={handleSubmit}>
                <div className={styles.gridContainer}>
                    <div className={inputStyles.container}>
                        <label className={inputStyles.label}>First Name</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className={inputStyles.input}
                        />
                    </div>
                    <div className={inputStyles.container}>
                        <label className={inputStyles.label}>Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className={inputStyles.input}
                        />
                    </div>

                    <div className={inputStyles.container}>
                        <label className={inputStyles.label}>Email Id</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputStyles.input}
                        />
                    </div>

                    <div className={styles.contactContainer}>
                        <label className={styles.label}>Contact Number</label>
                        <div className={styles.contactInputWrapper}>
                            <select className={styles.countryCodeSelect} defaultValue="+91">
                                <option value="+91">+91</option>
                            </select>
                            <input
                                type="tel"
                                className={styles.phoneInput}
                            />
                        </div>
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
                    <div className={inputStyles.container}>
                        <label className={inputStyles.label}>Confirm Password</label>
                        <input
                            type="password"
                            className={inputStyles.input}
                        />
                    </div>
                </div>

                <div className={styles.linkContainer}>
                    <a href="/" className={styles.loginLink}>
                        Already have an Account? <strong>Login</strong>
                    </a>
                </div>

                <button
                    type="submit"
                    className={styles.signupButton}
                    disabled={loading}
                >
                    Sign Up
                </button>
            </form>
        </AuthCard>
    );
}
