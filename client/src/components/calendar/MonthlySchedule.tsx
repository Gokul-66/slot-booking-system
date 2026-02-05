import React from 'react';
import MonthSwitcher from './MonthSwitcher';
import VerticalMonthList from './VerticalMonthList';
import styles from './MonthlySchedule.module.scss';
import { useMonth } from '../../context/MonthContext';

import igIcon from '../../assets/icons/ig.png';
import fbIcon from '../../assets/icons/gb.png';
import waIcon from '../../assets/icons/wh.png';
import ytIcon from '../../assets/icons/tw.png';

interface MonthlyScheduleProps {
    onSubmit: () => void;
}

const MonthlySchedule: React.FC<MonthlyScheduleProps> = ({ onSubmit }) => {
    const { monthIndex, setMonth } = useMonth();

    const scheduleItems = [
        { day: 'Day 1', topic: 'Topic 1' },
        { day: 'Day 2', topic: 'Topic 2' },
        { day: 'Day 3', topic: 'Topic 3' },
        { day: 'Day 4', topic: 'Topic 4' },
        { day: 'Day 5', topic: 'Topic 5' },
        { day: 'Day 6', topic: 'Topic 6' },
        { day: 'Day 7', topic: 'Topic 7' },
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>Monthly Schedule</h3>
                <MonthSwitcher />
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.scheduleSection}>
                    <div className={styles.scheduleCard}>
                        <div className={styles.timeRow}>
                            <div className={styles.timeBlock}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                09:00 hs
                            </div>
                            <div className={styles.timeBlock} style={{ border: 'none' }}>
                                06:00 hs
                            </div>
                        </div>

                        <div className={styles.scheduleList}>
                            {scheduleItems.map((item, index) => (
                                <div key={index} className={styles.scheduleItem}>
                                    <strong>{item.day}:</strong> {item.topic}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className={styles.submitButton} onClick={onSubmit}>
                        Submit
                    </button>

                    <div className={styles.footer}>
                        <div className={styles.socialIcons}>
                            <img src={igIcon} alt="Instagram" className={styles.icon} />
                            <img src={fbIcon} alt="Facebook" className={styles.icon} />
                            <img src={ytIcon} alt="Youtube" className={styles.icon} />
                            <img src={waIcon} alt="WhatsApp" className={styles.icon} />
                            <span className={styles.inquiry}>For inquiry : +44 123456789</span>
                        </div>
                    </div>
                </div>

                <VerticalMonthList
                    activeMonth={monthIndex}
                    onSelect={setMonth}
                />
            </div>
        </div>
    );
};

export default MonthlySchedule;
