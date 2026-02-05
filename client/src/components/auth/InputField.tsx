import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type = 'text',
    placeholder
}) => {
    return (
        <div className={styles.container}>
            <label className={styles.label}>{label}</label>
            <input
                type={type}
                className={styles.input}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
