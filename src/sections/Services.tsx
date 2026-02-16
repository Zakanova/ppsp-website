import { useEffect, useRef, useState } from 'react';
import { DollarSign, ShoppingCart, Wrench, ArrowRightLeft, Search, RefreshCw } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  outcome: string;
  outcomeIcon: React.ElementType;
}

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState<string | null>(null);
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

  const services: Service[] = [
    {
      id: 'buy',
      title: 'WE BUY',
      description: 'Turn your dusty vintage gear into cash. We purchase individual items and entire collections.',
      icon: DollarSign,
      outcome: 'INSTANT CASH',
      outcomeIcon: ArrowRightLeft,
    },
    {
      id: 'sell',
      title: 'WE SELL',
      description: 'Find your next vintage treasure from our curated inventory of tested and guaranteed equipment.',
      icon: ShoppingCart,
      outcome: 'RARE FINDS',
      outcomeIcon: Search,
    },
    {
      id: 'repair',
      title: 'WE REPAIR',
      description: 'Expert restoration services to bring your vintage equipment back to full working condition.',
      icon: Wrench,
      outcome: 'FULLY RESTORED',
      outcomeIcon: RefreshCw,
    },
  ];

  return (
    <section 
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50 L30 50 L30 20 L50 20" fill="none" stroke="#d4a03a" strokeWidth="1"/>
              <path d="M50 0 L50 30 L80 30 L80 50" fill="none" stroke="#d4a03a" strokeWidth="1"/>
              <circle cx="30" cy="50" r="3" fill="#d4a03a"/>
              <circle cx="50" cy="20" r="3" fill="#d4a03a"/>
              <circle cx="80" cy="30" r="3" fill="#d4a03a"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div 
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a03a]/50" />
            <span className="text-[#4af626] font-mono text-sm tracking-wider">&gt; SYSTEM.INTERFACE</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a03a]/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
            SERVICES
          </h2>
          <p className="text-[#f0f0f0]/60 max-w-2xl mx-auto">
            Complete solutions for vintage electronics enthusiasts, collectors, and businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Connection Line (visible on lg screens) */}
              {index < services.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-px">
                  <div 
                    className={`h-full bg-gradient-to-r from-[#d4a03a] to-[#4af626] transition-all duration-700 ${
                      hoveredService === service.id ? 'w-full opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                </div>
              )}

              {/* Card */}
              <div className="relative glass-panel rounded-lg p-8 h-full group hover:border-[#d4a03a]/50 transition-all duration-500">
                {/* Service Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#d4a03a]/10 flex items-center justify-center border border-[#d4a03a]/30 group-hover:bg-[#d4a03a]/20 group-hover:scale-110 transition-all duration-500">
                    <service.icon className="w-8 h-8 text-[#d4a03a]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#f0f0f0] mb-4 tracking-wider">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[#f0f0f0]/60 mb-8 leading-relaxed">
                  {service.description}
                </p>

                {/* Connection Arrow */}
                <div className="flex items-center justify-center my-6">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center border border-[#4af626]/30">
                      <ArrowRightLeft className="w-5 h-5 text-[#4af626]" />
                    </div>
                    {/* Animated pulse rings */}
                    <div className={`absolute inset-0 rounded-full border border-[#4af626]/30 animate-ping ${hoveredService === service.id ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </div>

                {/* Outcome */}
                <div className="text-center">
                  <div className="flex justify-center mb-3">
                    <service.outcomeIcon className="w-6 h-6 text-[#4af626]" />
                  </div>
                  <p className="text-sm tracking-[0.2em] text-[#4af626]">
                    {service.outcome}
                  </p>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 glow-brass pointer-events-none" />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#d4a03a]/0 group-hover:border-[#d4a03a]/50 transition-colors" />
                <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#d4a03a]/0 group-hover:border-[#d4a03a]/50 transition-colors" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#d4a03a]/0 group-hover:border-[#d4a03a]/50 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#d4a03a]/0 group-hover:border-[#d4a03a]/50 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Wholesale Banner */}
        <div 
          className={`mt-16 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative glass-panel rounded-lg p-8 lg:p-12 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4a03a]/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#4af626] animate-signal" />
                  <span className="text-xs tracking-wider text-[#4af626]">WHOLESALE AVAILABLE</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-[#f0f0f0] mb-2">
                  BULK PURCHASES & DEALER INQUIRIES
                </h3>
                <p className="text-[#f0f0f0]/60">
                  Special pricing available for businesses, resellers, and large quantity orders.
                </p>
              </div>
              
              <button className="shrink-0 px-8 py-4 rounded-full border-2 border-[#d4a03a] text-[#d4a03a] font-semibold tracking-wider hover:bg-[#d4a03a] hover:text-[#0a0a0a] transition-all duration-300">
                CONTACT FOR QUOTE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
