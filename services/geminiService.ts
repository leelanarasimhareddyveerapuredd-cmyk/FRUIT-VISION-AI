import { GoogleGenAI, Type } from "@google/genai";
import { FruitAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFruitImage = async (base64Image: string): Promise<FruitAnalysis> => {
  // Extract the base64 data if it includes the prefix
  const base64Data = base64Image.includes('base64,') 
    ? base64Image.split('base64,')[1] 
    : base64Image;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming jpeg for simplicity, but works with png too
              data: base64Data,
            },
          },
          {
            text: `Act as a world-class expert agricultural quality grader. Analyze this image to detect the fruit or vegetable.
            
            Strictly output JSON. 

            Tasks:
            1. Identify the fruit/vegetable name. 
            2. Determine ripeness (0-100%).
            3. Classify Ripeness Stage: "Unripe", "Ripe", or "Overripe".
            4. Assign Quality Grade: "A" (Premium/Perfect), "B" (Standard/Good), "C" (Poor/Defective).
            5. Detect specific visible defects (bruises, mold, shriveling, discoloration). If none, return empty list.
            6. Estimate sugar content (Low/Medium/High) based on ripeness visuals.
            7. Estimate remaining shelf life (e.g., "3-4 days").
            8. Provide nutritional highlights (2-3 short bullet points).
            9. Score visual aspects (0-100): Color (vibrancy), Texture (firmness/skin quality), Shape (uniformity).
            10. Provide a specific, helpful recommendation (e.g., "Perfect for smoothies", "Eat immediately").

            IMPORTANT: If the image DOES NOT contain a fruit or vegetable, set "fruitType" to "Non-Fruit Object", "ripenessPercentage" to 0, and "recommendation" to "Please upload a clear image of a fruit or vegetable.".
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fruitType: { type: Type.STRING, description: "Common name of the fruit or 'Non-Fruit Object'" },
            ripenessPercentage: { type: Type.NUMBER, description: "0 to 100 representing ripeness" },
            ripenessStage: { type: Type.STRING, enum: ["Unripe", "Ripe", "Overripe"] },
            qualityGrade: { type: Type.STRING, enum: ["A", "B", "C"] },
            defects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of visible defects like bruises, cuts, mold" },
            sugarContentLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
            estimatedShelfLife: { type: Type.STRING, description: "e.g., '2-3 days'" },
            nutritionalHighlights: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Short phrases about vitamins/benefits" },
            colorScore: { type: Type.NUMBER, description: "0-100 score for visual color quality" },
            textureScore: { type: Type.NUMBER, description: "0-100 score for visual skin texture/firmness" },
            shapeScore: { type: Type.NUMBER, description: "0-100 score for shape uniformity" },
            recommendation: { type: Type.STRING, description: "Actionable advice" },
          },
          required: [
            "fruitType", "ripenessPercentage", "ripenessStage", "qualityGrade", 
            "defects", "sugarContentLevel", "estimatedShelfLife", "colorScore", 
            "textureScore", "shapeScore", "recommendation"
          ],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const data = JSON.parse(response.text) as FruitAnalysis;
    return data;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze image. Please ensure the API key is valid and try again.");
  }
};