import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeFruitImage } from './services/geminiService';
import { FruitAnalysis, AnalysisState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    isLoading: false,
    data: null,
    error: null,
  });

  const handleImageSelected = async (base64Image: string) => {
    setState({ isLoading: true, data: null, error: null });
    
    // Smooth scroll to analysis area if needed, or just let layout handle it
    setTimeout(async () => {
      try {
        const result = await analyzeFruitImage(base64Image);
        setState({ isLoading: false, data: result, error: null });
      } catch (err: any) {
        setState({ 
          isLoading: false, 
          data: null, 
          error: err.message || "Something went wrong during analysis." 
        });
      }
    }, 500); // Small aesthetic delay for loading animation
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-200/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-200/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[30%] h-[30%] rounded-full bg-orange-100/30 blur-[100px]" />
      </div>

      <Header />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* Hero Section */}
        {!state.data && (
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-600 text-sm font-semibold tracking-wide mb-6 shadow-sm">
                    ✨ AI-Powered Freshness Detector
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    Eat Fresh, <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                        Stay Healthy.
                    </span>
                </h1>
                <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                    Instantly grade the quality of your fruits using advanced AI. 
                    Get insights on ripeness, sugar levels, and shelf life in seconds.
                </p>
            </div>
        )}

        <ImageUploader 
          onImageSelected={handleImageSelected} 
          isAnalyzing={state.isLoading}
        />

        {state.error && (
          <div className="max-w-xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4">
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 flex items-center gap-4 shadow-lg shadow-red-100/50">
              <div className="bg-red-100 p-3 rounded-full">
                 <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h4 className="text-red-900 font-bold text-lg">Analysis Failed</h4>
                <p className="text-red-700/80 font-medium">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {state.data && !state.isLoading && (
          <AnalysisResult data={state.data} />
        )}
      </main>
      
      <footer className="relative z-10 py-8 border-t border-slate-200/60 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-medium text-sm">
            &copy; {new Date().getFullYear()} FruitVision AI. Powered by Google Gemini 2.5 Flash.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;