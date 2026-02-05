import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MonthContextType {
    year: number;
    monthIndex: number;
    setMonth: (index: number) => void;
    nextMonth: () => void;
    prevMonth: () => void;
}

const MonthContext = createContext<MonthContextType | undefined>(undefined);

export const MonthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const DEFAULT_YEAR = 2024;
    const DEFAULT_MONTH_INDEX = 9;
    const [year, setYear] = useState(DEFAULT_YEAR);
    const [monthIndex, setMonthIndex] = useState(DEFAULT_MONTH_INDEX);

    const setMonth = (index: number) => {
        setMonthIndex(index);
    };

    const nextMonth = () => {
        if (monthIndex === 11) {
            setMonthIndex(0);
            setYear((prev) => prev + 1);
        } else {
            setMonthIndex((prev) => prev + 1);
        }
    };

    const prevMonth = () => {
        if (monthIndex === 0) {
            setMonthIndex(11);
            setYear((prev) => prev - 1);
        } else {
            setMonthIndex((prev) => prev - 1);
        }
    };

    return (
        <MonthContext.Provider value={{ year, monthIndex, setMonth, nextMonth, prevMonth }}>
            {children}
        </MonthContext.Provider>
    );
};

export const useMonth = (): MonthContextType => {
    const context = useContext(MonthContext);
    if (context === undefined) {
        throw new Error('useMonth must be used within a MonthProvider');
    }
    return context;
};
