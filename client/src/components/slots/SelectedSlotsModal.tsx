import React from 'react';
import styles from './SelectedSlotsModal.module.scss';
import { useSlots } from '../../context/SlotsContext';
import { useMonth } from '../../context/MonthContext';

interface SelectedSlotsModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
}

const SelectedSlotsModal: React.FC<SelectedSlotsModalProps> = ({
    isOpen = true,
    onClose,
    onConfirm
}) => {
    const { selectedSlots, removeSlot, confirmSelectedSlots } = useSlots();
    const { year, monthIndex } = useMonth();

    if (!isOpen) return null;

    const visibleSlots = selectedSlots.filter(
        slot => slot.year === year && slot.monthIndex === monthIndex
    );

    const handleOk = () => {
        confirmSelectedSlots();
        onConfirm?.();
    };

    const handleCancel = () => {
        onClose?.();
    };

    const handleDelete = (slotId: string) => {
        removeSlot(slotId);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={handleCancel}>×</button>

                <h2 className={styles.title}>Selected Slots</h2>

                <div className={styles.slotsContainer}>
                    {visibleSlots.map((slot, index) => (
                        <div key={slot.id} className={styles.slotItem}>
                            <span className={styles.scheduleLabel}>
                                {index === 0 ? '1st' : index === 1 ? '2nd' : index === 2 ? '3rd' : `${index + 1}th`} Schedule
                            </span>

                            <div className={styles.slotCard}>
                                <div className={styles.slotLeft}>
                                    <span className={styles.slotDayNumber}>
                                        {slot.dayNumber < 10 ? `0${slot.dayNumber}` : slot.dayNumber}
                                    </span>
                                </div>
                                <div className={styles.slotRight}>
                                    <span className={styles.slotTypeLabel}>{slot.label}</span>
                                    <span className={styles.slotTopicLabel}>{slot.topic}</span>
                                </div>
                            </div>

                            <button
                                className={styles.deleteButton}
                                onClick={() => handleDelete(slot.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
                    <button className={styles.okBtn} onClick={handleOk}>Ok</button>
                </div>
            </div>
        </div>
    );
};

export default SelectedSlotsModal;
