import React, { useEffect } from 'react';
import { Video } from 'lucide-react';
import { useImageLoader } from './hooks/useImageLoader';
import { useVideoGenerator } from './hooks/useVideoGenerator';
import { ImageDisplay } from './components/ImageDisplay';
import { VideoControls } from './components/VideoControls';

function App() {
  const { currentImage, isLoading: isLoadingImage, error: imageError, loadRandomImage } = useImageLoader();
  const { state: videoState, generateVideo, canvasRef } = useVideoGenerator();

  const handleGenerateVideo = () => {
    if (currentImage) {
      generateVideo(currentImage);
    }
  };

  // Load initial image
  useEffect(() => {
    loadRandomImage();
  }, [loadRandomImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-pink-400 mr-2" />
              <h1 className="text-3xl font-bold text-white">Reel Generator</h1>
            </div>
            <p className="text-gray-300">Convert random images to vertical video reels</p>
          </div>

          {/* Image Display */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-6 p-4">
            <ImageDisplay image={currentImage} isLoading={isLoadingImage} />
          </div>

          {/* Controls */}
          <VideoControls
            onLoadNewImage={loadRandomImage}
            onGenerateVideo={handleGenerateVideo}
            isLoadingImage={isLoadingImage}
            isGeneratingVideo={videoState.isGenerating}
            hasImage={!!currentImage}
            progress={videoState.progress}
          />

          {/* Error Messages */}
          {(imageError || videoState.error) && (
            <div className="mt-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl">
              {imageError || videoState.error}
            </div>
          )}

          {/* Info Panel */}
          <div className="mt-8 text-center">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-2">Video Specifications</h3>
              <div className="text-sm text-gray-300 space-y-1">
                <p>• Duration: 8 seconds</p>
                <p>• Resolution: 1080x1920 (9:16)</p>
                <p>• Frame rate: 30fps</p>
                <p>• Format: MP4 (or WebM fallback)</p>
                <p>• Includes motivational quotes & zoom animation</p>
              </div>
            </div>
          </div>

          {/* Browser Support Info */}
          <div className="mt-4 text-center">
            <div className="bg-blue-100 bg-opacity-10 backdrop-blur-sm rounded-xl p-4 text-blue-200">
              <p className="text-sm">
                📱 Optimized for Chrome, Safari, Firefox, and Edge
              </p>
              <p className="text-xs mt-1">
                Works on mobile devices with iOS Safari and Android Chrome
              </p>
            </div>
          </div>
        </div>

        {/* Hidden canvas for video generation */}
        <canvas
          ref={canvasRef}
          className="hidden"
          width={1080}
          height={1920}
        />
      </div>
    </div>
  );
}

export default App;