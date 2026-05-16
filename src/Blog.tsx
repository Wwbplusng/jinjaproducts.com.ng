import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ChevronRight,
  Leaf,
  Zap,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { BLOG_POSTS, BENEFITS } from './constants';

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [activePostId, setActivePostId] = React.useState(BLOG_POSTS[0].id);
  const activePost = BLOG_POSTS.find(p => p.id === activePostId) || BLOG_POSTS[0];

  return (
    <div className="bg-herb-bg">
      <Helmet>
        <title>{`${activePost.title} | Jinja Wellness Blog`}</title>
        <meta name="description" content={activePost.excerpt} />
        <link rel="canonical" href={`https://jinjaproducts.com.ng/blog#${activePost.id}`} />
        <meta property="og:title" content={activePost.title} />
        <meta property="og:description" content={activePost.excerpt} />
        <meta property="og:image" content={activePost.image} />
      </Helmet>
      {/* Blog Page Header */}
      <section className="bg-herb-primary py-20 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Wellness Blog</h1>
            <p className="text-herb-secondary max-w-2xl mx-auto text-lg">
              Exploring the synergy between nature and science for a healthier life.
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
            <motion.article 
              key={activePost.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100"
            >
              <div className={`aspect-video ${activePost.color} relative flex items-center justify-center p-10`}>
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

            {/* Newsletter Card */}
            <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                <h4 className="text-xl font-display font-bold mb-4">Healthy Living Tips</h4>
                <p className="text-gray-400 text-sm mb-6">Stay updated with the latest wellness research and herbal traditional wisdom.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="Email@vision.com" className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-herb-accent outline-none" />
                  <button className="w-full bg-herb-accent text-gray-900 py-3 rounded-xl font-bold hover:brightness-110 transition-all">Join Community</button>
                </div>
               </div>
               <Leaf className="absolute -bottom-10 -right-10 w-32 h-32 text-herb-secondary/10 rotate-12" />
            </div>
            
            <div className="bg-herb-bg border-2 border-dashed border-herb-secondary/30 rounded-[2rem] p-10 text-center flex flex-col items-center">
              <div className="bg-white p-4 rounded-3xl shadow-lg mb-6 border border-herb-secondary/20">
                <img src="http://desirebrand.com/images1/iru.png" alt="IRU Soap" className="w-24 h-auto mix-blend-multiply" />
              </div>
              <h4 className="font-display font-bold text-herb-primary mb-2">Clean Skin Naturally</h4>
              <p className="text-xs text-gray-500 mb-6 font-medium">Try our Antiseptic Herbal Soap for glowing, healthy skin.</p>
              <button 
                onClick={() => navigate('/products')}
                className="bg-herb-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-herb-primary-hover shadow-lg transition-all"
              >
                Shop Now
              </button>
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

