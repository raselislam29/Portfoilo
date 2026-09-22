# Product Stage portfolio redesign

Date: 2026-08-18  
Project: Rasel Islam personal portfolio (`E:/Portfoilo`)  
Status: approved in conversation; awaiting spec review before implementation

## 1. Problem

The live site sells Rasel as an aspiring cybersecurity analyst: emerald “Nexus OS” chrome, a hacker terminal, NIST/SOC2/OWASP as the hero, and three security labs as featured work. He is a Computer Programming and Information Systems student targeting **full-stack software developer** roles. Recruiters who land on the page should see a product builder first. Education and certifications stay; the security story becomes supporting proof, not the identity.

## 2. Audience and job

Primary visitor: a hiring manager or intern recruiter scanning on a laptop, then a phone.  
Page job: in the first viewport, communicate “full-stack developer who ships usable products,” then prove it with OpenMD, FindMyFlat, and SpiderWaterReminder. Secondary job: make it easy to open the resume, GitHub, and email.

## 3. Locked decisions

| Decision | Choice |
|---|---|
| Role | Full-stack web developer (React/JS + Python/SQL) |
| Visual world | Product Stage (dark cinematic studio) |
| Hero composition | Split stage: copy left, OpenMD product frame right |
| Motion | Bold: load choreography, cursor spotlight, magnetic buttons, scroll-docked work |
| Featured work | OpenMD, FindMyFlat, SpiderWaterReminder |
| Education | Keep both degrees, GPAs, honors, coursework |
| Certifications | Keep all four, including in-progress Security+ / CC |
| Security labs | Quiet “Also built” row, not the featured grid |
| Terminal | Remove |
| Chatbot | Keep, restyle as “Ask about my work” |

## 4. Visual world

**Product Stage.** The page is a dark studio. Work sits on a stage, not inside a fake operating system. No shields, no emerald “SECURE_AUTH” chrome, no “Hire Analyst.”

Signature element: a **cursor-following cobalt spotlight** plus a **tilted product frame** of OpenMD in the hero. Surrounding UI stays quiet so that one moment carries the personality.

Anti-references (do not use): the current emerald cyber look; cream + terracotta serif; black + acid green; newspaper hairline broadsheet.

## 5. Design tokens

### Color

| Token | Hex | Use |
|---|---|---|
| Ink | `#0B1020` | Page background |
| Stage | `#141A2E` | Cards, product frame, nav glass |
| Mist | `#E8EEF2` | Primary text |
| Mute | `#8BA0C4` | Secondary text |
| Cobalt | `#5B7FFF` | Primary accent, CTAs, focus, spotlight |
| Amber | `#F5B942` | Eyebrows, flagship labels, small highlights only |

Selection color: cobalt at 30% opacity. Borders: white at 6–12% on Stage surfaces. Do not introduce emerald, purple-pink gradient text, or a second competing accent.

### Type

| Role | Face | Notes |
|---|---|---|
| Display | Fraunces | Headlines only. Tight tracking. Used with restraint. |
| UI / body | Outfit | Nav, body, buttons, cards |
| Code | JetBrains Mono | Stack chips and repo labels only |

Type scale (desktop): eyebrow 12px / 0.18em uppercase; display 64–88px; section title 40–48px; body 18px / 1.6; chips 11px. Mobile display 40–48px.

### Layout

Max content width 1120px. Section padding 96px desktop, 64px mobile. Hero is a full viewport minus the nav. Cards use 16–20px radius. No 3rem “blob” glass piles.

### Motion

| Moment | Behavior | Duration |
|---|---|---|
| Page load | Eyebrow fade → headline slide up → OpenMD frame rises and settles | 900ms staged, ease-out |
| Cursor | Soft cobalt radial spotlight follows pointer on `html` | 120ms lag |
| Buttons | Magnetic pull toward cursor (max 8px) | 200ms |
| Work cards | On enter: translateY 24px → 0, opacity 0 → 1; slight 3D tilt on hover | 500ms / 200ms |
| Nav | Blur/background after 24px scroll | 200ms |
| Reduced motion | No spotlight, no magnetic pull, no load stagger; instant opacity only | — |

Do not animate layout width/height. Do not add particles, WebGL, or custom cursor replacement that hides the system pointer. Custom cursor is a **spotlight behind content**, not a swapped pointer (keeps hit-testing and accessibility).

## 6. Information architecture

Single page, this order:

1. Nav
2. Hero (`#home`)
3. Selected work (`#work`)
4. About + skills (`#about`)
5. Education (`#education`)
6. Certifications (`#certificates`)
7. Also built (`#also`)
8. Contact (`#contact`)
9. Footer
10. Chatbot FAB (not a section)

Remove `#skills` as a separate security-radar section. Skills live inside About.

