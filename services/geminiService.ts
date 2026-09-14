import type { Chat } from '@google/genai';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';
export class GeminiService {
  private chat: Chat | null = null;
  public readonly available = Boolean(process.env.API_KEY);
  public async sendMessage(message: string): Promise<string> {
    if (!this.available) throw new Error('Chat is not configured.');
    if (!this.chat) {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      this.chat = ai.chats.create({ model: 'gemini-3-flash-preview', config: {
        systemInstruction: `You are Rasel's portfolio assistant. Answer briefly using only these facts: ${JSON.stringify({ personal: PERSONAL_INFO, experience: EXPERIENCE, projects: PROJECTS, skills: SKILLS, education: EDUCATION, certifications: CERTIFICATIONS })}. His current role is Software Developer at United Medical Monitoring. Do not invent metrics, credentials, private employer information, or project outcomes. If information is missing, say so. Security is a supporting foundation.`,
      } });
    }
    const response = await this.chat.sendMessage({ message });
    return response.text || 'I could not generate a response. Please try again.';
  }
}
export const geminiService = new GeminiService();
