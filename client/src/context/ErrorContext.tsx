import React, { createContext, useContext, useState, ReactNode } from 'react';
import ErrorModal from '../components/common/ErrorModal';

interface ErrorContextType {
    showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null);

    const showError = (message: string) => {
        setError(message);
    };

    const handleClose = () => {
        setError(null);
    };

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            <ErrorModal
                isOpen={!!error}
                message={error || ''}
                onClose={handleClose}
            />
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};
