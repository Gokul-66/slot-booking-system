export interface BatchDay {
    date: Date;
    dayNumber: number;
    batch: number;
    topicDay: number;
    topicLabel: string;
}

export const generateMonthlyBatches = (year: number, monthIndex: number): BatchDay[] => {
    const result: BatchDay[] = [];
    let currentDate = new Date(year, monthIndex, 1);

    for (let batch = 1; batch <= 3; batch++) {
        let classesScheduled = 0;

        while (classesScheduled < 7) {
            if (currentDate.getMonth() !== monthIndex) {
                return result;
            }

            const dayOfWeek = currentDate.getDay();

            if (dayOfWeek !== 0) {
                classesScheduled++;
                result.push({
                    date: new Date(currentDate),
                    dayNumber: currentDate.getDate(),
                    batch: batch,
                    topicDay: classesScheduled,
                    topicLabel: `Topic ${classesScheduled}`
                });
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        if (batch < 3) {
            let gapDaysAdded = 0;
            while (gapDaysAdded < 2) {
                if (currentDate.getMonth() !== monthIndex) break;

                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 0) {
                    gapDaysAdded++;
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }

    return result;
};
