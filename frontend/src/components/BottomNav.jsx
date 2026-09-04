import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, CreditCard, BarChart2, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'EMI Dues', path: '/shop', icon: CreditCard },
    { name: 'Limit', path: '/shop', icon: BarChart2 },
    { name: 'Profile', path: '/shop', icon: User },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path || (item.name === 'Shop' && location.pathname.includes('/products'));
        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-xs transition-colors ${
              isActive ? 'text-purple-700 font-semibold' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon size={22} className={isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'} />
            <span className="mt-1">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}