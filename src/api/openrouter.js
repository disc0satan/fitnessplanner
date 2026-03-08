import { SYSTEM_PROMPT } from './systemPrompt';
import { cleanAndParseJSON } from './parseJson';

const MODELS = [
  "google/gemini-2.0-flash-lite-preview-02-05:free", // Generally higher rate limits
  "openai/gpt-3.5-turbo",
  "mistralai/mistral-7b-instruct:free"
];


const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const fetchFitnessPlan = async (formData, attempt = 0) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST", //
      headers: {
        "Authorization": `Bearer ${API_KEY}`, //
        "Content-Type": "application/json", //
        "HTTP-Referer": window.location.origin,
        "X-Title": "AI Fitness Planner"
      },
      body: JSON.stringify({
        "model": MODELS[attempt], //
        "messages": [
          { role: 'system', content: SYSTEM_PROMPT }, //
          { role: 'user', content: `Create a ${formData.load}-day ${formData.objective} plan for a ${formData.age}yo ${formData.gender}. Tier: ${formData.experience}.` } //
        ],
        "temperature": 0.5 // Lower temperature = more stable JSON
      })
    });

    if (response.status === 429) {
      throw new Error("Rate limit reached. Please wait 10 seconds.");
    }

    if (!response.ok) throw new Error(`Status ${response.status}`);

    const result = await response.json(); //
    const content = result.choices[0]?.message?.content; //
    
    return cleanAndParseJSON(content);

  } catch (error) {
    if (attempt < MODELS.length - 1) {
      console.warn(`Model ${MODELS[attempt]} failed. Retrying...`);
      // Wait 2 seconds before retrying to avoid back-to-back 429s
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchFitnessPlan(formData, attempt + 1);
    }
    throw error;
  }
};
