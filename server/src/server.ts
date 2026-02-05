import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not defined');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
