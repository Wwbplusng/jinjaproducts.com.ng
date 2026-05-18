import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Users, Award, TrendingUp, CheckCircle2, Star, Trophy, Target, Sparkles, Gem, Medal } from 'lucide-react';
import { RANKS, PRODUCTS } from './constants';
import { useCart } from './context/CartContext';

export const JoinUs: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const jinjaBig = PRODUCTS.find(p => p.id === '1');
  const jinjaSmall = PRODUCTS.find(p => p.id === '2');
  const iruPack = PRODUCTS.find(p => p.id === '3');
  const iruSingle = PRODUCTS.find(p => p.id === '6');

  return (
    <div className="bg-herb-bg pb-20">
      <Helmet>
        <title>Join Multistream Worldwide | Business Opportunity & Network Marketing Ranks</title>
        <meta name="description" content="Discover financial freedom with Multistream Worldwide. Become an official distributor, explore rank rewards like Sapphire, Gold, and Diamond, and build your legacy with original Jinja Herbal. Official Multistream registration packages 2026." />
        <link rel="canonical" href="https://jinjaproducts.com.ng/join-us" />
        <meta property="og:title" content="Join the Multistream Network | Passive Income Opportunity" />
        <meta property="og:description" content="Unlock rewards and achieve financial independence. Join our global network of entrepreneurs distributing Jinja Herbal products." />
        <meta name="keywords" content="multistream worldwide registration, join jinja herbal network, multistream compensation plan, sapphire rank multistream, diamond rank rewards nigeria, work from home herbal business" />
      </Helmet>
      {/* Hero Section */}
      <section className="bg-herb-primary py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-8">
              <Users className="w-6 h-6 text-herb-accent" />
              <span className="text-white font-bold uppercase tracking-widest text-sm">Empowering Your Future</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-6 leading-tight">Join <span className="text-herb-secondary">Multistream Worldwide</span></h1>
            <p className="text-herb-secondary max-w-3xl mx-auto text-xl leading-relaxed font-medium">
              Unlock a world of limitless potential. Join a community of forward-thinking entrepreneurs building legacies of health and wealth through the power of Multistream Worldwide's revolutionary network.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-5">
          <Users className="w-80 h-80 text-white" />
        </div>
      </section>

      {/* Intro Section with Gradient */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-herb-primary to-herb-accent"></div>
            <h2 className="text-lg md:text-xl font-display font-medium text-gray-700 mb-6 tracking-wide uppercase">
              MULTISTREAM REGISTRATION PACKAGES EFFECTIVE 2026
            </h2>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">
              To become a member of Multistream, there are various entry packages you can register with. Check them below along with the incredible rank rewards waiting for you.
            </p>
            <div className="bg-gray-50 rounded-[2.5rem] p-2 md:p-4 border border-gray-100 shadow-inner max-w-4xl mx-auto overflow-hidden">
              <img 
                src="http://desirebrand.com/images1/registration.jpeg" 
                alt="Multistream Registration Packages 2026" 
                className="w-full h-auto rounded-[2rem] shadow-sm transform transition-transform duration-700 hover:scale-[1.01]"
              />
            </div>
            <div className="mt-12">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/contact')}
                className="bg-herb-accent text-gray-900 px-8 py-3.5 rounded-[2rem] font-bold text-lg hover:brightness-110 shadow-2xl transition-all border-b-4 border-herb-accent-dark/20"
              >
                Start Registration Now
              </motion.button>
            </div>
            <div className="mt-12 pt-8">
              <span className="text-xs font-bold text-herb-primary uppercase tracking-[0.2em] mb-8 block">Experience Our Products</span>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6">
                {jinjaBig && (
                  <button 
                    onClick={() => addToCart(jinjaBig, true)}
                    className="flex items-center justify-center gap-3 bg-herb-primary text-white px-6 py-3 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl group border-b-4 border-black/10"
                  >
                    <div className="bg-white p-1.5 rounded-lg shadow-inner">
                      <img src={jinjaBig.image} alt="Jinja Big" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">Jinja (Big)</div>
                      <div className="text-sm">Buy @ ₦{jinjaBig.price.toLocaleString()}</div>
                    </div>
                  </button>
                )}
                {jinjaSmall && (
                  <button 
                    onClick={() => addToCart(jinjaSmall, true)}
                    className="flex items-center justify-center gap-3 bg-herb-primary text-white px-6 py-3 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl group border-b-4 border-black/10"
                  >
                    <div className="bg-white p-1.5 rounded-lg shadow-inner">
                      <img src={jinjaSmall.image} alt="Jinja Small" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">Jinja (Small)</div>
                      <div className="text-sm">Buy @ ₦{jinjaSmall.price.toLocaleString()}</div>
                    </div>
                  </button>
                )}
                {iruPack && (
                  <button 
                    onClick={() => addToCart(iruPack, true)}
                    className="flex items-center justify-center gap-3 bg-herb-primary text-white px-6 py-3 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl group border-b-4 border-black/10"
                  >
                    <div className="bg-white p-1.5 rounded-lg shadow-inner">
                      <img src={iruPack.image} alt="Iru Soap Pack" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">IRU Soap (Pack)</div>
                      <div className="text-sm">Buy @ ₦{iruPack.price.toLocaleString()}</div>
                    </div>
                  </button>
                )}
                {iruSingle && (
                  <button 
                    onClick={() => addToCart(iruSingle, true)}
                    className="flex items-center justify-center gap-3 bg-herb-primary text-white px-6 py-3 rounded-2xl font-bold hover:brightness-110 transition-all shadow-xl group border-b-4 border-black/10"
                  >
                    <div className="bg-white p-1.5 rounded-lg shadow-inner">
                      <img src={iruSingle.image} alt="Iru Soap Single" className="w-8 h-8 object-contain" />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-wider opacity-80">IRU Soap (Single)</div>
                      <div className="text-sm">Buy @ ₦{iruSingle.price.toLocaleString()}</div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Ranks Section with Colorful Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h3 className="text-3xl font-display font-bold text-gray-900 text-center mb-16 flex items-center justify-center gap-4">
            <Trophy className="w-8 h-8 text-herb-accent" />
            TEN DIFFERENT RANKS IN MULTI STREAM
            <Trophy className="w-8 h-8 text-herb-accent" />
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {RANKS.map((rank, index) => (
              <motion.div
                key={rank.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index % 2 * 0.1 }}
                className="bg-white rounded-[3rem] p-10 shadow-lg border border-gray-100 flex flex-col h-full hover:shadow-2xl hover:-translate-y-2 transition-all group relative overflow-hidden"
              >
                {/* Accent Background Glow */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity group-hover:opacity-20 ${rank.color.split(' ')[0]}`}></div>

                <div className="flex items-center gap-6 mb-10">
                  <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center flex-shrink-0 border-2 shadow-inner group-hover:scale-110 transition-transform ${rank.color}`}>
                    {React.cloneElement(rank.icon as React.ReactElement, { className: "w-8 h-8" })}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-herb-accent uppercase tracking-[0.3em] mb-2 block">Rank {rank.id}</span>
                    <h4 className="text-2xl font-display font-bold text-gray-900 group-hover:text-herb-primary transition-colors">{rank.name}</h4>
                  </div>
                </div>

                <div className="space-y-5 flex-1 mb-12">
                  <h5 className="font-bold text-xs text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-herb-primary"></div> Requirements
                  </h5>
                  {rank.requirements.map((req, i) => (
                    <div key={`rank-req-${rank.id}-${i}`} className="flex gap-4 items-start">
                      <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{req}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-auto relative">
                  <div className={`absolute inset-0 rounded-3xl blur-md opacity-20 ${rank.color.split(' ')[0]}`}></div>
                  <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-3 block">Ambassador Reward</span>
                    <p className="text-2xl font-display font-bold text-herb-primary">
                      {rank.reward}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Image Section with Added Impact */}
        <div className="py-20 relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03]">
             <Award className="w-[800px] h-[800px]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative z-10"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">Visualize Your Success</h3>
              <p className="text-gray-500">A clear pathway from entry to executive leadership ranks.</p>
            </div>
            
            <div className="bg-white rounded-[4rem] p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-herb-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              <img 
                src="http://desirebrand.com/images1/rank.jpeg" 
                alt="Multistream Rank Rewards" 
                className="w-full h-auto rounded-[3.5rem] shadow-sm transform transition-transform duration-1000 group-hover:scale-[1.03]" 
              />
            </div>
          </motion.div>
        </div>

        {/* Final CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gray-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Build Your Legacy?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Don't wait for opportunity. Create it. Join our network of thousands of successful entrepreneurs worldwide.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-herb-accent text-gray-900 px-8 py-4 rounded-2xl font-bold text-base hover:bg-white transition-all shadow-xl shadow-herb-accent/20"
              >
                Join Multistream Today
              </button>
            </div>
          </div>
          <Users className="absolute -bottom-20 -left-20 w-80 h-80 text-white/5" />
          <Star className="absolute top-10 right-10 w-20 h-20 text-herb-accent/10" />
        </motion.section>
      </section>
    </div>
  );
};
