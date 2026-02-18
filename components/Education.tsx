
import React from 'react';
import { EDUCATION } from '../constants';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">Academic <br/><span className="gradient-text">Foundation.</span></h2>
          <p className="text-gray-400 leading-relaxed">
            Consistent high academic achievement in computer systems and information technology, focused on secure development and analytical rigor.
          </p>
        </div>
        
        <div className="lg:w-2/3 space-y-12">
          {EDUCATION.map((edu, i) => (
            <div key={i} className="relative pl-12 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-gradient-to-b before:from-emerald-500 before:to-transparent">
              <div className="absolute left-[-6px] top-2 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                <p className="text-emerald-400 text-sm font-bold fira uppercase tracking-tighter">{edu.period}</p>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span>
                <p className="text-gray-500 text-xs font-bold fira">{edu.location}</p>
              </div>
              <h3 className="text-2xl font-black mb-1 text-white">{edu.degree}</h3>
              <p className="text-emerald-400/80 font-bold mb-3 italic">{edu.institution}</p>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded border border-emerald-500/20">GPA: {edu.gpa}</span>
                {edu.recognition && (
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase rounded border border-blue-500/20">{edu.recognition}</span>
                )}
              </div>

              {edu.coursework.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-3">Core Modules</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map(course => (
                      <span key={course} className="px-2 py-1 bg-slate-800/50 text-gray-400 text-[10px] rounded border border-white/5 fira">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
