import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default app;
