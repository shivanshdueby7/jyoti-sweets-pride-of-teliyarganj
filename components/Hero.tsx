
import React from 'react';
import { motion, useMotionValue, useSpring, Variants } from 'framer-motion';

interface HeroProps {
  onBookingOpen: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookingOpen }) => {
  // Mouse parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Reduced sensitivity for subtler movement
    const x = (clientX - innerWidth / 2) / 40;
    const y = (clientY - innerHeight / 2) / 40;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springConfig = { damping: 50, stiffness: 400 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Floating animations
  const floatingVariant: Variants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  const floatingVariantReverse: Variants = {
    initial: { y: 0, rotate: 0 },
    animate: {
      y: [0, 10, 0],
      rotate: [0, -1, 1, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section 
      id="home" 
      onMouseMove={handleMouseMove}
      className="relative min-h-[100vh] flex items-center pt-32 pb-20 overflow-hidden bg-cream dark:bg-darkbg transition-colors duration-500"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 paisley-pattern pointer-events-none opacity-[0.03] z-0"></div>
      
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center z-10 w-full relative">
        
        {/* Left Side: Text Content */}
        <motion.div 
          className="text-left relative z-30 order-2 lg:order-1 flex flex-col justify-center"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#4A0404]/5 dark:bg-white/5 text-[#4A0404] dark:text-[#FFD700] font-black text-[10px] tracking-[0.3em] uppercase mb-6 border border-[#4A0404]/10 dark:border-white/10 w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-[#E65100] animate-ping"></span>
            Serving Joy Since 1995
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[6rem] font-black leading-[0.95] tracking-tighter mb-8 text-secondary dark:text-white transition-colors duration-500">
            Royal Flavors, <br />
            <span className="text-[#E65100] italic relative inline-block whitespace-nowrap">
              Timeless
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3" 
                viewBox="0 0 100 12" 
                preserveAspectRatio="none"
              >
                <motion.path 
                  d="M0 10 Q 50 0 100 10" 
                  stroke="#FFD700" 
                  strokeWidth="4" 
                  fill="transparent"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                />
              </svg>
            </span>
            <br />Tradition
          </h1>

          <p className="text-lg md:text-xl text-[#3E2723]/70 dark:text-white/70 mb-10 max-w-lg leading-relaxed font-normal">
            Experience the authentic essence of Prayagraj. Handcrafted sweets and savory delights, made with pure love and premium ingredients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start">
            <motion.button 
              onClick={() => scrollToSection('menu')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg bg-[#E65100] hover:bg-[#D84315] flex items-center justify-center gap-2 group transition-all"
            >
              Explore Menu
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.button>
            <motion.button 
              onClick={onBookingOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full font-bold text-lg border-2 border-[#4A0404]/20 dark:border-white/20 text-[#4A0404] dark:text-white hover:bg-[#4A0404] hover:text-white dark:hover:bg-white dark:hover:text-[#4A0404] transition-all"
            >
              Book a Table
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: The Sun Composition */}
        <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center z-20 order-1 lg:order-2 overflow-visible">
          
          {/* Parallax Container */}
          <motion.div 
            style={{ x: smoothX, y: smoothY }}
            className="relative w-[300px] h-[300px] sm:w-[450px] sm:h-[450px]"
          >
            {/* 
               Group Sun + Cake in one floating container to keep them synced.
            */}
            <motion.div 
              variants={floatingVariantReverse}
              initial="initial"
              animate="animate"
              className="relative w-full h-full z-20"
            >
              {/* --- BACKGROUND ELEMENTS (Absolute Center relative to this container) --- */}
              
              {/* Glow */}
              <motion.div 
                 style={{ x: "-50%", y: "-50%" }}
                 className="absolute top-1/2 left-1/2 w-[160%] h-[160%] rounded-full bg-gradient-to-tr from-[#E65100] via-[#FFD700] to-[#FFF8E1] blur-[60px] opacity-40 dark:opacity-20 pointer-events-none -z-10"
                 animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Outer Ring */}
              <motion.div 
                style={{ x: "-50%", y: "-50%" }}
                className="absolute top-1/2 left-1/2 w-[130%] h-[130%] rounded-full border border-[#4A0404]/10 dark:border-white/10 border-dashed pointer-events-none -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Ring */}
              <motion.div 
                style={{ x: "-50%", y: "-50%" }}
                className="absolute top-1/2 left-1/2 w-[110%] h-[110%] rounded-full border border-[#E65100]/20 pointer-events-none -z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* --- FOREGROUND ELEMENTS --- */}

              {/* Cake Image */}
              <div className="w-full h-full rounded-full overflow-hidden border-[8px] border-white dark:border-[#2C0A0A] shadow-2xl bg-gray-200 relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop" 
                  alt="Chocolate Cake" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badge */}
               <motion.div 
                className="absolute bottom-6 right-0 sm:bottom-10 sm:-right-4 bg-[#4A0404] text-[#FFD700] w-20 h-20 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-4 border-[#FFD700] z-50"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest">Since</span>
                <span className="text-xl sm:text-3xl rozha leading-none">1995</span>
              </motion.div>
            </motion.div>

            {/* --- SATELLITES (Independent Floating) --- */}
            
            {/* Pizza (Bottom Left) */}
            <motion.div 
              variants={floatingVariant}
              initial="initial"
              animate="animate"
              className="absolute -bottom-10 -left-4 sm:-bottom-12 sm:-left-12 w-28 h-28 sm:w-40 sm:h-40 z-30 bg-white dark:bg-darkcard rounded-full p-2 shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop" 
                alt="Pizza" 
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>

            {/* Samosa (Top Left) */}
            <motion.div 
               variants={floatingVariantReverse}
               initial="initial"
               animate="animate"
               className="absolute -top-4 -left-8 sm:-top-8 sm:-left-16 w-24 h-24 sm:w-32 sm:h-32 z-10 bg-white dark:bg-darkcard rounded-full p-1.5 shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=400&auto=format&fit=crop" 
                alt="Samosa" 
                className="w-full h-full object-cover rounded-full"
              />
            </motion.div>
             
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
