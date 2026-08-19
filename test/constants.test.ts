import { describe, expect, it } from 'vitest';
import {
  PERSONAL_INFO,
  PROJECTS,
  SKILLS,
  EDUCATION,
  CERTIFICATIONS,
} from '../constants';

describe('content contract', () => {
  it('sells Rasel as a full-stack developer', () => {
    expect(PERSONAL_INFO.title).toBe('Full-stack Developer');
    expect(PERSONAL_INFO.bio).not.toMatch(/Cybersecurity Analyst/i);
    expect(PERSONAL_INFO.phone).toBe('516-828-0692');
  });

  it('features the three product apps', () => {
    const featured = PROJECTS.filter((p) => p.kind === 'product');
    expect(featured.map((p) => p.title)).toEqual([
      'OpenMD',
      'FindMyFlat',
      'SpiderWaterReminder',
    ]);
    expect(featured[0].githubUrl).toBe('https://github.com/raselislam29/OpenMD');
    expect(featured[1].liveUrl).toBe('https://find-my-flat-two.vercel.app');
    expect(featured[2].githubUrl).toBe(
      'https://github.com/raselislam29/SpiderWaterReminder'
    );
  });

  it('keeps security work as supporting only', () => {
    const supporting = PROJECTS.filter((p) => p.kind === 'security');
    expect(supporting).toHaveLength(3);
    expect(supporting.map((p) => p.title)).toEqual([
      'Security Risk Assessment',
      'Vulnerability Assessment Lab',
      'Web Application Security Test',
    ]);
    expect(supporting[1].githubUrl).toBeUndefined();
  });

  it('leads skills with the product stack', () => {
    expect(SKILLS.filter((s) => s.category === 'primary').map((s) => s.name)).toEqual([
      'React',
      'JavaScript',
      'Python',
      'SQL',
      'Next.js',
      'Supabase',
      'Linux',
    ]);
    expect(SKILLS.some((s) => s.category === 'security' && s.name === 'Nmap')).toBe(true);
  });

  it('preserves education facts', () => {
    expect(EDUCATION[0].gpa).toBe('3.93/4');
    expect(EDUCATION[0].degree).toMatch(/Computer Programming and Information Systems/);
    expect(EDUCATION[1].gpa).toBe('3.84/4 (Magna Cum Laude)');
  });

  it('keeps all four certifications', () => {
    expect(CERTIFICATIONS.map((c) => c.title)).toEqual([
      'Google Cybersecurity Certificate',
      'Google Data Analytics Professional',
      'Introduction to Cybersecurity',
      'CompTIA Security+ / ISC2 Certified in Cybersecurity',
    ]);
    expect(CERTIFICATIONS[0].link).toContain('drive.google.com');
    expect(CERTIFICATIONS.every((c) => !('image' in c) || !c.image)).toBe(true);
  });
});
