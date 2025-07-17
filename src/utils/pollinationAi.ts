// Utility to generate a random nature prompt and fetch an image from pollination.ai

const NATURE_PROMPTS = [
  // Mountains
  "Snow-capped peaks like the Himalayas or Alps",
  "Rocky cliffs and ridges in dramatic light",
  "Volcanic mountain such as Mount Fuji or Mount Etna",
  "Rolling green hills and meadows at sunrise",
  // Water Bodies
  "A mighty river like the Ganges, Amazon, or Nile winding through a valley",
  "A majestic waterfall such as Niagara Falls or Angel Falls",
  "A tranquil lake like Lake Baikal or Lake Tahoe reflecting the sky",
  "Oceans and beaches with waves and tides crashing on the shore",
  // Forests and Trees
  "Dense tropical rainforest like the Amazon, misty and lush",
  "Pine and coniferous forests in the morning fog",
  "Autumn foliage with vibrant red and orange leaves",
  "Bamboo groves and mangroves in soft sunlight",
  // Landscapes
  "Desert with golden dunes like the Sahara under a blue sky",
  "Vast grasslands and savannas with wildflowers",
  "Deep valleys and canyons like the Grand Canyon at sunset",
  "Plateaus and plains stretching to the horizon",
  // Skies and Atmosphere
  "Sunrise over a mountain landscape with colorful clouds",
  "Starry night sky and the Milky Way above a forest",
  "A rainbow or aurora over a peaceful lake",
  "Dramatic cloud formations and thunderstorms over fields",
  // Wildlife in Nature
  "Birds flying over a serene lake at dawn",
  "Deer grazing in a sunlit forest clearing",
  "Fish swimming in a crystal-clear river",
  "Butterflies fluttering in a field of wildflowers"
];

export function getRandomNaturePrompt(): string {
  const idx = Math.floor(Math.random() * NATURE_PROMPTS.length);
  return NATURE_PROMPTS[idx];
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
