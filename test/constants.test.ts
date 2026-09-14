import { describe, expect, it } from 'vitest';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';
describe('résumé and portfolio content', () => {
  it('introduces the current software developer role', () => {
    expect(PERSONAL_INFO.title).toBe('Software Developer');
    expect(EXPERIENCE[0].company).toBe('United Medical Monitoring');
    expect(EXPERIENCE[0].period).toBe('July 2026 — Present');
    expect(EXPERIENCE[0].highlights).toHaveLength(4);
    expect(PERSONAL_INFO.resumeUrl).toBe('/Rasel-Islam-Resume.pdf');
  });
  it('retains the three selected products and their destinations', () => {
    const featured = PROJECTS.filter(p => p.kind === 'product');
    expect(featured.map(p => p.title)).toEqual(['OpenMD', 'FindMyFlat', 'SpiderWaterReminder']);
    expect(featured[0].githubUrl).toBe('https://github.com/raselislam29/OpenMD');
    expect(featured[1].liveUrl).toBe('https://find-my-flat-two.vercel.app');
    expect(featured[2].githubUrl).toBe('https://github.com/raselislam29/SpiderWaterReminder');
  });
  it('keeps security labs as supporting work without invented links', () => {
    const supporting = PROJECTS.filter(p => p.kind === 'security');
    expect(supporting).toHaveLength(3);
    expect(supporting.find(p => p.id === 'vulnerability')?.githubUrl).toBeUndefined();
  });
  it('leads with the backend technologies from the current job', () => {
    expect(SKILLS.filter(s => s.category === 'primary').map(s => s.name)).toEqual(['Python', 'FastAPI', 'SQLAlchemy', 'Celery', 'Redis', 'Azure SQL', 'REST APIs']);
  });
  it('reflects the completed degree and earned Security+ credential', () => {
    expect(EDUCATION[0].period).toBe('May 2026');
    expect(EDUCATION[0].gpa).toBe('3.93/4');
    expect(EDUCATION[1].gpa).toBe('3.84/4 (Magna Cum Laude)');
    expect(CERTIFICATIONS[0]).toMatchObject({ title: 'CompTIA Security+', date: 'April 2026' });
    expect(CERTIFICATIONS.some(c => c.issuer === 'Microsoft & LinkedIn')).toBe(true);
    expect(CERTIFICATIONS.every(c => c.date !== 'In Progress')).toBe(true);
  });
});
