import express, { Response } from 'express';
import { UserService } from '../services/userService';
import { authenticateUser, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/me', authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        const user = await UserService.getUserProfile(userId);
        res.json(user);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'User not found') {
                res.status(404).json({ error: error.message });
                return;
            }
        }
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/me/slots', authenticateUser, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const userId = req.userId!;
        const { slots } = req.body;

        if (!Array.isArray(slots)) {
            res.status(400).json({ error: 'Slots must be an array' });
            return;
        }

        const result = await UserService.updateUserSlots(userId, slots);
        res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            if (
                error.message.includes('Invalid') ||
                error.message.includes('must have') ||
                error.message.includes('Sunday') ||
                error.message.includes('max 21')
            ) {
                res.status(400).json({ error: error.message });
                return;
            }
            if (error.message === 'User not found') {
                res.status(404).json({ error: error.message });
                return;
            }
        }
        console.error('Update slots error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
