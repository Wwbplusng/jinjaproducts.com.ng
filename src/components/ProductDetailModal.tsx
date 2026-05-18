import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Star, Heart, ShoppingCart, CheckCircle2, Truck, Lock, Plus, Minus, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { SHIPPING_OPTIONS, BANK_DETAILS, PRODUCTS, HEALTH_DISCLAIMER } from '../constants';
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
    shipping: '',
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
    if (!checkoutData.shipping) errors.shipping = 'Please select a shipping area';
    
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
          items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
          total: finalTotal,
          shipping: (SHIPPING_OPTIONS as any)[checkoutData.shipping].label
        }
      );
      
      const reference = response.data.reference;
      
      const itemsText = cart.map(item => `- ${item.quantity}x ${item.name}`).join('\n');
      const whatsappMessage = encodeURIComponent(
        `🛍️ *NEW ORDER (UNPAID/PENDING TRANSFER)*\n\n` +
        `*Customer Details:*\n` +
        `👤 Name: ${trimmedName}\n` +
        `📞 Phone: ${trimmedPhone}\n` +
        `📍 Address: ${trimmedAddress}\n\n` +
        `*Order Summary:*\n` +
        `${itemsText}\n` +
        `🚚 Shipping: ${(SHIPPING_OPTIONS as any)[checkoutData.shipping].label}\n` +
        `💰 *Total: ₦${finalTotal.toLocaleString()}*\n\n` +
        `💳 Ref: ${reference}\n\n` +
        `⚠️ *Action Required:* Please send proof of payment to this number if you have just transferred.`
      );
      
      // Open WhatsApp
      window.open(`https://wa.me/2348028418499?text=${whatsappMessage}`, '_blank');
      
      alert(`Order Initiated! Reference: ${reference}. Please complete your transfer to the account details shown and send proof of payment on WhatsApp.`);
      onClose();
      setCheckoutData({
        name: '',
        email: '',
        phone: '',
        address: '',
        shipping: '',
        paymentMethod: 'online'
      });
      setDetailViewStep('details');
      setFormErrors({});
    } catch (error: any) {
      alert("Order failed: " + error.message);
    } finally {
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
                        key={`modal-star-${i}`} 
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
                    {product.nafdac && (
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-herb-primary bg-herb-primary/5 px-2 py-0.5 rounded border border-herb-primary/10 uppercase tracking-wider">NAFDAC NO: {product.nafdac}</span>
                      </div>
                    )}
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
                      Pay ₦{totalPrice.toLocaleString()} Now and Checkout <span className="text-lg">→</span>
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
                    {cart.map((item, idx) => (
                      <div key={`modal-checkout-item-${item.id}-${idx}`} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
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
                    <div className="w-full space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Subtotal:</span>
                        <span>₦{totalPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Shipping {checkoutData.shipping ? `(${SHIPPING_OPTIONS[checkoutData.shipping].label})` : ''}:</span>
                        <span>{!checkoutData.shipping ? 'Pending selection' : checkoutData.shipping === 'pod' ? 'Pay at destination' : `₦${(SHIPPING_OPTIONS as any)[checkoutData.shipping].fee.toLocaleString()}`}</span>
                      </div>
                      <div className="flex justify-between items-end pt-2">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Grand Total</p>
                          <p className="text-2xl font-display font-bold text-herb-primary">₦{(totalPrice + (checkoutData.shipping ? (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee : 0)).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleLightboxCheckout} className="space-y-4">
                    <div>
                      <label className="block text-xs font-black text-herb-primary uppercase mb-2 ml-1 flex items-center gap-2">
                        <Lock className="w-3 h-3" /> Secure Payment (Direct Transfer)
                      </label>
                      <div className="p-4 rounded-3xl bg-herb-primary text-white shadow-xl relative overflow-hidden mb-6">
                        <div className="relative z-10">
                          <label className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] mb-3 text-white/80">
                            <Lock className="w-3 h-3" /> Official Payment Channel
                          </label>
                          
                          <div className="space-y-4">
                            <div className="border-b border-white/20 pb-3">
                               <p className="text-[10px] font-black text-herb-accent uppercase tracking-[0.2em] mb-1">Account Name</p>
                               <p className="text-xl font-display font-black tracking-tight leading-tight text-white">{BANK_DETAILS.accountName}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              {BANK_DETAILS.accounts.map((acc, i) => (
                                <div key={`modal-payment-bank-${acc.number}-${i}`} className="p-4 bg-white/15 backdrop-blur-md rounded-2xl border border-white/30 flex justify-between items-center group/bank hover:bg-white/20 transition-all shadow-lg">
                                  <div>
                                    <div className="inline-block px-2.5 py-1 bg-herb-accent text-herb-primary text-[10px] font-black rounded-lg uppercase tracking-widest mb-2 shadow-sm border border-white/20">
                                      {acc.bank}
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <p className="text-2xl font-black tracking-[0.1em] font-mono select-all text-white">{acc.number}</p>
                                    </div>
                                  </div>
                                  <div className="w-10 h-10 bg-herb-accent rounded-xl flex items-center justify-center shadow-xl transform group-hover/bank:rotate-12 transition-transform">
                                    <ShieldCheck className="w-6 h-6 text-herb-primary" />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                            <p className="text-[8px] font-medium text-white/50 italic">* Pay only to official accounts</p>
                            <div className="flex gap-3 items-center">
                              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2.5 brightness-0 invert" alt="Visa" />
                              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 brightness-0 invert" alt="Mastercard" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-[9px] text-gray-400 italic text-center mb-6 px-4">
                        * {HEALTH_DISCLAIMER}
                      </p>
                    </div>

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
                        className={`w-full bg-gray-50 border ${formErrors.shipping ? 'border-red-400' : 'border-gray-200'} rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                      >
                        <option value="" disabled>Select Shipping Area</option>
                        {Object.entries(SHIPPING_OPTIONS).map(([sKey, option]) => (
                          <option key={`modal-shipping-${sKey}`} value={sKey}>{option.label} — ₦{option.fee.toLocaleString()}</option>
                        ))}
                      </select>
                      {formErrors.shipping && <p className="text-[10px] text-red-500 mt-1 ml-1">{formErrors.shipping}</p>}
                    </div>
                    {checkoutData.shipping === 'pod' && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                        <p className="text-[10px] text-amber-800 font-bold flex items-center gap-2 uppercase tracking-tight">
                          <Truck className="w-3 h-3" /> Note: Shipping/Transport Fee will be paid on delivery
                        </p>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-herb-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-xl transition-all transform active:scale-95 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Confirming...' : <><CheckCircle2 className="w-6 h-6" /> Pay ₦{(totalPrice + (checkoutData.shipping ? (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee : 0)).toLocaleString()} Now and Checkout</>}
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
