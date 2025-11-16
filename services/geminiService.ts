import { GoogleGenAI, Type, Modality } from "@google/genai";
import type { Product, Trend, AIModel } from '../types';

const getApiKey = (): string | null => {
    // 1. Prioritize user-provided key from localStorage.
    try {
        const stored = localStorage.getItem('universal-connections');
        if (stored) {
            const connections = JSON.parse(stored);
            const geminiApiKey = connections?.gemini?.credentials?.API_KEY;
            if (geminiApiKey && geminiApiKey.trim() !== '') {
                return geminiApiKey;
            }
        }
    } catch (e) {
        console.error("Could not read API key from localStorage", e);
    }
    
    // 2. Fallback to the environment variable.
    const envApiKey = process.env.API_KEY;
    if (envApiKey) {
        return envApiKey;
    }
    
    return null;
};

// This function can be called by components to reactively check AI status.
export const isGeminiApiActive = (): boolean => {
    return !!getApiKey();
};

// Update the global flag on initial load for any components that might still use it.
(window as any).GEMINI_API_ACTIVE = isGeminiApiActive();

const createAiClient = () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        console.warn("Gemini API key not found. Please configure it on the Connections page or set process.env.API_KEY.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};


const generateContent = async (prompt: string): Promise<string> => {
    const ai = createAiClient();
    if (!ai) {
       return `This is a mocked response because the API key is not configured. Prompt: "${prompt.substring(0, 100)}..."`;
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content with Gemini API:", error);
        throw new Error("Failed to generate content from Gemini API. Check console for details.");
    }
};

export const scrapeProductInfo = async (url: string): Promise<Product | null> => {
    const prompt = `
Act as an expert web scraper and affiliate marketing analyst. Given the product URL "${url}", extract its key information.
If the URL is from a known e-commerce site (like Amazon, Shopee, Tiki, Lazada, ClickBank), extract the data. If not, state that it's an unsupported URL.

Provide the product name, a compelling description for a YouTube video, a list of 3-4 key features (as a string), and use the original URL as the affiliate link.
Also, estimate the commission percentage, a user rating out of 5, and an estimated number of conversions based on the product's likely popularity.

Ensure the response is a single valid JSON object matching the provided schema. Do not wrap it in an array or markdown.
The ID should be a camelCase version of the product name.
`;
    
    const schema = {
        type: Type.OBJECT,
        properties: {
            id: { type: Type.STRING, description: "A unique ID for the product, can be the product name in camelCase." },
            name: { type: Type.STRING },
            description: { type: Type.STRING },
            features: { type: Type.STRING },
            affiliateLink: { type: Type.STRING },
            commission: { type: Type.NUMBER },
            rating: { type: Type.NUMBER },
            conversions: { type: Type.INTEGER },
        },
        required: ["id", "name", "description", "features", "affiliateLink", "commission", "rating", "conversions"]
    };

    const ai = createAiClient();
    if (!ai) {
        return null;
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error scraping product info with Gemini API:", error);
        return null;
    }
};


export const scoutForProducts = async (topic: string): Promise<Product[]> => {
    const prompt = `
Act as an expert affiliate marketing researcher. Find 5 trending and high-converting digital products or AI tools related to the topic: "${topic}".
For each product, provide a concise name, a compelling description for a YouTube video, a list of 3-4 key features (as a string), a plausible-looking affiliate link, an estimated commission percentage (as a number), a user rating out of 5 (as a number), and an estimated number of conversions.
Ensure the response is a valid JSON array matching the provided schema.
`;
    
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                id: { type: Type.STRING, description: "A unique ID for the product, can be the product name in camelCase." },
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                features: { type: Type.STRING },
                affiliateLink: { type: Type.STRING },
                commission: { type: Type.NUMBER },
                rating: { type: Type.NUMBER },
                conversions: { type: Type.INTEGER },
            },
            required: ["id", "name", "description", "features", "affiliateLink", "commission", "rating", "conversions"]
        }
    };

    const ai = createAiClient();
    if (!ai) {
        return [];
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error scouting for products with Gemini API:", error);
        return [];
    }
};

export const huntForTrends = async (): Promise<Trend[]> => {
    const prompt = `
Act as a market trend analyst specializing in digital products and affiliate marketing.
Identify 5 current, high-potential trending topics or niches for creating review videos (like YouTube Shorts).
For each trend, provide a concise topic name and a short, compelling description explaining why it's trending.

Ensure the response is a valid JSON array of objects, where each object has "topic" and "description" keys.
`;
    const schema = {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                topic: { type: Type.STRING },
                description: { type: Type.STRING },
            },
            required: ["topic", "description"]
        }
    };

    const ai = createAiClient();
    if (!ai) {
        return [];
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error hunting for trends with Gemini API:", error);
        return [];
    }
};


