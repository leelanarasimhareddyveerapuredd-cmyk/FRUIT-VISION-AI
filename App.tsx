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
    }, 800); 
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden">
      
      {/* Enhanced Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-200/20 blur-[130px] animate-float" style={{ animationDuration: '15s' }} />
        <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/20 blur-[120px] animate-float" style={{ animationDuration: '20s', animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-orange-100/40 blur-[100px] animate-float" style={{ animationDuration: '18s', animationDelay: '5s' }} />
      </div>

      <Header />
      
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* Hero Section */}
        {!state.data && !state.isLoading && (
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-100 text-emerald-700 text-sm font-bold tracking-wide mb-8 shadow-lg shadow-emerald-100/50 hover:scale-105 transition-transform cursor-default">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    AI-Powered Freshness Detector
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
                    Eat Fresh, <br className="hidden md:block"/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600">
                        Live Healthy.
                    </span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
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
            <div className="bg-red-50/90 backdrop-blur-sm border border-red-100 rounded-3xl p-6 flex items-center gap-4 shadow-xl shadow-red-100/50">
              <div className="bg-red-100 p-3 rounded-full flex-shrink-0">
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
      
      <footer className="relative z-10 py-8 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 font-semibold text-sm">
            &copy; {new Date().getFullYear()} FruitVision AI. Powered by Google Gemini.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;