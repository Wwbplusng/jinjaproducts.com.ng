import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Leaf, FlaskConical, Truck } from 'lucide-react';
import { PRODUCTS } from './constants';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Product } from './types';

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <Helmet>
        <title>Jinja Herbal Extract | Natural Immune Support & Wellness</title>
        <meta name="description" content="Boost your immune system naturally with Jinja Herbal Extract. Organic, plant-based remedies for detox, energy, and overall health protection. NAFDAC approved." />
        <link rel="canonical" href="https://jinjaproducts.com.ng/" />
        <meta property="og:title" content="Jinja Herbal Extract | Nature's Remedy" />
        <meta property="og:description" content="Discover the power of plant-based healing with Jinja Herbal Extract. 100% natural supplements for vitality and health." />
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
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4 leading-tight max-w-3xl"
          >
            Nature’s Remedy,<br />Pure & Simple
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

      {/* Benefits Section */}
      <section id="about" className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </>
  );
};
