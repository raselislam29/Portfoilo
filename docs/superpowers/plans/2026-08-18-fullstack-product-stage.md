# Product Stage Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the existing Vite/React portfolio so Rasel Islam reads as a full-stack developer who ships products, with Product Stage visuals, bold motion, and education/certs preserved.

**Architecture:** Keep the single-page Vite app. `constants.ts` remains the only content source. New units (`Spotlight`, `Work`, `AlsoBuilt`, `MagneticButton`) take one job each. App order becomes Hero → Work → About (skills inside) → Education → Certs → Also built → Contact. Terminal and the security-radar Skills section go away.

**Tech Stack:** Vite 6, React 19, TypeScript, Tailwind CDN, Font Awesome, Vitest + Testing Library, existing `@google/genai` chatbot. No Next.js, GSAP, or Three.js.

## Global Constraints

- Stay on Vite + React + TypeScript + Tailwind CDN in `index.html`. Do not migrate to Next.js.
- Title tag: `Rasel Islam · Full-stack Developer`.
- Colors only: Ink `#0B1020`, Stage `#141A2E`, Mist `#E8EEF2`, Mute `#8BA0C4`, Cobalt `#5B7FFF`, Amber `#F5B942`. No emerald, no purple-pink gradient text.
- Type: Fraunces (headlines), Outfit (UI/body), JetBrains Mono (stack chips only). Remove Inter and Fira Code.
- Role copy: `Full-stack Developer`. Never “Aspiring Cybersecurity Analyst” or “Hire Analyst”.
- Featured products: OpenMD, FindMyFlat, SpiderWaterReminder. Security labs only in Also built.
- Keep both education entries and all four certifications with existing dates, GPAs, and Drive URLs.
- Phone stays in `PERSONAL_INFO` and is never rendered.
- OpenMD copy says “senior project”, not “founded”.
- Motion: CSS + small hooks only. `prefers-reduced-motion` and coarse pointers disable spotlight and magnetic pull.
- Do not restore `AcademicTracker.tsx`. Leave `Experience.tsx` unused.
- Do not add a contact backend. Do not add GSAP or Three.js.
- Windows shell: use `git commit -m "message"` (no bash heredoc).

---

## File map

| File | Responsibility |
|---|---|
| `types.ts` | `Project.kind`, skill categories, chat types |
| `constants.ts` | All copy, projects, skills, education, certs |
| `index.html` | Tokens, fonts, title, skip-link-friendly body styles |
| `vite.config.ts` | Vitest + API key define |
| `test/setup.ts` | Testing Library jest-dom |
| `test/constants.test.ts` | Content contract |
| `hooks/usePrefersReducedMotion.ts` | Reduced-motion + coarse pointer |
| `components/Spotlight.tsx` | Cursor spotlight |
| `components/MagneticButton.tsx` | Magnetic CTA |
| `components/Navbar.tsx` | Nav for new IA |
| `components/Hero.tsx` | Split stage hero |
| `components/Work.tsx` | Featured product cards |
| `components/About.tsx` | Bio + three skill rows |
| `components/Education.tsx` | Restyled timeline |
| `components/Certifications.tsx` | Cards without Unsplash |
| `components/AlsoBuilt.tsx` | Compact security row |
| `components/Contact.tsx` | mailto form |
| `components/Footer.tsx` | Quiet close |
| `components/ScrollToTop.tsx` | Cobalt restyle |
| `components/ChatBot.tsx` | Product Stage chat |
| `services/geminiService.ts` | Full-stack system prompt + offline-safe init |
| `App.tsx` | Section order, skip link, Spotlight |
| Delete | `components/Terminal.tsx`, `components/Skills.tsx`, `components/Projects.tsx` |

---

### Task 1: Test harness and failing content contract

**Files:**
- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `test/setup.ts`
- Create: `test/constants.test.ts`
- Test: `test/constants.test.ts`

**Interfaces:**
- Consumes: nothing
- Produces: `npm test` runs Vitest. Later tasks keep this file passing as content lands.

- [ ] **Step 1: Install test dependencies**

Run:

```bash
npm install -D @vitejs/plugin-react vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Expected: packages added to `devDependencies`.

- [ ] **Step 2: Add the test script**

In `package.json` `scripts`, set:

```json
"dev": "vite",
"build": "tsc && vite build",
"preview": "vite preview",
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Enable Vitest in Vite**

Replace `vite.config.ts` with:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.API_KEY': JSON.stringify(
      process.env.GEMINI_API_KEY || process.env.API_KEY || ''
    ),
  },
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    globals: true,
  },
});
```

- [ ] **Step 4: Write test setup**

Create `test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 5: Write the failing content contract**

Create `test/constants.test.ts`:

```ts
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
```

- [ ] **Step 6: Run tests to verify they fail**

Run: `npm test`

Expected: FAIL — `PERSONAL_INFO.title` is still `Aspiring Cybersecurity Analyst`, `Project` has no `kind`, skills are still NIST/Nmap-led.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts test/setup.ts test/constants.test.ts
git commit -m "test: add content contract for full-stack portfolio"
```

---

### Task 2: Types and constants

**Files:**
- Modify: `types.ts`
- Modify: `constants.ts`
- Test: `test/constants.test.ts`

**Interfaces:**
- Consumes: failing contract from Task 1
- Produces: `Project { kind: 'product' | 'security'; githubUrl?: string; liveUrl?: string }`, `Skill.category: 'primary' | 'secondary' | 'security'`, `PERSONAL_INFO.title: 'Full-stack Developer'`

- [ ] **Step 1: Replace `types.ts`**

```ts
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  kind: 'product' | 'security';
}

