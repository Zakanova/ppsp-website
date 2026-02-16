import { Zap, Facebook, Instagram, Twitter, Youtube, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'About', href: '#about' },
      { name: 'Inventory', href: '#inventory' },
      { name: 'Services', href: '#services' },
      { name: 'Contact', href: '#contact' },
    ],
    categories: [
      { name: 'Test Equipment', href: '#inventory' },
      { name: 'Video Gear', href: '#inventory' },
      { name: 'Audio Hi-Fi', href: '#inventory' },
      { name: 'Wholesale', href: '#services' },
    ],
    support: [
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Warranty', href: '#' },
      { name: 'FAQ', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[#f0f0f0]/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full border-2 border-[#d4a03a] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#d4a03a]" />
              </div>
              <span className="text-xl font-bold tracking-wider text-[#f0f0f0]">
                PPSP
              </span>
            </a>
            <p className="text-sm text-[#f0f0f0]/60 mb-6 max-w-xs">
              Curators of vintage electronics. Buy, sell, and restore the equipment that shaped modern technology.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-[#f0f0f0]/60 hover:bg-[#d4a03a] hover:text-[#0a0a0a] transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-[#f0f0f0] mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#f0f0f0]/60 hover:text-[#d4a03a] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-[#f0f0f0] mb-4">
              CATEGORIES
            </h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#f0f0f0]/60 hover:text-[#d4a03a] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold tracking-wider text-[#f0f0f0] mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-[#f0f0f0]/60 hover:text-[#d4a03a] transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#f0f0f0]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-[#f0f0f0]/40">
              <span>&copy; {currentYear} PPSP. All rights reserved.</span>
              <span className="hidden sm:inline">|</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-[#d4a03a] transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-[#d4a03a] transition-colors">Terms of Service</a>
              </div>
            </div>

            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-[#f0f0f0]/60 hover:text-[#d4a03a] transition-colors group"
            >
              <span>BACK TO TOP</span>
              <div className="w-8 h-8 rounded-full border border-[#f0f0f0]/20 flex items-center justify-center group-hover:border-[#d4a03a] group-hover:bg-[#d4a03a]/10 transition-all">
                <ArrowUp className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Signal Wave */}
      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden">
        <div className="flex">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{
                background: i % 2 === 0 ? '#d4a03a' : 'transparent',
                opacity: 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
