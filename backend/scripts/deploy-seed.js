const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: "iPhone 17 Pro",
    slug: "iphone-17-pro",
    tag: "NEW",
    mrp: 134900,
    price: 127400,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    variants: [
      { storage: "256GB", priceOffset: 0, finishes: ["orange", "silver", "purple"] },
      { storage: "512GB", priceOffset: 10000, finishes: ["orange", "silver", "purple"] }
    ],
    emiPlans: [
      { monthlyAmount: 44967, tenureMonths: 3, interestRate: 0, cashback: 7500 },
      { monthlyAmount: 22483, tenureMonths: 6, interestRate: 0, cashback: 7500 },
      { monthlyAmount: 11242, tenureMonths: 12, interestRate: 0, cashback: 7500 },
      { monthlyAmount: 5621, tenureMonths: 24, interestRate: 0, cashback: 7500 },
      { monthlyAmount: 4297, tenureMonths: 36, interestRate: 10.5, cashback: 7500 },
      { monthlyAmount: 3385, tenureMonths: 48, interestRate: 10.5, cashback: 7500 },
      { monthlyAmount: 2842, tenureMonths: 60, interestRate: 10.5, cashback: 7500 }
    ]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    slug: "samsung-galaxy-s24-ultra",
    tag: "TRENDING",
    mrp: 139999,
    price: 129999,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80",
    variants: [
      { storage: "256GB", priceOffset: 0, finishes: ["gray", "black", "violet"] },
      { storage: "512GB", priceOffset: 15000, finishes: ["gray", "black", "violet"] }
    ],
    emiPlans: [
      { monthlyAmount: 43333, tenureMonths: 3, interestRate: 0, cashback: 5000 },
      { monthlyAmount: 21666, tenureMonths: 6, interestRate: 0, cashback: 5000 },
      { monthlyAmount: 10833, tenureMonths: 12, interestRate: 0, cashback: 5000 },
      { monthlyAmount: 3950, tenureMonths: 36, interestRate: 11.0, cashback: 5000 }
    ]
  },
  {
    name: "Google Pixel 9 Pro",
    slug: "google-pixel-9-pro",
    tag: "POPULAR",
    mrp: 109999,
    price: 99999,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80",
    variants: [
      { storage: "128GB", priceOffset: 0, finishes: ["obsidian", "porcelain", "hazel"] },
      { storage: "256GB", priceOffset: 8000, finishes: ["obsidian", "porcelain", "hazel"] }
    ],
    emiPlans: [
      { monthlyAmount: 33333, tenureMonths: 3, interestRate: 0, cashback: 6000 },
      { monthlyAmount: 16666, tenureMonths: 6, interestRate: 0, cashback: 6000 },
      { monthlyAmount: 8333, tenureMonths: 12, interestRate: 0, cashback: 6000 },
      { monthlyAmount: 3100, tenureMonths: 36, interestRate: 10.0, cashback: 6000 }
    ]
  },
  {
    name: "OnePlus 13 Pro",
    slug: "oneplus-13-pro",
    tag: "NEW",
    mrp: 74999,
    price: 69999,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    variants: [
      { storage: "256GB", priceOffset: 0, finishes: ["black", "green"] },
      { storage: "512GB", priceOffset: 6000, finishes: ["black", "green"] }
    ],
    emiPlans: [
      { monthlyAmount: 23333, tenureMonths: 3, interestRate: 0, cashback: 4000 },
      { monthlyAmount: 11666, tenureMonths: 6, interestRate: 0, cashback: 4000 },
      { monthlyAmount: 5833, tenureMonths: 12, interestRate: 0, cashback: 4000 },
      { monthlyAmount: 2250, tenureMonths: 36, interestRate: 10.0, cashback: 4000 }
    ]
  },
  {
    name: "Xiaomi 14 Ultra",
    slug: "xiaomi-14-ultra",
    tag: "SPECIAL",
    mrp: 104999,
    price: 94999,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
    variants: [
      { storage: "512GB", priceOffset: 0, finishes: ["black", "white"] },
      { storage: "1TB", priceOffset: 12000, finishes: ["black", "titanium"] }
    ],
    emiPlans: [
      { monthlyAmount: 31666, tenureMonths: 3, interestRate: 0, cashback: 5000 },
      { monthlyAmount: 15833, tenureMonths: 6, interestRate: 0, cashback: 5000 },
      { monthlyAmount: 7916, tenureMonths: 12, interestRate: 0, cashback: 5000 },
      { monthlyAmount: 3050, tenureMonths: 36, interestRate: 10.5, cashback: 5000 }
    ]
  }
];

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully!');
    
    console.log('Clearing existing products...');
    await Product.deleteMany({});
    
    console.log('Inserting products...');
    await Product.insertMany(products);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();