export interface Skill {
  name: string;
  icon: string;
  category: 'primary' | 'secondary' | 'security';
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

export interface EducationEntry {
  institution: string;
  location: string;
  degree: string;
  period: string;
  gpa: string;
  recognition: string;
  coursework: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
  description: string;
}
```

- [ ] **Step 2: Replace `constants.ts`**

```ts
import { Project, Skill, Experience, EducationEntry, Certification } from './types';

export const PERSONAL_INFO = {
  name: 'Rasel Islam',
  title: 'Full-stack Developer',
  bio: 'Rasel is a full-stack developer in Levittown, NY, finishing a BS in Computer Programming and Information Systems at Farmingdale State College (SUNY) with a 3.93 GPA and President’s List honors. He ships web products end to end — React/Next.js on the client, Python and SQL on the data side — and treats security training as how he builds, not who he is pitching as.',
  email: 'Studyrasel1@gmail.com',
  github: 'https://github.com/raselislam29',
  linkedin: 'https://linkedin.com/in/raselislam29',
  location: 'Levittown, NY',
  phone: '516-828-0692',
  resumeUrl: 'https://drive.google.com/file/d/1yYTUKP1fr8FmNCOHGBdHEwPJKq562Qmf/view?usp=sharing',
};

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'Farmingdale State College (SUNY)',
    location: 'Farmingdale, NY',
    degree: 'Bachelor of Science in Computer Programming and Information Systems',
    period: 'Expected May 2026',
    gpa: '3.93/4',
    recognition: 'President’s List: Fall 2024, Spring 2025, Fall 2025',
    coursework: [
      'Web Database Development',
      'Data Structures & Algorithms',
      'Software Engineering',
      'System Analysis & Design',
      'Programming in SQL',
      'Information Security',
    ],
  },
  {
    institution: 'Nassau Community College',
    location: 'Garden City, NY',
    degree: 'Associate of Applied Science in Information Technology',
    period: 'May 2024',
    gpa: '3.84/4 (Magna Cum Laude)',
    recognition: 'Dean’s List: Fall 2022 - Spring 2024',
    coursework: [],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'openmd',
    title: 'OpenMD',
    description:
      'Senior project: multi-tenant medical operations platform with a public ratings directory plus authenticated scheduling, credentials, billing, and messaging.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Postgres', 'RLS'],
    githubUrl: 'https://github.com/raselislam29/OpenMD',
    kind: 'product',
  },
  {
    id: 'findmyflat',
    title: 'FindMyFlat',
    description:
      'Rental marketplace: search and map browse, favorites, chat, and owner dashboards on Firebase.',
    tags: ['Next.js', 'React', 'Firebase', 'Tailwind'],
    githubUrl: 'https://github.com/raselislam29/FindMyFlat',
    liveUrl: 'https://find-my-flat-two.vercel.app',
    kind: 'product',
  },
  {
    id: 'spiderwater',
    title: 'SpiderWaterReminder',
    description:
      'Electron tray app for Windows and macOS. A character drops on every screen with a hydration or break reminder; schedules, quiet hours, and templates.',
    tags: ['Electron', 'JavaScript'],
    githubUrl: 'https://github.com/raselislam29/SpiderWaterReminder',
    kind: 'product',
  },
  {
    id: 'risk',
    title: 'Security Risk Assessment',
    description:
      'Organization-wide risk register mapped to NIST CSF and SOC 2, plus a Python tool that scores assets and threats.',
    tags: ['NIST CSF', 'SOC 2', 'Python'],
    githubUrl: 'https://github.com/raselislam29/Security-Risk-Assessment-Project',
    kind: 'security',
  },
  {
    id: 'vuln',
    title: 'Vulnerability Assessment Lab',
    description:
      'Vulnerability scanning on a simulated enterprise network with Nmap, OpenVAS, and Wireshark, then NIST-aligned remediation notes.',
    tags: ['Nmap', 'OpenVAS', 'Wireshark'],
    kind: 'security',
  },
  {
    id: 'websec',
    title: 'Web Application Security Test',
    description:
      'PHP/MySQL app with SQL injection and XSS labs, then a hardened rewrite using parameterized queries and output encoding.',
    tags: ['PHP', 'MySQL', 'OWASP ZAP'],
    githubUrl: 'https://github.com/raselislam29/Web-Application-Security-Test',
    kind: 'security',
  },
];

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.kind === 'product');
export const SUPPORTING_PROJECTS = PROJECTS.filter((p) => p.kind === 'security');

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Google Cybersecurity Certificate',
    issuer: 'Google / Coursera',
    date: 'October 2023',
    link: 'https://drive.google.com/file/d/1obKlr-Zkltk73p6uE1m0Cfrl4Gz5Esps/view?usp=sharing',
    description: 'Foundations of cybersecurity, threat intelligence, and hands-on SIEM experience.',
  },
  {
    title: 'Google Data Analytics Professional',
    issuer: 'Google / Coursera',
    date: 'May 2023',
    link: 'https://drive.google.com/file/d/19JYS2J9RpGFIkHOnL3feEJKHMTdkl0x6/view?usp=sharing',
    description: 'Expertise in data cleaning, SQL, R, and visualization for informed decision making.',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'June 2023',
    link: '#',
    description: 'Core concepts of information security and defense-in-depth strategies.',
  },
  {
    title: 'CompTIA Security+ / ISC2 Certified in Cybersecurity',
    issuer: 'CompTIA & ISC2',
    date: 'In Progress',
    link: '#',
    description: 'Active preparation for industry-leading security practitioner certifications.',
  },
];

export const SKILLS: Skill[] = [
  { name: 'React', icon: 'fa-brands fa-react', category: 'primary' },
  { name: 'JavaScript', icon: 'fa-brands fa-js', category: 'primary' },
  { name: 'Python', icon: 'fa-brands fa-python', category: 'primary' },
  { name: 'SQL', icon: 'fa-solid fa-database', category: 'primary' },
  { name: 'Next.js', icon: 'fa-solid fa-n', category: 'primary' },
  { name: 'Supabase', icon: 'fa-solid fa-bolt', category: 'primary' },
  { name: 'Linux', icon: 'fa-brands fa-linux', category: 'primary' },
  { name: 'Firebase', icon: 'fa-solid fa-fire', category: 'secondary' },
  { name: 'Tailwind', icon: 'fa-solid fa-wind', category: 'secondary' },
  { name: 'Electron', icon: 'fa-solid fa-desktop', category: 'secondary' },
  { name: 'Git', icon: 'fa-brands fa-git-alt', category: 'secondary' },
  { name: 'NIST CSF', icon: 'fa-solid fa-shield-halved', category: 'security' },
  { name: 'Nmap', icon: 'fa-solid fa-network-wired', category: 'security' },
  { name: 'Wireshark', icon: 'fa-solid fa-water', category: 'security' },
  { name: 'OWASP ZAP', icon: 'fa-solid fa-bug', category: 'security' },
  { name: 'Splunk', icon: 'fa-solid fa-chart-simple', category: 'security' },
];

