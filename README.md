# Rasel Islam — Software Developer Portfolio

A Vite, React, and TypeScript portfolio centered on Rasel’s Software Developer role at United Medical Monitoring. Content is maintained in `constants.ts`; the design is in `styles.css` and `components/`.

## Local development

```powershell
npm.cmd install
npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort
```

Open http://127.0.0.1:5173.

## Validation and build

```powershell
npm.cmd test
npm.cmd run build
npm.cmd run preview
```

The production output is `dist/`. The résumé is served from `public/Rasel-Islam-Resume.pdf`, copied from the supplied July 2026 résumé. The project artwork is illustrative UI, labeled as concepts.

The contact button opens the visitor’s email application. Copy email provides a fallback address when clipboard access fails. The assistant shows an offline state without configuration. The existing Gemini integration reads `GEMINI_API_KEY` or `API_KEY` from the build process environment; Vite embeds configured values in client code. Use a server-side proxy before enabling chat with a private production credential.

Career facts and credentials follow the supplied résumé. FindMyFlat, SpiderWaterReminder, and supporting labs retain the repository’s existing project brief. Desktop/mobile breakpoints, keyboard focus, and reduced-motion styles are included.
