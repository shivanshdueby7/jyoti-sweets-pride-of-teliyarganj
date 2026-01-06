
import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight, ArrowUp } from 'lucide-react';
import { COLORS } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#120404] text-white relative overflow-hidden">
      {/* Massive Watermark */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-[0.03]">
         <span className="text-[20vw] font-black leading-none whitespace-nowrap rozha text-[#FFD700]">PRAYAGRAJ</span>
      </div>

      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Column - Wider */}
          <div className="lg:col-span-5 space-y-8 pr-8">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="inline-block"
            >
              <h3 className="text-5xl font-black rozha tracking-tight leading-[0.9] mb-2 text-white">
                NEW JYOTI<br /><span className="text-[#E65100]">SWEETS</span>
              </h3>
              <div className="h-1 w-20 bg-[#E65100] rounded-full"></div>
            </motion.div>
            
            <p className="text-white/60 leading-relaxed text-lg font-light max-w-md">
              More than just a sweet shop, we are a culinary landmark of Teliyarganj. Crafting memories with pure Desi Ghee and traditional recipes since 1995.
            </p>
            
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Facebook, url: '#' },
                { Icon: Instagram, url: '#' },
                { Icon: Twitter, url: '#' }
              ].map((item, i) => (
                <a key={i} href={item.url} className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#E65100] hover:border-[#E65100] transition-all group">
                  <item.Icon size={18} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Menu', 'Heritage', 'Contact'].map(link => (
                <li key={link} onClick={() => scrollToSection(link.toLowerCase())} className="text-white/50 hover:text-white cursor-pointer transition-colors text-sm font-medium">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Favorites Column */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">Classics</h4>
            <ul className="space-y-4">
              {['Motichoor Laddu', 'Kaju Katli', 'Rasmalai', 'Samosa'].map(link => (
                <li key={link} className="text-white/50 hover:text-white cursor-pointer transition-colors text-sm font-medium">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#FFD700]">Visit Us</h4>
            <div className="space-y-6 text-white/60 text-sm leading-relaxed">
              <div className="flex gap-4 items-start">
                <MapPin size={20} className="text-[#E65100] shrink-0 mt-1" />
                <p>40/22A, Teliyarganj,<br />Near MNNIT Gate,<br />Prayagraj, Uttar Pradesh 211004</p>
              </div>
              <div className="flex gap-4 items-center">
                <Phone size={20} className="text-[#E65100] shrink-0" />
                <p>+91 94506 00000</p>
              </div>
              <div className="flex gap-4 items-center">
                <Mail size={20} className="text-[#E65100] shrink-0" />
                <p>hello@jyotisweets.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/30 text-[10px] uppercase tracking-widest font-bold">
          <p>© 2024 New Jyoti Sweets. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <span>Privacy Policy</span>
             <span>Terms of Service</span>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:text-[#E65100] transition-colors"
          >
            Back to Top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
