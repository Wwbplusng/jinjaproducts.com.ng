import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight,
  ChevronLeft,
  Leaf,
  Zap,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { BLOG_POSTS, BENEFITS, JINJA_WELLNESS_STORY, PRODUCTS } from './constants';
import { useCart } from './context/CartContext';

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activePostId, setActivePostId] = React.useState<string | null>(null);
  const activePost = BLOG_POSTS.find(p => p.id === activePostId);

  return (
    <div className="bg-herb-bg">
      <Helmet>
        <title>{activePost ? `${activePost.title} | Jinja Wellness Blog` : 'Natural Health Blog | Multistream Jinja Philosophy'}</title>
        <meta name="description" content={activePost ? activePost.excerpt : "Official Jinja Wellness Blog. Read about the benefits of herbal detox, immune support, and natural healing insights from Multistream Ltd."} />
        <meta name="keywords" content="jinja herbal detox benefits, herbal health insights, natural immune support blog, multistream wellness philosophy, jinja herbal extract reviews, healthy living nigeria" />
        <link rel="canonical" href={`https://jinjaproducts.com.ng/blog${activePost ? `#${activePost.id}` : ''}`} />
      </Helmet>
      {/* Blog Page Header */}
      <section className="bg-herb-primary py-16 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-6"> {activePost ? <span>Wellness <span className="text-herb-secondary">Insights</span></span> : <span>The Jinja <span className="text-herb-secondary">Wellness</span> Blog</span>}</h1>
            <p className="text-herb-secondary max-w-3xl mx-auto text-xl leading-relaxed font-medium">
              {activePost ? activePost.excerpt : 'Bridging traditional herbal wisdom with modern scientific research. Discover the secrets to longevity, natural healing, and a life of vibrant health through our expert-curated articles.'}
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <Leaf className="w-64 h-64 text-white rotate-45" />
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Column */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activePost ? (
                <motion.article 
                  key={activePost.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100"
                >
                  <div className={`aspect-video ${activePost.color} relative flex items-center justify-center p-10`}>
                    <button 
                      onClick={() => setActivePostId(null)}
                      className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-herb-primary border border-white shadow-xl flex items-center gap-2 hover:bg-herb-primary hover:text-white transition-all uppercase tracking-widest"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" /> Back to Jinja Philosophy
                    </button>
                    <motion.img 
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      src={activePost.image} 
                      alt={activePost.title} 
                      className="h-full object-contain mix-blend-multiply drop-shadow-2xl" 
                    />
                    <div className="absolute top-6 left-6 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-herb-primary border border-white shadow-sm uppercase tracking-widest">{activePost.category}</span>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                      <span>By {activePost.author}</span>
                      <div className="w-1 h-1 bg-gray-300 rounded-full" />
                      <span>{activePost.date}</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-8 leading-tight">
                      {activePost.title}
                    </h2>

                    <div className="prose prose-lg max-w-none text-gray-600">
                      {activePost.content}

                      <p className="text-gray-600 font-medium italic text-center mt-10">
                        Protect your health with the best natural herbal remedy for immune defense. Choose JINJA Herbal Extracts and experience the power of nature’s antiviral protection!
                      </p>
                    </div>

                    <div className="mt-12 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share this:</span>
                        <div className="flex gap-2">
                           {['Facebook', 'Twitter', 'WhatsApp'].map(plat => (
                             <button key={plat} className="px-4 py-1.5 rounded-full border border-gray-200 text-[10px] font-bold text-gray-500 hover:bg-herb-primary hover:text-white hover:border-herb-primary transition-all">
                               {plat}
                             </button>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ) : (
                <motion.div 
                  key="philosophy-landing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                    <Leaf className="w-64 h-64 text-herb-primary rotate-45" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-display font-medium text-gray-900 mb-12 tracking-tight border-b border-gray-100 pb-8">The Jinja Philosophy</h2>
                    <div className="prose prose-lg md:prose-xl max-w-none text-gray-700 font-serif leading-relaxed italic">
                      {JINJA_WELLNESS_STORY.map((paragraph, index) => (
                        <p key={`philosophy-para-${index}`} className="mb-8 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    <div className="mt-16 flex justify-center border-t border-gray-50 pt-12">
                      <button 
                        onClick={() => setActivePostId(BLOG_POSTS[0].id)}
                        className="bg-herb-primary text-white px-12 py-5 rounded-full font-bold hover:bg-herb-primary-hover shadow-xl hover:-translate-y-1 transition-all flex items-center gap-4 text-lg"
                      >
                        Explore Articles <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-10">
            {/* Recommended Reading */}
            <div>
              <h4 className="text-lg font-display font-bold mb-6 text-gray-900">Recommended Reading</h4>
              <div className="space-y-6">
                {BLOG_POSTS.map((post) => (
                  <button 
                    key={post.id} 
                    onClick={() => {
                      setActivePostId(post.id);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`flex gap-4 group cursor-pointer w-full text-left p-2 rounded-2xl transition-all ${activePostId === post.id ? 'bg-herb-primary/5 ring-1 ring-herb-primary/10' : 'hover:bg-gray-50'}`}
                  >
                    <div className={`w-20 h-20 rounded-2xl flex-shrink-0 ${post.color} border border-gray-100 group-hover:scale-105 transition-transform flex items-center justify-center p-2`}>
                      <img src={post.image} alt={post.title} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h5 className={`font-bold text-sm transition-colors leading-snug mb-1 ${activePostId === post.id ? 'text-herb-primary' : 'text-gray-800 group-hover:text-herb-primary'}`}>{post.title}</h5>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>


            
            <div className="bg-herb-primary/5 rounded-[2.5rem] p-8 text-center border border-herb-primary/10">
              <h4 className="font-display font-bold text-gray-900 mb-8 border-b border-herb-primary/10 pb-4">Order Now</h4>
              
              <div className="space-y-6">
                {(() => {
                  const jinjaBig = PRODUCTS.find(p => p.id === '1');
                  const jinjaSmall = PRODUCTS.find(p => p.id === '2');
                  const iruPack = PRODUCTS.find(p => p.id === '3');
                  const iruSingle = PRODUCTS.find(p => p.id === '6');
                  
                  return (
                    <>
                      {jinjaBig && (
                        <div className="flex flex-col items-center">
                          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 border border-herb-primary/10">
                            <img src={jinjaBig.image} alt="Jinja (Big)" className="w-16 h-16 object-contain mix-blend-multiply" />
                          </div>
                          <h5 className="font-bold text-sm text-gray-800 mb-3 text-center">Jinja Herbal Drink (Big)</h5>
                          <button 
                            onClick={() => addToCart(jinjaBig, true)}
                            className="w-full bg-herb-primary text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-herb-primary-hover shadow-lg transition-all border-b-4 border-black/10"
                          >
                            Buy Big @ ₦{jinjaBig.price.toLocaleString()}
                          </button>
                        </div>
                      )}

                      {jinjaSmall && (
                        <div className="flex flex-col items-center">
                          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 border border-herb-primary/10">
                            <img src={jinjaSmall.image} alt="Jinja (Small)" className="w-16 h-16 object-contain mix-blend-multiply" />
                          </div>
                          <h5 className="font-bold text-sm text-gray-800 mb-3 text-center">Jinja Herbal Drink (Small)</h5>
                          <button 
                            onClick={() => addToCart(jinjaSmall, true)}
                            className="w-full bg-herb-primary text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-herb-primary-hover shadow-lg transition-all border-b-4 border-black/10"
                          >
                            Buy Small @ ₦{jinjaSmall.price.toLocaleString()}
                          </button>
                        </div>
                      )}

                      {iruPack && (
                        <div className="flex flex-col items-center pt-4 border-t border-herb-primary/10">
                          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 border border-herb-secondary/10">
                            <img src={iruPack.image} alt="IRU Soap Pack" className="w-16 h-16 object-contain mix-blend-multiply" />
                          </div>
                          <h5 className="font-bold text-sm text-gray-800 mb-3 text-center">IRU Antiseptic Soap (Pack)</h5>
                          <button 
                            onClick={() => addToCart(iruPack, true)}
                            className="w-full bg-herb-primary text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 shadow-lg transition-all border-b-4 border-black/10"
                          >
                            Buy Pack @ ₦{iruPack.price.toLocaleString()}
                          </button>
                        </div>
                      )}

                      {iruSingle && (
                        <div className="flex flex-col items-center pt-4 border-t border-herb-primary/10">
                          <div className="bg-white p-3 rounded-2xl shadow-sm mb-4 border border-herb-secondary/10">
                            <img src={iruSingle.image} alt="IRU Soap Single" className="w-16 h-16 object-contain mix-blend-multiply" />
                          </div>
                          <h5 className="font-bold text-sm text-gray-800 mb-3 text-center">IRU Antiseptic Soap (Single)</h5>
                          <button 
                            onClick={() => addToCart(iruSingle, true)}
                            className="w-full bg-herb-primary text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 shadow-lg transition-all border-b-4 border-black/10"
                          >
                            Buy Single @ ₦{iruSingle.price.toLocaleString()}
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Product Variety Showcase */}
            <div className="space-y-6">
              <h4 className="text-lg font-display font-bold text-gray-900 border-l-4 border-herb-primary pl-4">Discover Our Range</h4>
              <div className="flex flex-col gap-8">
                {[
                  { url: "http://desirebrand.com/images1/chole.jpg", name: "Chole Health Support" },
                  { url: "http://desirebrand.com/images1/femmine.jpg", name: "Femmine Wellness" },
                  { url: "http://desirebrand.com/images1/pile.jpg", name: "Pile Relief Formula" },
                  { url: "http://desirebrand.com/images1/sex.jpg", name: "Vitality Booster" },
                  { url: "http://desirebrand.com/images1/sugar.jpg", name: "Sugar Balance" },
                  { url: "http://desirebrand.com/images1/vision.jpg", name: "Vision Support" }
                ].map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-4 rounded-[2rem] shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden group transition-all duration-300"
                  >
                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-6">
                      <img 
                        src={img.url} 
                        alt={img.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

