import React from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, ShieldCheck, Leaf, Sparkles, Droplets, Heart, ShoppingCart } from 'lucide-react';
import { PRODUCTS, HEALTH_DISCLAIMER, JINJA_WELLNESS_STORY } from './constants';
import { useCart } from './context/CartContext';

export const Products: React.FC = () => {
  const { addToCart } = useCart();

  // Find specific products from our global list to ensure IDs match
  const jinjaBig = PRODUCTS.find(p => p.id === '1');
  const jinjaSmall = PRODUCTS.find(p => p.id === '2');
  const iruSoap = PRODUCTS.find(p => p.id === '3');
  const iruSoapSingle = PRODUCTS.find(p => p.id === '6');

  const jinjaBenefits = [
    "Natural Detoxifier", "Boost Immune System", "Rich in Antioxidants", 
    "Promotes Kidney and Liver Health", "Fights bacteria, fungi, virus, parasite disease & stds", 
    "Treats Malaria & Typhoid Fever", "Regulates Cholesterol", "Normalizes Blood Pressure", 
    "Stabilize Blood Sugar Level", "Fights Cancer", "Helps with Weight Loss", 
    "Aids Digestion", "Fights Inflammation", "Boost Male and Female Fertility", 
    "Arthritis Relief", "Relief Cough", "Eases Asthma and Allergies", 
    "Improves Vision", "Deals with Ulcer", "Good for treatment of Pile", 
    "Helps in the treatment of Stroke"
  ];

  const iruBenefits = [
    { title: "Treatment of Skin Conditions", text: "Effectively addresses skin infections, ringworm, acne, eczema, blackheads, and sunburn.", icon: <Sparkles className="w-5 h-5" /> },
    { title: "Odor Control", text: "Combats body odor by eliminating odor-causing bacteria, keeping the skin fresh.", icon: <Droplets className="w-5 h-5" /> },
    { title: "Skin Restoration", text: "Assists in restoring damaged skin tissues, correcting chemical reactions, and promoting wound healing.", icon: <Heart className="w-5 h-5" /> },
    { title: "Skin Refreshment", text: "Leaves the skin feeling refreshed and rejuvenated after each use.", icon: <Leaf className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Shop Original Jinja Herbal Products | Multistream Antiviral Supplements & Soap</title>
        <meta name="description" content="Discover our complete range of Multistream products. Original Jinja Herbal Extract for antiviral defense and IRU Antiseptic soap for healthy skin. NAFDAC approved natural health remedies available for delivery in Nigeria." />
        <link rel="canonical" href="https://jinjaproducts.com.ng/products" />
        <meta property="og:title" content="Verified Jinja Herbal & Iru Soap Products | Shop Official" />
        <meta property="og:description" content="Official products catalog. Buy original Jinja Herbal Extract and Iru soap. Plant-based healing for immune support and skin health." />
        <meta name="keywords" content="buy jinja herbal extract, original jinja drink price, iru soap benefits, multistream products nigeria, jinja herbal drink reviews, antiviral herbal supplement, original jinja herbal detox" />
      </Helmet>
      {/* Page Header */}
      <section className="bg-herb-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-display font-bold text-white mb-6"
          >
            Nature's <span className="text-herb-secondary">Potent Remedies</span>
          </motion.h1>
          <p className="text-herb-secondary max-w-3xl mx-auto text-xl leading-relaxed font-medium">
            Discover our collection of premium, NAFDAC-approved herbal solutions. Each product is carefully crafted from the finest organic botanicals to support your body's natural healing processes and restore total wellness.
          </p>
        </div>
      </section>

      {/* Jinja Herbal Extract Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-[#f0f9f1] rounded-[3rem] p-8 md:p-12 relative overflow-hidden group">
                <img 
                  src="https://desirebrand.com/images1/jinjabig750.png" 
                  alt="Jinja Herbal Extract" 
                  className="w-full max-w-md mx-auto transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
                />
                <div className="absolute top-8 left-8">
                  <span className="bg-herb-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> Bestseller
                  </span>
                </div>
              </div>
            </motion.div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2 leading-tight">
                Jinja Herbal Extract — <span className="text-herb-primary">Antiviral Immune Defense</span>
              </h2>
              <div className="mb-6">
                <span className="inline-block text-xs font-black text-herb-primary bg-herb-primary/10 px-3 py-1 rounded-full border border-herb-primary/20 tracking-widest uppercase">NAFDAC NO: A7-1733L</span>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-2xl">
                <p className="text-amber-800 font-bold italic leading-relaxed">
                  "Natural Defense Against Viral Infections and Diseases (Antibiotic, Antiviral, Antifungal, and Antiparasitic Body Refresh!)"
                </p>
              </div>

              <div className="space-y-6 text-gray-600 leading-relaxed mb-8">
                <p>
                  Viruses are microscopic pathogens that can hijack healthy cells, replicating rapidly and spreading throughout the body. 
                  <span className="font-bold text-gray-800"> JINJA Herbal Extracts</span> are formulated with powerful bioactive compounds derived from 100% natural herbs, 
                  working to inhibit viral replication and prevent multiplication.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Stronger immunity naturally",
                    "Antiviral protection",
                    "Faster recovery from colds/flu",
                    "Reduction in inflammation",
                    "Overall plant-based wellness"
                  ].map((text, i) => (
                    <div key={`jinja-immune-${i}`} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-herb-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                <button 
                  onClick={() => jinjaBig && addToCart(jinjaBig, true)}
                  className="bg-herb-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-herb-primary-hover shadow-lg transition-all"
                >
                  Order Big Bottle (₦{jinjaBig?.price.toLocaleString()})
                </button>
                <button 
                  onClick={() => jinjaSmall && addToCart(jinjaSmall, true)}
                  className="border-2 border-herb-primary text-herb-primary px-8 py-4 rounded-2xl font-bold hover:bg-herb-primary/5 transition-all"
                >
                  Order Small Bottle (₦{jinjaSmall?.price.toLocaleString()})
                </button>
              </div>
            </div>
          </div>

          {/* IRU Soap Section */}
          <section className="py-20 mb-20 bg-gray-50/50 rounded-[3rem] border border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="w-full lg:w-1/2"
                >
                  <div className="bg-[#fdfcf0] rounded-[3rem] p-8 md:p-12 relative overflow-hidden group border-2 border-herb-secondary/20">
                    <img 
                      src="https://desirebrand.com/images1/iru.png" 
                      alt="IRU Antiseptic Herbal Soap" 
                      className="w-full max-w-sm mx-auto transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
                    />
                    <div className="absolute bottom-8 right-8">
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Premium Care</p>
                        <p className="text-herb-primary font-display font-bold">100% Antiseptic</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <div className="w-full lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2 leading-tight">
                    IRU Antiseptic — <span className="text-amber-600">Herbal Soap (6 pack)</span>
                  </h2>
                  <div className="mb-6">
                    <span className="inline-block text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 tracking-widest uppercase">NAFDAC NO: A2-6468</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                    Introducing IRU Antiseptic Herbal Soap (6 pack), a premium natural skincare solution designed to maintain healthy and clean skin. 
                    Formulated with natural ingredients, it serves as an excellent alternative to chemical-based soaps.
                  </p>

                  <div className="mb-10 text-[10px] text-gray-400 italic p-4 border border-gray-100 rounded-2xl">
                    Disclaimer: {HEALTH_DISCLAIMER}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {iruBenefits.map((benefit, i) => (
                      <div key={`iru-benefit-${i}`} className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">{benefit.title}</h4>
                          <p className="text-sm text-gray-500 leading-snug">{benefit.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => iruSoap && addToCart(iruSoap, true)}
                      className="bg-herb-accent text-white px-10 py-4 rounded-2xl font-bold hover:shadow-xl transition-all transform active:scale-95 flex items-center gap-3"
                    >
                      <ShoppingCart className="w-5 h-5" /> Buy Pack (₦{iruSoap?.price.toLocaleString()})
                    </button>
                    <button 
                      onClick={() => iruSoapSingle && addToCart(iruSoapSingle, true)}
                      className="border-2 border-herb-accent text-herb-accent px-10 py-4 rounded-2xl font-bold hover:bg-herb-accent/10 transition-all transform active:scale-95 flex items-center gap-3"
                    >
                      <ShoppingCart className="w-5 h-5" /> Buy Single (₦{iruSoapSingle?.price.toLocaleString()})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 mb-32">
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute -left-12 top-0 text-herb-primary opacity-10 pointer-events-none hidden lg:block">
                  <Leaf className="w-24 h-24 rotate-45" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-medium text-gray-900 mb-12 tracking-tight">Our Wellness Story</h2>
                <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 font-serif leading-relaxed">
                  {JINJA_WELLNESS_STORY.map((paragraph, index) => (
                    <p key={`wellness-story-${index}`} className="mb-8 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Jinja Benefits Grid */}
          <div className="bg-herb-bg rounded-[3rem] p-8 md:p-16 border border-herb-secondary/10">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-display font-bold text-herb-primary mb-4 uppercase tracking-tight">THE BENEFITS OF JINJA HERBAL EXTRACT</h3>
              <div className="w-24 h-1.5 bg-herb-accent mx-auto rounded-full mb-6"></div>
              <p className="text-gray-700 text-lg font-bold uppercase tracking-[0.2em]">21 Powerful Reasons to Choose Nature</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jinjaBenefits.map((benefit, i) => (
                <motion.div 
                  key={`jinja-benefit-${i}`} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-herb-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-lg shadow-herb-primary/20">
                    {i + 1}
                  </div>
                  <span className="text-base md:text-lg font-bold text-gray-900 leading-tight pt-1">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { title: "100% Natural", icon: <Leaf className="w-6 h-6" /> },
                 { title: "Scientifically Backed", icon: <ShieldCheck className="w-6 h-6" /> },
                 { title: "Boosts Immunity", icon: <CheckCircle2 className="w-6 h-6" /> },
                 { title: "No Preservatives", icon: <Sparkles className="w-6 h-6" /> }
               ].map((item, i) => (
                 <div key={`jinja-usp-${i}`} className="flex flex-col items-center text-center p-6 bg-white/50 rounded-2xl border border-white">
                   <div className="text-herb-primary mb-3">{item.icon}</div>
                   <h4 className="text-xs font-black uppercase tracking-tighter text-gray-800">{item.title}</h4>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimony Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6"
            >
              Testimony
            </motion.h2>
            <div className="w-24 h-1.5 bg-herb-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Below is a WhatsApp screenshot of various people who have use the products and have gotten result and healed of what is affecting them.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-[3rem] p-4 shadow-2xl border border-gray-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-herb-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <img 
                src="https://desirebrand.com/images1/testimny.jpg" 
                alt="Product Testimonies" 
                className="w-full h-auto rounded-[2.5rem] shadow-sm transform transition-transform duration-700 group-hover:scale-[1.02]" 
              />
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-herb-primary font-bold italic text-xl">
                "Join thousands of healed and happy customers today!"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-herb-bg border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold text-herb-primary mb-6">Experience Nature's Healing Today</h2>
          <p className="text-gray-600 mb-10 text-lg">
            Our products are formulated to work together, supporting both your internal immune system and your external skin protection.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white border-2 border-herb-primary text-herb-primary px-8 py-4 rounded-2xl font-bold hover:bg-herb-primary hover:text-white transition-all shadow-sm"
            >
              Browse Full Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