export const EXPERIENCE: Experience[] = [
  {
    period: '2024 - Present',
    role: "President's List Scholar",
    company: 'Farmingdale State College',
    description:
      'Maintaining a 3.93 GPA while shipping coursework in software engineering, web database development, and systems analysis.',
  },
];
```

- [ ] **Step 3: Run tests**

Run: `npm test`

Expected: PASS for `test/constants.test.ts`. If `Skills.tsx` / `Projects.tsx` / `Hero.tsx` fail TypeScript during `vitest` transform, that is fine for this task; `tsc` is not required until later tasks update those files. If Vitest typechecks and fails on old components, skip typecheck by leaving `vitest run` as-is (it does not run `tsc`) — only `constants.ts` and `types.ts` need to compile for this test file.

- [ ] **Step 4: Commit**

```bash
git add types.ts constants.ts
git commit -m "feat: rewrite portfolio content for full-stack identity"
```

---

### Task 3: Design tokens and document shell

**Files:**
- Modify: `index.html`
- Test: visual — `npm run dev`, check fonts and CSS variables in DevTools

**Interfaces:**
- Consumes: token table from spec
- Produces: CSS variables `--ink --stage --mist --mute --cobalt --amber`, classes `.display`, `.chip`, `.stage-card`, `.eyebrow`

- [ ] **Step 1: Replace `index.html` head styles and fonts**

Set title to `Rasel Islam · Full-stack Developer`.

Replace the Google Fonts link with:

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Replace the `<style>` block with:

```css
:root {
  --ink: #0B1020;
  --stage: #141A2E;
  --mist: #E8EEF2;
  --mute: #8BA0C4;
  --cobalt: #5B7FFF;
  --amber: #F5B942;
}
body {
  font-family: 'Outfit', sans-serif;
  background-color: var(--ink);
  color: var(--mist);
  scroll-behavior: smooth;
}
.display { font-family: 'Fraunces', serif; letter-spacing: -0.04em; }
.chip { font-family: 'JetBrains Mono', monospace; }
.eyebrow {
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--amber);
  font-weight: 600;
}
.stage-card {
  background: var(--stage);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
}
.skip-link {
  position: absolute;
  left: 12px;
  top: -40px;
  background: var(--cobalt);
  color: var(--ink);
  padding: 8px 12px;
  z-index: 100;
  border-radius: 8px;
}
.skip-link:focus { top: 12px; }
::selection { background: rgba(91,127,255,0.3); }
:focus-visible { outline: 2px solid var(--cobalt); outline-offset: 3px; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--ink); }
::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
@keyframes stage-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.stage-in { animation: stage-in 500ms ease-out both; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .stage-in { animation: none; }
  * { transition-duration: 0.01ms !important; }
}
```

Remove `.fira`, `.glass-card`, `.gradient-text`, `.animate-blob`, and `.nav-link::after`. Keep Font Awesome and the existing importmap.

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`

Expected: page still loads. Body background is `#0B1020`. Title in the tab is `Rasel Islam · Full-stack Developer`. Old emerald blobs may still show until App is updated.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "style: install Product Stage tokens and type"
```

---

### Task 4: Motion primitives

**Files:**
- Create: `hooks/usePrefersReducedMotion.ts`
- Create: `components/Spotlight.tsx`
- Create: `components/MagneticButton.tsx`
- Create: `test/motion.test.tsx`

**Interfaces:**
- Consumes: `--cobalt`, reduced-motion media query
- Produces: `usePrefersReducedMotion(): boolean`, `<Spotlight />`, `<MagneticButton href label variant />`

- [ ] **Step 1: Write failing motion tests**

Create `test/motion.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Spotlight from '../components/Spotlight';
import MagneticButton from '../components/MagneticButton';

beforeEach(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.includes('prefers-reduced-motion'),
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }));
});

describe('Spotlight', () => {
  it('does not render the spotlight layer when motion is reduced', () => {
    render(<Spotlight />);
    expect(document.querySelector('[data-testid="spotlight"]')).toBeNull();
  });
});

describe('MagneticButton', () => {
  it('renders the label and href', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }));
    render(<MagneticButton href="#work" label="View work" variant="primary" />);
    expect(screen.getByRole('link', { name: 'View work' })).toHaveAttribute('href', '#work');
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/motion.test.tsx`

Expected: FAIL — modules not found.

- [ ] **Step 3: Implement the hook**

Create `hooks/usePrefersReducedMotion.ts`:

```ts
import { useEffect, useState } from 'react';

const queryMotion = '(prefers-reduced-motion: reduce)';
const queryCoarse = '(pointer: coarse)';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const motion = window.matchMedia(queryMotion);
    const coarse = window.matchMedia(queryCoarse);
    const update = () => setReduced(motion.matches || coarse.matches);
    update();
    motion.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
    };
  }, []);

  return reduced;
}
```

Default `true` so SSR/first paint never flashes a spotlight.

- [ ] **Step 4: Implement Spotlight**

Create `components/Spotlight.tsx`:

```tsx
import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Spotlight: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setPos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      data-testid="spotlight"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(91,127,255,0.16), transparent 55%)`,
        transition: 'background 120ms linear',
      }}
    />
  );
};

export default Spotlight;
```

- [ ] **Step 5: Implement MagneticButton**

Create `components/MagneticButton.tsx`:

```tsx
import React, { useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

interface MagneticButtonProps {
  href: string;
  label: string;
  variant: 'primary' | 'secondary';
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ href, label, variant }) => {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, e.clientX - (rect.left + rect.width / 2)));
    const y = Math.max(-8, Math.min(8, e.clientY - (rect.top + rect.height / 2)));
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)';
  };

  const base =
    'inline-flex min-h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold transition-transform duration-200';
  const styles =
    variant === 'primary'
      ? 'bg-[#5B7FFF] text-[#0B1020]'
      : 'border border-white/15 text-[#E8EEF2]';

  return (
    <a
      ref={ref}
      href={href}
      className={`${base} ${styles}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {label}
    </a>
  );
};

