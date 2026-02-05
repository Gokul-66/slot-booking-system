export interface BatchDay {
    date: Date;
    dayNumber: number;
    batch: number;
    topicDay: number;
    topicLabel: string;
}

export const generateMonthlyBatches = (year: number, monthIndex: number): BatchDay[] => {
    const result: BatchDay[] = [];

    // Start date: 1st of the month
    let currentDate = new Date(year, monthIndex, 1);

    // 3 Batches
    for (let batch = 1; batch <= 3; batch++) {
        // 7 Classes per batch
        let classesScheduled = 0;

        while (classesScheduled < 7) {
            // Ensure we haven't spilled into next month
            if (currentDate.getMonth() !== monthIndex) {
                return result; // Stop if we go out of bounds (though usually fits)
            }

            const dayOfWeek = currentDate.getDay(); // 0 = Sunday

            if (dayOfWeek !== 0) {
                // Valid class day
                classesScheduled++;
                result.push({
                    date: new Date(currentDate),
                    dayNumber: currentDate.getDate(),
                    batch: batch,
                    topicDay: classesScheduled,
                    topicLabel: `Topic ${classesScheduled}` // Assumption based on previous "Topic X" format
                });
            }

            // Move to next day
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Add gaps between batches (but not after the last one)
        if (batch < 3) {
            let gapDaysAdded = 0;
            while (gapDaysAdded < 2) {
                // Stop if out of month
                if (currentDate.getMonth() !== monthIndex) break;

                const dayOfWeek = currentDate.getDay();
                if (dayOfWeek !== 0) {
                    // Valid gap day involved (non-Sunday)
                    gapDaysAdded++;
                }
                // Always advance date
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }
    }

    return result;
};
