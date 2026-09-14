import { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../constants';
export default function Navbar({ activeSection }: { activeSection: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header"><nav className="nav wrap" aria-label="Main navigation">
    <a className="wordmark" href="#home" aria-label="Rasel Islam home">rasel<span>.</span></a>
    <div id="navigation" className={`nav-links ${open ? 'is-open' : ''}`}>
      {[['experience', 'Experience'], ['projects', 'Work'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}</a>)}
    </div>
    <a className="nav-resume" href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
    <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
  </nav></header>;
}
