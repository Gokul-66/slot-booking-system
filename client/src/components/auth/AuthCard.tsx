import React from 'react';
import styles from './AuthCard.module.scss';

interface AuthCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children, className }) => {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.card}>
                {children}
            </div>
        </div>
    );
};

export default AuthCard;
