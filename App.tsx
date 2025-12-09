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
    
    // Slight delay to let UI show loading state properly before heavy processing
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
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">
            Check Your Fruit's <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">Freshness</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Upload a photo of any fruit to instantly get a professional quality grade, ripeness analysis, and shelf life estimation powered by AI.
          </p>
        </div>

        <ImageUploader 
          onImageSelected={handleImageSelected} 
          isAnalyzing={state.isLoading}
        />

        {state.error && (
          <div className="max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-top-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <h4 className="text-red-800 font-semibold">Analysis Failed</h4>
                <p className="text-red-600 text-sm">{state.error}</p>
              </div>
            </div>
          </div>
        )}

        {state.data && !state.isLoading && (
          <AnalysisResult data={state.data} />
        )}
      </main>
      
      <footer className="mt-20 border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FruitVision AI. Built with Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
