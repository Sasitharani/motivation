import { useState, useCallback } from 'react';

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
  cta: string;
}

// Motivational quotes collection
const MOTIVATIONAL_QUOTES = [
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It is during our darkest moments that we must focus to see the light.",
  "The only impossible journey is the one you never begin.",
  "In the middle of difficulty lies opportunity.",
  "Life is what happens to you while you're busy making other plans.",
  "The way to get started is to quit talking and begin doing.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Do something today that your future self will thank you for."
];

// Call-to-action prompts that match the quotes
const CTA_PROMPTS = [
  "What do you believe in most? Share in comments! 💪",
  "What work do you love to do? Answer in comments! ❤️",
  "What keeps you going? Tell us below! 🚀",
  "What motivates you daily? Comment below! ⏰",
  "What's your biggest dream? Share it! ✨",
  "How do you find light in darkness? Comment! 💡",
  "What journey are you starting? Tell us! 🌟",
  "What opportunity do you see? Share below! 🎯",
  "What are your plans? Comment them! 📝",
  "What are you doing today? Share it! 🔥",
  "What's your biggest limitation? Comment! 🧠",
  "How do you push yourself? Tell us! 💯",
  "What's your comfort zone? Share below! 🌱",
  "What are you dreaming of? Comment! 💭",
  "How do you find success? Share your way! 🏆",
  "What are you working hard for? Tell us! 💪",
  "What's your next big move? Comment! 🎯",
  "What keeps you going? Share below! 🔋",
  "What determines your day? Comment! 🌅",
  "What will you do today? Share it! ✅"
];
function getRandomQuote(): string {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

function getRandomCTA(): string {
  return CTA_PROMPTS[Math.floor(Math.random() * CTA_PROMPTS.length)];
}
// Demo images from Pexels
const DEMO_IMAGES: ImageData[] = [
  {
    id: 1,
    src: {
      original: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      large: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      medium: 'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    alt: 'Beautiful mountain landscape',
    photographer: 'Pexels',
    quote: getRandomQuote(),
    cta: getRandomCTA()
  },
  {
    id: 2,
    src: {
      original: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      large: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      medium: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    alt: 'Modern city skyline',
    photographer: 'Pexels',
    quote: getRandomQuote(),
    cta: getRandomCTA()
  },
  {
    id: 3,
    src: {
      original: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      large: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      medium: 'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    alt: 'Ocean waves at sunset',
    photographer: 'Pexels',
    quote: getRandomQuote(),
    cta: getRandomCTA()
  },
  {
    id: 4,
    src: {
      original: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      large: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      medium: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    alt: 'Forest pathway',
    photographer: 'Pexels',
    quote: getRandomQuote(),
    cta: getRandomCTA()
  },
  {
    id: 5,
    src: {
      original: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      large: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      medium: 'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    alt: 'Desert landscape',
    photographer: 'Pexels',
    quote: getRandomQuote(),
    cta: getRandomCTA()
  }
];

export function useImageLoader() {
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadRandomImage = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay for realistic experience
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const randomIndex = Math.floor(Math.random() * DEMO_IMAGES.length);
      const selectedImage = {
        ...DEMO_IMAGES[randomIndex],
        quote: getRandomQuote(), // Get a fresh random quote each time
        cta: getRandomCTA() // Get a fresh random CTA each time
      };
      
      setCurrentImage(selectedImage);
    } catch (err) {
      setError('Failed to load image. Please try again.');
      console.error('Error loading image:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentImage,
    isLoading,
    error,
    loadRandomImage
  };
}