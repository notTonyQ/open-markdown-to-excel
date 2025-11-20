import { GoogleGenAI, Type } from "@google/genai";
import { GridData } from '../types';

export const generateTableFromPrompt = async (prompt: string): Promise<GridData | null> => {
  if (!process.env.API_KEY) {
    console.error("API Key not found");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a data assistant. Your goal is to convert the user's request into a structured 2D array (table data). Always return a JSON object containing a 'table_data' property which is an array of arrays of strings.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            table_data: {
              type: Type.ARRAY,
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) return null;

    const json = JSON.parse(text);
    return json.table_data;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};