import mongoose, { Document, Schema } from 'mongoose';

export interface ISlot {
    id: string;
    year: number;
    monthIndex: number;
    dayNumber: number;
    label: string;
    topic: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    slots: ISlot[];
}

const SlotSchema = new Schema<ISlot>({
    id: { type: String, required: true },
    year: { type: Number, required: true },
    monthIndex: { type: Number, required: true, min: 0, max: 11 },
    dayNumber: { type: Number, required: true, min: 1, max: 31 },
    label: { type: String, required: true },
    topic: { type: String, required: true }
}, { _id: false });

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    slots: { type: [SlotSchema], default: [] }
}, {
    timestamps: true
});

export const User = mongoose.model<IUser>('User', UserSchema);
