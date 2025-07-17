import React, { useEffect } from 'react';
import { Video } from 'lucide-react';
import { useImageLoader } from './hooks/useImageLoader';
import { useVideoGenerator } from './hooks/useVideoGenerator';
import { ImageDisplay } from './components/ImageDisplay';
import { VideoControls } from './components/VideoControls';

function App() {
  const { currentImage, isLoading: isLoadingImage, loadRandomImage } = useImageLoader();
  const { state: { isGenerating, progress }, generateVideo, canvasRef } = useVideoGenerator();

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
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Video className="w-8 h-8 text-pink-400 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                Magical Reels
              </h1>
            </div>
            <p className="text-gray-400">Create beautiful magical videos in seconds.</p>
          </div>

          <div className="space-y-6">
            <ImageDisplay image={currentImage} isLoading={isLoadingImage} />
            <VideoControls
              hasImage={!!currentImage}
              isLoadingImage={isLoadingImage}
              isGeneratingVideo={isGenerating}
              progress={progress}
              onLoadNewImage={loadRandomImage}
              onGenerateVideo={handleGenerateVideo}
            />
          </div>

          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
}

export default App;