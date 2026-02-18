
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: 'frontend' | 'backend' | 'tools' | 'database';
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}