Nav links: Work, About, Education, Certs, Contact. Logo: `RASEL` in Outfit black weight, cobalt period. CTA: `Resume` (existing Google Drive URL). No “Hire Analyst.”

## 7. Surfaces

### 7.1 Hero (split stage)

Left:

- Eyebrow: `Full-stack developer`
- Headline: `I ship products people can use.`
- Subcopy: one sentence — Farmingdale State College, Computer Programming and Information Systems, 3.93 GPA, building web products with React, Python, and SQL.
- Primary button: `View work` → `#work` (magnetic, cobalt fill, ink text)
- Secondary button: `About Rasel` → `#about` (Stage border)

Right: product frame of OpenMD (browser chrome: three dots + `openmd.app`). Inside: a simplified directory/dashboard mock (search bar, two stat tiles, a list row). The frame tilts −3deg at rest, eases toward 0deg on hover. This is the stage, not a terminal.

Do not typewriter “Aspiring Cybersecurity Analyst.”

### 7.2 Selected work

Section eyebrow: `Selected work`. Title: `Products on stage.`

Three cards. OpenMD is visually primary (larger on desktop: 1.4fr / 1fr / 1fr). Each card: product still or UI crop, title, one-sentence outcome, stack chips, GitHub link, live link if it exists.

| Project | Copy | Stack chips | Links |
|---|---|---|---|
| OpenMD | Senior project: multi-tenant medical operations platform with a public ratings directory plus authenticated scheduling, credentials, billing, and messaging. | Next.js, TypeScript, Supabase, Postgres, RLS | https://github.com/raselislam29/OpenMD |
| FindMyFlat | Rental marketplace: search and map browse, favorites, chat, and owner dashboards on Firebase. | Next.js, React, Firebase, Tailwind | GitHub + live https://find-my-flat-two.vercel.app |
| SpiderWaterReminder | Electron tray app for Windows and macOS. A character drops on every screen with a hydration or break reminder; schedules, quiet hours, and templates. | Electron, JavaScript | https://github.com/raselislam29/SpiderWaterReminder |

Card display title for the third app: **SpiderWaterReminder** (repo name). User shorthand “spidywaterreminder” maps to this repo.

### 7.3 About + skills

Title: `Builder, not just a student.`

Body (rewrite, keep facts): Rasel is a full-stack developer in Levittown, NY, finishing a BS in Computer Programming and Information Systems at Farmingdale State College (SUNY) with a 3.93 GPA and President’s List honors. He ships web products end to end — React/Next.js on the client, Python and SQL on the data side — and treats security training as how he builds, not who he is pitching as.

Primary stack (lead, icon chips, no radar): React, JavaScript, Python, SQL, Next.js, Supabase, Linux.

Secondary stack (smaller chip row, labeled `Also fluent`): Firebase, Tailwind, Electron, Git.

Security tools (smallest row, labeled `Security background`): NIST CSF, Nmap, Wireshark, OWASP ZAP, Splunk. Honest, not the headline.

Resume button: `Download resume` (same Drive URL). No shield icon.

### 7.4 Education

Keep both entries exactly as facts:

- Farmingdale State College — BS Computer Programming and Information Systems, expected May 2026, 3.93/4, President’s List Fall 2024 / Spring 2025 / Fall 2025, coursework list unchanged.
- Nassau Community College — AAS Information Technology, May 2024, 3.84/4 Magna Cum Laude, Dean’s List Fall 2022–Spring 2024.

Visual: vertical timeline on Stage cards, amber dots, cobalt GPA chips. Restyle only.

### 7.5 Certifications

Keep all four:

1. Google Cybersecurity Certificate — Oct 2023 — Drive link
2. Google Data Analytics Professional — May 2023 — Drive link
3. Introduction to Cybersecurity, Cisco — June 2023
4. CompTIA Security+ / ISC2 CC — In Progress

Grid of Stage cards. Issuer + date + title + existing description + “View credential” when a real link exists. Drop Unsplash filler photos (they read as stock, not proof). Use issuer wordmark or a simple cobalt seal instead.

### 7.6 Also built

Eyebrow: `Also built`. One compact row of three text cards (no large photos):

1. Security Risk Assessment — NIST CSF / SOC 2 risk register and a Python scoring tool — https://github.com/raselislam29/Security-Risk-Assessment-Project
2. Vulnerability Assessment Lab — Nmap, OpenVAS, Wireshark on a simulated network
3. Web Application Security Test — PHP/MySQL app with SQLi/XSS labs and a hardened rewrite — https://github.com/raselislam29/Web-Application-Security-Test

These must not visually compete with Selected work (smaller type, no 1.4fr hero card).

### 7.7 Contact

