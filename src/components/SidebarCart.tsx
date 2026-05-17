import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingCart, Trash2, CheckCircle2, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SHIPPING_OPTIONS, PAYSTACK_PUBLIC_KEY } from '../constants';
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
    shipping: 'mainland',
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
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setCheckoutStep('review');
  };

  const handleFinalPayment = async () => {
    if (!PAYSTACK_PUBLIC_KEY || PAYSTACK_PUBLIC_KEY === 'undefined' || PAYSTACK_PUBLIC_KEY.includes('YOUR_')) {
      alert("Error: Paystack Public Key is missing or invalid. Please set the VITE_PAYSTACK_PUBLIC_KEY environment variable.");
      return;
    }

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
      const nameParts = trimmedName.split(' ');
      const firstname = nameParts[0] || trimmedName;
      const lastname = nameParts.slice(1).join(' ') || "";

      const paystackConfig: any = {
        key: PAYSTACK_PUBLIC_KEY,
        email: trimmedEmail,
        amount: Math.round(finalTotal * 100),
        firstname,
        lastname,
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: "Customer Name", variable_name: "customer_name", value: trimmedName },
            { display_name: "Email Address", variable_name: "customer_email", value: trimmedEmail },
            { display_name: "Phone Number", variable_name: "customer_phone", value: checkoutData.phone },
            { display_name: "Delivery Address", variable_name: "customer_address", value: checkoutData.address }
          ]
        },
        onClose: () => setIsSubmitting(false),
        callback: (resp: any) => {
          window.location.href = `${window.location.pathname}?reference=${resp.reference}`;
        }
      };

      // Use access_code if returned by backend, otherwise it uses the params above
      if (response.data.access_code) {
        paystackConfig.access_code = response.data.access_code;
      }

      const handler = (window as any).PaystackPop.setup(paystackConfig);
      handler.openIframe();
    } catch (error: any) {
      alert("Payment failed: " + error.message);
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
            onClick={() => setIsCartOpen(false)}
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
              {checkoutStep === 'cart' ? (
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
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={`cart-${item.id}`} className="flex gap-4 group">
                        <div className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ${item.color}`}>
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <h5 className="font-bold text-gray-800">{item.name}</h5>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border rounded-lg bg-gray-50">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-2 py-1 text-gray-500 hover:text-herb-primary"
                              >
                                -
                              </button>
                              <span className="px-2 text-sm font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-2 py-1 text-gray-500 hover:text-herb-primary"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-bold text-herb-primary">₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : checkoutStep === 'details' ? (
                <div className="space-y-6">
                  <button 
                    onClick={() => setCheckoutStep('cart')}
                    className="text-xs font-bold text-herb-primary flex items-center gap-1 hover:underline mb-2"
                  >
                    <X className="w-3 h-3 rotate-45" /> Back to Cart
                  </button>
                  
                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2 text-gray-500">
                      <ShoppingCart className="w-4 h-4 text-herb-primary" /> Cart Summary
                    </h4>
                    <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={`details-${item.id}`} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                          <div className="flex gap-2 items-center">
                            <span className="font-bold text-herb-primary w-5">{item.quantity}x</span>
                            <span className="text-gray-700 truncate max-w-[150px]">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900 font-mono">₦{(item.price * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t-2 border-dashed border-gray-200">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
                      <span className="text-xl font-display font-bold text-herb-primary">₦{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 mt-4">
                    <h4 className="font-bold text-sm mb-4 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-herb-primary" /> Delivery Information
                    </h4>
                    <form id="cart-checkout-form" className="space-y-4" onSubmit={handleCheckoutSubmit}>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          value={checkoutData.name}
                          onChange={(e) => setCheckoutData({...checkoutData, name: e.target.value})}
                          className={`w-full bg-white border ${formErrors.name ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                          placeholder="John Doe"
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
                            placeholder="email@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Phone</label>
                          <input 
                            type="tel" 
                            value={checkoutData.phone}
                            onChange={(e) => setCheckoutData({...checkoutData, phone: e.target.value})}
                            className={`w-full bg-white border ${formErrors.phone ? 'border-red-400' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-primary outline-none transition-all`}
                            placeholder="Telephone"
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
                          placeholder="Delivery address"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Payment Option</label>
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-herb-primary bg-herb-primary/5">
                          <CreditCard className="w-5 h-5 text-herb-primary" />
                          <span className="text-xs font-bold text-herb-primary">Secure Online Payment (Card / Transfer)</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Shipping (shipping fee)</label>
                        <select 
                          value={checkoutData.shipping}
                          onChange={(e) => setCheckoutData({...checkoutData, shipping: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm"
                        >
                          {Object.entries(SHIPPING_OPTIONS).map(([key, value]) => (
                            <option key={key} value={key}>{value.label} {key === 'pod' ? '(Pay at destination)' : `(₦${value.fee.toLocaleString()})`}</option>
                          ))}
                        </select>
                      </div>
                      {checkoutData.shipping === 'pod' && (
                        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                          <p className="text-[10px] text-amber-800 font-bold flex items-center gap-2 uppercase tracking-tight">
                            <Truck className="w-3 h-3" /> Note: Shipping/Transport Fee will be paid on delivery
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
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
                           {cart.map(item => (
                             <div key={`review-summary-${item.id}`} className="flex justify-between text-xs">
                               <span className="text-gray-600">{item.quantity}x {item.name}</span>
                               <span className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</span>
                             </div>
                           ))}
                           <div className="pt-2 border-t border-gray-100 flex justify-between text-xs">
                             <span className="text-gray-500">Shipping ({SHIPPING_OPTIONS[checkoutData.shipping as keyof typeof SHIPPING_OPTIONS].label})</span>
                             <span className="font-bold">
                               {checkoutData.shipping === 'pod' ? 'Pay on delivery' : `₦${(SHIPPING_OPTIONS as any)[checkoutData.shipping].fee.toLocaleString()}`}
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
                  {checkoutStep !== 'cart' ? (
                    <div className="flex justify-between items-center text-sm">
                      <span>Shipping:</span>
                      <span className="font-bold">
                        {checkoutData.shipping === 'pod' ? 'Pay at destination' : `₦${(SHIPPING_OPTIONS as any)[checkoutData.shipping].fee.toLocaleString()}`}
                      </span>
                    </div>
                  ) : (
                    checkoutData.shipping === 'pod' && (
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase text-amber-600">
                        <span>Shipping:</span>
                        <span>Pay at destination</span>
                      </div>
                    )
                  )}
                  <div className="flex justify-between items-center text-xl border-t border-gray-200 pt-3 mt-2">
                    <span className="font-bold text-gray-800">Total:</span>
                    <span className="font-display font-bold text-herb-primary text-2xl">
                      ₦{(totalPrice + (checkoutStep !== 'cart' ? (SHIPPING_OPTIONS as any)[checkoutData.shipping].fee : 0)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {checkoutStep === 'review' ? (
                  <button 
                    onClick={handleFinalPayment}
                    disabled={isSubmitting}
                    className="w-full bg-herb-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Initializing...' : (
                      <>
                        <CheckCircle2 className="w-5 h-5" /> Confirm Order
                      </>
                    )}
                  </button>
                ) : checkoutStep === 'details' ? (
                  <button 
                    form="cart-checkout-form"
                    type="submit"
                    className="w-full bg-herb-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Review Order
                  </button>
                ) : (
                  <button 
                    onClick={() => setCheckoutStep('details')}
                    className="w-full bg-herb-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-herb-primary-hover shadow-lg transition-all transform active:scale-[0.98]"
                  >
                    Proceed to Checkout
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
