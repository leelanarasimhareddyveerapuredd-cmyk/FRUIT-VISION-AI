import React from 'react';
import { Sprout } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="fixed w-full top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-400 p-2.5 rounded-2xl shadow-lg shadow-emerald-200 group-hover:shadow-emerald-300 transition-all duration-300 group-hover:-translate-y-0.5">
              <Sprout className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 tracking-tight">
                FruitVision<span className="text-emerald-400">AI</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 -mt-1 ml-0.5">
                Quality Grade
              </span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
              How it works
            </a>
            <a href="#" className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors">
              Features
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};