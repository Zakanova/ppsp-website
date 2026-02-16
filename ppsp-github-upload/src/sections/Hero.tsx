import { useEffect, useRef, useState } from 'react';
import { Power, ChevronDown } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    // Oscilloscope wave animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    
    let time = 0;
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.strokeStyle = '#4af626';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#4af626';
      
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + 
          Math.sin((x + time) * 0.01) * 50 * Math.sin(time * 0.02) +
          Math.sin((x + time * 2) * 0.02) * 30;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      time += 2;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </div>
      
      {/* Oscilloscope Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-[1] opacity-30 pointer-events-none"
      />
      
      {/* Scanline Effect */}
      <div className="absolute inset-0 z-[2] scanline pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Status Indicator */}
        <div 
          className={`flex items-center justify-center gap-2 mb-8 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#4af626] animate-signal" />
          <span className="text-xs tracking-[0.3em] text-[#4af626] font-mono">
            SYSTEM ONLINE
          </span>
        </div>
        
        {/* Main Title */}
        <h1 className="mb-6">
          <span 
            className={`block text-7xl sm:text-8xl md:text-9xl font-black tracking-[0.1em] text-gradient transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            PPSP
          </span>
        </h1>
        
        {/* Subtitle */}
        <p 
          className={`text-lg sm:text-xl md:text-2xl tracking-[0.2em] text-[#f0f0f0]/80 mb-4 transition-all duration-1000 delay-500 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          VINTAGE ELECTRONICS & TEST EQUIPMENT
        </p>
        
        {/* Tagline */}
        <p 
          className={`text-sm sm:text-base tracking-wider text-[#d4a03a]/70 mb-12 transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          BUY • SELL • WHOLESALE
        </p>
        
        {/* CTA Button */}
        <div 
          className={`transition-all duration-1000 delay-1000 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        >
          <button 
            onClick={scrollToAbout}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-transparent border-2 border-[#d4a03a] text-[#d4a03a] font-semibold tracking-wider hover:bg-[#d4a03a] hover:text-[#0a0a0a] transition-all duration-500 animate-pulse-glow"
          >
            <Power className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
            <span>POWER ON</span>
          </button>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-8 bg-[#d4a03a]/20 rounded-full"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="flex flex-col gap-2">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="w-1 h-8 bg-[#4af626]/20 rounded-full"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-1000 delay-[1200ms] ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <button 
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-2 text-[#f0f0f0]/50 hover:text-[#d4a03a] transition-colors"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#d4a03a]/30 hidden lg:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#d4a03a]/30 hidden lg:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#d4a03a]/30 hidden lg:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#d4a03a]/30 hidden lg:block" />
    </section>
  );
};

export default Hero;
