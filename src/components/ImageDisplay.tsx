import React from 'react';
import { ImageIcon, Loader2 } from 'lucide-react';

interface ImageData {
  id: number;
  src: {
    original: string;
    large: string;
    medium: string;
  };
  alt: string;
  photographer: string;
  quote: string;
  cta: string;
}

interface ImageDisplayProps {
  image: ImageData | null;
  isLoading: boolean;
}

export function ImageDisplay({ image, isLoading }: ImageDisplayProps) {
  if (isLoading) {
    return (
      <div className="aspect-[9/16] flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading image...</p>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="aspect-[9/16] flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No image loaded</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-[9/16] relative overflow-hidden bg-black rounded-2xl">
      <img
        src={image.src.large}
        alt={image.alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      
      {/* Quote Overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent p-6 pt-8">
        <p className="text-white text-lg font-bold text-center leading-tight drop-shadow-lg">
          "{image.quote}"
        </p>
      </div>
      
      {/* CTA Overlay */}
      <div className="absolute bottom-12 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 pb-8">
        <p className="text-white text-base font-semibold text-center leading-tight drop-shadow-lg">
          {image.cta}
        </p>
      </div>
      
      {/* Photographer Credit */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
        📸 {image.photographer}
      </div>
    </div>
  );
}