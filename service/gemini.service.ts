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

Buatkan rencana perjalanan (itinerary) detail untuk liburan ke ${destination}.
Durasi: ${duration} hari.
Budget: Rp${budget}.
Preferensi: ${preference}.
jumlah orang: ${group}.
tipe traveling:${style}

Aturan:
- Gunakan bahasa Indonesia
- Jawaban rapi dan mudah dibaca
- Sertakan:
  - Itinerary per hari
  - Rekomendasi tempat makan
  - Estimasi biaya per hari
  - Tips perjalanan singkat
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