export const generateReviewScript = async (product: Product): Promise<string> => {
    const prompt = `
You are an expert YouTube content creator specializing in AI tools and digital products.
Write a short 60-second video script for a product review (YouTube Shorts format).

Structure:
1. Hook – grab attention immediately
2. Intro – what the product does
3. 3 Key Features – short, impactful
4. Real-world benefits – why it matters
5. Call to Action (CTA) – encourage viewers to try via affiliate link

Product data:
- product_name: ${product.name}
- description: ${product.description}
- main_features: ${product.features}
- affiliate_link: ${product.affiliateLink}

Tone: friendly, engaging, natural.
Language: English.
Avoid over-promotional language.
`;
    return generateContent(prompt);
};

export const generateVideoTitles = async (productName: string): Promise<string[]> => {
    const prompt = `
Generate 10 catchy and viral-worthy video titles for a YouTube Shorts review of the product: "${productName}".
Each title must be under 50 characters.
Focus on creating strong, curiosity-driven hooks. Use tactics like:
- Posing a controversial question (e.g., "Is [Product] a Scam?")
- Highlighting a shocking result (e.g., "This AI Wrote My Code in 5s")
- Creating a sense of urgency or FOMO (e.g., "Don't Buy It Until You See This")
- Using strong, emotional words (e.g., "The AI Tool That Changed Everything")
- Making a bold claim (e.g., "The Only [Product Category] Tool You Need")
`;
    const schema = {
        type: Type.OBJECT,
        properties: {
            titles: {
                type: Type.ARRAY,
                items: {
                    type: Type.STRING,
                    description: "A catchy video title, under 50 characters."
                }
            }
        },
        required: ["titles"]
    };

    const ai = createAiClient();
    if (!ai) {
        return [];
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });
        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);
        // Also filter on the client side just in case the model doesn't respect the length constraint
        return (parsed.titles || []).filter((title: string) => title.length > 0 && title.length <= 50);
    } catch (error) {
        console.error("Error generating video titles with Gemini API:", error);
        // Fallback to simpler text generation if JSON fails
        const fallbackResponse = await generateContent(`Generate 10 catchy video titles (under 50 characters) for a product review of "${productName}". Output as a numbered list.`);
        return fallbackResponse.split('\n').filter(line => line.trim().match(/^\d+\./)).map(line => line.replace(/^\d+\.\s*/, '').trim());
    }
};

export const generateSeoDescription = async (productName: string): Promise<string> => {
    const prompt = `
Write a YouTube SEO-friendly video description for a product review: "${productName}".

Include:
- Brief intro about the tool
- 3 key reasons to use it
- Affiliate link section
- SEO keywords related to AI, automation, review, productivity

Keep it concise, informative, and optimized for search.
Use [YOUR AFFILIATE LINK HERE] as a placeholder.
`;
    return generateContent(prompt);
};

export const generateCaptionsAndHashtags = async (productName: string): Promise<{ caption: string, hashtags: string[] }> => {
    const prompt = `
Create a short caption (under 200 characters) and 10 relevant hashtags
for a YouTube Shorts or TikTok video about the product: "${productName}".

Style: modern, catchy, and natural.
Language: English.
Example tone: "This AI tool just made content creation effortless! #AITools #Productivity"

IMPORTANT: Format the output strictly as follows, with each on a new line:
Caption: [Your generated caption here]
Hashtags: [Your generated hashtags here, separated by spaces]
`;
    const response = await generateContent(prompt);
    const lines = response.split('\n');
    const captionLine = lines.find(line => line.toLowerCase().startsWith('caption:')) || '';
    const hashtagsLine = lines.find(line => line.toLowerCase().startsWith('hashtags:')) || '';

    const caption = captionLine.replace(/caption:/i, '').trim();
    const hashtags = hashtagsLine.replace(/hashtags:/i, '').trim().split(/\s+/).filter(h => h.startsWith('#'));

    return { caption, hashtags };
};

export const generateSpeech = async (script: string): Promise<string> => {
    const ai = createAiClient();
    if (!ai) {
       return "";
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Generate audio for this script: ${script}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data returned from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating speech with Gemini API:", error);
        return "";
    }
};

