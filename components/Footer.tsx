
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 border-t border-white/5 bg-slate-950/80">
      <div className="container mx-auto px-6 text-center">
        <div className="text-4xl font-black tracking-tighter mb-8">
          <span className="text-white">RAS</span>
          <span className="text-blue-500">.</span>
        </div>
        
        <div className="flex justify-center gap-8 mb-12">
          {/* GitHub link */}
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-all">
            <i className="fa-brands fa-github text-xl"></i>
          </a>
          {/* LinkedIn link */}
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-all">
            <i className="fa-brands fa-linkedin text-xl"></i>
          </a>
        </div>

        <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
          Designed by Rasel Islam at SUNY Farmingdale. <br/>
          Empowered by Artificial Intelligence & Data Science.
        </p>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-bold">
            &copy; {new Date().getFullYear()} Rasel Islam. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Privacy Policy</span>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