export default MagneticButton;
```

- [ ] **Step 6: Run tests**

Run: `npx vitest run test/motion.test.tsx test/constants.test.ts`

Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add hooks/usePrefersReducedMotion.ts components/Spotlight.tsx components/MagneticButton.tsx test/motion.test.tsx
git commit -m "feat: add spotlight and magnetic motion primitives"
```

---

### Task 5: App shell, skip link, Navbar

**Files:**
- Modify: `App.tsx`
- Modify: `components/Navbar.tsx`
- Create: `test/navbar.test.tsx`

**Interfaces:**
- Consumes: `PERSONAL_INFO.resumeUrl`, `Spotlight`, section ids `home work about education certificates also contact`
- Produces: nav labels Work / About / Education / Certs / Contact, Resume CTA, skip link to `#work`

- [ ] **Step 1: Write failing nav test**

Create `test/navbar.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Navbar from '../components/Navbar';

describe('Navbar', () => {
  it('uses developer navigation and a resume CTA', () => {
    render(<Navbar activeSection="home" />);
    expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: 'Resume' })).toBeInTheDocument();
    expect(screen.queryByText(/Hire Analyst/i)).toBeNull();
    expect(screen.queryByText(/^Skills$/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/navbar.test.tsx`

Expected: FAIL — still “Hire Analyst”, no Work link.

- [ ] **Step 3: Rewrite Navbar**

```tsx
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Work', id: 'work' },
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Certs', id: 'certificates' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[94%] max-w-[1120px] -translate-x-1/2 rounded-2xl border px-5 py-3 transition-colors duration-200 ${
        scrolled
          ? 'border-white/10 bg-[#141A2E]/80 backdrop-blur-md'
          : 'border-white/5 bg-[#141A2E]/40'
      }`}
    >
      <div className="flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight text-[#E8EEF2]">
          RASEL<span className="text-[#5B7FFF]">.</span>
        </a>
        <ul className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`text-xs font-semibold uppercase tracking-widest ${
                  activeSection === link.id ? 'text-[#5B7FFF]' : 'text-[#8BA0C4]'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a
            href={PERSONAL_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-xl bg-[#5B7FFF] px-4 text-xs font-bold uppercase tracking-widest text-[#0B1020] md:inline-flex"
          >
            Resume
          </a>
          <button
            className="min-h-11 min-w-11 text-[#E8EEF2] lg:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>
      {isOpen && (
        <ul className="mt-4 flex flex-col items-center gap-4 lg:hidden">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className="text-sm font-semibold uppercase tracking-widest text-[#E8EEF2]"
                onClick={(e) => handleNavClick(e, link.id)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
```

- [ ] **Step 4: Update App shell (keep old sections mounted so the app still compiles)**

Replace `App.tsx` with a shell that uses the new section ids, skip link, Spotlight, and still temporarily imports existing components until later tasks replace them. For this task, change only:

- Import `Spotlight`
- Add skip link `<a className="skip-link" href="#work">Skip to work</a>`
- Remove emerald blob background
- Change scroll spy list to `['home', 'work', 'about', 'education', 'certificates', 'also', 'contact']`
- Wrap in `className="relative min-h-screen bg-[#0B1020] text-[#E8EEF2]"`
- Remove `Terminal` import and usage now so later tasks do not fight it

If `Projects` still uses `#projects`, leave it until Task 6; spy can already look for `#work`.

Minimal App for this task:

```tsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Spotlight from './components/Spotlight';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'work', 'about', 'education', 'certificates', 'also', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0B1020] text-[#E8EEF2] selection:bg-[#5B7FFF]/30">
      <a className="skip-link" href="#work">Skip to work</a>
      <Spotlight />
      <Navbar activeSection={activeSection} />
      <main id="main" className="mx-auto max-w-[1120px] px-6">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
      <ScrollToTop />
    </div>
  );
};

export default App;
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/navbar.test.tsx test/constants.test.ts test/motion.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add App.tsx components/Navbar.tsx test/navbar.test.tsx
git commit -m "feat: restyle nav for Product Stage information architecture"
```

---

### Task 6: Hero split stage

**Files:**
- Modify: `components/Hero.tsx`
- Create: `test/hero.test.tsx`

**Interfaces:**
- Consumes: `PERSONAL_INFO`, `MagneticButton`
- Produces: `#home` split layout, headline `I ship products people can use.`, OpenMD product frame (not a terminal)

- [ ] **Step 1: Write failing hero test**

Create `test/hero.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import Hero from '../components/Hero';

beforeEach(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }));
});

describe('Hero', () => {
  it('stages the full-stack thesis and OpenMD', () => {
    render(<Hero />);
    expect(screen.getByText('Full-stack developer')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /I ship products people can use/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View work' })).toHaveAttribute('href', '#work');
    expect(screen.getByRole('link', { name: 'About Rasel' })).toHaveAttribute('href', '#about');
    expect(screen.getByText('openmd.app')).toBeInTheDocument();
    expect(screen.queryByText(/Cybersecurity Analyst/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/hero.test.tsx`

Expected: FAIL — old typewriter headline.

- [ ] **Step 3: Replace `components/Hero.tsx`**

