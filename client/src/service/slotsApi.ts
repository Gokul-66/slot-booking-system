import { Slot } from '../context/SlotsContext';

const API_BASE = 'http://localhost:4000';

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
});

export const fetchUserSlots = async (): Promise<Slot[]> => {
    const res = await fetch(`${API_BASE}/users/me`, {
        headers: authHeader()
    });

    if (!res.ok) throw new Error('Failed to fetch user');

    const data = await res.json();
    return data.slots || [];
};

export const updateUserSlots = async (slots: Slot[]): Promise<Slot[]> => {
    const res = await fetch(`${API_BASE}/users/me/slots`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({ slots })
    });

    if (!res.ok) throw new Error('Failed to update slots');

    const data = await res.json();
    return data.slots || [];
};
