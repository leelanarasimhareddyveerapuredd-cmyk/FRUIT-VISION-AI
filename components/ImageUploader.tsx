import React, { useRef, useState } from 'react';
import { Upload, Camera, Image as ImageIcon, X, Sparkles } from 'lucide-react';

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
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div
        className={`relative overflow-hidden group rounded-[2.5rem] border-4 border-dashed transition-all duration-500 ease-out
          ${dragActive ? 'border-emerald-500 bg-emerald-50/50 scale-[1.02] shadow-2xl shadow-emerald-200/50' : 'border-slate-200 bg-white/60 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/40'}
          ${preview ? 'h-auto border-none p-0 shadow-2xl shadow-emerald-900/20 ring-1 ring-black/5' : 'h-96 flex flex-col items-center justify-center cursor-pointer'}
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
          <div className="relative w-full aspect-video md:aspect-[4/3] bg-slate-900">
            <img 
              src={preview} 
              alt="Uploaded fruit" 
              className="w-full h-full object-contain"
            />
            
            {!isAnalyzing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  clearImage();
                }}
                className="absolute top-6 right-6 z-20 bg-black/50 backdrop-blur-md p-2.5 rounded-full hover:bg-red-500 hover:scale-110 transition-all text-white border border-white/20 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {isAnalyzing && (
               <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-emerald-400 animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Analyzing Freshness</h3>
                  <p className="text-emerald-200/80 font-medium animate-pulse">Detecting defects & quality...</p>
               </div>
            )}
          </div>
        ) : (
          <div className="text-center p-8 transition-all duration-300 group-hover:scale-105 relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner border border-emerald-100 group-hover:shadow-emerald-200/50 group-hover:from-emerald-100 group-hover:to-teal-100 transition-all">
              <Upload className="w-10 h-10 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Upload Fruit Image
            </h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto leading-relaxed">
              Drag & drop your photo here, or click to browse. <br/>
              <span className="text-sm opacity-70">Supports JPG, PNG</span>
            </p>
            <div className="flex gap-4 justify-center">
                <span className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold flex items-center gap-2 shadow-sm group-hover:shadow-md group-hover:border-emerald-200 transition-all">
                    <ImageIcon className="w-4 h-4 text-emerald-500" /> Gallery
                </span>
                <span className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 text-sm font-semibold flex items-center gap-2 shadow-sm group-hover:shadow-md group-hover:border-emerald-200 transition-all">
                    <Camera className="w-4 h-4 text-emerald-500" /> Camera
                </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};