```tsx
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
  return (
    <section id="home" className="flex min-h-screen flex-col justify-center gap-12 pb-20 pt-32 lg:flex-row lg:items-center">
      <div className="flex-1 stage-in">
        <p className="eyebrow mb-5">Full-stack developer</p>
        <h1 className="display text-5xl font-bold leading-[1.05] text-[#E8EEF2] md:text-7xl">
          I ship products people can use.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#8BA0C4]">
          {PERSONAL_INFO.name} is finishing a BS in Computer Programming and Information Systems at Farmingdale State College with a 3.93 GPA, building web products with React, Python, and SQL.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="#work" label="View work" variant="primary" />
          <MagneticButton href="#about" label="About Rasel" variant="secondary" />
        </div>
      </div>

      <div className="flex-1 stage-in" style={{ animationDelay: '180ms' }}>
        <div className="origin-center rotate-[-3deg] rounded-[18px] border border-[#5B7FFF]/40 bg-[#141A2E] p-3 shadow-2xl transition-transform duration-200 hover:rotate-0">
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70"></span>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70"></span>
            </div>
            <span className="chip text-[10px] text-[#8BA0C4]">openmd.app</span>
          </div>
          <div className="rounded-xl bg-[#0B1020] p-4">
            <div className="mb-4 h-8 rounded-lg border border-white/10 bg-[#141A2E]"></div>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-widest text-[#8BA0C4]">Directory</p>
                <p className="text-lg font-semibold">248 providers</p>
              </div>
              <div className="rounded-lg border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-widest text-[#8BA0C4]">Cases</p>
                <p className="text-lg font-semibold">12 today</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-9 rounded-lg bg-[#141A2E]"></div>
              <div className="h-9 rounded-lg bg-[#141A2E]/70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

Note: the three window-control dots may use red/amber/green as literal browser chrome, not as brand accents.

- [ ] **Step 4: Run tests**

Run: `npx vitest run test/hero.test.tsx test/navbar.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components/Hero.tsx test/hero.test.tsx
git commit -m "feat: rebuild hero as Product Stage split layout"
```

---

### Task 7: Selected work

**Files:**
- Create: `components/Work.tsx`
- Create: `test/work.test.tsx`
- Modify: `App.tsx` (swap `Projects` for `Work`)
- Delete: `components/Projects.tsx` after App no longer imports it

**Interfaces:**
- Consumes: `FEATURED_PROJECTS`
- Produces: `#work` section, OpenMD first and visually larger

- [ ] **Step 1: Write failing work test**

Create `test/work.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Work from '../components/Work';

describe('Work', () => {
  it('leads with the three products', () => {
    render(<Work />);
    expect(screen.getByText('Selected work')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Products on stage/i })).toBeInTheDocument();
    expect(screen.getByText('OpenMD')).toBeInTheDocument();
    expect(screen.getByText('FindMyFlat')).toBeInTheDocument();
    expect(screen.getByText('SpiderWaterReminder')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /FindMyFlat live/i })).toHaveAttribute(
      'href',
      'https://find-my-flat-two.vercel.app'
    );
    expect(screen.queryByText('Security Risk Assessment')).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/work.test.tsx`

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Work**

Create `components/Work.tsx`:

```tsx
import React from 'react';
import { FEATURED_PROJECTS } from '../constants';

const Work: React.FC = () => {
  return (
    <section id="work" className="py-24">
      <p className="eyebrow mb-3">Selected work</p>
      <h2 className="display mb-12 text-4xl font-bold md:text-5xl">Products on stage.</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {FEATURED_PROJECTS.map((project) => (
          <article key={project.id} className="stage-card flex flex-col p-6 transition-transform duration-200 hover:-translate-y-1">
            <div className="mb-5 h-28 rounded-xl bg-[#0B1020]" aria-hidden="true"></div>
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[#8BA0C4]">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="chip rounded border border-white/10 px-2 py-1 text-[11px] text-[#8BA0C4]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-4 text-sm font-semibold text-[#5B7FFF]">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live`}
                >
                  Live
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
```

- [ ] **Step 4: Wire App and delete Projects**

In `App.tsx`: import `Work`, render `<Work />` after `<Hero />`, remove `Projects` import/usage. Delete `components/Projects.tsx`.

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/work.test.tsx test/hero.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/Work.tsx test/work.test.tsx App.tsx
git rm components/Projects.tsx
git commit -m "feat: add featured product stage for OpenMD, FindMyFlat, SpiderWaterReminder"
```

---

### Task 8: About and skills rows

**Files:**
- Modify: `components/About.tsx`
- Create: `test/about.test.tsx`
- Modify: `App.tsx` (remove Skills)
- Delete: `components/Skills.tsx`

**Interfaces:**
- Consumes: `PERSONAL_INFO`, `SKILLS`
- Produces: `#about` with three labeled rows: implied primary, `Also fluent`, `Security background`. No radar chart. No phone number.

- [ ] **Step 1: Write failing about test**

Create `test/about.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import About from '../components/About';

describe('About', () => {
  it('frames Rasel as a builder and hides the phone number', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /Builder, not just a student/i })).toBeInTheDocument();
    expect(screen.getByText('Also fluent')).toBeInTheDocument();
    expect(screen.getByText('Security background')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Download resume/i })).toBeInTheDocument();
    expect(screen.queryByText('516-828-0692')).toBeNull();
    expect(screen.queryByText(/Cybersecurity Analyst/i)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/about.test.tsx`

Expected: FAIL — old “Mission Statement” / analyst copy.

- [ ] **Step 3: Replace About**

```tsx
import React from 'react';
import { PERSONAL_INFO, SKILLS } from '../constants';

const About: React.FC = () => {
  const primary = SKILLS.filter((s) => s.category === 'primary');
  const secondary = SKILLS.filter((s) => s.category === 'secondary');
  const security = SKILLS.filter((s) => s.category === 'security');

  return (
    <section id="about" className="py-24">
      <h2 className="display mb-8 text-4xl font-bold md:text-5xl">Builder, not just a student.</h2>
      <p className="max-w-3xl text-lg leading-relaxed text-[#8BA0C4]">{PERSONAL_INFO.bio}</p>

      <div className="mt-12 flex flex-wrap gap-3">
        {primary.map((skill) => (
          <span key={skill.name} className="stage-card inline-flex min-h-11 items-center gap-2 px-4 text-sm">
            <i className={skill.icon}></i>
            {skill.name}
          </span>
        ))}
      </div>

      <div className="mt-10">
        <p className="eyebrow mb-3">Also fluent</p>
        <div className="flex flex-wrap gap-2">
          {secondary.map((skill) => (
            <span key={skill.name} className="chip rounded-lg border border-white/10 px-3 py-2 text-[11px] text-[#8BA0C4]">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="eyebrow mb-3">Security background</p>
        <div className="flex flex-wrap gap-2">
          {security.map((skill) => (
            <span key={skill.name} className="chip rounded-lg border border-white/10 px-3 py-2 text-[11px] text-[#8BA0C4]">
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      <a
        href={PERSONAL_INFO.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-12 inline-flex min-h-11 items-center rounded-xl bg-[#5B7FFF] px-6 text-sm font-semibold text-[#0B1020]"
      >
        Download resume
      </a>
    </section>
  );
};

export default About;
```

- [ ] **Step 4: Remove Skills from App and delete the file**

