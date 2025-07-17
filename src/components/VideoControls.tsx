import React from 'react';
import { Download, RefreshCw, Loader2 } from 'lucide-react';

interface VideoControlsProps {
  onLoadNewImage: () => void;
  onGenerateVideo: () => void;
  isLoadingImage: boolean;
  isGeneratingVideo: boolean;
  hasImage: boolean;
  progress: number;
}

export function VideoControls({
  onLoadNewImage,
  onGenerateVideo,
  isLoadingImage,
  isGeneratingVideo,
  hasImage,
  progress
}: VideoControlsProps) {
  return (
    <div className="space-y-4">
      {/* New Image Button */}
      <button
        onClick={onLoadNewImage}
        disabled={isLoadingImage || isGeneratingVideo}
        className="w-full bg-white text-purple-900 font-semibold py-4 px-6 rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <RefreshCw className={`w-5 h-5 mr-2 ${isLoadingImage ? 'animate-spin' : ''}`} />
        {isLoadingImage ? 'Loading...' : 'Get New Image'}
      </button>

      {/* Download as Reel Button */}
      <button
        onClick={onGenerateVideo}
        disabled={!hasImage || isGeneratingVideo || isLoadingImage}
        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
      >
        {isGeneratingVideo ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Generating... {Math.round(progress)}%
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Download as Reel
          </>
        )}
      </button>

      {/* Progress Bar */}
      {isGeneratingVideo && (
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}