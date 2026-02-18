
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Featured <span className="gradient-text">Analysis.</span></h2>
        <p className="text-gray-400 max-w-xl mx-auto italic fira text-sm">"Data is a precious thing and will last longer than the systems themselves."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <div 
            key={project.id} 
            className="group glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-full transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/10"
          >
            <div className="relative h-52 overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1"
                >
                  <i className="fa-brands fa-github text-xl"></i>
                </a>
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1"
                  >
                    <i className="fa-solid fa-link text-xl"></i>
                  </a>
                )}
              </div>
            </div>
            
            <div className="p-7 flex-1 flex flex-col">
              <h3 className="text-xl font-black mb-3 text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {project.description}
              </p>
              
              <div className="mb-6 pt-4 border-t border-white/5">
                <p className="text-[10px] text-emerald-500/70 uppercase tracking-[0.2em] font-black mb-3 fira underline decoration-emerald-500/20 underline-offset-4">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-emerald-500/5 text-emerald-400 text-[10px] font-bold rounded border border-emerald-500/10 fira hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4 flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-gray-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Analysis Ready
                </span>
                <i className="fa-solid fa-chevron-right text-emerald-500 group-hover:translate-x-2 transition-transform"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
