import express, { Request, Response } from 'express';
import { AuthService } from '../services/authService';

const router = express.Router();

// POST /auth/signup
router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email, and password are required' });
            return;
        }

        const result = await AuthService.signup(name, email, password);
        res.status(201).json(result);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Email already registered') {
                res.status(400).json({ error: error.message });
                return;
            }
        }
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST /auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const result = await AuthService.login(email, password);
        res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Invalid email or password') {
                res.status(401).json({ error: error.message });
                return;
            }
        }
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
