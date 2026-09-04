const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:5173', 'http://localhost:3000', 'https://onefi-marketplace-1.onrender.com', 'https://1-fi-marketplace-livid.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      // For debugging, temporarily allow all origins
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'}`);
  next();
});
app.use(express.json());

// Database Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/1fi-marketplace';

console.log('Attempting to connect to MongoDB...');
console.log('MONGO_URI:', MONGO_URI ? 'Set' : 'Not set');
console.log('AUTO_SEED:', process.env.AUTO_SEED);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    
    // Auto-seed database if in production and empty
    if (process.env.AUTO_SEED === 'true') {
      const Product = require('./models/Product');
      Product.countDocuments().then(count => {
        if (count === 0) {
          console.log('Database is empty. Seeding initial data...');
          const products = require('./seed/seedData').products;
          if (products && products.length > 0) {
            Product.insertMany(products)
              .then(() => console.log('Database seeded successfully!'))
              .catch(err => console.error('Error seeding database:', err));
          }
        } else {
          console.log(`Database already has ${count} products. Skipping seed.`);
        }
      }).catch(err => console.error('Error checking database:', err));
    }
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    console.log('Server will continue running, but database operations will fail');
    // Don't exit, let the server run for health checks
  });

// API Routes
app.use('/api/products', productRoutes);

// Root Health Check Route
app.get('/', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected', 
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({
    message: '1Fi Marketplace Backend API is running...',
    database: {
      status: statusMap[dbStatus] || 'unknown',
      readyState: dbStatus
    },
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});