// Utility to generate magical prompts and fetch images from pollination.ai

const MAGICAL_PROMPTS = [
  // Light and Radiance
  "A sunburst of golden coins and hearts radiating magical light",
  "A lantern glowing with ethereal light in a starlit dark forest",
  "A magical candle lighting another candle with rainbow flames",
  "A phoenix rising with golden wings trailing sparks of light",
  // Sacred Circles and Cycles
  "A glowing circle made of intertwined coins and hearts radiating light",
  "Sound waves radiating from a crystalline heart-shaped speaker",
  "A magical cup overflowing with liquid gold and shimmering light",
  "A perfect circle of golden light connecting giving and receiving",
  // Bridges and Connections
  "A golden bridge connecting two glowing hearts with shimmering light",
  "A golden thread weaving through crystalline hands in connection",
  "Two ethereal arms forming a heart radiating golden light",
  "A magical bridge made of light spanning between generous souls",
  // Doors and Portals
  "A glowing doorway with coins and light spilling into starlit realms",
  "An enchanted mirror reflecting golden realms of abundance",
  "A crystal key emanating golden light in ethereal hands",
  "A magical portal swirling with golden opportunities and light",
  // Growth and Transformation
  "A magical hand placing a golden coin into soil with a glowing sprout",
  "A blooming flower with petals made of shimmering golden coins",
  "A single drop creating ripples of golden light across reality",
  "A butterfly with wings of coins spreading abundance through flight",
  // Sacred Objects
  "A golden anchor resting on a bed of glowing crystals and treasures",
  "A treasure chest overflowing with magical coins and radiant hearts",
  "A mystical bell creating visible waves of golden abundance",
  "A nest woven with golden threads and filled with precious light",
  // Movement and Flow
  "A stream of golden light flowing between magical crystal hands",
  "A feather floating on currents of shimmering golden energy",
  "A magical spark igniting trails of golden light and butterflies",
  "Waves of golden abundance flowing from heart to heart",
  // Comfort and Protection
  "Two arms forming a protective circle of glowing golden light",
  "A warm embrace visualized as intertwining streams of light",
  "A safe space created by walls of gentle, golden radiance",
  "A comforting cocoon of magical golden energy and love",
  // Signs and Signals
  "A magical signal tower broadcasting waves of golden light",
  "An envelope unsealing to release butterflies of golden light",
  "A glowing eye surrounded by a constellation of golden stars",
  "A magical compass pointing toward paths of abundance",
  // Whispers and Echoes
  "Visible whispers of kindness as golden light trails",
  "Echo ripples of giving spreading in golden waves",
  "A feather's touch creating circles of golden light",
  "Soft words manifesting as floating sparkles of gold",
  // Elevation and Rise
  "A majestic bird with golden wings lifting another skyward",
  "Stars showering golden coins and hearts from above",
  "A magical elevator made of pure golden light ascending",
  "A spiral staircase of golden light leading upward",
  // Paths and Directions
  "A golden path winding through fields of glowing stars",
  "Stepping stones made of light crossing magical waters",
  "An illuminated trail marked by floating golden coins",
  "A compass rose made of radiating golden light beams"
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
