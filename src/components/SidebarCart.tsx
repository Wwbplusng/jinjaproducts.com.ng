import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, CheckCircle2, CreditCard, Truck, ShieldCheck, Lock, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHIPPING_OPTIONS, BANK_DETAILS } from '../constants';
import { initializePayment } from '../services/paymentService';

export const SidebarCart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'review'>('cart');
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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const trimmedEmail = checkoutData.email.trim();
    const trimmedName = checkoutData.name.trim();
    const trimmedPhone = checkoutData.phone.trim();
    const trimmedAddress = checkoutData.address.trim();

    if (!trimmedName) errors.name = 'Full name is required';
    if (!trimmedEmail || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmedEmail)) errors.email = 'Valid email is required';
    if (!trimmedPhone) errors.phone = 'Phone number is required';
    if (!trimmedAddress) errors.address = 'Address is required';
    if (!checkoutData.shipping) errors.shipping = 'Please select a shipping area';
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setCheckoutStep('review');
  };

  const handleFinalPayment = async () => {
    setIsSubmitting(true);
    const trimmedEmail = checkoutData.email.trim();
    const trimmedName = checkoutData.name.trim();
    const shippingFee = (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee;
    const finalTotal = totalPrice + shippingFee;

    try {
      const response = await initializePayment(
        trimmedEmail,
        finalTotal,
        { 
          name: trimmedName, 
          phone: checkoutData.phone, 
          address: checkoutData.address,
          items: cart.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })),
          total: finalTotal,
          shipping: (SHIPPING_OPTIONS as any)[checkoutData.shipping].label
        }
      );
      
      const reference = response.data.reference;
      
      // Since we removed Paystack, we directly redirect to the WhatsApp confirm flow
      // we'll trigger the same logic that Layout.tsx was doing for verification success
      const itemsText = cart.map(item => `- ${item.quantity}x ${item.name}`).join('\n');
      const whatsappMessage = encodeURIComponent(
        `🛍️ *NEW ORDER (UNPAID/PENDING TRANSFER)*\n\n` +
        `*Customer Details:*\n` +
        `👤 Name: ${trimmedName}\n` +
        `📞 Phone: ${checkoutData.phone}\n` +
        `📍 Address: ${checkoutData.address}\n\n` +
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
      clearCart();
      setIsCartOpen(false);
      setCheckoutStep('cart');
      setCheckoutData({
        name: '',
        email: '',
        phone: '',
        address: '',
        shipping: '',
        paymentMethod: 'online'
      });
      setFormErrors({});
    } catch (error: any) {
      alert("Order failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsCartOpen(false);
              setCheckoutStep('cart');
            }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] cursor-pointer"
          />
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between bg-herb-bg">
              <h2 className="text-2xl font-display font-bold text-herb-primary">
                {checkoutStep === 'cart' ? 'Your Cart' : checkoutStep === 'details' ? 'Delivery Details' : 'Order Summary'}
              </h2>
              <button 
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep('cart');
                }}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {checkoutStep === 'cart' || checkoutStep === 'details' ? (
                cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                    <ShoppingCart className="w-16 h-16 mb-4 stroke-1" />
                    <p className="text-lg">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-4 text-herb-primary font-bold underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Cart Items Section */}
                    {checkoutStep === 'cart' && (
                      <div className="space-y-6">
                        {cart.map((item, idx) => (
                          <div key={`sidebar-cart-item-${item.id}-${idx}`} className="flex gap-4 group">
                            <div className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ${item.color}`}>
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <div>
                                  <h5 className="font-bold text-gray-800">{item.name}</h5>
                                  {item.nafdac && <p className="text-[9px] font-black text-herb-primary uppercase tracking-tighter">NAFDAC: {item.nafdac}</p>}
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center border rounded-lg bg-gray-50">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 text-gray-500 hover:text-herb-primary">-</button>
                                  <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 text-gray-500 hover:text-herb-primary">+</button>
                                </div>
                                <span className="font-bold text-herb-primary">₦{(item.price * item.quantity).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Booking Form Section */}
                    {checkoutStep === 'details' && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <button 
                          onClick={() => setCheckoutStep('cart')}
                          className="text-xs font-bold text-herb-primary flex items-center gap-1 hover:underline mb-2"
                        >
                          <X className="w-3 h-3 rotate-45" /> Back to Product List
                        </button>
                        
                        <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                          <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Truck className="w-4 h-4 text-herb-primary" /> Delivery Information
                          </h4>
                          <form id="cart-checkout-form" className="space-y-4" onSubmit={handleCheckoutSubmit}>
                            {/* Form fields same as before but ensured they are clean */}
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                              <input 
                                type="text" 
                                value={checkoutData.name}
                                onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                                className={`w-full bg-white border ${formErrors.name ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                                placeholder="Your full name"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email</label>
                                <input 
                                  type="email" 
                                  value={checkoutData.email}
                                  onChange={(e) => setCheckoutData({...checkoutData, email: e.target.value})}
                                  className={`w-full bg-white border ${formErrors.email ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                                  placeholder="Email address"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone</label>
                                <input 
                                  type="tel" 
                                  value={checkoutData.phone}
                                  onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                                  className={`w-full bg-white border ${formErrors.phone ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                                  placeholder="Phone number"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Address</label>
                              <textarea 
                                value={checkoutData.address}
                                onChange={(e) => setCheckoutData({...checkoutData, address: e.target.value})}
                                className={`w-full bg-white border ${formErrors.address ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all resize-none`}
                                rows={2}
                                placeholder="Full delivery address"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Shipping Area</label>
                              <select 
                                value={checkoutData.shipping}
                                onChange={(e) => setCheckoutData({...checkoutData, shipping: e.target.value})}
                                className={`w-full bg-white border ${formErrors.shipping ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                              >
                                <option value="" disabled>Select Shipping Area</option>
                                {Object.entries(SHIPPING_OPTIONS).map(([sKey, sValue]) => (
                                  <option key={`shipping-opt-${sKey}`} value={sKey}>{sValue.label} {sKey === 'pod' ? '(Pay at destination)' : `(₦${sValue.fee.toLocaleString()})`}</option>
                                ))}
                              </select>
                              {formErrors.shipping && <p className="text-[10px] text-red-500 mt-1 ml-1">{formErrors.shipping}</p>}
                            </div>
                            {checkoutData.shipping === 'pod' && (
                              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                                <p className="text-[10px] text-amber-800 font-bold flex items-center gap-2 uppercase tracking-tight">
                                  <Truck className="w-3 h-3" /> Note: Shipping Fee will be paid on delivery
                                </p>
                              </div>
                            )}
                          </form>
                        </div>
                        
                        <div className="p-4 rounded-3xl bg-herb-primary text-white shadow-lg relative overflow-hidden mb-4">
                           <div className="relative z-10">
                             <p className="text-[9px] font-black text-white/70 uppercase border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                               <Lock className="w-3 h-3" /> SECURE OFFICIAL CHANNEL
                             </p>
                             <div className="space-y-4">
                                <div className="border-b border-white/20 pb-3">
                                   <p className="text-[10px] font-black text-herb-accent uppercase tracking-[0.2em] mb-1">Account Name</p>
                                   <p className="text-xl font-display font-black tracking-tight leading-tight text-white">{BANK_DETAILS.accountName}</p>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                  {BANK_DETAILS.accounts.map((acc, i) => (
                                    <div key={`sidebar-checkout-bank-${acc.number}-${i}`} className="p-4 bg-white/15 border border-white/30 rounded-[1.25rem] flex justify-between items-center group/bank hover:bg-white/20 transition-all shadow-lg backdrop-blur-md">
                                      <div>
                                        <div className="inline-block px-2.5 py-1 bg-herb-accent text-herb-primary text-[10px] font-black rounded-lg uppercase tracking-widest mb-2 shadow-sm border border-white/20">
                                          {acc.bank}
                                        </div>
                                        <p className="text-2xl font-black tracking-[0.1em] font-mono select-all leading-none text-white">{acc.number}</p>
                                      </div>
                                      <div className="w-10 h-10 bg-herb-accent rounded-xl flex items-center justify-center shadow-xl transform group-hover/bank:rotate-12 transition-transform">
                                        <ShieldCheck className="w-6 h-6 text-herb-primary" />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                             </div>
                             <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                               <p className="text-[7px] text-white/40 italic">Official payments only</p>
                               <div className="flex items-center gap-3">
                                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-1.5 brightness-0 invert" alt="Visa" />
                                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-3 brightness-0 invert" alt="Mastercard" />
                               </div>
                             </div>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  {/* Order Review View stays standard */}
                  <button 
                    onClick={() => setCheckoutStep('details')}
                    className="text-xs font-bold text-herb-primary flex items-center gap-1 hover:underline mb-2"
                  >
                    <X className="w-3 h-3 rotate-45" /> Back to Details
                  </button>
                  
                  <div className="bg-herb-bg/40 p-5 rounded-2xl border border-herb-primary/10">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-herb-primary">
                      <CheckCircle2 className="w-4 h-4" /> Order Review
                    </h4>
                    
                    <div className="mb-4 p-4 rounded-3xl bg-herb-primary text-white shadow-lg space-y-3 relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-[9px] font-black text-white/60 uppercase border-b border-white/10 pb-2 mb-3 flex items-center gap-2">
                          <Lock className="w-3 h-3" /> OFFICIAL TRANSFER DETAILS
                        </p>
                        <div className="space-y-4">
                           <div className="border-b border-white/20 pb-3">
                             <p className="text-[9px] text-herb-accent font-black uppercase tracking-[0.2em] mb-1">Account Name</p>
                             <p className="text-base font-black tracking-tight text-white">{BANK_DETAILS.accountName}</p>
                           </div>
                           <div className="space-y-3">
                             {BANK_DETAILS.accounts.map((acc, i) => (
                               <div key={`sidebar-review-bank-${acc.number}-${i}`} className="flex justify-between items-center p-3 bg-white/10 rounded-xl border border-white/10">
                                 <div className="inline-block px-2 py-0.5 bg-herb-accent text-herb-primary text-[9px] font-black rounded uppercase tracking-wider shadow-sm">
                                   {acc.bank}
                                 </div>
                                 <span className="text-lg font-black tracking-widest font-mono text-white">{acc.number}</span>
                               </div>
                             ))}
                           </div>
                        </div>
                        <div className="mt-3 flex gap-4 items-center justify-center opacity-40 grayscale brightness-0 invert">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-1.5" alt="Visa" />
                           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-3" alt="Mastercard" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-white rounded-xl border border-herb-secondary/20 shadow-sm">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Customer Details</p>
                         <div className="space-y-1">
                           <p className="text-sm font-black text-gray-800">{checkoutData.name}</p>
                           <p className="text-xs text-gray-500">{checkoutData.email}</p>
                           <p className="text-xs text-gray-500">{checkoutData.phone}</p>
                           <p className="text-[11px] text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg border border-gray-100">{checkoutData.address}</p>
                         </div>
                      </div>
                      
                      <div className="p-4 bg-white rounded-xl border border-herb-secondary/20 shadow-sm">
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Order Summary</p>
                         <div className="space-y-2">
                           {cart.map((item, idx) => (
                             <div key={`sidebar-review-item-${item.id}-${idx}`} className="flex justify-between text-xs">
                               <span className="text-gray-600">{item.quantity}x {item.name}</span>
                               <span className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</span>
                             </div>
                           ))}
                           <div className="pt-2 border-t border-gray-100 flex justify-between text-xs">
                             <span className="text-gray-500">Shipping {checkoutData.shipping ? `(${SHIPPING_OPTIONS[checkoutData.shipping as keyof typeof SHIPPING_OPTIONS].label})` : ''}</span>
                             <span className="font-bold">
                               {!checkoutData.shipping ? 'Pending selection' : checkoutData.shipping === 'pod' ? 'Pay on delivery' : `₦${(SHIPPING_OPTIONS as any)[checkoutData.shipping].fee.toLocaleString()}`}
                             </span>
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-herb-bg border-t border-gray-200">
                <div className="space-y-2 mb-6 text-gray-600">
                  <div className="flex justify-between items-center text-sm">
                    <span>Subtotal:</span>
                    <span className="font-bold">₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Shipping {checkoutData.shipping ? `(${SHIPPING_OPTIONS[checkoutData.shipping].label})` : ''}:</span>
                    <span className="font-bold">
                      {!checkoutData.shipping ? 'Pending selection' : checkoutData.shipping === 'pod' ? 'Pay at destination' : `₦${(SHIPPING_OPTIONS as any)[checkoutData.shipping].fee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xl border-t border-gray-200 pt-3 mt-2">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-display font-bold text-herb-primary text-2xl">
                      ₦{(totalPrice + (checkoutData.shipping ? (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {checkoutStep === 'review' ? (
                  <button 
                    onClick={handleFinalPayment}
                    disabled={isSubmitting}
                    className="w-full bg-herb-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Confirming...' : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Pay ₦{(totalPrice + (checkoutData.shipping ? (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee : 0)).toLocaleString()} Now and Checkout
                      </>
                    )}
                  </button>
                ) : checkoutStep === 'details' ? (
                  <button 
                    form="cart-checkout-form"
                    type="submit"
                    className="w-full bg-herb-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Review and Pay
                  </button>
                ) : (
                  <button 
                    onClick={() => setCheckoutStep('details')}
                    className="w-full bg-herb-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98]"
                  >
                    Pay ₦{totalPrice.toLocaleString()} Now and Checkout
                  </button>
                )}
                
                <p className="text-center text-gray-500 text-[10px] mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Secure checkout with industry standard encryption
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
