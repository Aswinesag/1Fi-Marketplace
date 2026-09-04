import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopPage from './pages/ShopPage';
import ProductDetail from './pages/ProductDetail';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20 flex justify-center">
        {/* Mobile Container Frame for App-like Experience */}
        <div className="w-full max-w-md bg-white min-h-screen shadow-xl relative flex flex-col">
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products/:slug" element={<ProductDetail />} />
          </Routes>
          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;