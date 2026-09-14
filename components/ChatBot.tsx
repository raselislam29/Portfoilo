import { useEffect, useRef, useState } from 'react';
import { geminiService } from '../services/geminiService';
import { PERSONAL_INFO } from '../constants';
import { ChatMessage } from '../types';
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const log = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) closeButton.current?.focus();
    const escape = (e: KeyboardEvent) => { if (e.key === 'Escape' && open) { setOpen(false); launcher.current?.focus(); } };
    window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape);
  }, [open]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, pending]);
  async function send(e: React.FormEvent) {
    e.preventDefault(); if (!input.trim() || pending || !geminiService.available) return;
    const message = input.trim(); setInput(''); setPending(true); setMessages(prev => [...prev, { role: 'user', text: message }]);
    try { const text = await geminiService.sendMessage(message); setMessages(prev => [...prev, { role: 'model', text }]); }
    catch { setMessages(prev => [...prev, { role: 'model', text: 'Chat is unavailable right now. Please try again or contact Rasel by email.' }]); }
    finally { setPending(false); }
  }
  return <aside className="chat-widget" aria-label="Portfolio assistant">
    {open && <section className="chat-panel" id="portfolio-chat" aria-labelledby="chat-title"><div className="chat-header"><h2 id="chat-title">Ask about my work</h2><button ref={closeButton} aria-label="Close chat" onClick={() => { setOpen(false); launcher.current?.focus(); }}>✕</button></div>
      <div className="chat-log" role="log" aria-live="polite" ref={log}><p className="chat-message">{geminiService.available ? 'Hi! Ask me about Rasel’s current role, projects, or background.' : 'Chat is offline. You can explore my experience and projects, or reach me directly.'}</p>{!geminiService.available && <a className="text-link" href={`mailto:${PERSONAL_INFO.email}`}>Email Rasel ↗</a>}{messages.map((message, i) => <p className={`chat-message ${message.role}`} key={i}>{message.text}</p>)}{pending && <p>Thinking…</p>}</div>
      {geminiService.available && <form onSubmit={send} className="chat-form"><input aria-label="Your message" placeholder="Ask about my experience…" value={input} onChange={e => setInput(e.target.value)} maxLength={2000} /><button disabled={pending || !input.trim()} aria-label="Send message">↑</button></form>}
    </section>}
    <button ref={launcher} className="chat-launcher" aria-expanded={open} aria-controls="portfolio-chat" onClick={() => setOpen(!open)}><span aria-hidden="true">✳</span> Ask about my work</button>
  </aside>;
}
