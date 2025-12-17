# Copilot / AI Agent Instructions for this repository

This file contains concise, actionable guidance to help an AI coding agent be productive in this React + Vite portfolio project.

1) Project overview
- Tech: Vite + React (JSX), Tailwind CSS, Three.js via `@react-three/fiber` and `@react-three/drei` for the 3D background.
- Purpose: Single-page portfolio with small interactive widgets (Terminal, Chatbot, Dock) and localized content.
- Entry: `src/main.jsx` -> `src/App.jsx` mounts the app inside `index.html`.

2) Key folders & files to inspect
- `src/components/` — small, focused components (e.g. `Hero.jsx`, `Projects.jsx`, `Terminal.jsx`, `Dock.jsx`, `Chatbot.jsx`, `Background3D.jsx`).
- `src/context/LanguageContext.jsx` — centralized language provider; use `useLanguage()` to get `{ lang, toggleLanguage, t }`.
- `src/translations.js` — all copy and structure for `t` used across components (keys like `hero`, `timeline`, `projects`).
- `src/index.css` — Tailwind imports and any global overrides.
- `public/` — static demos (`demo_ccee.html`, `demo_fatura.html`, `demo_vba.html`) useful for referencing demo outputs.

3) Run / build / debug (Windows `cmd.exe`)
- Install: `npm install`
- Dev server: `npm run dev` (starts Vite, open `http://localhost:5173` by default)
- Build: `npm run build`
- Preview production build: `npm run preview`

4) Project-specific patterns & conventions
- File extensions: `.jsx` for React components (follow when adding new components).
- Styling: Tailwind classes in JSX; extend Tailwind only in `tailwind.config.js`.
- Localization: components consume `t` from `useLanguage()` (example: `const { t, toggleLanguage } = useLanguage();` then `t.hero.role`).
- Terminal & Dock interaction: `Dock` toggles `isTerminalOpen` by calling prop `toggleTerminal`; `Terminal` accepts `isOpen` and `onClose`.
- 3D background: `Background3D.jsx` uses `@react-three/fiber` — keep heavy 3D logic isolated there to avoid re-renders of other UI.

5) Integration points and dependencies to be careful with
- `@react-three/fiber` and `three` are sensitive to SSR and DOM availability — only render inside the client and keep effects guarded.
- `framer-motion` is used for animations; prefer its API for animated elements already in the app to keep consistency.
- No backend in this repo; contact form in `Contact.jsx` is likely a front-end stub — do not assume an API unless a new integration is added.

6) Examples and quick code patterns
- Toggle language:
```
import { useLanguage } from './context/LanguageContext';
const { t, toggleLanguage } = useLanguage();
// usage: <button onClick={toggleLanguage}>{t.hero.cv_btn}</button>
```
- Terminal toggle from `Dock` (prop example):
```
<Dock toggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)} />
<Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
```

7) Style and contribution rules for AI edits
- Make minimal, focused changes that match existing code style (JSX, Tailwind utility classes). Avoid reformatting unrelated files.
- Preserve existing prop names and context API shape (`LanguageProvider` interface, `Terminal` props, `Dock.toggleTerminal`).
- When adding files, use `.jsx` extension and export default the component unless there is a clear reason to add named exports.

8) Tests & CI
- There are no tests or CI files in the repository. If you add tests, document how to run them in this file.

9) Useful places to review before making UI or copy changes
- `src/translations.js` — update text keys here (used by `useLanguage()`).
- `src/components/Background3D.jsx` — heavy logic for Three.js; avoid editing unless adding isolated features.
- `public/` — static demo pages used for showcasing outputs; they can help reproduce demos without running the React app.

If anything in this file is unclear or you want additional examples (component patterns, best places to add unit tests, or a coding checklist), say which area and I will expand this file.
