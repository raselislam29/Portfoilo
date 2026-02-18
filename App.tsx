
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Terminal from './components/Terminal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'education', 'certificates', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && 
            scrollPosition >= element.offsetTop && 
            scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-emerald-500/30">
      {/* Dynamic Security-Themed Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-emerald-600/10 rounded-full mix-blend-screen filter blur-[150px] animate-blob"></div>
        <div className="absolute top-[30%] right-[-15%] w-[900px] h-[900px] bg-emerald-900/5 rounded-full mix-blend-screen filter blur-[150px] animate-blob [animation-delay:2s]"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[700px] h-[700px] bg-slate-800/20 rounded-full mix-blend-screen filter blur-[150px] animate-blob [animation-delay:4s]"></div>
      </div>

      <Navbar activeSection={activeSection} />
      
      <main className="container mx-auto px-6 xl:px-12">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Certifications />
        <Projects />
        <Contact />
      </main>

      <Footer />
      <ChatBot />
      <Terminal />
      <ScrollToTop />
    </div>
  );
};

export default App;
