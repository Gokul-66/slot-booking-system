import { User, ISlot } from '../models/User';
import { generateMonthlyBatches } from '../utils/generateMonthlyBatches';

export class UserService {
    /**
     * Get user profile by ID
     */
    static async getUserProfile(userId: string): Promise<any> {
        const user = await User.findById(userId).select('-passwordHash');

        if (!user) {
            throw new Error('User not found');
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
            slots: user.slots
        };
    }

    /**
     * Update user's slots with validation
     */
    static async updateUserSlots(userId: string, slots: ISlot[]): Promise<{ slots: ISlot[] }> {
        // Validate slots
        this.validateSlots(slots);

        // Update user's slots
        const user = await User.findByIdAndUpdate(
            userId,
            { slots },
            { new: true, runValidators: true }
        ).select('-passwordHash');

        if (!user) {
            throw new Error('User not found');
        }

        return {
            slots: user.slots
        };
    }

    /**
     * Validate slots array
     */
    private static validateSlots(slots: ISlot[]): void {
        const validDaysCache: Record<string, Set<number>> = {};
        const slotsByMonth: Record<string, ISlot[]> = {};
        const seen = new Set<string>(); // ✅ MOVE HERE
      
        for (const slot of slots) {
          // Validate required fields
          if (
            typeof slot.year !== 'number' ||
            typeof slot.monthIndex !== 'number' ||
            typeof slot.dayNumber !== 'number' ||
            !slot.label ||
            !slot.topic
          ) {
            throw new Error('Each slot must have year, monthIndex, dayNumber, label, and topic');
          }
      
          // Validate month index
          if (slot.monthIndex < 0 || slot.monthIndex > 11) {
            throw new Error(`Invalid monthIndex: ${slot.monthIndex}`);
          }
      
          // Validate day number
          if (slot.dayNumber < 1 || slot.dayNumber > 31) {
            throw new Error(`Invalid dayNumber: ${slot.dayNumber}`);
          }
      
          // Sunday check
          const date = new Date(slot.year, slot.monthIndex, slot.dayNumber);
          if (date.getDay() === 0) {
            throw new Error(`Slot on ${slot.year}-${slot.monthIndex + 1}-${slot.dayNumber} is a Sunday`);
          }
      
          // Batch validation
          const key = `${slot.year}-${slot.monthIndex}`;
          if (!validDaysCache[key]) {
            const batchDays = generateMonthlyBatches(slot.year, slot.monthIndex);
            validDaysCache[key] = new Set(batchDays.map(d => d.dayNumber));
          }
      
          if (!validDaysCache[key].has(slot.dayNumber)) {
            throw new Error(
              `Invalid slot date ${slot.year}-${slot.monthIndex + 1}-${slot.dayNumber}`
            );
          }
      
          // Duplicate detection (FIXED)
          const slotKey = `${slot.year}-${slot.monthIndex}-${slot.dayNumber}`;
          if (seen.has(slotKey)) {
            throw new Error(`Duplicate slot detected: ${slotKey}`);
          }
          seen.add(slotKey);
      
          // Group by month
          if (!slotsByMonth[key]) {
            slotsByMonth[key] = [];
          }
          slotsByMonth[key].push(slot);
        }
      
        // Max 21 slots per month
        for (const [monthKey, monthSlots] of Object.entries(slotsByMonth)) {
          if (monthSlots.length > 21) {
            throw new Error(`Month ${monthKey} has ${monthSlots.length} slots (max 21)`);
          }
        }
      }
      
}
