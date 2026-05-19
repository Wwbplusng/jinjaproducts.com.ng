import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Leaf, ShieldCheck, Truck, FlaskConical, MessageCircle, Lock, Menu, X, ChevronRight, Phone, Mail } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SidebarCart } from './SidebarCart';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems, setIsCartOpen, clearCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Join Us', path: '/join-us' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-herb-bg font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/">
              <img src="http://desirebrand.com/images1/jinjalogo.png" alt="Jinja Logo" className="h-10 md:h-12 w-auto" />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`font-medium transition-colors ${location.pathname === link.path ? 'text-herb-primary' : 'text-gray-600 hover:text-herb-primary'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-herb-primary text-herb-primary rounded-xl font-medium hover:bg-herb-primary hover:text-white transition-all transform hover:scale-105 active:scale-95"
            id="cart-btn"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-herb-primary text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-sm:w-[85%] max-w-sm bg-white z-[70] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <img src="http://desirebrand.com/images1/jinjalogo.png" alt="Jinja Logo" className="h-8 w-auto" />
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-8 px-6">
                <div className="space-y-4">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.path} 
                      to={link.path} 
                      className={`flex items-center justify-between p-4 rounded-2xl font-bold transition-all ${
                        location.pathname === link.path 
                          ? 'bg-herb-primary text-white shadow-lg shadow-herb-primary/20 scale-[1.02]' 
                          : 'text-gray-600 hover:bg-gray-50 active:scale-95'
                      }`}
                    >
                      {link.name}
                      <ChevronRight className={`w-5 h-5 ${location.pathname === link.path ? 'text-white/70' : 'text-gray-300'}`} />
                    </Link>
                  ))}
                </div>

                <div className="mt-12 p-6 bg-herb-bg rounded-3xl border border-herb-secondary/10">
                  <h4 className="text-[10px] font-black text-herb-primary uppercase tracking-[0.2em] mb-4">Support & Inquiry</h4>
                  <div className="space-y-4 text-sm font-bold text-gray-500">
                    <a href="tel:08028418499" className="flex items-center gap-3 hover:text-herb-primary transition-colors">
                      <Phone className="w-4 h-4" /> 0802 841 8499
                    </a>
                    <a href="mailto:newrequest@jinjaproducts.com.ng" className="flex items-center gap-3 hover:text-herb-primary transition-colors">
                      <Mail className="w-4 h-4" /> Email Us
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Official Jinja Herbal Portal</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Trust Bar */}
      <div className="bg-herb-primary/5 border-b border-herb-primary/10 py-2 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-herb-primary" />
            <span>NAFDAC Certified</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-herb-primary" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-3.5 h-3.5 text-herb-primary" />
            <span>Express Delivery</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span>Verified Seller</span>
          </div>
        </div>
      </div>

      <main>
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center mb-6">
                <img src="http://desirebrand.com/images1/jinjalogo.png" alt="Jinja Logo" className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Bringing nature’s wisdom to your daily wellness routine since 2020. We believe in the power of plants to heal and restore.
              </p>
              <div className="flex flex-wrap gap-4 items-center border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                   <Lock className="w-3.5 h-3.5 text-herb-secondary" />
                   <span className="text-[10px] font-bold text-white uppercase tracking-widest">Secure Payments</span>
                </div>
                <div className="flex gap-4 items-center bg-white/5 px-4 py-2 rounded-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-4 brightness-110" alt="Visa" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 brightness-110" alt="Mastercard" />
                  <img src="https://vignette.wikia.nocookie.net/logopedia/images/4/4c/Verve_2016.png" className="h-3.5 brightness-110" alt="Verve" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Navigation</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                {navLinks.map((link) => (
                  <li key={`footer-nav-${link.path}`}>
                    <Link to={link.path} className="hover:text-herb-secondary transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-herb-secondary" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex flex-col gap-1">
                  <span className="text-herb-secondary font-bold text-[10px] uppercase tracking-widest">Business Hours</span>
                  <span>8:00 AM - 6:00 PM (Mon - Sat)</span>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-herb-secondary font-bold text-[10px] uppercase tracking-widest">Phone</span>
                  <a href="tel:08028418499" className="hover:text-herb-accent transition-colors">0802 841 8499</a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-herb-secondary font-bold text-[10px] uppercase tracking-widest">Email</span>
                  <a href="mailto:newrequest@jinjaproducts.com.ng" className="hover:text-herb-accent transition-colors break-all">newrequest@jinjaproducts.com.ng</a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-herb-secondary font-bold text-[10px] uppercase tracking-widest">Address</span>
                  <span>Vulcanizer Junction, Jakande Estate Oke-Afa, ejigbo, Lagos, Nigeria</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Newsletter Subscription</h4>
              <p className="text-gray-400 text-sm mb-4">Join our community for wellness tips and early access to new products.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="bg-gray-800 border-none rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-herb-accent w-full"
                />
                <button className="bg-herb-accent text-gray-900 px-4 py-2 rounded-lg font-bold text-sm hover:brightness-110">Subscribe</button>
              </div>

              <div className="mt-10 border-t border-white/5 pt-8">
                <h4 className="text-white font-bold mb-6">Security & Trust</h4>
                <ul className="grid grid-cols-1 gap-4 text-gray-400 text-sm">
                  <li className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-herb-secondary" />
                    <span>NAFDAC Certified Products</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-herb-secondary" />
                    <span>100% Secure Bank Verification</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-herb-secondary" />
                    <span>Verified Tracking & Logistics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-xs flex flex-col items-center gap-4">
            <p>
              Multistream LTD (Jinja Herbal Extract) &copy;2026 All rights reserved | Powered by <a href="https://webplusng.com.ng" target="_blank" rel="noopener noreferrer" className="text-herb-secondary hover:text-white transition-colors">Webplus NG</a>
            </p>
            <a href="https://www.hitwebcounter.com" target="_blank" rel="noopener noreferrer" className="opacity-80 hover:opacity-100 transition-opacity">
              <img 
                src="https://hitwebcounter.com/counter/counter.php?page=19594222&style=0006&nbdigits=8&type=page&initCount=0" 
                title="Counter Widget" 
                alt="Visit counter For Websites"   
                className="border-0" 
              />
            </a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Chat */}
      <a 
        href="https://wa.me/2348028418499" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] group flex items-center gap-3"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-herb-secondary/20 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 hidden md:block">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Chat with us</p>
          <p className="text-sm font-bold text-[#25D366]">WhatsApp Active</p>
        </div>
        <div className="bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce hover:animate-none group-hover:rotate-12 border-4 border-white flex items-center justify-center">
          <MessageCircle className="w-8 h-8 text-white fill-white" />
        </div>
      </a>

      <SidebarCart />
    </div>
  );
};
