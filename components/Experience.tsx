
import React from 'react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Career <br/><span className="gradient-text">Trajectory.</span></h2>
          <p className="text-gray-400 leading-relaxed">
            A history of building, leading, and shipping high-impact software solutions across various industries.
          </p>
        </div>
        
        <div className="lg:w-2/3 space-y-12">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative pl-12 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-gradient-to-b before:from-blue-500 before:to-transparent">
              <div className="absolute left-[-6px] top-2 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
              <p className="text-blue-400 text-sm font-bold fira mb-2 uppercase tracking-tighter">{exp.period}</p>
              <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
              <p className="text-white/60 font-medium mb-4">{exp.company}</p>
              <p className="text-gray-400 leading-relaxed max-w-2xl">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
