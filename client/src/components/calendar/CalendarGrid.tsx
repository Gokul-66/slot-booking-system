import React from 'react';
import CalendarDay from './CalendarDay';
import styles from './CalendarGrid.module.scss';

interface DayData {
    dayNumber: number | string;
    label?: string;
    topic?: string;
    isDisabled?: boolean;
}

interface CalendarGridProps {
    days: DayData[];
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid: React.FC<CalendarGridProps> = ({ days }) => {
    return (
        <div className={styles.calendarWrapper}>
            <h2>Select your slots</h2>

            <div className={styles.headerRow}>
                {WEEKDAYS.map((day) => (
                    <div key={day} className={styles.dayName}>
                        {day}
                    </div>
                ))}
            </div>

            <div className={styles.daysGrid}>
                {days.map((day, index) => (
                    <CalendarDay
                        key={`${day.dayNumber}-${index}`}
                        dayNumber={day.dayNumber}
                        label={day.label}
                        topic={day.topic}
                        isDisabled={day.isDisabled}
                    />
                ))}
            </div>
        </div>
    );
};

export default CalendarGrid;
