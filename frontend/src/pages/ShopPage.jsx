import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Search, ArrowRight } from 'lucide-react';
import { API_URL } from '../config/api';

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 pb-10 bg-gray-50">
      {/* 1Fi Signature Purple Gradient Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white p-5 pt-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-4 -bottom-6 opacity-20 pointer-events-none">
          <span className="text-9xl">📱</span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-purple-200 mb-3 border border-white/10">
          <Sparkles size={14} className="text-yellow-300" />
          NO-COST EMIs
        </div>
        <h1 className="text-2xl font-bold leading-tight mb-2 tracking-tight">
          Shop today, <br />Pay later using <span className="text-purple-300">Mutual funds.</span>
        </h1>
        <p className="text-xs text-purple-200/80 leading-relaxed">
          No credit score required. No interest. Backed by your investments.
        </p>
      </div>

      {/* Navigation Tabs (Top Brands | Nearby Stores | 1Fi Marketplace) */}
      <div className="px-4 -mt-4 z-10">
        <div className="bg-white p-1 rounded-2xl shadow-md flex justify-between border border-gray-100 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('brands')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'brands' ? 'bg-purple-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Top Brands
          </button>
          <button
            onClick={() => setActiveTab('stores')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'stores' ? 'bg-purple-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Nearby Stores
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`flex-1 py-2.5 rounded-xl transition-all ${
              activeTab === 'marketplace' ? 'bg-purple-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            1Fi Marketplace
          </button>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="px-4 mt-5 flex-1">
        {activeTab === 'brands' && (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200 shadow-sm mt-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Top Brands</h3>
            <p className="text-xs text-gray-400">Placeholder view as specified in assignment guidelines.</p>
          </div>
        )}

        {activeTab === 'stores' && (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-gray-200 shadow-sm mt-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-1">Nearby Stores</h3>
            <p className="text-xs text-gray-400">Placeholder view as specified in assignment guidelines.</p>
          </div>
        )}

        {activeTab === 'marketplace' && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800 text-sm">Featured Flagship Devices</h2>
              <span className="text-xs text-purple-700 font-semibold">Mutual Fund Backed</span>
            </div>

            {loading ? (
              <div className="text-center py-12 text-xs text-gray-400">Loading catalog from backend...</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/products/${product.slug}`)}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex gap-4 items-center relative group"
                  >
                    <span className="absolute top-3 left-3 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {product.tag}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-xl bg-gray-100 mt-4"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm group-hover:text-purple-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 mb-2">{product.variants[0]?.storage} • {product.variants[0]?.finishes?.[0]}</p>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm font-extrabold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-gray-400 line-through">₹{product.mrp.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700">
                        View EMI Plans <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}