import React from 'react';
import styles from './CalendarDay.module.scss';
import { useSlots } from '../../context/SlotsContext';
import { useMonth } from '../../context/MonthContext';

interface CalendarDayProps {
    dayNumber: number | string;
    label?: string;
    topic?: string;
    isActive?: boolean;
    isDisabled?: boolean;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
    dayNumber,
    label,
    topic,
    isActive = false,
    isDisabled = false
}) => {
    const { isSelected, addSlot, removeSlot, selectedSlots } = useSlots();
    const { year, monthIndex } = useMonth();
    const dayNumberNum = typeof dayNumber === 'string' ? parseInt(dayNumber, 10) : dayNumber;
    const isDaySelected = !Number.isNaN(dayNumberNum) && isSelected(year, monthIndex, dayNumberNum);


    const maxSlotsReached = selectedSlots.length >= 7;
    const isOverflowDisabled = !isDaySelected && maxSlotsReached;
    const effectiveDisabled =
        (isDisabled && !isDaySelected) || isOverflowDisabled;

    const activeState = isActive || isDaySelected;
    const isPopulated = !!label || !!topic;

    const handleClick = () => {
        if (effectiveDisabled) {
            return;
        }

        if (isDaySelected) {
            const slotId = `${year}-${monthIndex}-${dayNumberNum}`;
            removeSlot(slotId);
        } else {
            const slot = {
                id: `${year}-${monthIndex}-${dayNumberNum}`,
                dayNumber: dayNumberNum,
                label,
                monthIndex,
                year,
                topic
            };
            addSlot(slot);
        }

    };

    const containerClasses = [
        styles.calendarDay,
        activeState ? styles.active : '',
        effectiveDisabled ? styles.disabled : '',
        (!activeState && !effectiveDisabled && isPopulated) ? styles.populated : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses} onClick={handleClick}>
            <div className={styles.content}>
                <div className={styles.header}>
                    {label && <span className={styles.label}>{label}</span>}
                    {topic && <span className={styles.topic}>{topic}</span>}
                </div>
                <span className={styles.dayNumber}>{dayNumber}</span>
            </div>
        </div>
    );
};

export default CalendarDay;
