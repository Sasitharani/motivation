// Utility to generate magical prompts and fetch images from pollination.ai

const MAGICAL_PROMPTS = [
  // Celestial and Sky
  "Dreamy midnight blue sky with floating golden lanterns and sparkles",
  "Shooting stars streaking across a lavender galaxy with soft glowing trails",
  "Aurora of magical colors dancing over a mystical forest",
  "Ethereal moonlit scene with floating dandelion seeds and sparkle trails",
  // Magical Environments
  "Enchanted forest with bioluminescent flowers and floating lights",
  "Crystal cave with shimmering gems and magical light beams",
  "Ancient magical library with floating books and glowing dust particles",
  "Secret garden with blooming magical flowers and butterfly swarms",
  // Fantasy Elements
  "Magical portal with swirling colors and floating light particles",
  "Crystal ball reflecting mystical visions with soft golden light",
  "Ancient magical tree with glowing leaves and floating fireflies",
  "Magical waterfall with rainbow light and floating sparkles",
  // Atmospheric Scenes
  "Sunset through a magical crystal prism with light rays",
  "Mystical fog with floating fairy lights and soft gold accents",
  "Starlit clearing with magical mushrooms and glowing butterflies",
  "Dream-like clouds with floating magical symbols and sparkles",
  // Magical Objects
  "Magic wand creating trails of sparkles and light rays",
  "Enchanted mirror reflecting magical realms and soft glows",
  "Floating spell book with glowing runes and magical dust",
  "Magical hourglass with shimmering stardust and time magic"
];

export function getRandomPrompt(): string {
  const idx = Math.floor(Math.random() * MAGICAL_PROMPTS.length);
  return MAGICAL_PROMPTS[idx];
}

export async function fetchPollinationAiImage(prompt: string): Promise<string> {
  try {
    // Use the stable diffusion API endpoint
    const response = await fetch("https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt), {
      method: "GET",
      headers: {
        "Accept": "image/*",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image from pollination.ai: ${response.statusText}`);
    }

    // The URL itself is the image URL in this case
    return response.url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
