
import React, { useState } from 'react';

interface NavbarProps {
  activeSection: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Edu', id: 'education' },
    { name: 'Certs', id: 'certificates' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 glass-card rounded-2xl px-6 py-3 border border-emerald-500/10">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-black tracking-tighter">
          <span className="text-white">RASEL</span>
          <span className="text-emerald-500">.</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a 
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative text-[10px] font-black uppercase tracking-widest transition-all hover:text-white nav-link ${
                  activeSection === link.id ? 'text-emerald-400' : 'text-gray-500'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden md:block px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Hire Analyst
          </a>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full mt-4 glass-card rounded-2xl py-6 animate-in fade-in zoom-in duration-200">
          <ul className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a 
                  href={`#${link.id}`}
                  className={`text-sm font-black uppercase tracking-widest ${
                    activeSection === link.id ? 'text-emerald-400' : 'text-white'
                  }`}
                  onClick={(e) => handleNavClick(e, link.id)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
