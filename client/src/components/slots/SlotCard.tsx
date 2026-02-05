import React from 'react';
import styles from './SlotCard.module.scss';

interface SlotCardProps {
    dayLabel: string;
    topic: string;
    date: number | string;
    onDelete?: () => void;
}

const SlotCard: React.FC<SlotCardProps> = ({ dayLabel, topic, date, onDelete }) => {
    const formattedDate = typeof date === 'number' && date < 10 ? `0${date}` : date;
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.content}>
                    <div>
                        <div className={styles.dayLabel}>{dayLabel}</div>
                        <div className={styles.topic}>{topic}</div>
                    </div>
                    <div className={styles.date}>{formattedDate}</div>
                </div>
            </div>
            <button className={styles.deleteButton} onClick={onDelete}>Delete</button>
        </div>
    );
};

export default SlotCard;
