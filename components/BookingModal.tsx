
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep('form'), 500); // Reset after close animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-darkcard rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 relative"
          >
            {/* Header */}
            <div className="bg-secondary p-6 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 paisley-pattern opacity-10"></div>
              <h2 className="text-2xl font-bold serif relative z-10">
                {step === 'form' ? 'Reserve Your Table' : 'Booking Confirmed'}
              </h2>
              <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors relative z-10">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              {step === 'form' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                        <input 
                          type="date" 
                          required
                          className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Time</label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                        <select className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3 focus:ring-2 focus:ring-primary outline-none appearance-none dark:text-white">
                          <option>7:00 PM</option>
                          <option>8:00 PM</option>
                          <option>9:00 PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                      <input 
                        type="number" 
                        min="1" 
                        max="20"
                        placeholder="Number of guests"
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-12 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Contact Details</label>
                    <input 
                      type="text" 
                      placeholder="Your Full Name"
                      required
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 mb-3 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number"
                      required
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none dark:text-white"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-orange-700 active:scale-95 transition-all disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : 'Confirm Reservation'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="text-green-600 dark:text-green-400 w-12 h-12" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-secondary dark:text-white mb-2">Table Reserved!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">
                    We look forward to serving you. A confirmation SMS has been sent to your phone.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="px-8 py-3 border-2 border-secondary dark:border-white/30 text-secondary dark:text-white font-bold rounded-full hover:bg-secondary hover:text-white dark:hover:bg-white dark:hover:text-secondary transition-all"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
