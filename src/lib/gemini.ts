import { GoogleGenAI } from "@google/genai";

export type AIResult = {
  text: string;
  isDemo: boolean;
};

export async function generateWithGemini(prompt: string): Promise<AIResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return { text: "", isDemo: true };
  }

  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return {
    text: response.text?.trim() || "",
    isDemo: false,
  };
}

export function demoUnavailable(feature: string): AIResult {
  return {
    text: `[Demo mode] Add GEMINI_API_KEY to your .env file to enable ${feature}.`,
    isDemo: true,
  };
}

export function cleanAndParseJSON<T>(text: string, fallback: T): T {
  try {
    let cleaned = text.trim();
    // Remove markdown code fences if present (e.g. ```json ... ``` or ``` ...)
    if (cleaned.startsWith("```")) {
      const firstNewlineIndex = cleaned.indexOf("\n");
      if (firstNewlineIndex !== -1) {
        cleaned = cleaned.slice(firstNewlineIndex).trim();
      }
      if (cleaned.endsWith("```")) {
        cleaned = cleaned.slice(0, cleaned.length - 3).trim();
      }
    }
    
    // Try standard parse
    try {
      return JSON.parse(cleaned) as T;
    } catch (innerError) {
      // Find the first '{' and last '}' to extract the object if extra text surrounds it
      const firstBrace = cleaned.indexOf("{");
      const lastBrace = cleaned.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        const potentialJSON = cleaned.slice(firstBrace, lastBrace + 1);
        return JSON.parse(potentialJSON) as T;
      }
      throw innerError;
    }
  } catch (e) {
    console.error("Failed to clean and parse JSON:", e, "Raw text was:", text);
    return fallback;
  }
}