export const generateMusic = async (prompt: string): Promise<string> => {
    const ai = createAiClient();
    if (!ai) {
       return "";
    }
    // In a real scenario, you'd call a music generation model like Suno.
    // For now, we reuse the TTS model as a placeholder for API interaction.
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Generate music for this prompt, treating it as a script: ${prompt}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data returned from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating music with Gemini API:", error);
        return "";
    }
};

export const generateSfx = async (prompt: string): Promise<string> => {
    const ai = createAiClient();
    if (!ai) {
       return "";
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Generate a sound effect for this description: ${prompt}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Puck' }, // Different voice for variety
                    },
                },
            },
        });
        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data returned from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating SFX with Gemini API:", error);
        return "";
    }
};


export const generateImageForScene = async (prompt: string): Promise<string> => {
    const ai = createAiClient();
    if (!ai) {
        return "";
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data;
            }
        }
        throw new Error("No image data returned from API.");
    } catch (error) {
        console.error("Error generating image with Gemini API:", error);
        return "";
    }
};

const ensureVeoApiKey = async () => {
    if ((window as any).aistudio && !(await (window as any).aistudio.hasSelectedApiKey())) {
        await (window as any).aistudio.openSelectKey();
    }
};

const veoModelMapping: Record<string, string> = {
    'VEO 3.1 (Fast)': 'veo-3.1-fast-generate-preview',
    'VEO 3.1 (HQ)': 'veo-3.1-generate-preview',
};

export const startVideoGeneration = async (product: Product, model: AIModel = 'VEO 3.1 (Fast)'): Promise<any> => {
    await ensureVeoApiKey();
    const ai = createAiClient();
    if (!ai) {
        return null;
    }
    
    const prompt = `Create a dynamic, 30-second vertical video ad (9:16 aspect ratio) for the product "${product.name}". 
    - Description: ${product.description}. 
    - Key Features to highlight: ${product.features}.
    - Style: Modern, fast-paced, engaging, suitable for platforms like TikTok and YouTube Shorts.`;

    const modelId = veoModelMapping[model] || 'veo-3.1-fast-generate-preview';

    try {
        const operation = await ai.models.generateVideos({
            model: modelId,
            prompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '9:16'
            }
        });
        return operation;
    } catch (error: any) {
        console.error("Error starting video generation with Veo API:", error);
        if (error.message?.includes("Requested entity was not found.")) {
            if ((window as any).aistudio) {
                await (window as any).aistudio.openSelectKey();
            }
        }
        return null;
    }
};

export const startSceneVideoGeneration = async (prompt: string, model: AIModel = 'VEO 3.1 (Fast)'): Promise<any> => {
    await ensureVeoApiKey();
    const ai = createAiClient();
    if (!ai) {
        return null;
    }
    
    const fullPrompt = `Create a short, 5-second video clip for a vertical video (9:16 aspect ratio) that visually represents the following text: "${prompt}". Style: cinematic, engaging, high-quality.`;

    const modelId = veoModelMapping[model] || 'veo-3.1-fast-generate-preview';

    try {
        const operation = await ai.models.generateVideos({
            model: modelId,
            prompt: fullPrompt,
            config: {
                numberOfVideos: 1,
                resolution: '720p',
                aspectRatio: '9:16'
            }
        });
        return operation;
    } catch (error: any) {
        console.error("Error starting scene video generation with Veo API:", error);
        if (error.message?.includes("Requested entity was not found.")) {
            if ((window as any).aistudio) {
                await (window as any).aistudio.openSelectKey();
            }
        }
        return null;
    }
};

export const checkVideoGenerationStatus = async (operation: any): Promise<any> => {
    if (!operation || !operation.name) return { ...operation, done: true, error: { message: "Invalid operation provided." }};

    await ensureVeoApiKey();
    const ai = createAiClient();

    if (!ai) {
        return { ...operation, done: true, error: { message: "API key not configured." }};
    }

    try {
        return await ai.operations.getVideosOperation({ operation });
    } catch (error: any) {
        console.error("Error checking video generation status:", error);
        if (error.message?.includes("Requested entity was not found.")) {
             if ((window as any).aistudio) {
                await (window as any).aistudio.openSelectKey();
            }
        }
        return { ...operation, done: true, error };
    }
};

export const getVideoResult = async (uri: string): Promise<Blob | null> => {
    const apiKey = getApiKey(); // Use the dynamic getApiKey function
    if (!apiKey) {
        console.warn("API key not found, cannot download video.");
        return null;
    }
    try {
        const response = await fetch(`${uri}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch video: ${response.statusText}`);
        }
        return await response.blob();
    } catch (error) {
        console.error("Error downloading video result:", error);
        return null;
    }
};