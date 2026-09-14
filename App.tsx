import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import About from './components/About';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import './styles.css';
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  useEffect(() => {
    const update = () => {
      const sections = [...document.querySelectorAll<HTMLElement>('main > section[id]')];
      const active = sections.filter(section => section.getBoundingClientRect().top <= 160).pop();
      setActiveSection(active?.id ?? 'home');
    };
    update(); window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar activeSection={activeSection} /><main id="main"><Hero /><Experience /><Projects /><About /><Education /><Certifications /><Contact /></main><Footer /><ChatBot /></>;
}
