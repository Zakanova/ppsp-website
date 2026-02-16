import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Activity, Video, Music } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: React.ElementType;
  items: string[];
}

const Inventory = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const categories: Category[] = [
    {
      id: 'test',
      title: 'TEST EQUIPMENT',
      subtitle: 'Precision Instruments',
      description: 'Professional-grade test and measurement equipment for engineers, technicians, and hobbyists.',
      image: '/category-test.jpg',
      icon: Activity,
      items: ['Oscilloscopes', 'Multimeters', 'Signal Generators', 'Power Supplies', 'Spectrum Analyzers'],
    },
    {
      id: 'video',
      title: 'VIDEO GEAR',
      subtitle: 'Broadcast & Production',
      description: 'Vintage broadcast cameras, switchers, and production equipment from the golden age of television.',
      image: '/category-video.jpg',
      icon: Video,
      items: ['Broadcast Cameras', 'Video Switchers', 'Monitors', 'VTRs', 'Time Base Correctors'],
    },
    {
      id: 'audio',
      title: 'AUDIO HI-FI',
      subtitle: 'Vintage Sound Systems',
      description: 'High-end audio equipment including tube amplifiers, reel-to-reel decks, and studio gear.',
      image: '/category-audio.jpg',
      icon: Music,
      items: ['Tube Amplifiers', 'Reel-to-Reel', 'Mixing Consoles', 'Microphones', 'Speakers'],
    },
  ];

  return (
    <section 
      id="inventory"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #d4a03a 1px, transparent 0)`,
            backgroundSize: '40px 40px',
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
            <span className="text-[#4af626] font-mono text-sm tracking-wider">&gt; INVENTORY.RACKS</span>
            <div className="flex-1 h-px bg-gradient-to-r from-[#d4a03a]/50 to-transparent" />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
              INVENTORY RACKS
            </h2>
            <p className="text-[#f0f0f0]/60 max-w-md">
              Browse our extensive collection of vintage electronics, 
              meticulously curated and tested for quality.
            </p>
          </div>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              onMouseEnter={() => setActiveCard(category.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card Container */}
              <div className="relative h-[500px] rounded-lg overflow-hidden circuit-border">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                </div>

                {/* LED Indicators */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeCard === category.id 
                          ? 'bg-[#4af626] shadow-[0_0_10px_#4af626]' 
                          : 'bg-[#f0f0f0]/20'
                      }`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#d4a03a]/20 flex items-center justify-center border border-[#d4a03a]/30 group-hover:bg-[#d4a03a]/30 transition-colors">
                      <category.icon className="w-7 h-7 text-[#d4a03a]" />
                    </div>
                  </div>

                  {/* Title */}
                  <p className="text-xs tracking-[0.2em] text-[#d4a03a]/70 mb-2">
                    {category.subtitle}
                  </p>
                  <h3 className="text-2xl font-bold text-[#f0f0f0] mb-3 tracking-wider">
                    {category.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-[#f0f0f0]/60 mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  {/* Items List */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.items.map((item) => (
                      <span 
                        key={item}
                        className="text-xs px-3 py-1 rounded-full bg-[#1a1a1a]/80 text-[#f0f0f0]/70 border border-[#f0f0f0]/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="flex items-center gap-2 text-[#d4a03a] text-sm tracking-wider group/btn">
                    <span>EXPLORE CATEGORY</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Rack Mount Screws */}
                <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-[#d4a03a]/30" />
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#d4a03a]/30" />
                <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-[#d4a03a]/30" />
                <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-[#d4a03a]/30" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-[#f0f0f0]/60 mb-6">
            Can&apos;t find what you&apos;re looking for? We source rare items on request.
          </p>
          <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#d4a03a] text-[#0a0a0a] font-semibold tracking-wider hover:bg-[#f0d78c] transition-colors duration-300">
            <span>REQUEST ITEM</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
