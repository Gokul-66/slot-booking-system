import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { updateUserSlots } from '../service/slotsApi';
import { useAuth } from './AuthContext';
import { useError } from './ErrorContext';

export type Slot = {
  id: string;
  dayNumber: number;
  label?: string;
  topic?: string;
  monthIndex: number;
  year: number;
};

interface SlotsContextType {
  selectedSlots: Slot[];
  addSlot: (slot: Slot) => void;
  removeSlot: (id: string) => void;
  isSelected: (year: number, monthIndex: number, dayNumber: number) => boolean;
  confirmedSlots: Slot[];
  confirmSelectedSlots: () => void;
  removeConfirmedSlot: (id: string) => void;
  setSelectedSlots: (slots: Slot[]) => void;
}

const SlotsContext = createContext<SlotsContextType | undefined>(undefined);

interface SlotsProviderProps {
  children: ReactNode;
}

export const SlotsProvider: React.FC<SlotsProviderProps> = ({ children }) => {
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [confirmedSlots, setConfirmedSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { showError } = useError();
  useEffect(() => {
    if (user?.slots) {
      setConfirmedSlots(user.slots);
      setSelectedSlots(user.slots);
    }
  }, [user]);

  const addSlot = (slot: Slot) => {
    setSelectedSlots((prev) => {
      if (prev.some((s) => s.id === slot.id)) {
        return prev;
      }
      if (prev.length >= 7) {
        return prev;
      }
      return [...prev, slot];
    });
  };

  const removeSlot = (id: string) => {
    setSelectedSlots((prev) => prev.filter((slot) => slot.id !== id));
  };
  const setSelectedSlotsDirect = (slots: Slot[]) => {
    setSelectedSlots(slots);
  };

  const isSelected = (
    year: number,
    monthIndex: number,
    dayNumber: number
  ): boolean => {
    return selectedSlots.some(
      (s) =>
        s.year === year &&
        s.monthIndex === monthIndex &&
        s.dayNumber === dayNumber
    );
  };
  const confirmSelectedSlots = async () => {
    setLoading(true);
    try {
      const updated = await updateUserSlots(selectedSlots);
      setConfirmedSlots(updated);
      setSelectedSlots(updated);
      const updatedUser = { ...user!, slots: updated };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error: any) {
      console.error('Confirm slots error:', error);
      showError(error.message || 'Failed to save slots. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const removeConfirmedSlot = async (id: string) => {
    try {
      const updated = selectedSlots.filter(s => s.id !== id);
      setConfirmedSlots(updated);
      setSelectedSlots(updated);
      await updateUserSlots(updated);

      const updatedUser = { ...user!, slots: updated };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error: any) {
      console.error('Remove slot error:', error);
      showError(error.message || 'Failed to remove slot.');
    }
  };

  const value: SlotsContextType = {
    selectedSlots,
    addSlot,
    removeSlot,
    isSelected,
    confirmedSlots,
    confirmSelectedSlots,
    removeConfirmedSlot,
    setSelectedSlots: setSelectedSlotsDirect
  };

  return <SlotsContext.Provider value={value}>{children}</SlotsContext.Provider>;
};

export const useSlots = (): SlotsContextType => {
  const context = useContext(SlotsContext);
  if (context === undefined) {
    throw new Error('useSlots must be used within a SlotsProvider');
  }
  return context;
};
