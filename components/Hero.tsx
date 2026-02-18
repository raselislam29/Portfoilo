
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Aspiring Cybersecurity Analyst.";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center justify-between pt-32 pb-20 gap-12">
      <div className="flex-1 animate-in fade-in slide-in-from-left duration-1000">
        <div className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-[0.2em] uppercase mb-6">
          <i className="fa-solid fa-shield-halved mr-2"></i> Operational Intelligence Active
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight tracking-tighter">
          Secure <br />
          <span className="gradient-text">Analysis.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 font-light mb-10 max-w-xl leading-relaxed">
          {text}<span className="animate-pulse text-emerald-500">_</span>
        </p>
        <div className="flex flex-wrap gap-5">
          <a href="#projects" className="px-8 py-4 bg-white text-black text-xs font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-emerald-500/20">
            Case Files
          </a>
          <a href="#education" className="px-8 py-4 border border-white/10 glass-card hover:bg-white/5 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95">
            Dossier
          </a>
        </div>
      </div>

      <div className="flex-1 w-full max-w-xl animate-in fade-in slide-in-from-right duration-1000">
        <div className="glass-card rounded-[2rem] p-1 overflow-hidden shadow-2xl border-emerald-500/20 border group relative">
          <div className="bg-slate-900/80 p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
            </div>
            <div className="text-[10px] text-gray-500 fira uppercase tracking-widest">SHELL: v2.0 - SECURE_AUTH</div>
          </div>
          <div className="p-8 fira text-sm space-y-4 bg-slate-950/40">
            <div className="flex gap-3">
              <span className="text-emerald-500">#</span>
              <span className="text-blue-400">user</span>
              <span className="text-white">fetch --profile</span>
            </div>
            <div className="text-gray-400 pl-7 space-y-1">
              <div>NAME: <span className="text-white font-bold">{PERSONAL_INFO.name}</span></div>
              <div>GPA: <span className="text-emerald-400 font-bold">3.93/4.00</span></div>
              <div>HONORS: <span className="text-blue-400 uppercase">President's List</span></div>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-500">#</span>
              <span className="text-blue-400">user</span>
              <span className="text-white">list --projects --sec</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 pl-7">
              <span className="text-emerald-500">NIST_CSF</span>
              <span className="text-emerald-500">SOC2</span>
              <span className="text-emerald-500">OWASP</span>
              <span className="text-emerald-500">NMAP</span>
            </div>
            <div className="flex gap-3">
              <span className="text-emerald-500">#</span>
              <span className="text-blue-400">user</span>
              <span className="text-white animate-pulse">awaiting_deployment...</span>
            </div>
          </div>
          {/* Terminal Hint */}
          <div className="absolute -bottom-10 left-0 w-full text-center">
            <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em] animate-pulse">
              Tip: Access the Shell Terminal in the bottom right corner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
