
import React from 'react';
import { SKILLS } from '../constants';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const Skills: React.FC = () => {
  const radarData = SKILLS.map(skill => ({
    subject: skill.name,
    A: skill.level,
    fullMark: 100,
  }));

  return (
    <section id="skills" className="py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Technical <span className="gradient-text">Arsenal.</span></h2>
        <p className="text-gray-400 max-w-xl mx-auto">Multidisciplinary proficiency in system defense, analytical tools, and secure networking.</p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="w-full lg:w-1/2 h-[400px] glass-card p-6 rounded-[2.5rem] border border-emerald-500/10 relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
              <Radar
                name="Proficiency"
                dataKey="A"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {SKILLS.map((skill) => (
            <div 
              key={skill.name} 
              className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-emerald-500/50 transition-all hover:-translate-y-2 cursor-default group"
            >
              <i className={`${skill.icon} text-3xl text-gray-500 group-hover:text-emerald-500 transition-colors`}></i>
              <span className="text-[11px] font-black uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors">{skill.name}</span>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 glass-card rounded-3xl border border-emerald-500/10">
          <h4 className="text-emerald-400 font-black mb-4 uppercase tracking-widest text-xs">Networking & Systems</h4>
          <p className="text-gray-400 text-sm leading-relaxed">TCP/IP, DNS, HTTP, SSH, OSI Model, Routing & Switching, Active Directory, Linux/Unix</p>
        </div>
        <div className="p-8 glass-card rounded-3xl border border-blue-500/10">
          <h4 className="text-blue-400 font-black mb-4 uppercase tracking-widest text-xs">Security Tooling</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Wireshark, Nmap, Splunk, OWASP ZAP, Hashcat, John the Ripper</p>
        </div>
        <div className="p-8 glass-card rounded-3xl border-white/5">
          <h4 className="text-white font-black mb-4 uppercase tracking-widest text-xs">Domains</h4>
          <p className="text-gray-400 text-sm leading-relaxed">Incident Response, Vulnerability Assessment, NIST CSF, SOC & ISO Concepts</p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
