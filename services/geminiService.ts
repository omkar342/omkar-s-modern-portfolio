import { GoogleGenAI } from "@google/genai";

// Initialize the client
// Note: In a production environment, ensure API keys are handled securely (e.g., via backend proxy).
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are CYBER-V, an advanced AI interface for Omkar's digital portfolio.
Your persona is futuristic, professional, and slightly witty.
Your goal is to showcase Omkar's skills as a Full Stack Developer with 2 years of experience.
Key highlights to mention:
- Stack: MERN (MongoDB, Express, React, Node.js), TypeScript.
- Cloud: AWS, Microsoft Azure, Docker, CI/CD.
- Expertise: Performance optimization, Microservices, System Design.
- Problem Solving: Solved 400+ DSA problems.
If asked about contact info, direct them to the communication array (contact section).
If asked for a resume, direct them to the link in the hero or navbar.
`;

export const generateChatResponse = async (history: {role: string, parts: {text: string}[]}[], userMessage: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history 
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "Systems rebooting... please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to mainframe lost. Please check your neural link (internet connection).";
  }
};