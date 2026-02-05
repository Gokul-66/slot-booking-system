import React, { useMemo } from 'react';
import SlotCard from '../components/slots/SlotCard';
import styles from './ScheduledPage.module.scss';
import { useSlots } from '../context/SlotsContext';
import { useNavigate } from 'react-router-dom';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const ScheduledPage: React.FC = () => {
    const { confirmedSlots, removeConfirmedSlot } = useSlots();

    const navigate = useNavigate();



    const slotsByMonth = useMemo(() => {
        const grouped: Record<string, typeof confirmedSlots> = {};

        confirmedSlots.forEach(slot => {
            const key = `${slot.year}-${slot.monthIndex}`;

            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(slot);
        });

        return grouped;
    }, [confirmedSlots]);


    const handleAddNewSlot = () => {
        navigate('/calendar');
    };

    if (confirmedSlots.length === 0) {
        return (
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Scheduled Classes</h1>
                    <button className={styles.addButton} onClick={handleAddNewSlot}>Add New Slot</button>
                </header>
                <div className={styles.emptyState}>
                    <p>No scheduled classes yet.</p>
                    <p>Click "Add New Slot" to get started!</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Scheduled Classes</h1>
                <button className={styles.addButton} onClick={handleAddNewSlot}>Add New Slot</button>
            </header>

            {Object.entries(slotsByMonth).map(([key, slots]) => {
                const [year, monthIndex] = key.split('-').map(Number);

                return (
                    <section key={key} className={styles.monthSection}>
                        <div className={styles.monthLabel}>
                            {MONTH_NAMES[monthIndex]}<br />{year}
                        </div>

                        <div className={styles.slotsList}>
                            {slots.map(slot => (
                                <SlotCard
                                    key={slot.id}
                                    dayLabel={slot.label || ''}
                                    topic={slot.topic || ''}
                                    date={slot.dayNumber}
                                    onDelete={() => removeConfirmedSlot(slot.id)}
                                />
                            ))}
                        </div>
                    </section>
                );
            })}

        </div>
    );
};

export default ScheduledPage;
