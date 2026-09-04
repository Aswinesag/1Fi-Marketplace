# 1Fi Marketplace - Full-Stack Web Application

A responsive full-stack web application built for the **1Fi SDE Intern Assignment**. It showcases flagship products with multiple storage/finish variants and interactive, mutual-fund-backed EMI plans (including 0% and 10.5% interest options, tenure breakdowns, and cashback incentives).

---

## 🚀 Tech Stack

* **Frontend:** React (Vite) + Tailwind CSS + React Router + Lucide Icons
* **Backend:** Node.js with Express.js
* **Database:** MongoDB with Mongoose (ODM)

---

## 📱 Features & UI / UX Flow

* **App-Like Navigation Flow:** Designed to replicate the 1Fi mobile application interface, complete with a signature purple gradient banner ("Shop today, Pay later using Mutual funds").
* **Interactive Shop Tabs:** Features tab navigation for **Top Brands** (placeholder view), **Nearby Stores** (placeholder view), and **1Fi Marketplace** (fully implemented catalog).
* **Dynamic Routing:** Every product has a unique URL route (e.g., `/products/iphone-17-pro`).
* **Variant & Dynamic Pricing Engine:** Supports multiple storage variants (e.g., 256GB vs. 512GB) that dynamically scale prices and monthly EMI calculations.
* **Interactive EMI Engine:** Allows users to select from multi-tenure mutual-fund-backed EMI plans with instant calculation of monthly amounts, interest rates, and cashback benefits.

---

## 📂 Database Schema

The application uses MongoDB with a nested Mongoose schema to handle products, variants, and EMI plans efficiently.

### Product Collection Schema
* `name`: String (Required) - Product name (e.g., "iPhone 17 Pro")
* `slug`: String (Required, Unique) - Used for clean routing (`/products/:slug`)
* `tag`: String - Badge indicator (e.g., "NEW", "TRENDING")
* `mrp`: Number (Required) - Maximum Retail Price
* `price`: Number (Required) - Selling price
* `image`: String (Required) - Product image URL
* `variants`: Array of Subdocuments:
  * `storage`: String (e.g., "256GB")
  * `priceOffset`: Number - Additional cost for higher storage variants
  * `finishes`: Array of Strings (e.g., `["orange", "silver", "purple"]`)
* `emiPlans`: Array of Subdocuments:
  * `monthlyAmount`: Number - Calculated monthly payment
  * `tenureMonths`: Number - Duration in months (e.g., 3, 6, 12, etc.)
  * `interestRate`: Number - Interest rate percentage (e.g., 0 or 10.5)
  * `cashback`: Number - Incentive cashback amount

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Example Response |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/products` | Retrieves all marketplace products | `[{ "_id": "...", "name": "iPhone 17 Pro", "slug": "iphone-17-pro", "price": 127400, ... }]` |
| **GET** | `/api/products/:slug` | Retrieves single product details and EMI plans by slug | `{ "name": "iPhone 17 Pro", "mrp": 134900, "emiPlans": [...] }` |

---

## 🛠️ Setup and Run Instructions

Follow these instructions to run the project locally on your machine.

### Prerequisites
* Node.js installed on your system
* MongoDB installed locally or a cloud MongoDB connection string (MongoDB Atlas)

### 1. Clone the Repository & Setup Backend
```bash
# Navigate into the backend directory
cd backend

# Install dependencies
npm install express mongoose cors dotenv

# Create a .env file in the backend folder with:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/1fi-marketplace

# Seed the database with the required catalog items
node seed/seedData.js

# Start the Express server
node server.js

### 2. Setup and Run Frontend
Open a separate terminal window for the frontend:

```bash
# Navigate into the frontend directory
cd frontend

# Install dependencies
npm install lucide-react react-router-dom
npm install -D tailwindcss postcss autoprefixer

# Start the Vite development server
npm run dev
```

Open your browser and navigate to the local URL provided by Vite (typically http://localhost:5173) to view and interact with the application.