import { onRequest } from 'firebase-functions/v2/https';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bakeryRoutes from './routes/bakeries.js';
import scrapingRoutes from './routes/scraping.js';

// Disable buffering to fail fast
mongoose.set('bufferCommands', false);

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

// Database connection - EAGER CONNECTION
let connectionPromise = null;

const getConnection = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!connectionPromise) {
    const mongoUri = process.env.MONGODB_URI;
    
    console.log('🔌 Connecting to MongoDB...');
    
    if (!mongoUri) {
      throw new Error('MONGODB_URI not configured');
    }

    connectionPromise = mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 75000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      minPoolSize: 2,
    }).then(() => {
      console.log('✅ MongoDB connected');
      return mongoose.connection;
    }).catch((error) => {
      console.error('❌ MongoDB error:', error.message);
      connectionPromise = null; // Reset on error
      throw error;
    });
  }

  await connectionPromise;
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await getConnection();
    next();
  } catch (error) {
    console.error('DB middleware error:', error.message);
    res.status(500).json({ error: 'Database connection failed: ' + error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.use('/api/bakeries', bakeryRoutes);
app.use('/api/scraping', scrapingRoutes);

// Export the Express app as a Firebase Function (v2 API)
export const api = onRequest(
  {
    timeoutSeconds: 540,
    memory: '1GiB',
    secrets: ['MONGODB_URI'],
    invoker: 'public', // Public access (secured by CORS)
    maxInstances: 10, // Limit concurrent instances to prevent abuse
  },
  app
);
