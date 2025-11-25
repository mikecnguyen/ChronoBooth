export enum AppState {
  HOME = 'HOME',
  CAPTURE = 'CAPTURE',
  ANALYSIS = 'ANALYSIS',
  SELECT_ERA = 'SELECT_ERA',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}

export interface Era {
  id: string;
  name: string;
  description: string;
  prompt: string;
  icon: string; // URL or name for icon rendering
  color: string;
}

export interface AnalysisResult {
  traits: string[];
  demographics: string;
  funFact: string;
}

export interface ProcessingState {
  status: 'idle' | 'analyzing' | 'traveling';
  message: string;
}
