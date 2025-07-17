import { useState, useRef, useCallback } from 'react';
import { createVerticalCanvas, addCanvasAnimation, getSupportedVideoMimeTypes, downloadBlob } from '../utils/videoGenerator';

export interface VideoGenerationState {
  isGenerating: boolean;
  progress: number;
  error: string | null;
}

export interface ImageData {
  id: number;
  src: {
    original: string;
    large: string;
    medium: string;
  };
  alt: string;
  photographer: string;
  quote: string;
}

export function useVideoGenerator() {
  const [state, setState] = useState<VideoGenerationState>({
    isGenerating: false,
    progress: 0,
    error: null
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const generateVideo = useCallback(async (imageData: ImageData) => {
    if (!canvasRef.current) return;

    setState({ isGenerating: true, progress: 0, error: null });

    try {
      // Load the image
      const image = new Image();
      image.crossOrigin = 'anonymous';
      
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Failed to load image'));
        image.src = imageData.src.large;
      });

      // Setup canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      canvas.width = 1080;
      canvas.height = 1920;

      // Get supported video format
      const supportedTypes = getSupportedVideoMimeTypes();
      if (supportedTypes.length === 0) {
        throw new Error('Video recording not supported in this browser');
      }

      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: supportedTypes[0]
      });

      const chunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: supportedTypes[0] });
        const extension = supportedTypes[0].includes('mp4') ? 'mp4' : 'webm';
        const fileName = `reel-${Date.now()}.${extension}`;
        downloadBlob(blob, fileName);
        
        setState({ isGenerating: false, progress: 100, error: null });
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(); // Start recording

      // Animation loop
      const duration = 8000; // 8 seconds
      const fps = 30;
      const totalFrames = (duration / 1000) * fps;
      let frame = 0;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        
        if (elapsed >= duration) {
          mediaRecorder.stop();
          return;
        }

        // Add animation to canvas
        const progress = elapsed / duration;
        addCanvasAnimation(ctx, canvas, image, imageData.quote, imageData.cta, progress);

        // Update progress
        const progressPercent = (elapsed / duration) * 100;
        setState(prev => ({ ...prev, progress: Math.min(progressPercent, 100) }));

        setTimeout(() => {
          requestAnimationFrame(animate);
        }, 1000 / fps); // Maintain consistent frame rate
      };

      // Start animation
      animate();

    } catch (error) {
      console.error('Error generating video:', error);
      setState({
        isGenerating: false,
        progress: 0,
        error: error instanceof Error ? error.message : 'Failed to generate video'
      });
    }
  }, []);

  return {
    state,
    generateVideo,
    canvasRef
  };
}