import React, { useEffect, useState } from 'react';
import CalendarGrid from "../components/calendar/CalendarGrid";
import MonthlySchedule from "../components/calendar/MonthlySchedule";
import SelectedSlotsModal from "../components/slots/SelectedSlotsModal";
import { useMonth } from '../context/MonthContext';
import { generateMonthlyBatches } from '../utils/generateMonthlyBatches';
import styles from './CalendarPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSlots } from '../context/SlotsContext';

export default function CalendarPage() {
  const { year, monthIndex } = useMonth();
  const { confirmedSlots, setSelectedSlots } = useSlots();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setSelectedSlots(confirmedSlots);
  }, [confirmedSlots]);

  const days = React.useMemo(() => {
    const batchDays = generateMonthlyBatches(year, monthIndex);

    const batchMap = new Map<number, any>();
    batchDays.forEach(bd => batchMap.set(bd.dayNumber, bd));

    const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();


    const daysArray: any[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      daysArray.push({ dayNumber: "", isDisabled: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const batchInfo = batchMap.get(i);

      daysArray.push({
        dayNumber: i,
        label: batchInfo ? `Day ${batchInfo.topicDay}` : undefined,
        topic: batchInfo ? batchInfo.topicLabel : undefined,
        isDisabled: !batchInfo
      });
    }

    return daysArray;
  }, [year, monthIndex]);

  return (
    <>
      <div className={styles.pageLayout}>
        <div className={styles.calendarSection}>
          <CalendarGrid days={days} />
        </div>
        <div className={styles.rightSection}>
          <MonthlySchedule onSubmit={() => setShowModal(true)} />
        </div>
      </div>

      <SelectedSlotsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          navigate('/scheduled');
          setShowModal(false);
        }}
      />
    </>
  );
}

