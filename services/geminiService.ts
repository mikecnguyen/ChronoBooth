import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes the user's photo to create a "Time Traveler Profile".
 * Uses gemini-3-pro-preview as requested for image analysis.
 */
export const analyzeImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this person for a sci-fi time traveler dossier.
            Return a JSON object with:
            1. 'traits': Array of 3 short visual traits (e.g., "Determined gaze", "Wearing glasses").
            2. 'demographics': Short description (e.g., "Young adult male, approx 25").
            3. 'funFact': A made-up, funny sci-fi reason they are fit for time travel (e.g., "Quantum stability reading is 99%").`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            traits: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            demographics: { type: Type.STRING },
            funFact: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No analysis generated");
    
    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    // Fallback data if analysis fails
    return {
      traits: ["Mysterious aura", "Ready for adventure", "Temporal variance detected"],
      demographics: "Time Traveler",
      funFact: "Chronometer synced."
    };
  }
};

/**
 * Edits the image to place the user in a new era.
 * Uses gemini-2.5-flash-image as requested for image editing.
 */
export const generateTimeTravelImage = async (base64Image: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `${prompt} Maintain the facial features and identity of the person in the input image strictly. Ensure high quality, realistic lighting and seamless integration.`
          }
        ]
      },
      // Note: gemini-2.5-flash-image does not support responseMimeType for images in the same way as text JSON.
      // It returns an image in the parts.
    });

    // Extract the image from the response
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return part.inlineData.data;
        }
      }
    }
    
    throw new Error("No image generated in response");
  } catch (error) {
    console.error("Generation failed:", error);
    throw error;
  }
};
