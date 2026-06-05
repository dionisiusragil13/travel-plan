import { GoogleGenAI } from "@google/genai";
import { env } from "@/lib/env";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const generateTripPlan = async ({
  destination,
  duration,
  budget,
  style,
  group,
  preference,
}: TripPlanInput) => {
  const prompt = `
Kamu adalah travel planner profesional.

Buatkan rencana perjalanan ke ${destination}.

Data perjalanan:
- Durasi: ${duration} hari
- Budget: Rp${budget}
- Preferensi: ${preference}
- Jumlah orang: ${group}
- Tipe traveling: ${style}

PENTING:
Kembalikan HANYA JSON valid.
Jangan gunakan markdown.
Jangan gunakan \`\`\`json.
Jangan tambahkan penjelasan sebelum atau sesudah JSON.

Format JSON:

{
  "summary": {
    "destination": "string",
    "duration": number,
    "budget": number,
    "style": "string",
    "group": number
  },
  "budgetBreakdown": {
    "accommodation": number,
    "food": number,
    "transportation": number,
    "attractions": number,
    "other": number
  },
  "itinerary": [
    {
      "day": 1,
      "title": "string",
      "activities": [
        {
          "time": "09:00",
          "activity": "string",
          "location": "string",
          "estimatedCost": number
        }
      ],
      "recommendedFood": [
        "string"
      ],
      "dailyBudget": number
    }
  ],
  "tips": [
    "string"
  ]
}
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        thinkingConfig: {},
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Gagal membuat itinerary");
  }
};
