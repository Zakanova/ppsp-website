import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Package, Award } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Package, value: '10,000+', label: 'UNITS SOLD' },
    { icon: Users, value: '500+', label: 'CLIENTS' },
    { icon: TrendingUp, value: '15+', label: 'YEARS EXPERIENCE' },
    { icon: Award, value: '100%', label: 'SATISFACTION' },
  ];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #d4a03a 1px, transparent 1px),
              linear-gradient(to bottom, #d4a03a 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[#4af626] font-mono text-sm tracking-wider">&gt; SYSTEM.INFO</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#d4a03a]/50 to-transparent" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
            ABOUT THE SYSTEM
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div 
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-lg sm:text-xl text-[#f0f0f0]/80 leading-relaxed">
              We are <span className="text-[#d4a03a] font-semibold">PPSP</span>, curators of the analog era. 
              From oscilloscopes to reel-to-reel decks, we buy, sell, and restore the equipment 
              that shaped modern technology.
            </p>
            
            <p className="text-base text-[#f0f0f0]/60 leading-relaxed">
              Located in Elk Grove, California, we specialize in vintage test equipment, 
              professional video gear, and high-end audio equipment. Our mission is to preserve 
              the legacy of analog technology while providing wholesale solutions for businesses 
              and collectors worldwide.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 text-[#4af626]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4af626]" />
                <span className="text-sm tracking-wider">TEST EQUIPMENT</span>
              </div>
              <div className="flex items-center gap-2 text-[#4af626]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4af626]" />
                <span className="text-sm tracking-wider">VIDEO GEAR</span>
              </div>
              <div className="flex items-center gap-2 text-[#4af626]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4af626]" />
                <span className="text-sm tracking-wider">AUDIO HI-FI</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div 
            className={`relative transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative group">
              {/* Circuit Border Effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#d4a03a]/20 via-transparent to-[#d4a03a]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg circuit-border">
                <img 
                  src="/about-image.jpg" 
                  alt="Vintage electronics workshop"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                
                {/* Corner Accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#d4a03a]" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#d4a03a]" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#d4a03a]" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#d4a03a]" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 glass-panel rounded-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4a03a]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#d4a03a]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#f0f0f0]/60 tracking-wider">ESTABLISHED</p>
                    <p className="text-lg font-bold text-[#d4a03a]">2009</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div 
          className={`grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="group relative glass-panel rounded-lg p-6 text-center hover:border-[#d4a03a]/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#d4a03a]/10 flex items-center justify-center group-hover:bg-[#d4a03a]/20 transition-colors">
                  <stat.icon className="w-6 h-6 text-[#d4a03a]" />
                </div>
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </p>
              <p className="text-xs tracking-[0.15em] text-[#f0f0f0]/60">
                {stat.label}
              </p>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-brass pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
