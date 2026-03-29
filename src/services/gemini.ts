import { GoogleGenAI, Type } from "@google/genai";
import { UserData, LearningRoadmap } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const roadmapSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    summary: { type: Type.STRING },
    estimatedTotalHours: { type: Type.NUMBER },
    phases: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                resources: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      url: { type: Type.STRING },
                    },
                    required: ["title", "url"],
                  },
                },
                milestones: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["title", "description", "duration"],
            },
          },
        },
        required: ["name", "steps"],
      },
    },
  },
  required: ["title", "summary", "phases"],
};

export async function generateRoadmap(userData: UserData): Promise<LearningRoadmap> {
  const prompt = `
    Generate a highly customized learning roadmap for a user with the following details:
    - Goal: ${userData.goal}
    - Experience Level: ${userData.experienceLevel}
    - Time Commitment: ${userData.dailyHours} hours/day for ${userData.totalMonths} months.
    
    ${userData.cvText ? `User's CV/Background: ${userData.cvText}` : ""}
    
    The roadmap should be realistic, actionable, and tailored to their specific background. 
    If a CV is provided, skip things they already know and focus on the gaps.
    
    CRITICAL: Use Google Search to find and verify the URLs for each resource. 
    Ensure every link provided is currently active and leads to the correct learning material (e.g., official documentation, reputable course platforms like Coursera/Udemy/YouTube, or established blogs). 
    Do not hallucinate URLs. If you cannot find a verified URL for a specific resource, find an alternative high-quality resource that does have a verified URL.
    
    Include specific resources (books, courses, websites) and milestones for each step.
  `;

  const parts: any[] = [{ text: prompt }];
  if (userData.cvFile) {
    parts.push({
      inlineData: {
        data: userData.cvFile.data,
        mimeType: userData.cvFile.mimeType,
      },
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts }],
    config: {
      responseMimeType: "application/json",
      responseSchema: roadmapSchema,
      tools: [{ googleSearch: {} }],
    },
  });

  if (!response.text) {
    throw new Error("Failed to generate roadmap");
  }

  return JSON.parse(response.text) as LearningRoadmap;
}
