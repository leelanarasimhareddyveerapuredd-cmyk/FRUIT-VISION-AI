import React, { useCallback, useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelected: (base64: string) => void;
  isAnalyzing: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelected(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div
        className={`relative group rounded-3xl border-4 border-dashed transition-all duration-300 ease-in-out
          ${dragActive ? 'border-emerald-500 bg-emerald-50 scale-[1.02]' : 'border-slate-200 bg-white hover:border-emerald-300'}
          ${preview ? 'h-auto border-none p-0 overflow-hidden shadow-2xl shadow-emerald-100/50' : 'h-80 flex flex-col items-center justify-center cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !preview && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isAnalyzing}
        />

        {preview ? (
          <div className="relative w-full">
             {/* Gradient Overlay for style */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10 pointer-events-none" />
            
            <img 
              src={preview} 
              alt="Uploaded fruit" 
              className="w-full h-96 object-cover"
            />
            
            {!isAnalyzing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/40 transition-all text-white border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {isAnalyzing && (
               <div className="absolute inset-0 z-20 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-400 rounded-full border-t-transparent animate-spin"></div>
                    <SproutIcon className="absolute inset-0 m-auto text-emerald-400 w-8 h-8 animate-pulse" />
                  </div>
                  <p className="mt-4 text-white font-medium text-lg tracking-wide animate-pulse">Analyzing Freshness...</p>
               </div>
            )}
          </div>
        ) : (
          <div className="text-center p-6 transition-transform duration-300 group-hover:scale-105">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-200 transition-colors">
              <Upload className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">
              Drop your fruit image here
            </h3>
            <p className="text-slate-400 mb-6">
              or click to browse from your device
            </p>
            <div className="flex gap-4 justify-center">
                <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> JPEG, PNG
                </span>
                <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 text-sm font-medium flex items-center gap-2">
                    <Camera className="w-4 h-4" /> Camera
                </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SproutIcon = ({ className }: { className?: string }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7 20h10" />
      <path d="M10 20c5.5-2.5.8-6.4 3-10" />
      <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
      <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
    </svg>
)
