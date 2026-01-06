
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const CountUp = ({ to, suffix = '', duration = 2 }: { to: number; suffix?: string; duration?: number }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    
    const controls = animate(0, to, {
      duration: duration,
      ease: "easeOut",
      onUpdate(value) {
        if (node) {
          node.textContent = Math.floor(value) + suffix;
        }
      }
    });
    
    return () => controls.stop();
  }, [to, inView, suffix, duration]);
  
  return <div ref={nodeRef} className="text-4xl md:text-5xl font-black mb-2 tabular-nums text-[#FFD700]" />;
};

const ParallaxSection: React.FC = () => {
  return (
    <section className="relative py-40 overflow-hidden bg-[#2C0A0A]">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="w-full h-full"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 12, ease: "linear" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2000&auto=format&fit=crop" 
            alt="Spices and Sweets Background" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay grayscale"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120404] via-[#2C0A0A]/90 to-[#120404]"></div>
      </div>
      
      {/* Paisley Pattern Overlay */}
      <div className="absolute inset-0 paisley-pattern z-0 opacity-5"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-24 h-24 rounded-full border border-[#FFD700]/30 flex items-center justify-center mx-auto mb-10 bg-[#FFD700]/5 backdrop-blur-sm"
          >
             <span className="text-4xl">👑</span>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-black mb-8 serif tracking-tight rozha text-white">
            The Pride of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#E65100]">Teliyarganj</span>
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl leading-relaxed text-white/60 font-light mb-16">
              New Jyoti Sweets isn't just a shop; it's a landmark of trust. For over 25 years, we have been waking up Prayagraj with the aroma of Desi Ghee and the warmth of hospitality.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: 'Years Legacy', val: 25, suffix: '+' },
                { label: 'Happy Customers', val: 1, suffix: 'M+' },
                { label: 'Varieties', val: 200, suffix: '+' },
                { label: 'Pure Ghee', val: 100, suffix: '%' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center p-6 border-l border-white/5"
                >
                  <CountUp to={stat.val} suffix={stat.suffix} />
                  <div className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxSection;
