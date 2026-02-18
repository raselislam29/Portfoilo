
import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down past a certain threshold
  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 left-6 z-[60] transition-all duration-300 transform ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
    }`}>
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-12 h-12 md:w-14 md:h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-900/20 transition-all hover:-translate-y-1 active:scale-95 group border border-emerald-400/20"
      >
        <i className="fa-solid fa-chevron-up text-xl group-hover:animate-bounce"></i>
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-lg -z-10 group-hover:bg-emerald-500/40 transition-colors"></div>
      </button>
    </div>
  );
};

export default ScrollToTop;
