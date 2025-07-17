/**
 * Video generation utilities for creating vertical reels from images
 */

export interface VideoConfig {
  width: number;
  height: number;
  duration: number;
  fps: number;
}

export const DEFAULT_VIDEO_CONFIG: VideoConfig = {
  width: 1080,
  height: 1920,
  duration: 8000, // 8 seconds in milliseconds
  fps: 30
};

/**
 * Creates a vertical video canvas from an image
 */
export function createVerticalCanvas(
  image: HTMLImageElement,
  config: VideoConfig = DEFAULT_VIDEO_CONFIG
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } | null {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return null;

  canvas.width = config.width;
  canvas.height = config.height;

  // Fill with black background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate aspect ratios
  const canvasAspect = canvas.width / canvas.height;
  const imageAspect = image.width / image.height;

  let drawWidth, drawHeight, drawX, drawY;

  if (imageAspect > canvasAspect) {
    // Image is wider - fit to height
    drawHeight = canvas.height;
    drawWidth = drawHeight * imageAspect;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  } else {
    // Image is taller - fit to width
    drawWidth = canvas.width;
    drawHeight = drawWidth / imageAspect;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  }

  // Draw the image centered
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  return { canvas, ctx };
}

/**
 * Draws text with proper wrapping and styling
 */
export function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
  return currentY + lineHeight;
}

/**
 * Adds subtle animation effects to the canvas
 */
export function addCanvasAnimation(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  quote: string,
  cta: string,
  progress: number
): void {
  // Clear canvas
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Calculate zoom effect (subtle)
  const zoomFactor = 1 + (progress * 0.1); // 10% zoom over duration

  // Calculate drawing dimensions with zoom
  const canvasAspect = canvas.width / canvas.height;
  const imageAspect = image.width / image.height;

  let drawWidth, drawHeight, drawX, drawY;

  if (imageAspect > canvasAspect) {
    drawHeight = canvas.height * zoomFactor;
    drawWidth = drawHeight * imageAspect;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = (canvas.height - drawHeight) / 2;
  } else {
    drawWidth = canvas.width * zoomFactor;
    drawHeight = drawWidth / imageAspect;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = (canvas.height - drawHeight) / 2;
  }

  // Draw the image with zoom effect
  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);

  // Add quote overlay at the top
  const padding = 40;
  const quoteY = 120;
  
  // Create gradient background for quote
  const gradient = ctx.createLinearGradient(0, 60, 0, 200);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 60, canvas.width, 140);
  
  // Draw quote text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  
  // Add text shadow for better readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  drawWrappedText(ctx, quote, canvas.width / 2, quoteY, canvas.width - (padding * 2), 44);
  
  // Add CTA overlay at the bottom
  const ctaY = canvas.height - 180;
  
  // Create gradient background for CTA
  const ctaGradient = ctx.createLinearGradient(0, canvas.height - 200, 0, canvas.height);
  ctaGradient.addColorStop(0, 'rgba(0, 0, 0, 0.3)');
  ctaGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
  
  ctx.fillStyle = ctaGradient;
  ctx.fillRect(0, canvas.height - 200, canvas.width, 200);
  
  // Draw CTA text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  
  drawWrappedText(ctx, cta, canvas.width / 2, ctaY, canvas.width - (padding * 2), 36);
  
  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Add subtle fade effect at the beginning
  if (progress < 0.125) { // First second (1/8 of 8 seconds)
    const alpha = progress / 0.125;
    ctx.globalAlpha = alpha;
    ctx.globalAlpha = 1;
  }
}

/**
 * Checks if the browser supports video recording
 */
export function isVideoRecordingSupported(): boolean {
  return (
    typeof MediaRecorder !== 'undefined' &&
    typeof HTMLCanvasElement.prototype.captureStream === 'function'
  );
}

/**
 * Gets the supported video MIME types
 */
export function getSupportedVideoMimeTypes(): string[] {
  const types = [
    'video/mp4;codecs=h264',
    'video/mp4',
    'video/webm;codecs=vp9',
    'video/webm;codecs=vp8',
    'video/webm'
  ];

  return types.filter(type => MediaRecorder.isTypeSupported(type));
}

/**
 * Downloads a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}