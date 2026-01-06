
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { COLORS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    alert(`Thank you for choosing New Jyoti Sweets!\n\nYour order total is ₹${total}.\nThis is a demo, but our treats in Teliyarganj are real!`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center bg-[#4A0404] text-white">
              <div className="flex items-center gap-3">
                <ShoppingCart size={24} />
                <h2 className="text-xl font-bold serif">Your Shopping Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-90">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-40 h-40 bg-[#FFF8E1] rounded-full flex items-center justify-center overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1533777324565-a040eb52facd?q=80&w=400&auto=format&fit=crop" 
                      alt="Empty Plate" 
                      className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm">
                       <ShoppingCart size={48} className="text-[#4A0404]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#4A0404] mb-2">Your cart is empty</h3>
                    <p className="text-sm text-gray-500 font-medium max-w-[200px] mx-auto">
                      Looks like you haven't made your choice yet.
                    </p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-8 py-3 bg-[#E65100] text-white rounded-full font-bold shadow-lg hover:shadow-[#E65100]/30 hover:-translate-y-1 transition-all"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-[#FFF8E1]/30 rounded-2xl border border-gray-100">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#4A0404]">{item.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">₹{item.price} per {item.unit}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-white border rounded-full px-3 py-1">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="hover:text-[#E65100] active:scale-75">
                            <Minus size={16} />
                          </button>
                          <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="hover:text-[#E65100] active:scale-75">
                            <Plus size={16} />
                          </button>
                        </div>
                        <button onClick={() => onRemove(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors active:scale-90">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-[#FFF8E1] border-t space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-2xl font-black text-[#4A0404]">₹{total}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#E65100] text-white font-black text-lg rounded-2xl shadow-xl hover:bg-[#D84315] active:scale-95 transition-all"
                >
                  Proceed to Checkout
                </button>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Secure Payment • Freshness Guaranteed
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
