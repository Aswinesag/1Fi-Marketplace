import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import { API_URL } from '../config/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState('');
  const [selectedEmiPlan, setSelectedEmiPlan] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
          setSelectedFinish(data.variants[0].finishes[0]);
        }
        if (data.emiPlans && data.emiPlans.length > 0) {
          setSelectedEmiPlan(data.emiPlans[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center py-20 text-xs text-gray-400">Loading product specifications...</div>;
  if (!product) return <div className="text-center py-20 text-xs text-red-500">Product not found.</div>;

  // Dynamic pricing based on selected variant offset
  const priceOffset = selectedVariant?.priceOffset || 0;
  const currentPrice = product.price + priceOffset;
  const currentMrp = product.mrp + priceOffset;

  return (
    <div className="flex flex-col flex-1 pb-24 bg-white">
      {/* Top Header Navigation */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-20">
        <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <span className="text-xs font-bold text-gray-800 tracking-wide">{product.name}</span>
        <div className="w-6" />
      </div>

      <div className="p-4">
        {/* Product Image & Dynamic Pricing Header */}
        <div className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-5">
          <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded-xl shadow-sm bg-white" />
          <div>
            <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">{product.tag}</span>
            <h1 className="font-extrabold text-base text-gray-900 mt-1">{product.name}</h1>
            <p className="text-xs text-gray-500 mb-2">{selectedVariant?.storage} • {selectedFinish}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-gray-900">₹{currentPrice.toLocaleString('en-IN')}</span>
              <span className="text-xs text-gray-400 line-through">₹{currentMrp.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Variant Selectors */}
        <div className="mb-5">
          <label className="text-xs font-bold text-gray-700 block mb-2">Storage Variant</label>
          <div className="flex gap-2">
            {product.variants.map((v, i) => (
              <button
                key={i}
                onClick={() => setSelectedVariant(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  selectedVariant?.storage === v.storage
                    ? 'border-purple-900 bg-purple-50 text-purple-900'
                    : 'border-gray-200 text-gray-600 bg-white'
                }`}
              >
                {v.storage} {v.priceOffset > 0 ? `(+₹${v.priceOffset.toLocaleString('en-IN')})` : ''}
              </button>
            ))}
          </div>
        </div>

        {/* EMI Plans Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900 text-sm">EMI plans backed by mutual funds</h2>
          <ShieldCheck size={16} className="text-purple-700" />
        </div>

        {/* Interactive EMI Plan Cards with Dynamic Scaling */}
        <div className="space-y-2.5">
          {product.emiPlans.map((plan, index) => {
            const baseRatio = currentPrice / product.price;
            const adjustedMonthlyAmount = Math.round(plan.monthlyAmount * baseRatio);
            const isSelected = selectedEmiPlan?.tenureMonths === plan.tenureMonths && selectedEmiPlan?.interestRate === plan.interestRate;

            return (
              <div
                key={index}
                onClick={() => setSelectedEmiPlan({ ...plan, monthlyAmount: adjustedMonthlyAmount })}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-purple-700 bg-purple-50/40 shadow-sm ring-1 ring-purple-700'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-gray-900">
                      ₹{adjustedMonthlyAmount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">x {plan.tenureMonths} months</span>
                  </div>
                  <p className="text-[11px] text-green-700 font-medium mt-0.5">
                    Additional cashback of ₹{plan.cashback.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${plan.interestRate === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {plan.interestRate}% interest
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-purple-700 bg-purple-700 text-white' : 'border-gray-300'}`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Action CTA */}
      <div className="fixed bottom-14 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md p-4 border-t border-gray-100 z-40 flex items-center justify-between shadow-lg">
        <div>
          <p className="text-[10px] text-gray-400 uppercase font-semibold">Selected Plan</p>
          <p className="text-xs font-bold text-gray-900">
            ₹{selectedEmiPlan?.monthlyAmount.toLocaleString('en-IN')} × {selectedEmiPlan?.tenureMonths} mos ({selectedEmiPlan?.interestRate}% int)
          </p>
        </div>
        <button
          onClick={() => alert(`Successfully proceeded with ${selectedEmiPlan?.tenureMonths} months EMI plan for ${product.name} (${selectedVariant?.storage})!`)}
          className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-md transition-colors flex items-center gap-1.5"
        >
          <Zap size={14} /> Proceed on EMI
        </button>
      </div>
    </div>
  );
}