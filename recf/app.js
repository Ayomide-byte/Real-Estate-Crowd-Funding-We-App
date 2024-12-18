import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}/`);  
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();