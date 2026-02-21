
import { Project, Skill, Experience } from './types';

export const PERSONAL_INFO = {
  name: "Rasel Islam",
  title: "Aspiring Cybersecurity Analyst",
  bio: "Currently pursuing a Bachelor's in Computer Programming and Information Systems at Farmingdale State College (SUNY). My objective is to leverage my 3.93 GPA, analytical mindset, and deep technical training in NIST frameworks, vulnerability assessment, and network security to defend enterprise infrastructures as a Cybersecurity Analyst.",
  email: "Studyrasel1@gmail.com",
  github: "https://github.com/raselislam29",
  linkedin: "https://linkedin.com/in/raselislam29",
  location: "Levittown, NY",
  phone: "516-828-0692",
  resumeUrl: "https://drive.google.com/file/d/1hZlho-Q33jYZCMlXOjldVOc5MHJONqH8/view?usp=sharing"
};

export const EDUCATION = [
  {
    institution: "Farmingdale State College (SUNY)",
    location: "Farmingdale, NY",
    degree: "Bachelor of Science in Computer Programming and Information Systems",
    period: "Expected May 2026",
    gpa: "3.93/4",
    recognition: "President’s List: Fall 2024, Spring 2025, Fall 2025",
    coursework: ["Web Database Development", "Data Structures & Algorithms", "Software Engineering", "System Analysis & Design", "Programming in SQL", "Information Security"]
  },
  {
    institution: "Nassau Community College",
    location: "Garden City, NY",
    degree: "Associate of Applied Science in Information Technology",
    period: "May 2024",
    gpa: "3.84/4 (Magna Cum Laude)",
    recognition: "Dean’s List: Fall 2022 - Spring 2024",
    coursework: []
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Security Risk Assessment Project',
    description: 'Conducted organization-wide cybersecurity risk assessment across infrastructure, applications, and data. Created a risk register with likelihood, impact, and mitigation strategies while mapping security gaps to NIST CSF and SOC 2 requirements.',
    tags: ['NIST CSF', 'SOC 2', 'Risk Management', 'Security Audit'],
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/raselislam29'
  },
  {
    id: '2',
    title: 'Vulnerability Assessment Lab',
    description: 'Conducted vulnerability scanning on simulated enterprise networks using Nmap, OpenVAS, and Wireshark. Documented misconfigurations, unpatched software, and weak authentication methods, providing remediation strategies aligned with NIST.',
    tags: ['Nmap', 'OpenVAS', 'Wireshark', 'Vulnerability Scanning'],
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/raselislam29'
  },
  {
    id: '3',
    title: 'Web Application Security Test',
    description: 'Built a PHP/MySQL application with intentional vulnerabilities (SQL injection, XSS). Used Burp Suite and OWASP ZAP to exploit flaws and implemented secure coding practices, documenting results in a security report.',
    tags: ['OWASP ZAP', 'Burp Suite', 'PHP', 'MySQL', 'Penetration Testing'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    githubUrl: 'https://github.com/raselislam29'
  }
];

export const CERTIFICATIONS = [
  {
    title: "Google Cybersecurity Certificate",
    issuer: "Google / Coursera",
    date: "October 2023",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80",
    link: "https://drive.google.com/file/d/1obKlr-Zkltk73p6uE1m0Cfrl4Gz5Esps/view?usp=sharing",
    description: "Foundations of cybersecurity, threat intelligence, and hands-on SIEM experience."
  },
  {
    title: "Google Data Analytics Professional",
    issuer: "Google / Coursera",
    date: "May 2023",
    image: "https://images.unsplash.com/photo-1551288049-bbda486387a3?auto=format&fit=crop&w=400&q=80",
    link: "https://drive.google.com/file/d/19JYS2J9RpGFIkHOnL3feEJKHMTdkl0x6/view?usp=sharing",
    description: "Expertise in data cleaning, SQL, R, and visualization for informed decision making."
  },
  {
    title: "Career Essentials in Generative AI by Microsoft and LinkedIn",
    issuer: "Linkedin & Microsoft",
    date: "February 2026",
    image: "https://images.unsplash.com/photo-1510511459019-5dee997dd3db?auto=format&fit=crop&w=400&q=80",
    link: "http://linkedin.com/learning/certificates/83464510137c4e2785f2ca3ce7a23b5c5e146d73b0b36739f8fa4647631ef5bf?u=42267225",
    description: "core concepts and functionalities of generative AI."
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "June 2023",
    image: "https://images.unsplash.com/photo-1510511459019-5dee997dd3db?auto=format&fit=crop&w=400&q=80",
    link: "#",
    description: "Core concepts of information security and defense-in-depth strategies."
  },
  
  {
    title: "CompTIA Security+ / ISC2 Certified in Cybersecurity",
    issuer: "CompTIA & ISC2",
    date: "In Progress",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=400&q=80",
    link: "#",
    description: "Active preparation for industry-leading security practitioner certifications."
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python', level: 90, icon: 'fa-brands fa-python', category: 'tools' },
  { name: 'SQL', level: 95, icon: 'fa-solid fa-database', category: 'database' },
  { name: 'Linux', level: 85, icon: 'fa-brands fa-linux', category: 'tools' },
  { name: 'NIST Framework', level: 92, icon: 'fa-solid fa-shield-halved', category: 'backend' },
  { name: 'Nmap / Wireshark', level: 88, icon: 'fa-solid fa-network-wired', category: 'tools' },
  { name: 'Splunk / SIEM', level: 80, icon: 'fa-solid fa-eye', category: 'backend' },
  { name: 'OWASP ZAP', level: 82, icon: 'fa-solid fa-bug', category: 'tools' },
  { name: 'TCP/IP & OSI', level: 90, icon: 'fa-solid fa-server', category: 'backend' }
];

export const EXPERIENCE: Experience[] = [
  {
    period: "2024 - Present",
    role: "President's List Scholar",
    company: "Farmingdale State College",
    description: "Maintaining a 3.93 GPA while mastering advanced topics in Information Security and Systems Analysis."
  }
];
