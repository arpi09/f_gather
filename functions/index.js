import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bakeryRoutes from './routes/bakeries.js';
import scrapingRoutes from './routes/scraping.js';

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use('/api/bakeries', bakeryRoutes);
app.use('/api/scraping', scrapingRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Database connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;
    
    if (!mongoUri) {
      console.error('MongoDB URI not configured');
      return;
    }

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Export the Express app as a Firebase Function (v2 API)
export const api = onRequest(
  {
    timeoutSeconds: 300,
    memory: '512MiB',
    secrets: ['MONGODB_URI'],
    invoker: 'public'
  },
  app
);
