
import React, { useState, useEffect } from 'react';

const SUBJECTS = [
  { name: 'Data Structure', color: 'bg-red-500', tasks: ['Complete Quiz', 'Quiz', 'Lab', 'Assignment'] },
  { name: 'Spanish', color: 'bg-green-500', tasks: ['Complete Quiz', 'Assignment'] },
  { name: 'Biology 121', color: 'bg-yellow-500', tasks: ['Complete Quiz', 'Discussion Post', 'Reply to 2 Posts', 'Assignment'] },
  { name: 'Technical Writing', color: 'bg-purple-500', tasks: ['Complete Quiz', 'Discussion Post', 'Reply to 2 Posts', 'Assignment'] },
  { name: 'Web Database', color: 'bg-blue-500', tasks: ['Complete Quiz', 'Discussion Post', 'Reply to 2 Posts', 'Assignment'] },
  { name: 'Management Info', color: 'bg-orange-500', tasks: ['Case Study', 'Excel Assignment', 'Other'] },
];

const AcademicTracker: React.FC = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [progress, setProgress] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(`academicProgressWeek${currentWeek}`);
    if (saved) {
      setProgress(JSON.parse(saved));
    } else {
      setProgress({});
    }
  }, [currentWeek]);

  const toggleTask = (subjectName: string, task: string) => {
    const key = `${subjectName}-${task}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
  };

  const saveProgress = () => {
    localStorage.setItem(`academicProgressWeek${currentWeek}`, JSON.stringify(progress));
    alert('Academic progress synchronized!');
  };

  const clearWeek = () => {
    setProgress({});
  };

  const getSubjectProgress = (subjectName: string, tasks: string[]) => {
    const completed = tasks.filter(task => progress[`${subjectName}-${task}`]).length;
    return (completed / tasks.length) * 100;
  };

  return (
    <section id="tracker" className="py-24">
      <div className="glass-card rounded-[3rem] p-8 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-black mb-2">Academic <span className="text-blue-500">Tracker.</span></h2>
            <p className="text-gray-500 text-sm">Organize your weekly workload at SUNY Farmingdale.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Week</span>
            <select 
              value={currentWeek} 
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              {[...Array(15)].map((_, i) => (
                <option key={i+1} value={i+1} className="bg-slate-900">Week {i+1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUBJECTS.map((subject) => {
            const perc = getSubjectProgress(subject.name, subject.tasks);
            return (
              <div key={subject.name} className="glass-card p-6 rounded-2xl border-t-4 hover:bg-white/5 transition-all" style={{ borderTopColor: subject.color.replace('bg-', '') }}>
                <h3 className="text-lg font-bold mb-6 flex justify-between items-center">
                  {subject.name}
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded-full text-gray-400">{Math.round(perc)}%</span>
                </h3>
                <div className="space-y-3 mb-8">
                  {subject.tasks.map(task => (
                    <div 
                      key={task} 
                      onClick={() => toggleTask(subject.name, task)}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className={`w-5 h-5 rounded border border-white/20 flex items-center justify-center transition-all ${progress[`${subject.name}-${task}`] ? 'bg-blue-500 border-blue-500' : 'group-hover:border-blue-400'}`}>
                        {progress[`${subject.name}-${task}`] && <i className="fa-solid fa-check text-[10px] text-white"></i>}
                      </div>
                      <span className={`text-sm transition-all ${progress[`${subject.name}-${task}`] ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {task}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-700 ${subject.color}`} style={{ width: `${perc}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <button onClick={clearWeek} className="px-6 py-3 border border-red-500/20 text-red-400 hover:bg-red-500/10 rounded-xl text-xs font-bold uppercase transition-all">
            Reset Week
          </button>
          <button onClick={saveProgress} className="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all glow">
            Sync Progress
          </button>
        </div>
      </div>
    </section>
  );
};

export default AcademicTracker;
