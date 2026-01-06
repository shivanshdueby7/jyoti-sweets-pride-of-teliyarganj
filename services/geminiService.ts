
import { GoogleGenAI, Type } from "@google/genai";
import { PRODUCTS, CONTACT_INFO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSweetRecommendation(userMessage: string) {
  try {
    const productInfo = PRODUCTS.map(p => `${p.name} (${p.category}): ${p.description} at ₹${p.price}/${p.unit}`).join('\n');
    
    // We use gemini-3-flash-preview for better reasoning and tool support
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are the Virtual Manager for "New Jyoti Sweets", a premium restaurant and sweet shop in Teliyarganj, Prayagraj.
        
        CONTEXT:
        - Location: ${CONTACT_INFO.address}
        - Hours: ${CONTACT_INFO.hours}
        - Speciality: Desi Ghee Sweets, Samosas, Bengali Sweets, and Eggless Bakery.
        - Menu Data: ${productInfo}
        
        DIRECTIONS:
        - If the user asks about location, landmarks, or how to get here, use the googleMaps tool.
        - Recommend specific items from our menu based on their cravings.
        - Always maintain a polite, traditional Indian hospitality vibe (Namaste).
        - If they ask for things we don't have, politely redirect them to our bestsellers like Rasmalai or Motichoor Laddu.`,
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: 25.4974641,
              longitude: 81.8618869
            }
          }
        }
      },
    });

    const groundingLinks = response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
      title: chunk.maps?.title || "View on Maps",
      uri: chunk.maps?.uri || CONTACT_INFO.googleMapsUrl
    }));

    return {
      text: response.text || "I'm sorry, I'm having a bit of trouble connecting to the kitchen. How can I assist you otherwise?",
      groundingLinks: groundingLinks
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      text: "Namaste! Our digital kitchen is a bit busy. Please feel free to browse our menu manually.",
      groundingLinks: []
    };
  }
}