Keep email `Studyrasel1@gmail.com`, location Levittown, NY, GitHub, LinkedIn. Form: name, email, message. Replace the fake “sent” timeout with a `mailto:` fallback that opens the visitor’s mail client with the message filled in. Primary heading: `Let’s build something.` CTA: `Send message`. Phone number stays in `constants.ts` but is not shown on the page (reduce public PII).

### 7.8 Chatbot

Keep Gemini chat. Restyle into Product Stage (Stage panel, cobalt send, Outfit type). Launcher label: `Ask about my work`. System prompt must describe Rasel as a full-stack developer, list the three featured products, and mention education/certs/security background as supporting. Remove Terminal.tsx from App.

### 7.9 Footer

`RASEL.` + GitHub + LinkedIn + year. Line: `Designed and built by Rasel Islam.` Drop “Empowered by Artificial Intelligence & Data Science” and fake Privacy/Terms links.

## 8. Components (implementation units)

Each unit has one job:

| Unit | Does | Depends on |
|---|---|---|
| `tokens` in `index.html` | CSS variables, fonts, reduced-motion | none |
| `Navbar` | Section spy, resume, mobile drawer | activeSection |
| `Hero` | Split stage + load sequence + magnetic CTAs | PERSONAL_INFO, OpenMD mock |
| `Spotlight` | Pointer spotlight on document | prefers-reduced-motion |
| `Work` | Featured product cards | PROJECTS featured flag |
| `About` | Bio + three skill rows | PERSONAL_INFO, SKILLS |
| `Education` | Timeline | EDUCATION |
| `Certifications` | Credential cards | CERTIFICATIONS |
| `AlsoBuilt` | Compact security row | PROJECTS supporting flag |
| `Contact` | mailto form | PERSONAL_INFO |
| `ChatBot` | Gemini Q&A | geminiService |
| `Footer` | Legal-lite close | PERSONAL_INFO |
| `ScrollToTop` | Keep, restyle cobalt | none |

`Experience.tsx` stays unused (already not in App). Do not add a fake job timeline. `AcademicTracker.tsx` is already deleted; do not restore it.

`constants.ts` is the single content source. Add `featured: boolean` (or a `kind: 'product' | 'security'` field) on Project. Rewrite `PERSONAL_INFO.title` to `Full-stack Developer` and rewrite `bio`. Replace SKILLS with the three-row model (category: `primary` | `secondary` | `security`).

## 9. Technical constraints

Stay on the current stack: Vite + React + TypeScript + Tailwind CDN in `index.html` + Font Awesome. Do not migrate to Next.js. Add Google Fonts: Fraunces, Outfit, JetBrains Mono. Remove Inter and Fira Code.

Motion may use CSS + small React hooks. Do not add GSAP or Three.js for this pass.

Chatbot still needs `GEMINI_API_KEY` in `.env.local`; if missing, the widget shows a quiet “Chat is offline” state instead of a crash.

Title tag: `Rasel Islam · Full-stack Developer`.

Responsive: hero stacks (copy then product frame) under 900px. Work grid becomes 1 column. Touch targets ≥ 44px. Spotlight and magnetic pull disabled on coarse pointers.

## 10. Accessibility and quality floor

- Text contrast ≥ 4.5:1 (Mist on Ink, Ink on Cobalt buttons).
- Visible keyboard focus rings in cobalt.
- Skip-to-content link.
- `prefers-reduced-motion` disables spotlight, magnetic pull, and load stagger.
- Images (product crops) have descriptive alt text. No empty alt on meaningful UI.
- Chatbot and nav are keyboard reachable; Escape closes the chat panel.

## 11. Out of scope

- New backend for the contact form
- Replacing Gemini with another model
- Adding projects beyond the six named here
- Light theme
- Blog, case-study routes, or CMS
- Changing factual GPA, dates, cert titles, or contact URLs
- Claiming OpenMD is a solo original if it is a senior-project fork; copy says “senior project,” not “founded”

## 12. Success criteria

A recruiter can answer, without scrolling past the hero: who Rasel is (full-stack developer) and what he ships (OpenMD on stage). After scrolling Work, they can name three products. Education and all four certs are still present. The page does not read as a cybersecurity analyst portfolio. Motion feels intentional and turns off when the OS asks it to.

## 13. Open implementation notes (resolved)

- User said “spidywaterreminder”; public repo is [SpiderWaterReminder](https://github.com/raselislam29/SpiderWaterReminder). Use that name and URL.
- OpenMD has no public live URL in the GitHub metadata; GitHub-only CTA until a live URL is provided.
- Vulnerability Assessment Lab has no dedicated public repo in the current GitHub list; the Also-built card has no GitHub button unless a URL is added later.
- Phone stays in data, hidden in UI.
