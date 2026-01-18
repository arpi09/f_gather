import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bakeryRoutes from './routes/bakeries.js';
import scrapingRoutes from './routes/scraping.js';

const app = express();

// Security: CORS - only allow requests from your domain
const productionOrigins = [
  'https://fgather-38639.web.app',
  'https://fgather-38639.firebaseapp.com',
];

const isDevelopment = process.env.FUNCTIONS_EMULATOR === 'true';
const allowedOrigins = isDevelopment 
  ? [...productionOrigins, 'http://localhost:3000']
  : productionOrigins;

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

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
    invoker: 'public', // Public access (secured by CORS)
    maxInstances: 10, // Limit concurrent instances to prevent abuse
  },
  app
);
