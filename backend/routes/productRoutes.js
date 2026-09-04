const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Database connection check middleware
const checkDbConnection = (req, res, next) => {
  const mongoose = require('mongoose');
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: "Database not connected", 
      status: mongoose.connection.readyState,
      message: "The database is currently unavailable. Please try again later." 
    });
  }
  next();
};

router.get('/', checkDbConnection, async(req, res) => {
    try {
        console.log('Fetching all products...');
        const products = await Product.find({});
        console.log(`Found ${products.length} products`);
        res.json(products);
    } catch(err) {
        console.error('Error fetching products:', err);
        res.status(500).json({error: "Failed to fetch products", details: err.message});
    }
});

router.get('/:slug', checkDbConnection, async(req, res) => {
    try {
        console.log(`Fetching product with slug: ${req.params.slug}`);
        const product = await Product.findOne({slug: req.params.slug});
        if(!product) return res.status(404).json({error: "Product not found"});
        console.log(`Found product: ${product.name}`);
        res.json(product);
    } catch(err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({error: "Failed to fetch product details", details: err.message});
    }
});

module.exports = router;