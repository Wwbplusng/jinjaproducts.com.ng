import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Leaf, FlaskConical, Truck, MessageCircle, Lock, RotateCcw, Zap, Heart, Star, CheckCircle2 } from 'lucide-react';
import { PRODUCTS, TRUST_SIGNALS, FAQS, HEALTH_DISCLAIMER } from './constants';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Product } from './types';

const SEO_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Jinja Herbal Extract",
  "url": "https://jinjaproducts.com.ng/",
  "description": "Premium natural herbal products for immune defense and skincare. NAFDAC Approved.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jinjaproducts.com.ng/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const PRODUCT_LIST_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "url": `https://jinjaproducts.com.ng/products`,
    "name": p.name
  }))
};

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-herb-bg/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-herb-primary mb-4 italic">Common Inquiries</h2>
          <p className="text-gray-500 font-medium">Everything you need to know about our products and services.</p>
        </div>
        
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div key={`faq-item-${i}`} className="bg-white rounded-3xl border border-herb-primary/10 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between font-bold text-gray-800 text-left"
              >
                <span className="pr-4">{faq.question}</span>
                <div className={`p-2 rounded-full bg-herb-bg text-herb-primary transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                   <CheckCircle2 className="w-4 h-4" />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-6 text-gray-600 text-sm leading-relaxed border-t border-herb-bg pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Helmet>
        <title>Original Jinja Herbal Extract | Official Multistream Products & Health Supplements</title>
        <meta name="description" content="Buy original Jinja Herbal Extract health supplements by Multistream Ltd. Official distributor for natural detox, immune support & herbal extracts. Fast NAFDAC registered product delivery in Lagos and Nigeria." />
        <link rel="canonical" href="https://jinjaproducts.com.ng/" />
        <meta property="og:title" content="Original Jinja Herbal Extract | Official Multistream Store" />
        <meta property="og:description" content="Discover the best price for original Jinja Herbal Extract. 100% natural supplements for vitality, detox, and immune health." />
        <meta name="keywords" content="multistream jinja products official, jinja health supplement multistream, jinja herbal extract delivery, jinja supplement distributor lagos, where to buy original jinja drink, original jinja herbal supplement, jinja herbal detox benefits, buy jinja herbal extract, jinja herbal extract price nigeria, original jinja drink buy online" />
        <script type="application/ld+json">
          {JSON.stringify(SEO_SCHEMA)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(PRODUCT_LIST_SCHEMA)}
        </script>
      </Helmet>
      <section className="relative min-h-[350px] md:min-h-[400px] flex items-center overflow-hidden bg-herb-primary py-8 lg:py-14">
        <div className="absolute right-0 bottom-8 w-full lg:w-[45%] h-[40%] lg:h-[75%] opacity-40 lg:opacity-100 overflow-hidden px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full w-full"
            style={{ 
              backgroundImage: 'url("https://desirebrand.com/images1/topbg.png")',
              backgroundSize: 'contain',
              backgroundPosition: 'center bottom',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10 w-full">
          <div className="inline-flex items-center gap-2 bg-herb-secondary/20 text-herb-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-herb-secondary/30">
            <ShieldCheck className="w-3 h-3" />
            Approved by NAFDAC
          </div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight max-w-3xl"
          >
            Premium Natural <span className="text-herb-secondary font-black">Immune Booster</span> &<br />Advanced <span className="text-herb-secondary font-black">Antiviral Support</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-herb-secondary max-w-xl"
          >
            Jinja Herbal Extract is a natural supplement formulated with organic, plant-based ingredients, offering a holistic approach to enhancing immune function and protecting against various health challenges
          </motion.p>
        </div>
        
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 opacity-10 hidden lg:block">
          <Leaf className="w-64 h-64 text-white rotate-12" />
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-herb-primary mb-4">Our Herbal Collection</h2>
          <div className="w-20 h-1 bg-herb-accent mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PRODUCTS.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onViewDetails={setSelectedProduct} 
            />
          ))}
        </div>
      </section>

      <FAQSection />

      {/* Benefits Section */}
      <section id="about" className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
            {TRUST_SIGNALS.map((signal, idx) => {
              const Icon = signal.icon === 'ShieldCheck' ? ShieldCheck : 
                           signal.icon === 'Leaf' ? Leaf : 
                           signal.icon === 'RotateCcw' ? RotateCcw : Lock;
              return (
                <div key={`trust-signal-${idx}`} className="group">
                  <div className="w-16 h-16 bg-herb-bg rounded-3xl flex items-center justify-center mx-auto mb-4 border border-herb-primary/5 group-hover:scale-110 transition-transform shadow-sm">
                    <Icon className="w-8 h-8 text-herb-primary" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{signal.title}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{signal.description}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center px-4">
              <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="text-herb-primary w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg mb-2 text-herb-primary">Plant-Based Formula</h4>
              <p className="text-gray-500 text-sm">Natural supplement formulated with 100% organic, plant-based ingredients.</p>
            </div>
            <div className="text-center px-4">
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FlaskConical className="text-blue-600 w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg mb-2 text-herb-primary">Immune Function</h4>
              <p className="text-gray-500 text-sm">A holistic approach to enhancing your body's natural immune system response.</p>
            </div>
            <div className="text-center px-4">
              <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="text-amber-600 w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg mb-2 text-herb-primary">Health Protection</h4>
              <p className="text-gray-500 text-sm">Provides a natural shield helping you protect against various health challenges.</p>
            </div>
            <div className="text-center px-4">
              <div className="bg-purple-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Truck className="text-purple-600 w-8 h-8" />
              </div>
              <h4 className="font-display font-bold text-lg mb-2 text-herb-primary">Natural Vitality</h4>
              <p className="text-gray-500 text-sm">Restores energy and promotes overall wellness through nature's wisdom.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-herb-accent/5 border-t border-herb-accent/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] text-herb-primary/60 font-black uppercase tracking-[0.2em] mb-4">Regulatory Compliance</p>
          <div className="max-w-3xl mx-auto p-8 rounded-[2.5rem] bg-white border border-herb-accent/20 shadow-xl shadow-herb-accent/5">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <ShieldCheck className="w-6 h-6 text-herb-primary" /> Health Disclaimer
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              {HEALTH_DISCLAIMER}
            </p>
          </div>
        </div>
      </section>

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />

      {/* SEO Keywords Section */}
      <section className="bg-herb-bg/30 py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-[10px] text-gray-400 font-medium leading-relaxed max-w-4xl mx-auto">
            multistream jinja products official, jinja health supplement multistream, jinja herbal extract delivery, jinja supplement distributor lagos, where to buy original jinja drink, original jinja herbal supplement, jinja herbal detox benefits, buy jinja herbal extract, jinja herbal extract price nigeria
          </p>
        </div>
      </section>
    </>
  );
};
