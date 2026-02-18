
import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS } from '../constants';

const Terminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>(['Welcome to NEXUS OS v2.0.4', 'Type "help" to see available commands.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const c = cmd.toLowerCase().trim();
    let response = '';

    switch (c) {
      case 'help':
        response = 'Available commands: about, projects, contact, skills, clear, whoami, exit';
        break;
      case 'whoami':
        response = `User: guest | Target: ${PERSONAL_INFO.name} | Status: Authorized`;
        break;
      case 'about':
        response = PERSONAL_INFO.bio;
        break;
      case 'projects':
        response = PROJECTS.map(p => `- ${p.title}`).join('\n');
        break;
      case 'contact':
        response = `Email: ${PERSONAL_INFO.email} | Location: ${PERSONAL_INFO.location}`;
        break;
      case 'skills':
        response = 'Expertise: Python, SQL, NIST CSF, Nmap, Splunk, Wireshark, Linux.';
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'exit':
        setIsOpen(false);
        return;
      default:
        response = `Command not found: ${c}. Type "help" for assistance.`;
    }

    setHistory(prev => [...prev, `rasel@nexus:~$ ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input);
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-slate-900 border border-emerald-500/30 text-emerald-500 rounded-xl flex items-center justify-center shadow-2xl hover:bg-emerald-500 hover:text-white transition-all z-50 group"
        title="Open Terminal"
      >
        <i className="fa-solid fa-terminal text-xl"></i>
        <span className="absolute right-full mr-4 px-3 py-1 bg-slate-900 border border-emerald-500/30 text-[10px] font-black uppercase tracking-widest text-emerald-500 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Access Shell
        </span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-3xl h-[500px] bg-black border border-emerald-500/30 rounded-lg flex flex-col shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden">
        <div className="bg-slate-900 px-4 py-2 flex justify-between items-center border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
          </div>
          <div className="text-[10px] font-black fira text-emerald-500/50 uppercase tracking-widest">
            SECURE_TERMINAL_SESSION - {PERSONAL_INFO.name.toUpperCase()}
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto fira text-sm text-emerald-400 space-y-2 custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap leading-relaxed">{line}</div>
          ))}
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <span className="text-blue-400 whitespace-nowrap">rasel@nexus:~$</span>
            <input 
              ref={inputRef}
              autoFocus
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-emerald-400 caret-emerald-500"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
