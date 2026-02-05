import React from 'react';
import styles from './ErrorModal.module.scss';

interface ErrorModalProps {
    message: string;
    isOpen: boolean;
    onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.errorIcon}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    <h2 className={styles.title}>Error Occurred</h2>
                </div>
                <div className={styles.body}>
                    <p className={styles.message}>{message}</p>
                </div>
                <div className={styles.footer}>
                    <button className={styles.okBtn} onClick={onClose}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
