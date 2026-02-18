
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="glass-card rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row gap-16 overflow-hidden relative">
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-black mb-6">Let's <span className="gradient-text">Connect.</span></h2>
          <p className="text-gray-400 text-lg mb-10">
            Have a project in mind or just want to chat? I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                <i className="fa-solid fa-envelope text-xl"></i>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Email</p>
                <p className="text-white font-medium">{PERSONAL_INFO.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                <i className="fa-solid fa-location-dot text-xl"></i>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Location</p>
                <p className="text-white font-medium">{PERSONAL_INFO.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Message</label>
              <textarea 
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all resize-none"
                placeholder="How can I help you?"
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white font-bold rounded-xl transition-all glow active:scale-95 flex items-center justify-center gap-2"
            >
              {status === 'idle' && <>Send Message <i className="fa-solid fa-paper-plane"></i></>}
              {status === 'sending' && <>Sending... <i className="fa-solid fa-circle-notch animate-spin"></i></>}
              {status === 'sent' && <>Sent Successfully! <i className="fa-solid fa-check"></i></>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
