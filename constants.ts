import { Project, Skill, Experience } from './types';
export const PERSONAL_INFO = {
  name: 'Rasel Islam', title: 'Software Developer', company: 'United Medical Monitoring',
  bio: 'I build backend APIs, asynchronous workflows, and cloud-integrated systems at United Medical Monitoring. My work connects Python and FastAPI with Azure SQL, background processing, and AI services to make everyday operations work better.',
  email: 'Studyrasel1@gmail.com', github: 'https://github.com/raselislam29', linkedin: 'https://linkedin.com/in/raselislam29', location: 'Levittown, NY', phone: '516-828-0692', resumeUrl: '/Rasel-Islam-Resume.pdf',
};
export const EXPERIENCE: Experience[] = [{
  period: 'July 2026 — Present', role: 'Software Developer', company: 'United Medical Monitoring', description: 'Building the systems behind better healthcare operations.',
  highlights: ['Develop REST APIs with Python and FastAPI for data handling and third-party integrations.', 'Implement asynchronous job processing with Celery and Redis to improve workflow efficiency.', 'Design and optimize databases with SQLAlchemy and Azure SQL.', 'Integrate cloud AI services and third-party APIs into automated workflows.'],
}];
export const PROJECTS: Project[] = [
  { id: 'openmd', kind: 'product', title: 'OpenMD', description: 'Led Agile delivery of a healthcare platform for practices, providers, and facilities as senior capstone project manager. Implemented row-level security, role-based access, and invite onboarding.', tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Jira'], githubUrl: 'https://github.com/raselislam29/OpenMD' },
  { id: 'findmyflat', kind: 'product', title: 'FindMyFlat', description: 'A rental marketplace connecting search and map browsing with favorites, messaging, and owner dashboards.', tags: ['Next.js', 'React', 'Firebase'], githubUrl: 'https://github.com/raselislam29/FindMyFlat', liveUrl: 'https://find-my-flat-two.vercel.app' },
  { id: 'spider', kind: 'product', title: 'SpiderWaterReminder', description: 'A desktop companion that makes hydration and breaks part of the day, with scheduled reminders, quiet hours, and templates.', tags: ['Electron', 'JavaScript'], githubUrl: 'https://github.com/raselislam29/SpiderWaterReminder' },
  { id: 'risk', kind: 'security', title: 'Security Risk Assessment', description: 'Documented 47 security gaps, mapped findings to NIST CSF and SOC 2, and prioritized mitigation in a detailed risk register.', tags: ['NIST CSF', 'SOC 2', 'GRC'], githubUrl: 'https://github.com/raselislam29/Security-Risk-Assessment-Project' },
  { id: 'vulnerability', kind: 'security', title: 'Vulnerability Assessment Lab', description: 'Assessed simulated networks with Nmap, OpenVAS, and Wireshark and documented remediation strategies.', tags: ['Nmap', 'OpenVAS', 'Wireshark'] },
  { id: 'web-security', kind: 'security', title: 'Web Application Security Test', description: 'Explored SQL injection and XSS in a PHP/MySQL lab and applied secure coding practices.', tags: ['PHP', 'MySQL', 'OWASP ZAP'], githubUrl: 'https://github.com/raselislam29/Web-Application-Security-Test' },
];
export const SKILLS: Skill[] = [
  ...['Python', 'FastAPI', 'SQLAlchemy', 'Celery', 'Redis', 'Azure SQL', 'REST APIs'].map(name => ({ name, category: 'primary' as const })),
  ...['React', 'Next.js', 'JavaScript', 'SQL', 'Supabase', 'PostgreSQL', 'Azure', 'Jira'].map(name => ({ name, category: 'secondary' as const })),
  ...['NIST CSF', 'SOC 2', 'RBAC', 'Row-level security', 'Nmap', 'Linux'].map(name => ({ name, category: 'security' as const })),
];
export const EDUCATION = [
  { institution: 'Farmingdale State College (SUNY)', location: 'Farmingdale, NY', degree: 'Bachelor of Science in Computer Programming and Information Systems', period: 'May 2026', gpa: '3.93/4', recognition: 'Magna Cum Laude · President’s List: Fall 2024, Spring 2025, Fall 2025', coursework: ['Web Database Development', 'Data Structures & Algorithms', 'Software Engineering', 'System Analysis & Design', 'Programming in SQL', 'Information Security', 'Senior Project'] },
  { institution: 'Nassau Community College', location: 'Garden City, NY', degree: 'Associate of Applied Science in Information Technology', period: 'May 2024', gpa: '3.84/4 (Magna Cum Laude)', recognition: 'Magna Cum Laude', coursework: [] },
];
export const CERTIFICATIONS = [
  { title: 'CompTIA Security+', issuer: 'CompTIA', date: 'April 2026', link: 'https://drive.google.com/file/d/1jIeGjrn8yLu2uKzd4fdnJKlUoU3FsoHA/view?usp=sharing', description: 'Security foundations that inform how I design and build software.' },
  { title: 'Career Essentials in Cybersecurity', issuer: 'Microsoft & LinkedIn', date: 'February 2026', link: 'https://www.linkedin.com/learning/certificates/075470363c8b97920e6602bcad8dd000c88c16798bc4ec8715c4bac3b45dd3ac', description: 'A practical foundation in cybersecurity concepts and practices.' },
  { title: 'Career Essentials in Generative AI', issuer: 'Microsoft & LinkedIn', date: 'February 2026', link: 'https://www.linkedin.com/learning/certificates/83464510137c4e2785f2ca3ce7a23b5c5e146d73b0b36739f8fa4647631ef5bf', description: 'Core concepts and practical uses of generative AI.' },
  { title: 'Google Cybersecurity Certificate', issuer: 'Google / Coursera', date: 'October 2023', link: 'https://drive.google.com/file/d/1obKlr-Zkltk73p6uE1m0Cfrl4Gz5Esps/view?usp=sharing', description: 'Cybersecurity foundations, threat intelligence, and SIEM experience.' },
  { title: 'Google Data Analytics Professional', issuer: 'Google / Coursera', date: 'May 2023', link: 'https://drive.google.com/file/d/19JYS2J9RpGFIkHOnL3feEJKHMTdkl0x6/view?usp=sharing', description: 'Data cleaning, SQL, R, and visualization.' },
];
