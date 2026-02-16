import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'INVENTORY', href: '#inventory' },
    { name: 'SERVICES', href: '#services' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 px-4 sm:px-6 lg:px-8' 
            : 'py-6 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div 
          className={`mx-auto max-w-7xl transition-all duration-500 ${
            isScrolled 
              ? 'glass-panel rounded-full px-6 py-3' 
              : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full border-2 border-[#d4a03a] flex items-center justify-center group-hover:bg-[#d4a03a] transition-colors duration-300">
                <Zap className="w-5 h-5 text-[#d4a03a] group-hover:text-[#0a0a0a] transition-colors duration-300" />
              </div>
              <span className="text-xl font-bold tracking-wider text-[#f0f0f0] hidden sm:block">
                PPSP
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="bracket-hover text-sm tracking-[0.15em] text-[#f0f0f0]/70 hover:text-[#d4a03a] transition-colors duration-300 py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Status Indicator */}
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4af626] animate-signal" />
              <span className="text-xs tracking-wider text-[#4af626]/70 font-mono">
                ONLINE
              </span>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-[#f0f0f0] hover:text-[#d4a03a] transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className={`text-2xl tracking-[0.2em] text-[#f0f0f0] hover:text-[#d4a03a] transition-all duration-500 ${
                isMobileMenuOpen 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          
          <div 
            className={`flex items-center gap-2 mt-8 transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#4af626] animate-signal" />
            <span className="text-sm tracking-wider text-[#4af626] font-mono">
              SYSTEM ONLINE
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
