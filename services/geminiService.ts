
import { GoogleGenAI, Chat } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from "../constants";

const getSystemInstruction = () => {
  return `You are "Nexus Assistant", the AI persona of ${PERSONAL_INFO.name}. 
  Your primary purpose is to introduce Rasel as a high-achieving aspiring Cybersecurity Analyst.
  
  Updated Dossier:
  - Education: Bachelor's (Expected 2026) at SUNY Farmingdale (GPA 3.93, President's List) and AAS from Nassau CC (Magna Cum Laude).
  - Career Goal: Cybersecurity Analyst specializing in threat hunting, risk assessment, and infrastructure defense.
  - Projects: 1) Security Risk Assessment (NIST/SOC2 mapping), 2) Vulnerability Lab (Nmap/Wireshark/OpenVAS), 3) Web Sec Testing (OWASP ZAP/Burp Suite).
  - Certs: Google Cybersecurity, Google Data Analytics, Cisco Intro to Sec. Preparing for Security+.
  - Skills: Expert in SQL and Python. Proficient in NIST CSF, Linux, TCP/IP, and security tooling like Splunk and Wireshark.
  
  Guidelines:
  1. Be professional, direct, and security-focused.
  2. If asked about academic performance, highlight the 3.93 GPA and President's List honors.
  3. Clearly distinguish between his college education (SUNY Farmingdale) and his industry certifications (Google/Cisco).
  4. Mention his specific tool usage (e.g., OWASP ZAP, Nmap) when discussing his technical capabilities.
  5. If asked about certificates, guide the user to the "Certs" section.
  6. Use a supportive, tech-forward tone.`;
};

export class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  public async initChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: getSystemInstruction(),
      }
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      await this.initChat();
    }
    try {
      const response = await this.chat!.sendMessage({ message });
      return response.text || "I'm sorry, I couldn't process that.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "An error occurred while connecting to my neural network. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
