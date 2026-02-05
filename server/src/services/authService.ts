import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

export class AuthService {
    /**
     * Create a new user account
     */
    static async signup(name: string, email: string, password: string): Promise<{ token: string; user: any }> {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            passwordHash,
            slots: []
        });

        await user.save();

        // Generate JWT
        const token = this.generateToken(user._id.toString());

        return {
            token,
            user: this.formatUserResponse(user)
        };
    }

    /**
     * Authenticate user and return token
     */
    static async login(email: string, password: string): Promise<{ token: string; user: any }> {
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT
        const token = this.generateToken(user._id.toString());

        return {
            token,
            user: this.formatUserResponse(user)
        };
    }

    /**
     * Generate JWT token
     */
    private static generateToken(userId: string): string {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET not configured');
        }

        return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
    }

    /**
     * Format user response (exclude sensitive data)
     */
    private static formatUserResponse(user: IUser): any {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            slots: user.slots
        };
    }
}
