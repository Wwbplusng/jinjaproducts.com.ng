import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Format message for WhatsApp
    const whatsappNumber = '2348028418499'; // Nigerian format prefix
    const text = `*New Contact Inquiry*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Subject:* ${formData.subject}%0A%0A` +
                 `*Message:*%0A${formData.message}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
    
    // Small delay to show "sending" state
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      // Optional: Clear form
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user changes field
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Contact Us | Jinja Herbal Products Headquarters</title>
        <meta name="description" content="Reach out to the Jinja Health Team. Contact us for product inquiries, distributor applications, or wellness advice. Located in Jakande Estate, Lagos, Nigeria." />
        <link rel="canonical" href="https://jinjaproducts.com.ng/contact" />
        <meta property="og:title" content="Contact Jinja Herbal Products" />
        <meta property="og:description" content="Get in touch with us for natural health solutions and business opportunities." />
        <meta name="keywords" content="jinja herbal extract online, jinja products price, multistream jinja herbal, Buy Jinja Herbal Extract, Jinja Herbal Drink Price, Multistream Herbal Products, multistream jinja products official, jinja health supplement multistream, jinja herbal extract delivery, jinja supplement distributor lagos, where to buy original jinja drink, original jinja herbal supplement, jinja herbal detox benefits, buy jinja herbal extract, jinja herbal extract price nigeria" />
      </Helmet>
      {/* Header Section */}
      <section className="bg-herb-primary py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-herb-secondary/20 text-herb-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-herb-secondary/30">
              Your Wellness Partner
            </span>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">Start the <span className="text-herb-secondary">Conversation</span></h1>
            <p className="text-herb-secondary max-w-3xl mx-auto text-xl leading-relaxed font-medium">
              Join thousands who have already taken the first step toward a healthier, more vibrant lifestyle. Whether you have questions about our ingredients or want to explore partnership opportunities, our dedicated team is here to support you every step of the way.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <MessageSquare className="w-80 h-80 text-white" />
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact Details Column */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 flex items-center gap-3">
                  Reach Out to Us
                </h2>
                
                <div className="space-y-8">
                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-herb-bg text-herb-primary flex items-center justify-center flex-shrink-0 group-hover:bg-herb-primary group-hover:text-white transition-colors">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Phone Number</h4>
                      <p className="text-gray-500 mb-1">Speak directly with our team</p>
                      <a href="tel:+2348028418499" className="text-herb-primary font-bold hover:underline transition-all">0802 841 8499</a>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-herb-bg text-herb-primary flex items-center justify-center flex-shrink-0 group-hover:bg-herb-primary group-hover:text-white transition-colors">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Email Address</h4>
                      <p className="text-gray-500 mb-1">For general inquiries</p>
                      <a href="mailto:newrequest@jinjaproducts.com.ng" className="text-herb-primary font-bold hover:underline">newrequest@jinjaproducts.com.ng</a>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-herb-bg text-herb-primary flex items-center justify-center flex-shrink-0 group-hover:bg-herb-primary group-hover:text-white transition-colors">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Business Hours</h4>
                      <p className="text-gray-500">Mon - Fri: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-500">Sat: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-herb-bg text-herb-primary flex items-center justify-center flex-shrink-0 group-hover:bg-herb-primary group-hover:text-white transition-colors">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">Headquarters</h4>
                      <p className="text-gray-500 leading-relaxed max-w-xs">
                        Vulcanizer Junction, Jakande Estate Oke-Afa, ejigbo, Lagos, Nigeria.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="bg-herb-bg p-8 rounded-[2rem] border border-herb-secondary/10 flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-10 h-10 text-herb-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-herb-primary">Quality Guaranteed</h4>
                  <p className="text-sm text-gray-500">All products are NAFDAC approved and naturally sourced.</p>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-gray-100"
              >
                <div className="mb-10">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">Send us a Message</h3>
                  <p className="text-gray-500">Submit the form below to chat with us on WhatsApp</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-300' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-herb-primary/20 outline-none transition-all placeholder:text-gray-300 font-medium`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-300' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-herb-primary/20 outline-none transition-all placeholder:text-gray-300 font-medium`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Subject</label>
                    <input 
                      type="text" 
                      name="subject" 
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="I want to buy in bulk"
                      className={`w-full bg-gray-50 border ${errors.subject ? 'border-red-300' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-herb-primary/20 outline-none transition-all placeholder:text-gray-300 font-medium`}
                    />
                    {errors.subject && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.subject}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Your Message</label>
                    <textarea 
                      rows={5}
                      name="message" 
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Hi Jinja Team, I have a question about..."
                      className={`w-full bg-gray-50 border ${errors.message ? 'border-red-300' : 'border-gray-100'} rounded-2xl px-6 py-4 focus:ring-2 focus:ring-herb-primary/20 outline-none transition-all placeholder:text-gray-300 font-medium resize-none`}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.message}</p>}
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-herb-primary text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-herb-primary-hover shadow-lg transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                         <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                         Formatting Message...
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Submit to WhatsApp
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-4 text-center">Our Location</h3>
            <p className="text-gray-500 max-w-xl mx-auto">Visit us at our primary distribution hub in Lagos for direct support and consultations.</p>
          </div>
          <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[450px] relative border-8 border-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.123456789!2d3.308!3d6.536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzInMDkuNiJOIDPCsDE4JzI4LjgiRQ!5e0!3m2!1sen!2sng!4v1715694200000!5m2!1sen!2sng&q=Vulcanizer+Junction+Jakande+Estate+Oke-Afa+ejigbo+Lagos+Nigeria" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
            ></iframe>
            <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hidden md:block">
               <h5 className="font-bold text-herb-primary mb-2 flex items-center gap-2 underline"><MapPin className="w-4 h-4" /> Jakande Estate Hub</h5>
               <p className="text-sm text-gray-600">Jakande Estate Oke-Afa, Ejigbo, Lagos</p>
               <p className="text-xs text-gray-400 mt-2 font-bold tracking-widest uppercase">Open for Consultations</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
