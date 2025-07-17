// Utility to generate magical/fantasy-themed prompts and fetch images from pollination.ai

const MAGICAL_PROMPTS: string[] = [
  // Will add your magical prompts here
];

export function getRandomMagicalPrompt(): string {
  const idx = Math.floor(Math.random() * MAGICAL_PROMPTS.length);
  return MAGICAL_PROMPTS[idx];
}

export async function fetchMagicalAiImage(prompt: string): Promise<string> {
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

    return response.url;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
