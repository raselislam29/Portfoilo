
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  githubUrl?: string;
  kind: 'product' | 'app' | 'security' | 'data';
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level?: number;
  icon?: string;
  category: 'primary' | 'secondary' | 'security';
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  description: string;
  highlights?: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
