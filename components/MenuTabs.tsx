
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Category, Product } from '../types';
import { PRODUCTS } from '../constants';
import { Plus, Star, Leaf, Search } from 'lucide-react';

interface MenuTabsProps {
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

const ProductCard = ({ product, onAddToCart, index }: { product: Product, onAddToCart: (p: Product) => void, index: number }) => {
  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-white dark:bg-[#1E0808] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:shadow-2xl hover:shadow-orange-500/10 transition-shadow duration-500 flex flex-col h-full"
    >
      {/* Card Header / Image */}
      <div className="relative h-64 p-4 transform-style-3d">
        <div className="absolute inset-0 bg-[#FFF8E1] dark:bg-black/20 z-0"></div>
        
        {/* Badges */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-2 items-start translate-z-20">
          {product.bestSeller && (
            <span className="bg-[#FFD700] text-[#4A0404] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
              <Star size={10} fill="currentColor" /> Bestseller
            </span>
          )}
          {product.category === Category.Ghee && (
            <span className="bg-white/80 backdrop-blur-sm text-[#E65100] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-[#E65100]/20">
              Pure Ghee
            </span>
          )}
        </div>

        {/* Image */}
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative z-10 shadow-inner group-hover:shadow-lg transition-all duration-500 bg-white">
           <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pt-2 flex-1 flex flex-col relative z-20 bg-white dark:bg-[#1E0808]">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1 block">{product.category}</span>
            <h3 className="text-xl font-bold serif text-[#2D2D2D] dark:text-white group-hover:text-[#E65100] transition-colors leading-tight">
              {product.name}
            </h3>
          </div>
          <div className="bg-[#FFF8E1] dark:bg-white/5 px-2 py-1 rounded-lg">
             <Leaf size={14} className="text-green-600" />
          </div>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 font-light line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
           <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold">Price</span>
              <div className="flex items-baseline gap-1">
                 <span className="text-2xl font-black text-[#E65100] rozha">₹{product.price}</span>
                 <span className="text-xs text-gray-400 font-medium">/ {product.unit}</span>
              </div>
           </div>
           
           <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             onClick={(e) => {
               e.stopPropagation();
               onAddToCart(product);
             }}
             className="w-12 h-12 rounded-full bg-[#2D2D2D] dark:bg-white text-white dark:text-[#2D2D2D] flex items-center justify-center hover:bg-[#E65100] dark:hover:bg-[#E65100] dark:hover:text-white transition-colors shadow-lg shadow-black/10 group/btn"
           >
              <Plus size={20} className="transform group-hover/btn:rotate-90 transition-transform duration-300" />
           </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const MenuTabs: React.FC<MenuTabsProps> = ({ onAddToCart, searchQuery }) => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.All);
  const categories = Object.values(Category);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === Category.All || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="menu" className="py-32 bg-gray-50 dark:bg-darkbg relative overflow-hidden transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             className="text-[#E65100] font-black tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Curated Selection
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 text-secondary dark:text-white tracking-tight"
          >
            Taste the <span className="text-[#E65100] serif italic">Tradition</span>
          </motion.h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light">
            Each recipe is a chapter of our history, crafted with patience and served with pride.
          </p>
        </div>

        {/* Animated Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-16 relative z-30">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 py-3 rounded-full text-sm font-bold transition-colors duration-300 ${
                activeCategory === cat ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-[#E65100]"
              }`}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#E65100] rounded-full shadow-lg shadow-[#E65100]/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 opacity-50">
             <p className="text-2xl serif">No delights found matching your taste.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default MenuTabs;
