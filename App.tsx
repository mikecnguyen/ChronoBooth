import React, { useState } from 'react';
import { Camera } from './components/Camera';
import { EraSelector } from './components/EraSelector';
import { Result } from './components/Result';
import { Processing } from './components/Processing';
import { AnalysisView } from './components/AnalysisView';
import { analyzeImage, generateTimeTravelImage } from './services/geminiService';
import { AppState, Era, AnalysisResult } from './types';
import { APP_NAME } from './constants';
import { History, Clock } from 'lucide-react';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [userImage, setUserImage] = useState<string>(''); // Base64
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedEra, setSelectedEra] = useState<Era | null>(null);
  const [resultImage, setResultImage] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleCapture = async (base64: string) => {
    setUserImage(base64);
    setAppState(AppState.ANALYSIS);
    
    // Immediately start analyzing
    try {
      const result = await analyzeImage(base64);
      setAnalysis(result);
    } catch (err) {
      console.error("Analysis failed", err);
      // Even if analysis fails, we can proceed with a default state,
      // handled inside the service or component logic, but here we just ensure app doesn't crash
    }
  };

  const handleProceedToEras = () => {
    setAppState(AppState.SELECT_ERA);
  };

  const handleEraSelect = async (era: Era) => {
    setSelectedEra(era);
    setAppState(AppState.PROCESSING);
    
    try {
      const generatedImage = await generateTimeTravelImage(userImage, era.prompt);
      setResultImage(generatedImage);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error("Generation failed", err);
      setErrorMsg("Time jump failed. The temporal rift collapsed. Please try again.");
      setAppState(AppState.ERROR);
    }
  };

  const resetApp = () => {
    setAppState(AppState.HOME);
    setUserImage('');
    setAnalysis(null);
    setSelectedEra(null);
    setResultImage('');
    setErrorMsg('');
  };

  const tryAnotherEra = () => {
    setAppState(AppState.SELECT_ERA);
    setResultImage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      {/* Header */}
      <header className="p-6 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={resetApp}
          >
            <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-lg shadow-lg shadow-blue-500/20">
              <History className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-wider brand-font text-white">{APP_NAME}</h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900 py-1 px-3 rounded-full border border-slate-800">
             <Clock size={12} />
             <span>TEMPORAL SYNC: ONLINE</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        
        {/* State: HOME */}
        {appState === AppState.HOME && (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 brand-font leading-tight">
              Travel Through Time<br />In Seconds
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
              Step into the ChronoBooth. We analyze your biometrics and transport your digital consciousness to any era in history using advanced AI.
            </p>
            
            <button 
              onClick={() => setAppState(AppState.CAPTURE)}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg transition-transform active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)]"
            >
              Start Your Journey
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
            
            <div className="flex gap-8 text-slate-600 text-sm font-mono mt-12">
              <span className="flex items-center gap-2">● GEMINI 2.5 FLASH IMG</span>
              <span className="flex items-center gap-2">● GEMINI 3 PRO PREVIEW</span>
            </div>
          </div>
        )}

        {/* State: CAPTURE */}
        {appState === AppState.CAPTURE && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h2 className="text-center text-2xl font-bold mb-8 brand-font">Identify Subject</h2>
            <Camera onCapture={handleCapture} />
          </div>
        )}

        {/* State: ANALYSIS */}
        {appState === AppState.ANALYSIS && (
          <AnalysisView 
            image={userImage} 
            analysis={analysis} 
            onProceed={handleProceedToEras} 
          />
        )}

        {/* State: SELECT ERA */}
        {appState === AppState.SELECT_ERA && (
          <div className="animate-in fade-in duration-500">
            <EraSelector onSelect={handleEraSelect} />
          </div>
        )}

        {/* State: PROCESSING */}
        {appState === AppState.PROCESSING && (
          <Processing message={selectedEra ? `Transporting to ${selectedEra.name}...` : 'Processing...'} />
        )}

        {/* State: RESULT */}
        {appState === AppState.RESULT && selectedEra && (
          <Result 
            resultImage={resultImage} 
            era={selectedEra} 
            onReset={resetApp} 
            onTryAnotherEra={tryAnotherEra} 
          />
        )}

        {/* State: ERROR */}
        {appState === AppState.ERROR && (
          <div className="text-center p-8 bg-red-900/20 border border-red-500/50 rounded-2xl max-w-md mx-auto mt-20">
            <h3 className="text-xl font-bold text-red-400 mb-2">System Failure</h3>
            <p className="text-red-200 mb-6">{errorMsg || "An unknown error occurred."}</p>
            <button 
              onClick={resetApp}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
            >
              Reboot System
            </button>
          </div>
        )}

      </main>
      
      {/* Footer */}
      <footer className="text-center py-8 text-slate-600 text-sm font-mono">
        <p>POWERED BY GOOGLE GEMINI</p>
      </footer>
    </div>
  );
}
