
import { GoogleGenAI } from "@google/genai";

export const geminiService = {
  getDailyReflection: async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Give me a short, inspiring Islamic reflection or deed idea for a person fasting in Ramadan. Keep it under 2 sentences.",
        config: {
          temperature: 0.8,
        }
      });
      return response.text || "May your fast be accepted and your heart be filled with peace.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Focus on gratitude today and share your blessings with others.";
    }
  }
};
