import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Camera as CameraIcon, Upload, RefreshCw } from 'lucide-react';

interface CameraProps {
  onCapture: (base64Image: string) => void;
}

export const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setStream(mediaStream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError('');
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Could not access camera. Please check permissions or upload a file.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  useEffect(() => {
    // Start camera on mount
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]); // Added dependencies to fix lint warning

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        // Flip horizontally for mirror effect if using user-facing camera
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
        
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to base64
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        // Remove prefix for API
        const base64 = dataUrl.split(',')[1];
        stopCamera();
        onCapture(base64);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1];
        stopCamera();
        onCapture(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
      <div className="relative aspect-[3/4] bg-black">
        {isCameraActive ? (
           <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="w-full h-full object-cover transform scale-x-[-1]"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            <p>Camera inactive</p>
          </div>
        )}
        
        {/* Helper grid for framing */}
        <div className="absolute inset-0 pointer-events-none opacity-30 grid grid-cols-3 grid-rows-3">
          <div className="border-r border-slate-400/50"></div>
          <div className="border-r border-slate-400/50"></div>
          <div></div>
          <div className="border-r border-t border-slate-400/50"></div>
          <div className="border-r border-t border-slate-400/50"></div>
          <div className="border-t border-slate-400/50"></div>
          <div className="border-r border-t border-slate-400/50"></div>
          <div className="border-r border-t border-slate-400/50"></div>
          <div className="border-t border-slate-400/50"></div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="p-6 flex flex-col items-center gap-4 bg-slate-900">
        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
        
        <div className="flex items-center justify-center w-full gap-8">
            <label className="cursor-pointer flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors">
              <div className="p-3 rounded-full bg-slate-800 border border-slate-700">
                <Upload size={24} />
              </div>
              <span className="text-xs">Upload</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>

            <button 
              onClick={capturePhoto}
              className="group relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50 group-hover:opacity-100 transition-opacity rounded-full"></div>
              <div className="relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-transparent group-active:scale-95 transition-transform">
                <div className="w-16 h-16 bg-white rounded-full"></div>
              </div>
            </button>
            
            <button 
              onClick={() => { stopCamera(); startCamera(); }}
              className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <div className="p-3 rounded-full bg-slate-800 border border-slate-700">
                <RefreshCw size={24} />
              </div>
              <span className="text-xs">Retry</span>
            </button>
        </div>
        <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest">Center your face</p>
      </div>
    </div>
  );
};
