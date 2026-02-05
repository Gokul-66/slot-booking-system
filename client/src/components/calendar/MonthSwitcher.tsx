import React from 'react';
import styles from './MonthSwitcher.module.scss';
import { useMonth } from '../../context/MonthContext';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MonthSwitcher: React.FC = () => {
    const { monthIndex, year, prevMonth, nextMonth } = useMonth();

    return (
        <div className={styles.container}>
            <button
                className={styles.arrowButton}
                aria-label="Previous Month"
                onClick={prevMonth}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            <span className={styles.monthText}>
                {MONTH_NAMES[monthIndex]} {year}
            </span>

            <button
                className={styles.arrowButton}
                aria-label="Next Month"
                onClick={nextMonth}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
};

export default MonthSwitcher;
