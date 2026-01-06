
import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuTabs from './components/MenuTabs';
import ParallaxSection from './components/ParallaxSection';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import CartDrawer from './components/CartDrawer';
import BookingModal from './components/BookingModal';
import Cursor from './components/Cursor';
import { Product, CartItem } from './types';
import { COLORS } from './constants';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden transition-colors duration-500 bg-cream dark:bg-darkbg text-[#3E2723] dark:text-darktext">
      <Cursor />
      
      <div className="fixed inset-0 paisley-pattern pointer-events-none z-0"></div>
      
      <Navbar 
        cartCount={cartCount} 
        onCartOpen={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        onBookingOpen={() => setIsBookingOpen(true)}
      />

      <main className="relative z-10">
        <Hero onBookingOpen={() => setIsBookingOpen(true)} />

        {/* Highlights - About Section */}
        <section id="about" className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
            >
              {[
                { 
                  title: 'Heritage of Prayagraj', 
                  desc: 'A legacy rooted in Teliyarganj, serving recipes passed down through generations of culinary masters.',
                  img: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=800&auto=format&fit=crop'
                },
                { 
                  title: 'Pure Desi Ghee', 
                  desc: 'We pledge purity. Every traditional sweet is crafted in 100% pure Desi Ghee for that unmatched richness.',
                  img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800&auto=format&fit=crop'
                },
                { 
                  title: 'Modern Hygiene', 
                  desc: 'Traditional taste meets contemporary safety. Our state-of-the-art kitchen ensures unmatched quality.',
                  img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop'
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants}
                  className="bg-white dark:bg-darkcard rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group border border-gray-50 dark:border-white/5 overflow-hidden flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden relative bg-gray-200 dark:bg-gray-800">
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                     <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                      <span className="text-primary dark:text-white font-black group-hover:text-white">0{idx + 1}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 serif text-secondary dark:text-white">{item.title}</h3>
                    <p className="text-[#3E2723]/60 dark:text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <MenuTabs onAddToCart={addToCart} searchQuery={searchQuery} />

        {/* Heritage Section */}
        <div id="heritage">
          <ParallaxSection />
        </div>

        {/* Bulk Order / Contact Section */}
        <section id="contact" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="bg-secondary dark:bg-darkcard rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl group transition-colors duration-500"
            >
              {/* Background Image - Festive Lights */}
              <div className="absolute inset-0 z-0 bg-[#4A0404] dark:bg-black">
                <img 
                  src="https://images.unsplash.com/photo-1514525253440-b393452e3720?q=80&w=1600&auto=format&fit=crop" 
                  alt="Celebration Background" 
                  className="w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-secondary/80 dark:bg-black/80"></div>
              </div>
              <div className="absolute inset-0 paisley-pattern opacity-10 z-0"></div>

              <div className="relative z-10">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-8 serif"
                >
                  Celebrate with Sweetness
                </motion.h2>
                <motion.p 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                   className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                  From grand weddings to intimate gatherings, make every moment memorable with our premium gift hampers. Customized for your special occasions.
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => alert("Brochure Download Started!")}
                    className="px-12 py-5 rounded-full text-white font-black bg-primary hover:scale-105 active:scale-95 transition-all shadow-xl"
                  >
                    Download Brochure
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = 'mailto:info@newjyotisweets.com'}
                    className="px-12 py-5 rounded-full font-black border-2 border-white/30 active:scale-95 transition-all"
                  >
                    Enquire for Events
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <AIAssistant />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
};

export default App;
