
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 glass-card">
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" 
              alt="Cybersecurity" 
              className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-2xl border-emerald-500/20 border">
              <p className="text-emerald-400 font-bold text-xs uppercase tracking-tighter mb-1">Career Goal</p>
              <h4 className="text-xl font-black">Cybersecurity Analyst</h4>
              <p className="text-gray-400 text-sm">Threat Intelligence & Risk Mitigation</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Mission <span className="gradient-text">Statement.</span></h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              {PERSONAL_INFO.bio}
            </p>
            <p>
              My focus is on the intersection of data integrity and digital defense. By combining the analytical power of Data Science with the defensive strategies of Cybersecurity, I build systems that aren't just efficient, but inherently resilient to evolving threats.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="p-6 glass-card rounded-2xl border-l-4 border-emerald-500">
              <h4 className="text-3xl font-black text-white mb-1">Sec+</h4>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Focused Pathway</p>
            </div>
            <div className="p-6 glass-card rounded-2xl border-l-4 border-blue-500">
              <h4 className="text-3xl font-black text-white mb-1">NIST</h4>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Framework Expert</p>
            </div>
          </div>

          <a 
            href={PERSONAL_INFO.resumeUrl} 
            target="_blank" 
            className="inline-flex items-center gap-4 mt-10 px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-95"
          >
            Access Full Dossier (Resume) <i className="fa-solid fa-shield-halved"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
