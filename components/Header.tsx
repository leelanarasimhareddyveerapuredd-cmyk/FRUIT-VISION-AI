import React from 'react';
import { Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-xl shadow-lg shadow-emerald-200">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500">
              FruitVision<span className="font-light text-slate-400">AI</span>
            </span>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
              About
            </a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-600 transition-colors">
              History
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
