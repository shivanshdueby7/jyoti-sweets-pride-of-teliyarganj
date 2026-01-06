
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu as MenuIcon, Moon, Sun, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  onBookingOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onCartOpen, 
  searchQuery, 
  onSearchChange,
  isDarkMode,
  toggleTheme,
  onBookingOpen
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-[#1a0505]/80 backdrop-blur-xl border-b border-[#4A0404]/5 dark:border-white/5 shadow-sm py-2' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 relative z-50">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className={`text-2xl sm:text-3xl font-black tracking-tighter rozha leading-none ${scrolled ? 'text-secondary dark:text-white' : 'text-secondary dark:text-white'}`}>
                JYOTI<span className="text-[#E65100]">.</span>
              </span>
              <span className={`text-[10px] tracking-[0.4em] uppercase font-bold opacity-60 ${scrolled ? 'text-[#3E2723] dark:text-white' : 'text-[#3E2723] dark:text-white'}`}>
                Sweets
              </span>
            </motion.div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {['Menu', 'About', 'Heritage', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all group overflow-hidden ${
                  scrolled ? 'text-[#3E2723] dark:text-white/80' : 'text-[#3E2723] dark:text-white'
                }`}
              >
                <span className="relative z-10 group-hover:text-[#E65100] transition-colors">{link}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#E65100] transition-all duration-300 group-hover:w-1/2"></span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Search - Expandable */}
            <div className="relative flex items-center">
               <motion.div 
                 initial={false}
                 animate={{ width: searchOpen ? 240 : 40, backgroundColor: searchOpen ? 'rgba(255,255,255,0.1)' : 'transparent' }}
                 className={`hidden lg:flex items-center overflow-hidden rounded-full transition-colors border ${
                    searchOpen ? 'border-[#E65100]/30 bg-white/10' : 'border-transparent'
                 }`}
               >
                  <button 
                    onClick={() => setSearchOpen(!searchOpen)}
                    className={`p-2 rounded-full hover:bg-[#E65100]/10 transition-colors ${
                       scrolled ? 'text-secondary dark:text-white' : 'text-secondary dark:text-white'
                    }`}
                  >
                    <Search size={20} />
                  </button>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search menu..."
                    className={`bg-transparent border-none focus:outline-none text-sm px-2 w-full ${
                        scrolled ? 'text-secondary dark:text-white placeholder-secondary/40' : 'text-secondary dark:text-white placeholder-secondary/40'
                    }`}
                    style={{ opacity: searchOpen ? 1 : 0 }}
                  />
               </motion.div>
            </div>

            {/* Theme Toggle */}
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all border ${
                scrolled 
                  ? 'border-[#4A0404]/10 text-secondary dark:text-white dark:border-white/10 hover:bg-[#4A0404]/5' 
                  : 'border-secondary/10 text-secondary dark:text-white bg-white/10 backdrop-blur-md'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            {/* Cart Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCartOpen}
              className="relative p-2.5 rounded-full bg-[#E65100] text-white shadow-lg shadow-[#E65100]/30 hover:bg-[#D84315] transition-colors"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-white text-[#E65100] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#E65100]"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>

             {/* Book Table - Desktop only */}
             <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookingOpen}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-secondary text-white font-medium shadow-xl shadow-secondary/20 hover:bg-[#3E0303] transition-all text-xs tracking-wider uppercase"
            >
              <span>Book Table</span>
            </motion.button>
            
            <button className="md:hidden p-2 text-secondary dark:text-white">
              <MenuIcon size={24} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
