require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { importEconomicData } = require('./utils/dataImporter');
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// Config
const IMPORT_DATA = process.env.IMPORT_DATA === 'false';

// Database Connection & Data Import
const initializeDatabase = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI 
    );
    
    console.log('📦 Connected to MongoDB');

    if (IMPORT_DATA) {
      console.log('🔄 Starting data import...');
      await importEconomicData();
    }
  } catch (error) {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  }
};

// Server Initialization
const startServer = async () => {
  await initializeDatabase();

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/events', eventRoutes);
  app.use('/api/filter',eventRoutes)
  app.get('/health', (req, res) => res.json({ status: 'OK' }));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Data import ${IMPORT_DATA ? 'enabled' : 'disabled'}`);
  });
};

startServer();