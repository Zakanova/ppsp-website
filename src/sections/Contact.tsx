import { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Rate limiting: max 1 submission per 30 seconds
  const RATE_LIMIT_MS = 30000;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Rate limiting check
    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      setIsSubmitting(false);
      setError('Please wait 30 seconds before sending another message.');
      return;
    }

    // Input validation - prevent XSS
    const sanitizedName = formData.name.replace(/[<>]/g, '').trim();
    const sanitizedMessage = formData.message.replace(/[<>]/g, '').trim();
    
    if (sanitizedName.length < 2 || sanitizedMessage.length < 10) {
      setIsSubmitting(false);
      setError('Please enter a valid name and message (min 10 characters).');
      return;
    }
    
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Email configuration missing');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: sanitizedName,
          email: formData.email,
          message: sanitizedMessage,
        },
        publicKey
      );

      setLastSubmitTime(now);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      setIsSubmitting(false);
      setError('Failed to send message. Please try again or call us directly.');
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: 'ADDRESS',
      value: '9095 Elk Grove Blvd Suite B',
      subValue: 'Elk Grove, CA',
    },
    {
      icon: Phone,
      label: 'PHONE',
      value: '916-381-8304',
      subValue: 'Mon-Sat 9AM-5PM',
    },
    {
      icon: Mail,
      label: 'EMAIL',
      value: 'info@ppsprecycling.com',
      subValue: 'We reply within 24hrs',
    },
    {
      icon: Clock,
      label: 'HOURS',
      value: 'Mon - Sat: 9AM - 5PM',
      subValue: 'Sunday: Closed',
    },
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #4af626 1px, transparent 1px),
              linear-gradient(to bottom, #4af626 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
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
            <span className="text-[#4af626] font-mono text-sm tracking-wider">&gt; OPEN.CHANNEL</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#d4a03a]/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
            CONTACT
          </h2>
          <p className="text-[#f0f0f0]/60 max-w-2xl mx-auto">
            Ready to buy, sell, or restore vintage electronics? Get in touch with us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div 
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={info.label}
                  className="glass-panel rounded-lg p-6 group hover:border-[#d4a03a]/50 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4a03a]/10 flex items-center justify-center shrink-0 group-hover:bg-[#d4a03a]/20 transition-colors">
                      <info.icon className="w-5 h-5 text-[#d4a03a]" />
                    </div>
                    <div>
                      <p className="text-xs tracking-[0.15em] text-[#f0f0f0]/50 mb-1">
                        {info.label}
                      </p>
                      <p className="text-[#f0f0f0] font-medium">
                        {info.value}
                      </p>
                      <p className="text-sm text-[#f0f0f0]/60">
                        {info.subValue}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 glass-panel rounded-lg p-1 overflow-hidden">
              <div className="relative h-48 bg-[#1a1a1a] rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 opacity-20">
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, #d4a03a 1px, transparent 0)`,
                      backgroundSize: '20px 20px',
                    }}
                  />
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-[#d4a03a] mx-auto mb-2" />
                  <p className="text-sm text-[#f0f0f0]/60">Elk Grove, California</p>
                  <a 
                    href="https://maps.google.com/?q=9095+Elk+Grove+Blvd+Suite+B+Elk+Grove+CA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#d4a03a] hover:underline mt-1 inline-block"
                  >
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div 
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="glass-panel rounded-lg p-8">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#f0f0f0]/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="ml-4 text-xs font-mono text-[#4af626]">
                  ppsp@terminal:~$ send_message
                </span>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#4af626]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-[#4af626]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#f0f0f0] mb-2">
                    MESSAGE SENT
                  </h3>
                  <p className="text-[#f0f0f0]/60">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p className="text-sm">{error}</p>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs tracking-wider text-[#f0f0f0]/50 mb-2 font-mono">
                      &gt; NAME:
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#f0f0f0]/20 rounded-lg px-4 py-3 text-[#f0f0f0] placeholder-[#f0f0f0]/30 focus:border-[#d4a03a] focus:outline-none transition-colors font-mono"
                      placeholder="Enter your name..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-wider text-[#f0f0f0]/50 mb-2 font-mono">
                      &gt; EMAIL:
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#f0f0f0]/20 rounded-lg px-4 py-3 text-[#f0f0f0] placeholder-[#f0f0f0]/30 focus:border-[#d4a03a] focus:outline-none transition-colors font-mono"
                      placeholder="Enter your email..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-wider text-[#f0f0f0]/50 mb-2 font-mono">
                      &gt; MESSAGE:
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#f0f0f0]/20 rounded-lg px-4 py-3 text-[#f0f0f0] placeholder-[#f0f0f0]/30 focus:border-[#d4a03a] focus:outline-none transition-colors resize-none font-mono"
                      placeholder="Type your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-[#d4a03a] text-[#0a0a0a] font-semibold tracking-wider hover:bg-[#f0d78c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
