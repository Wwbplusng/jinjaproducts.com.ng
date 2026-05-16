import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Star, Heart, ShoppingCart, CheckCircle2, Truck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { SHIPPING_OPTIONS, PAYSTACK_PUBLIC_KEY, PRODUCTS } from '../constants';
import { initializePayment } from '../services/paymentService';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, totalPrice, cart } = useCart();
  const [detailViewStep, setDetailViewStep] = useState<'details' | 'checkout'>('details');
  const [isLiked, setIsLiked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    shipping: 'mainland',
    paymentMethod: 'online'
  });

  if (!product) return null;

  const goToNextProduct = () => {
    // Current app architecture doesn't easily support index-based navigation in a modal without passing setProduct
    // For now, let's just close and let user pick another or use the existing logic if we want to pass a setter
  };

  const handleLightboxCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    const trimmedEmail = checkoutData.email.trim();
    const trimmedName = checkoutData.name.trim();
    const trimmedPhone = checkoutData.phone.trim();
    const trimmedAddress = checkoutData.address.trim();

    const errors: Record<string, string> = {};
    if (!trimmedName) errors.name = 'Full name is required';
    if (!trimmedEmail || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail)) errors.email = 'Valid email is required';
    if (!trimmedPhone) errors.phone = 'Phone number is required';
    if (!trimmedAddress) errors.address = 'Address is required';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const shippingFee = (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee;
    const finalTotal = totalPrice + shippingFee;

    try {
      const response = await initializePayment(
        trimmedEmail,
        finalTotal,
        { 
          name: trimmedName, 
          phone: trimmedPhone, 
          address: trimmedAddress,
          items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity }))
        }
      );
      
      if (response.data.access_code) {
        const nameParts = trimmedName.split(' ');
        const firstname = nameParts[0] || trimmedName;
        const lastname = nameParts.slice(1).join(' ') || "";

        const handler = (window as any).PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: trimmedEmail,
          amount: finalTotal * 100,
          firstname,
          lastname,
          metadata: {
            custom_fields: [
              { display_name: "Customer Name", variable_name: "customer_name", value: trimmedName },
              { display_name: "Email Address", variable_name: "customer_email", value: trimmedEmail }
            ]
          },
          access_code: response.data.access_code,
          onClose: () => setIsSubmitting(false),
          callback: (resp: any) => {
            window.location.href = `${window.location.pathname}?reference=${resp.reference}`;
          }
        });
        handler.openIframe();
      } else if (response.data.authorization_url) {
        window.location.href = response.data.authorization_url;
      }
    } catch (error: any) {
      alert("Payment failed: " + error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[120] cursor-pointer"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl max-h-[95vh] bg-white z-[130] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/20"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-xl rounded-full text-gray-800 hover:bg-herb-primary hover:text-white transition-all z-20 border border-white/30"
        >
          <X className="w-6 h-6" />
        </button>

        <div className={`w-full md:w-[45%] h-64 md:h-auto ${product.color} relative overflow-hidden`}>
          <motion.img 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.9 }}
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover mix-blend-multiply transition-transform duration-1000" 
          />
          <div className="absolute top-6 left-6">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md text-herb-primary px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm border border-white">
              <ShieldCheck className="w-3.5 h-3.5" />
              NAFDAC Approved
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-herb-primary/10 rounded-full blur-2xl" />
        </div>

        <div className="p-6 md:p-10 w-full md:w-[55%] overflow-y-auto bg-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-herb-bg/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
          
          <AnimatePresence mode="wait">
            {detailViewStep === 'details' ? (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="min-h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-herb-accent fill-herb-accent' : 'text-gray-200'}`} 
                      />
                    ))}
                    <span className="ml-1.5 text-[10px] font-bold text-amber-700">{product.rating}</span>
                  </div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{product.reviews} Reviews</span>
                </div>

                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 leading-tight mb-1">{product.name}</h2>
                    <div className="text-xl font-display font-bold text-herb-primary">₦{product.price.toLocaleString()}</div>
                  </div>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="p-2.5 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                  </button>
                </div>
                
                <div className="mb-6 flex-1">
                  <h4 className="font-bold text-[9px] uppercase tracking-widest text-herb-primary mb-2 flex items-center gap-2">
                    <div className="w-3 h-[1px] bg-herb-primary" />
                    Nature's Potency
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm bg-herb-bg/30 p-3.5 rounded-xl border-l-4 border-herb-primary">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => addToCart(product, false, 1)}
                    className="w-full bg-herb-primary text-white py-4 rounded-xl font-bold text-base hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Add to Cart <span className="text-lg">+</span>
                  </button>
                  
                  {cart.length > 0 && (
                    <button 
                      onClick={() => setDetailViewStep('checkout')}
                      className="w-full bg-herb-accent text-white py-4 rounded-xl font-bold text-base hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout (₦{totalPrice.toLocaleString()}) <span className="text-lg">→</span>
                    </button>
                  )}
                  
                  <button 
                    onClick={onClose}
                    className="w-full py-3.5 bg-blue-50 text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-100 border border-blue-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Continue Shopping <span className="text-xl">→</span>
                  </button>
                </div>
              </motion.div>

            ) : (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="min-h-full"
              >
                <button 
                  onClick={() => setDetailViewStep('details')}
                  className="mb-8 flex items-center gap-2 text-herb-primary font-bold text-xs uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                  <motion.span animate={{ x: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>←</motion.span> Back to Details
                </button>

                <div className="mb-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-3 h-3" /> Cart Summary
                  </p>
                  <div className="space-y-4 max-h-56 overflow-y-auto mb-4 pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <div className="flex gap-3 items-center">
                          <span className="text-gray-700 font-medium truncate max-w-[120px]">{item.quantity}x {item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-gray-900 block">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t-2 border-dashed border-gray-200">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Grand Total</p>
                      <p className="text-2xl font-display font-bold text-herb-primary">₦{totalPrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLightboxCheckout} className="space-y-4">
                   <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                        className={`w-full bg-gray-50 border ${formErrors.name ? 'border-red-400' : 'border-gray-200'} rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                        placeholder="John Doe"
                      />
                    </div>
                    {/* ... (rest of the form fields similar to SidebarCart but streamlined) ... */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input 
                        type="email" 
                        placeholder="Email"
                        value={checkoutData.email}
                        onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-herb-primary outline-none"
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone"
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-herb-primary outline-none"
                      />
                    </div>
                    <textarea 
                      placeholder="Address"
                      value={checkoutData.address}
                      onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-herb-primary outline-none"
                    />
                    <div>
                      <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1.5 ml-1">Shipping (shipping fee)</label>
                      <select 
                        value={checkoutData.shipping}
                        onChange={(e) => setCheckoutData({...checkoutData, shipping: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-herb-primary outline-none"
                      >
                        {Object.entries(SHIPPING_OPTIONS).map(([key, option]) => (
                          <option key={key} value={key}>{option.label} — ₦{option.fee.toLocaleString()}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-herb-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Processing...' : <><CheckCircle2 className="w-6 h-6" /> Complete Order</>}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
