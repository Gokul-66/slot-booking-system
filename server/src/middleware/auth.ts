import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'No token provided' });
            return;
        }

        const token = authHeader.substring(7);
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            res.status(500).json({ error: 'Server configuration error' });
            return;
        }

        const decoded = jwt.verify(token, jwtSecret) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
