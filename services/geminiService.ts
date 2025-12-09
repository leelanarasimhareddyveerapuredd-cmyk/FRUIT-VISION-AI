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
            text: `Analyze this image of a fruit (or fruits) acting as an expert agricultural quality grader. 
            Identify the fruit, determine its ripeness level (0-100), assign a quality grade (A=Premium, B=Standard, C=Poor), 
            detect any visible defects, estimate sugar content based on visual indicators, and predict shelf life.
            Also provide scores (0-100) for Color, Texture (visual firmness), and Shape.
            If no fruit is detected, return null or an error indicating so.
            `,
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fruitType: { type: Type.STRING, description: "Common name of the fruit" },
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
            recommendation: { type: Type.STRING, description: "Actionable advice (e.g., 'Eat now', 'Wait 2 days', 'Discard')" },
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
    throw new Error("Failed to analyze image. Please try again.");
  }
};
