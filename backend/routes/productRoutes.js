const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async(req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch products"});
    }
});

router.get('/:slug', async(req, res) => {
    try {
        const product = await Product.findOne({slug: req.params.slug});
        if(!product) return res.status(404).json({error: "Product not found"});
        res.json(product);
    } catch(err) {
        res.status(500).json({error: "Failed to fetch product details"});
    }
});

module.exports = router;