Remove `Skills` from `App.tsx`. Delete `components/Skills.tsx`.

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/about.test.tsx test/work.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/About.tsx test/about.test.tsx App.tsx
git rm components/Skills.tsx
git commit -m "feat: move skills into About as a full-stack stack"
```

---

### Task 9: Education and certifications restyle

**Files:**
- Modify: `components/Education.tsx`
- Modify: `components/Certifications.tsx`
- Create: `test/credentials.test.tsx`

**Interfaces:**
- Consumes: `EDUCATION`, `CERTIFICATIONS`
- Produces: restyled timeline and cert cards; no Unsplash images; no “View credential” for `link === '#'`

- [ ] **Step 1: Write failing credentials test**

Create `test/credentials.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Education from '../components/Education';
import Certifications from '../components/Certifications';

describe('Education', () => {
  it('keeps both degrees and GPAs', () => {
    render(<Education />);
    expect(screen.getByText(/Computer Programming and Information Systems/)).toBeInTheDocument();
    expect(screen.getByText(/3.93\/4/)).toBeInTheDocument();
    expect(screen.getByText(/Magna Cum Laude/)).toBeInTheDocument();
  });
});

describe('Certifications', () => {
  it('lists all four credentials without stock photos', () => {
    const { container } = render(<Certifications />);
    expect(screen.getByText('Google Cybersecurity Certificate')).toBeInTheDocument();
    expect(screen.getByText('Google Data Analytics Professional')).toBeInTheDocument();
    expect(screen.getByText('Introduction to Cybersecurity')).toBeInTheDocument();
    expect(screen.getByText(/ISC2 Certified in Cybersecurity/)).toBeInTheDocument();
    expect(container.querySelectorAll('img')).toHaveLength(0);
    expect(screen.getAllByRole('link', { name: /View credential/i })).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/credentials.test.tsx`

Expected: FAIL — cert cards still have `img` tags.

- [ ] **Step 3: Restyle Education**

```tsx
import React from 'react';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24">
      <div className="flex flex-col gap-12 lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="display mb-4 text-4xl font-bold md:text-5xl">Academic foundation.</h2>
          <p className="text-[#8BA0C4]">
            Consistent high achievement in programming, systems, and software engineering.
          </p>
        </div>
        <div className="space-y-8 lg:w-2/3">
          {EDUCATION.map((edu) => (
            <article key={edu.institution} className="stage-card relative pl-8 pr-6 py-6">
              <span className="absolute left-3 top-8 h-3 w-3 rounded-full bg-[#F5B942]"></span>
              <p className="chip text-xs text-[#8BA0C4]">
                {edu.period} · {edu.location}
              </p>
              <h3 className="mt-2 text-xl font-bold">{edu.degree}</h3>
              <p className="mt-1 text-[#5B7FFF]">{edu.institution}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#5B7FFF]/15 px-3 py-1 text-[11px] font-bold uppercase text-[#5B7FFF]">
                  GPA: {edu.gpa}
                </span>
                {edu.recognition && (
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase text-[#8BA0C4]">
                    {edu.recognition}
                  </span>
                )}
              </div>
              {edu.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span key={course} className="chip rounded border border-white/10 px-2 py-1 text-[11px] text-[#8BA0C4]">
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
```

- [ ] **Step 4: Restyle Certifications**

```tsx
import React from 'react';
import { CERTIFICATIONS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <section id="certificates" className="py-24">
      <h2 className="display mb-4 text-4xl font-bold md:text-5xl">Verified expertise.</h2>
      <p className="mb-12 max-w-xl text-[#8BA0C4]">
        Credentials that sit beside the engineering work, not in front of it.
      </p>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {CERTIFICATIONS.map((cert) => (
          <article key={cert.title} className="stage-card p-8">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#5B7FFF]/15 text-sm font-bold text-[#5B7FFF]">
              {cert.issuer.charAt(0)}
            </div>
            <p className="chip text-[11px] text-[#F5B942]">
              {cert.issuer} · {cert.date}
            </p>
            <h3 className="mt-2 text-2xl font-bold">{cert.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#8BA0C4]">{cert.description}</p>
            {cert.link !== '#' && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-[#5B7FFF]"
              >
                View credential
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/credentials.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/Education.tsx components/Certifications.tsx test/credentials.test.tsx
git commit -m "style: restyle education and certifications without stock photos"
```

---

### Task 10: Also built

**Files:**
- Create: `components/AlsoBuilt.tsx`
- Create: `test/also-built.test.tsx`
- Modify: `App.tsx`

**Interfaces:**
- Consumes: `SUPPORTING_PROJECTS`
- Produces: `#also` compact row; Vulnerability Assessment Lab has no GitHub link

- [ ] **Step 1: Write failing test**

Create `test/also-built.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AlsoBuilt from '../components/AlsoBuilt';

describe('AlsoBuilt', () => {
  it('lists security labs as supporting work', () => {
    render(<AlsoBuilt />);
    expect(screen.getByText('Also built')).toBeInTheDocument();
    expect(screen.getByText('Security Risk Assessment')).toBeInTheDocument();
    expect(screen.getByText('Vulnerability Assessment Lab')).toBeInTheDocument();
    expect(screen.getByText('Web Application Security Test')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Vulnerability Assessment Lab/i })).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/also-built.test.tsx`

Expected: FAIL — module not found.

- [ ] **Step 3: Implement AlsoBuilt**

Create `components/AlsoBuilt.tsx`:

```tsx
import React from 'react';
import { SUPPORTING_PROJECTS } from '../constants';

const AlsoBuilt: React.FC = () => {
  return (
    <section id="also" className="py-24">
      <p className="eyebrow mb-3">Also built</p>
      <h2 className="display mb-8 text-3xl font-bold">Security labs, in supporting roles.</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {SUPPORTING_PROJECTS.map((project) => (
          <article key={project.id} className="rounded-2xl border border-white/10 p-5">
            <h3 className="text-base font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#8BA0C4]">{project.description}</p>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center text-sm text-[#5B7FFF]"
                aria-label={`${project.title} GitHub`}
              >
                GitHub
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default AlsoBuilt;
```

- [ ] **Step 4: Mount after Certifications in App**

Import `AlsoBuilt` and render `<AlsoBuilt />` after `<Certifications />`.

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/also-built.test.tsx test/work.test.tsx`

Expected: PASS. Featured work still must not include the security titles.

- [ ] **Step 6: Commit**

```bash
git add components/AlsoBuilt.tsx test/also-built.test.tsx App.tsx
git commit -m "feat: move security labs into a supporting Also built row"
```

---

### Task 11: Contact and footer

**Files:**
- Modify: `components/Contact.tsx`
- Modify: `components/Footer.tsx`
- Create: `test/contact.test.tsx`

**Interfaces:**
- Consumes: `PERSONAL_INFO.email`, `location`, `github`, `linkedin`
- Produces: heading `Let’s build something.`, mailto submit, no phone, no fake Privacy/Terms

- [ ] **Step 1: Write failing contact test**

Create `test/contact.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

describe('Contact', () => {
  it('opens a mailto URL and never shows the phone number', async () => {
    const open = vi.fn();
    vi.stubGlobal('open', open);
    render(<Contact />);
    expect(screen.getByRole('heading', { name: /Let’s build something/i })).toBeInTheDocument();
    expect(screen.queryByText('516-828-0692')).toBeNull();
    await userEvent.type(screen.getByLabelText('Full Name'), 'Alex');
    await userEvent.type(screen.getByLabelText('Email Address'), 'alex@example.com');
    await userEvent.type(screen.getByLabelText('Message'), 'Hello');
    await userEvent.click(screen.getByRole('button', { name: /Send message/i }));
    expect(open).toHaveBeenCalled();
    const url = String(open.mock.calls[0][0]);
    expect(url.startsWith('mailto:Studyrasel1@gmail.com')).toBe(true);
    expect(url).toContain('Hello');
  });
});

describe('Footer', () => {
  it('closes quietly', () => {
    render(<Footer />);
    expect(screen.getByText(/Designed and built by Rasel Islam/)).toBeInTheDocument();
    expect(screen.queryByText(/Privacy Policy/)).toBeNull();
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/contact.test.tsx`

Expected: FAIL — fake timeout submit, old heading.

- [ ] **Step 3: Replace Contact**

```tsx
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio note from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name} <${formData.email}>`);
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_self');
  };

  return (
    <section id="contact" className="py-24">
      <div className="stage-card p-8 md:p-16">
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="lg:w-1/2">
            <h2 className="display text-4xl font-bold md:text-6xl">Let’s build something.</h2>
            <p className="mt-6 text-lg text-[#8BA0C4]">
              Have a role, a project, or a question? I read every note.
            </p>
            <div className="mt-10 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8BA0C4]">Email</p>
                <p className="text-lg">{PERSONAL_INFO.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[#8BA0C4]">Location</p>
                <p className="text-lg">{PERSONAL_INFO.location}</p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6 lg:w-1/2">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="contact-name" className="text-sm text-[#8BA0C4]">Full Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="contact-email" className="text-sm text-[#8BA0C4]">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-sm text-[#8BA0C4]">Message</label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#5B7FFF] font-semibold text-[#0B1020]"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 4: Replace Footer**

```tsx
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-16">
      <div className="mx-auto max-w-[1120px] px-6 text-center">
        <div className="mb-8 text-4xl font-bold tracking-tight">
          RASEL<span className="text-[#5B7FFF]">.</span>
        </div>
        <div className="mb-8 flex justify-center gap-6">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#8BA0C4]">
            <i className="fa-brands fa-github text-xl"></i>
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#8BA0C4]">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>
        <p className="text-sm text-[#8BA0C4]">Designed and built by Rasel Islam.</p>
        <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-[#8BA0C4]/70">
          © {new Date().getFullYear()} Rasel Islam
        </p>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 5: Run tests**

Run: `npx vitest run test/contact.test.tsx`

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add components/Contact.tsx components/Footer.tsx test/contact.test.tsx
git commit -m "feat: use mailto contact and a quieter footer"
```

---

### Task 12: Chatbot, Gemini prompt, remove Terminal, restyle scroll-top

**Files:**
- Modify: `services/geminiService.ts`
- Modify: `components/ChatBot.tsx`
- Modify: `components/ScrollToTop.tsx`
- Modify: `App.tsx`
- Create: `test/gemini-prompt.test.ts`
- Delete: `components/Terminal.tsx` if still present

**Interfaces:**
- Consumes: `PERSONAL_INFO`, `FEATURED_PROJECTS`, `EDUCATION`, `CERTIFICATIONS`
- Produces: `getSystemInstruction(): string`, `isChatConfigured(): boolean`, launcher `Ask about my work`, Escape closes panel, offline state when API key is empty

- [ ] **Step 1: Write failing prompt test**

Create `test/gemini-prompt.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { getSystemInstruction } from '../services/geminiService';

describe('chat system instruction', () => {
  it('describes a full-stack developer and the featured products', () => {
    const prompt = getSystemInstruction();
    expect(prompt).toMatch(/full-stack developer/i);
    expect(prompt).toContain('OpenMD');
    expect(prompt).toContain('FindMyFlat');
    expect(prompt).toContain('SpiderWaterReminder');
    expect(prompt).not.toMatch(/Cybersecurity Analyst/i);
    expect(prompt).not.toMatch(/Nexus Assistant/i);
  });
});
```

- [ ] **Step 2: Run to verify fail**

Run: `npx vitest run test/gemini-prompt.test.ts`

Expected: FAIL — `getSystemInstruction` is not exported and still says analyst.

- [ ] **Step 3: Rewrite `services/geminiService.ts`**

```ts
import { GoogleGenAI, Chat } from '@google/genai';
import { PERSONAL_INFO, FEATURED_PROJECTS, EDUCATION, CERTIFICATIONS, SUPPORTING_PROJECTS } from '../constants';

export const getSystemInstruction = (): string => {
  const products = FEATURED_PROJECTS.map((p) => `${p.title}: ${p.description}`).join(' ');
  const certs = CERTIFICATIONS.map((c) => c.title).join(', ');
  return `You are Rasel's portfolio assistant. Rasel Islam is a full-stack developer (${PERSONAL_INFO.title}) in ${PERSONAL_INFO.location}.
Education: ${EDUCATION.map((e) => `${e.degree} at ${e.institution} (${e.gpa})`).join('; ')}.
Featured products: ${products}
Supporting security labs: ${SUPPORTING_PROJECTS.map((p) => p.title).join(', ')}.
Certifications: ${certs}.
Guidelines: Speak as a product-building software developer. Mention security training only as background. Never call him a cybersecurity analyst. Point visitors to Work, Education, and Certs sections when relevant. Be concise and professional.`;
};

export const isChatConfigured = (): boolean => Boolean(process.env.API_KEY);

export class GeminiService {
  private chat: Chat | null = null;

  public async initChat() {
    if (!isChatConfigured()) return;
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: { systemInstruction: getSystemInstruction() },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!isChatConfigured()) {
      return 'Chat is offline on this deploy.';
    }
    if (!this.chat) await this.initChat();
    try {
      const response = await this.chat!.sendMessage({ message });
      return response.text || "I couldn't process that.";
    } catch (error) {
      console.error('Gemini Error:', error);
      return "Sorry, I'm having trouble connecting right now.";
    }
  }
}

export const geminiService = new GeminiService();
```

- [ ] **Step 4: Replace `components/ChatBot.tsx`**

```tsx
import React, { useState, useRef, useEffect } from 'react';
import { geminiService, isChatConfigured } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi — ask about Rasel's products, classes, or certifications." },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const online = isChatConfigured();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isTyping || !online) return;
    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);
    try {
      const response = await geminiService.sendMessage(userMessage);
      setMessages((prev) => [...prev, { role: 'model', text: response }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-[18px] border border-white/10 bg-[#141A2E] shadow-2xl md:w-[400px]">
          <div className="flex items-center justify-between bg-[#5B7FFF] px-4 py-3 text-[#0B1020]">
            <h3 className="text-sm font-bold">Ask about my work</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat" className="min-h-11 min-w-11">
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {!online && <p className="text-sm text-[#8BA0C4]">Chat is offline</p>}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-[#5B7FFF] text-[#0B1020]' : 'border border-white/10 bg-[#0B1020] text-[#E8EEF2]'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && <p className="text-xs text-[#8BA0C4]">Typing…</p>}
          </div>
          <div className="flex gap-2 border-t border-white/10 p-4">
            <input
              type="text"
              value={input}
              disabled={!online}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={online ? 'Ask me something...' : 'Chat is offline'}
              className="flex-1 rounded-xl border border-white/10 bg-[#0B1020] px-4 py-2 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!online}
              aria-label="Send message"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#5B7FFF] text-[#0B1020] disabled:opacity-40"
            >
              <i className="fa-solid fa-paper-plane text-xs"></i>
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask about my work"
        title="Ask about my work"
        className={`inline-flex h-14 w-14 items-center justify-center rounded-full text-xl shadow-xl ${isOpen ? 'bg-white text-[#0B1020]' : 'bg-[#5B7FFF] text-[#0B1020]'}`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  );
};

export default ChatBot;
```

- [ ] **Step 5: Restyle ScrollToTop to cobalt and confirm Terminal is gone**

Replace emerald classes on the scroll button with `bg-[#5B7FFF] text-[#0B1020]`. Delete `components/Terminal.tsx` if it still exists. Confirm `App.tsx` does not import Terminal.

- [ ] **Step 6: Run tests and typecheck**

Run:

```bash
npx vitest run
npx tsc --noEmit
```

Expected: all tests PASS. `tsc` exits 0. No remaining imports of `Terminal`, `Skills`, or `Projects`.

- [ ] **Step 7: Commit**

```bash
git add services/geminiService.ts components/ChatBot.tsx components/ScrollToTop.tsx App.tsx test/gemini-prompt.test.ts
git rm -f components/Terminal.tsx
git commit -m "feat: restyle assistant as a full-stack guide and drop the terminal"
```

---

### Task 13: Visual QA and reduced-motion pass

**Files:**
- Modify only if QA finds leftover emerald, `#skills`, or missing `#work`
- Test: browser, not new unit tests unless a regression is found

**Interfaces:**
- Consumes: finished App
- Produces: recruiter-ready page matching spec success criteria

- [ ] **Step 1: Run the full suite**

```bash
npm test
npx tsc --noEmit
```

Expected: PASS / exit 0

- [ ] **Step 2: Manual desktop check**

Run `npm run dev`. Verify:

- First viewport answers “full-stack developer” and shows OpenMD on stage
- Work names OpenMD, FindMyFlat, SpiderWaterReminder
- Education still has 3.93 and both schools
- All four certs exist; two Drive links work
- Also built is quieter than Work
- Phone is not visible
- No emerald blobs, no “Hire Analyst”, no terminal FAB
- Chat launcher says Ask about my work; Escape closes it
- Skip link appears on Tab

- [ ] **Step 3: Manual reduced-motion and mobile check**

In DevTools: emulate `prefers-reduced-motion: reduce` — no spotlight, buttons do not translate. Narrow to 390px — hero stacks, work is one column, targets remain tappable.

- [ ] **Step 4: Commit only if QA required code changes**

If files changed:

```bash
git add -u
git commit -m "fix: Product Stage QA for motion, contrast, and leftover analyst chrome"
```

If nothing changed, do not create an empty commit.

---

## Self-review

**Spec coverage**

| Spec section | Task |
|---|---|
| Full-stack identity / copy | 2, 6, 8, 12 |
| Product Stage tokens and type | 3 |
| Split hero + OpenMD frame | 6 |
| Bold motion + reduced-motion + coarse pointer | 4, 13 |
| Featured three products | 2, 7 |
| Education + four certs | 2, 9 |
| Also built security labs | 10 |
| Terminal removed | 5, 12 |
| Chatbot restyle + prompt | 12 |
| mailto contact, hidden phone | 11 |
| Skip link, focus, contrast | 3, 5, 13 |
| Stay on Vite/React | Global + 1 |
| No AcademicTracker / no fake jobs | File map |
| SpiderWaterReminder name/URL | 2, 7 |
| OpenMD “senior project” | 2 |
| Title tag | 3 |

**Placeholder scan:** none remaining. Vulnerability lab has no GitHub by design (test asserts it).

**Type consistency:** `kind: 'product' | 'security'`, `FEATURED_PROJECTS` / `SUPPORTING_PROJECTS`, `getSystemInstruction`, `isChatConfigured`, `MagneticButton` `variant: 'primary' | 'secondary'`.
