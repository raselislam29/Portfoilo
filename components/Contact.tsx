import { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copyEmail() { try { await navigator.clipboard.writeText(PERSONAL_INFO.email); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }
  return <section id="contact" className="section wrap"><div className="contact-panel"><div className="eyebrow">05 / LET’S CONNECT</div><h2>Good things start<br />with <em>a conversation.</em></h2><p>Have an idea, an interesting challenge, or just want to say hello?</p><div className="contact-actions"><a className="button primary" href={`mailto:${PERSONAL_INFO.email}`}>Let’s talk <span aria-hidden="true">↗</span></a><button className="copy-email" onClick={copyEmail}>{copied ? 'Email copied ✓' : 'Copy email ⧉'}</button></div><span className="copy-status" role="status">{copyError ? `You can copy this address: ${PERSONAL_INFO.email}` : copied ? PERSONAL_INFO.email : ''}</span><div className="contact-links"><a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer">Résumé ↗</a></div></div></section>;
}
