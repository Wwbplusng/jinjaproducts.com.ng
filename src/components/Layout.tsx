import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, ShieldCheck, Truck, FlaskConical, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SidebarCart } from './SidebarCart';
import { verifyPayment } from '../services/paymentService';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { totalItems, setIsCartOpen, clearCart } = useCart();
  const [isVerifying, setIsVerifying] = useState(false);

  // Handle Payment Callback
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('reference') || params.get('trxref');
    
    if (reference) {
      const checkPayment = async () => {
        try {
          setIsVerifying(true);
          const result = await verifyPayment(reference);
          if (result.status && result.data.status === 'success') {
            alert(`Payment Successful! Reference: ${reference}. We will process your order immediately.`);
            clearCart();
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error(error);
          alert('Error verifying payment.');
        } finally {
          setIsVerifying(false);
          // Clean up URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      };
      checkPayment();
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-herb-bg font-sans text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/jinjalogo.png" alt="Jinja Logo" className="h-10 md:h-12 w-auto" />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-medium text-gray-600 hover:text-herb-primary transition-colors">Home</Link>
            <Link to="/products" className="font-medium text-gray-600 hover:text-herb-primary transition-colors">Products</Link>
            <Link to="/join-us" className="font-medium text-gray-600 hover:text-herb-primary transition-colors">Join Us</Link>
            <Link to="/blog" className="font-medium text-gray-600 hover:text-herb-primary transition-colors">Blog</Link>
            <Link to="/contact" className="font-medium text-gray-600 hover:text-herb-primary transition-colors">Contact Us</Link>
          </nav>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border-2 border-herb-primary text-herb-primary rounded-xl font-medium hover:bg-herb-primary hover:text-white transition-all transform hover:scale-105 active:scale-95"
            id="cart-btn"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-herb-primary text-white text-xs px-2 py-0.5 rounded-full group-hover:bg-white group-hover:text-herb-primary transition-colors">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* Verification Overlay */}
      {isVerifying && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[200] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-herb-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="font-bold text-herb-primary">Verifying Payment...</p>
          </div>
        </div>
      )}

      <main>
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center mb-6">
                <img src="/images/jinjalogo.png" alt="Jinja Logo" className="h-10 w-auto" />
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Bringing nature’s wisdom to your daily wellness routine since 2020. We believe in the power of plants to heal and restore.
              </p>
              <p className="text-gray-500 text-[10px] leading-tight italic uppercase tracking-wider">
                *These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><Link to="/" className="hover:text-herb-accent transition-colors">Home</Link></li>
                <li><Link to="/products" className="hover:text-herb-accent transition-colors">Products</Link></li>
                <li><Link to="/join-us" className="hover:text-herb-accent transition-colors">Join Us</Link></li>
                <li><Link to="/blog" className="hover:text-herb-accent transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-herb-accent transition-colors">Contact Us</Link></li>
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
