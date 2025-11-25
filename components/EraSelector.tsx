import React from 'react';
import { ERAS } from '../constants';
import { Era } from '../types';

interface EraSelectorProps {
  onSelect: (era: Era) => void;
}

export const EraSelector: React.FC<EraSelectorProps> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <h2 className="text-3xl text-center font-bold text-white mb-2 brand-font">Select Destination</h2>
      <p className="text-slate-400 text-center mb-10">Choose a timeline to insert your consciousness</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {ERAS.map((era) => (
          <button
            key={era.id}
            onClick={() => onSelect(era)}
            className="group relative overflow-hidden rounded-2xl text-left transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/50"
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${era.color} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
            <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors"></div>
            
            {/* Border */}
            <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/30 transition-colors"></div>
            
            <div className="relative p-6 h-full flex flex-col">
              <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                {era.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2 brand-font tracking-wide">
                {era.name}
              </h3>
              
              <p className="text-slate-300 text-sm flex-grow leading-relaxed">
                {era.description}
              </p>
              
              <div className="mt-6 flex items-center text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                <span>Engage</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
