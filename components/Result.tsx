import React from 'react';
import { Download, RefreshCcw, Camera } from 'lucide-react';
import { Era } from '../types';

interface ResultProps {
  resultImage: string; // base64
  era: Era;
  onReset: () => void;
  onTryAnotherEra: () => void;
}

export const Result: React.FC<ResultProps> = ({ resultImage, era, onReset, onTryAnotherEra }) => {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${resultImage}`;
    link.download = `chronobooth-${era.id}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-6">
        <span className="inline-block px-3 py-1 bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs rounded-full uppercase tracking-widest mb-2">
          Mission Successful
        </span>
        <h2 className="text-3xl font-bold text-white brand-font">Welcome to {era.name}</h2>
      </div>

      <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 group">
        <img 
          src={`data:image/jpeg;base64,${resultImage}`} 
          alt={`User in ${era.name}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
           <button 
             onClick={downloadImage}
             className="bg-white text-slate-900 font-bold py-2 px-6 rounded-full flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
           >
             <Download size={18} />
             Save Memory
           </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-center">
        <button 
          onClick={onTryAnotherEra}
          className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700"
        >
          <RefreshCcw size={18} />
          Try Another Era
        </button>
        
        <button 
          onClick={onReset}
          className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 border border-slate-700"
        >
          <Camera size={18} />
          New Photo
        </button>
      </div>
    </div>
  );
};
