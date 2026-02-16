import { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Michael Chen',
      role: 'Studio Engineer',
      company: 'RetroSound Studios',
      content: 'PPSP has been my go-to source for vintage audio equipment. Their knowledge and attention to detail is unmatched. Every piece I\'ve purchased has been meticulously tested and accurately described.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Williams',
      role: 'Broadcast Technician',
      company: 'Classic Media Group',
      content: 'Finding reliable vintage broadcast equipment is challenging, but PPSP makes it easy. Their wholesale pricing helped us outfit our entire production facility with quality gear.',
      rating: 5,
    },
    {
      id: 3,
      name: 'David Rodriguez',
      role: 'Collector',
      company: 'Private Collection',
      content: 'I\'ve been collecting vintage test equipment for over a decade. PPSP consistently delivers rare finds that other dealers can\'t source. Their repair services are equally impressive.',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a03a]/5 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div 
          className={`mb-16 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#d4a03a]/50" />
            <span className="text-[#4af626] font-mono text-sm tracking-wider">&gt; SIGNAL.FEEDBACK</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a03a]/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient">
            TESTIMONIALS
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div 
          className={`relative transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Main Card */}
          <div className="relative glass-panel rounded-2xl p-8 lg:p-12 min-h-[400px]">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-[#d4a03a]" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 absolute inset-0 translate-x-8 pointer-events-none'
                  }`}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#d4a03a] text-[#d4a03a]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl lg:text-2xl text-[#f0f0f0]/90 leading-relaxed mb-8">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#d4a03a] to-[#f0d78c] flex items-center justify-center">
                      <span className="text-xl font-bold text-[#0a0a0a]">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#f0f0f0]">{testimonial.name}</p>
                      <p className="text-sm text-[#f0f0f0]/60">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-[#d4a03a]/30 flex items-center justify-center text-[#d4a03a] hover:bg-[#d4a03a]/10 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-[#d4a03a]/30 flex items-center justify-center text-[#d4a03a] hover:bg-[#d4a03a]/10 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-[#d4a03a]' 
                      : 'bg-[#f0f0f0]/20 hover:bg-[#f0f0f0]/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Decorative Circles */}
          <div className="absolute -top-8 -left-8 w-32 h-32 border border-[#d4a03a]/10 rounded-full animate-rotate-slow" />
          <div className="absolute -bottom-8 -right-8 w-24 h-24 border border-[#4af626]/10 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse' }} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
