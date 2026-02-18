
import React from 'react';
import { CERTIFICATIONS } from '../constants';

const Certifications: React.FC = () => {
  return (
    <section id="certificates" className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Verified <span className="gradient-text">Expertise.</span></h2>
          <p className="text-gray-400">
            Professional certifications from Google and SUNY Farmingdale, validating my technical proficiency in cyber defense and data analytics.
          </p>
        </div>
        <div className="hidden md:block">
          <div className="flex gap-2 text-xs font-bold text-emerald-500 fira bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1"></span>
            CREDENTIAL_STATUS: ACTIVE
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {CERTIFICATIONS.map((cert, i) => (
          <div key={i} className="glass-card group relative rounded-[2rem] overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-all duration-500 flex flex-col md:flex-row h-full">
            <div className="w-full md:w-2/5 h-64 md:h-full relative overflow-hidden">
              <img 
                src={cert.image} 
                alt={cert.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 to-transparent"></div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-black px-2 py-0.5 rounded border border-emerald-500/30 uppercase tracking-widest mb-2 inline-block fira">
                  {cert.issuer}
                </span>
                <h3 className="text-2xl font-black text-white leading-tight mb-2">{cert.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                {cert.description}
              </p>
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-fit flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                View Driver Link <i className="fa-solid fa-link text-[10px]"></i>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
