import React from 'react';
import { AnalysisResult } from '../types';
import { Scan, Sparkles } from 'lucide-react';

interface AnalysisViewProps {
  image: string; // base64
  analysis: AnalysisResult | null;
  onProceed: () => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ image, analysis, onProceed }) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center min-h-[60vh]">
      {/* Source Image Card */}
      <div className="relative group w-full max-w-xs">
         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-75"></div>
         <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-900 aspect-[3/4]">
           <img 
            src={`data:image/jpeg;base64,${image}`} 
            alt="Subject" 
            className="w-full h-full object-cover opacity-80" 
           />
           {/* Scanline Effect */}
           {!analysis && <div className="scan-line"></div>}
           
           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
             <div className="flex items-center gap-2 text-cyan-400">
               <Scan size={16} className={!analysis ? "animate-pulse" : ""} />
               <span className="text-xs font-mono uppercase tracking-widest">
                 {analysis ? 'IDENTITY CONFIRMED' : 'SCANNING BIOMETRICS...'}
               </span>
             </div>
           </div>
         </div>
      </div>

      {/* Analysis Data Card */}
      <div className="flex-1 w-full space-y-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2 brand-font">
            <Sparkles className="text-yellow-400" />
            Subject Profile
          </h2>
          
          {analysis ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="p-4 bg-slate-900/80 rounded-lg border-l-4 border-cyan-500">
                <p className="text-xs text-cyan-500 uppercase tracking-wider mb-1">Demographics</p>
                <p className="text-lg text-white font-medium">{analysis.demographics}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {analysis.traits.map((trait, idx) => (
                   <div key={idx} className="p-3 bg-slate-900/60 rounded-lg border border-slate-700/50">
                     <p className="text-slate-300 text-sm">✓ {trait}</p>
                   </div>
                 ))}
              </div>

              <div className="p-4 bg-indigo-900/20 rounded-lg border border-indigo-500/30">
                <p className="text-xs text-indigo-400 uppercase tracking-wider mb-1">Temporal Anomaly Detected</p>
                <p className="text-indigo-200 italic">"{analysis.funFact}"</p>
              </div>

              <button 
                onClick={onProceed}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>INITIATE TIME JUMP</span>
                <span className="text-xl">🚀</span>
              </button>
            </div>
          ) : (
             <div className="space-y-4">
               <div className="h-20 bg-slate-700/50 rounded-lg animate-pulse"></div>
               <div className="flex gap-4">
                 <div className="h-12 flex-1 bg-slate-700/50 rounded-lg animate-pulse"></div>
                 <div className="h-12 flex-1 bg-slate-700/50 rounded-lg animate-pulse"></div>
               </div>
               <div className="h-24 bg-slate-700/50 rounded-lg animate-pulse"></div>
               <p className="text-center text-slate-400 font-mono text-sm animate-pulse">Analyzing subject for temporal displacement compatibility...</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
