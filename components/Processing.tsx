import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingProps {
  message: string;
}

export const Processing: React.FC<ProcessingProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
        <Loader2 size={64} className="text-blue-400 animate-spin relative z-10" />
      </div>
      
      <h2 className="mt-8 text-2xl font-bold text-white brand-font animate-pulse">
        {message}
      </h2>
      <p className="mt-2 text-slate-400">
        Aligning quantum flux... stabilizing temporal rift...
      </p>
      
      <div className="mt-8 w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-[loading_2s_ease-in-out_infinite] w-1/2 rounded-full"></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};
