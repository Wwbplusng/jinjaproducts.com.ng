import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Leaf, 
  Zap, 
  Droplets, 
  Activity, 
  Scale, 
  Eye, 
  AlertCircle, 
  Dna, 
  Wind, 
  Thermometer, 
  Stethoscope,
  Heart,
  Sparkles,
  Award,
  Medal,
  Target,
  TrendingUp,
  CheckCircle2,
  Gem,
  Star,
  Trophy
} from 'lucide-react';
import { Product, ShippingOption, Benefit, BlogPost, Rank } from './types';

export const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Jinja Herbal Extract (Big)',
    price: 14500,
    description: "JINJA Herbal Extracts are formulated with powerful bioactive compounds derived from 100% natural herbs, scientifically known for their antiviral properties. These plant-based extracts work by inhibiting viral replication, preventing the virus from multiplying and spreading within the body. Additionally, they help to strengthen the body's immune response, allowing your natural defense system to combat infections more effectively.",
    image: 'http://desirebrand.com/images1/jinjabig750.png',
    color: 'bg-[#e8f5e9]',
    rating: 4.8,
    reviews: 156
  },
  {
    id: '2',
    name: 'Jinja Herbal Extract (Small)',
    price: 8500,
    description: "JINJA Herbal Extracts are formulated with powerful bioactive compounds derived from 100% natural herbs, scientifically known for their antiviral properties. These plant-based extracts work by inhibiting viral replication, preventing the virus from multiplying and spreading within the body. Additionally, they help to strengthen the body's immune response, allowing your natural defense system to combat infections more effectively.",
    image: 'http://desirebrand.com/images1/jinjasmall350.png',
    color: 'bg-[#e0f7fa]',
    rating: 4.7,
    reviews: 215
  },
  {
    id: '3',
    name: 'IRU Antiseptic Herbal Soap',
    price: 12500,
    description: "A premium natural skincare solution designed to maintain healthy and clean skin. Formulated with natural ingredients, this herbal soap serves as an excellent alternative to chemical-based soaps that can be harsh on the skin.",
    image: 'http://desirebrand.com/images1/iru.png',
    color: 'bg-[#f5f5dc]',
    rating: 4.9,
    reviews: 92
  },
  {
    id: '4',
    name: 'Jinja Herbal Extract (Big - 20 bottles)',
    price: 275000,
    description: "Boost Your Immunity with JINJA Herbal Extracts – Natural Defense Against Viral Infections and Diseases (Antibiotic, Antiviral, Antifungal, and Ant parasitic Body Refresh!)",
    image: 'http://desirebrand.com/images1/jinjabigcartoon.png',
    color: 'bg-[#e8f5e9]',
    rating: 4.8,
    reviews: 45
  },
  {
    id: '5',
    name: 'Jinja Herbal Extract (Small - 20 bottles)',
    price: 145000,
    description: "Boost Your Immunity with JINJA Herbal Extracts – Natural Defense Against Viral Infections and Diseases (Antibiotic, Antiviral, Antifungal, and Ant parasitic Body Refresh!)",
    image: 'http://desirebrand.com/images1/jinjasmallcarton.png',
    color: 'bg-[#e0f7fa]',
    rating: 4.7,
    reviews: 38
  }
];

export const SHIPPING_OPTIONS: Record<string, ShippingOption> = {
  mainland: { label: 'Mainland', fee: 6000 },
  island: { label: 'Island', fee: 6000 },
  pod: { label: 'Pay on delivery', fee: 0 },
};

export const BENEFITS: Benefit[] = [
  { title: "Natural Detoxifier", description: "Assists in eliminating toxins from the body, promoting overall health and well-being.", icon: <Droplets className="w-5 h-5" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { title: "Immune System Support", description: "Enhances the body's natural defense mechanisms, aiding in the prevention of illnesses and infections.", icon: <ShieldCheck className="w-5 h-5" />, color: "bg-green-50 text-green-600 border-green-100" },
  { title: "Rich in Antioxidants", description: "Contains compounds that neutralize harmful free radicals, reducing oxidative stress and supporting cellular health.", icon: <Zap className="w-5 h-5" />, color: "bg-amber-50 text-amber-600 border-amber-100" },
  { title: "Promotes Kidney and Liver Health", description: "Supports the body's natural detoxification processes, contributing to the optimal functioning of vital organs.", icon: <Activity className="w-5 h-5" />, color: "bg-rose-50 text-rose-600 border-rose-100" },
  { title: "Antimicrobial Properties", description: "Exhibits properties that combat bacteria, fungi, viruses, and parasites, offering a natural defense against various infections.", icon: <Leaf className="w-5 h-5" />, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { title: "Assists in Managing Malaria and Typhoid Fever", description: "Traditionally used to alleviate symptoms associated with these infections, supporting a quicker recovery.", icon: <Thermometer className="w-5 h-5" />, color: "bg-orange-50 text-orange-600 border-orange-100" },
  { title: "Regulates Cholesterol Levels", description: "Aids in maintaining healthy cholesterol levels, promoting cardiovascular health.", icon: <Heart className="w-5 h-5" />, color: "bg-red-50 text-red-600 border-red-100" },
  { title: "Normalizes Blood Pressure", description: "Supports the maintenance of healthy blood pressure levels, contributing to overall cardiovascular well-being.", icon: <Activity className="w-5 h-5" />, color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
  { title: "Stabilizes Blood Sugar Levels", description: "Assists in regulating blood glucose levels, supporting metabolic health.", icon: <Scale className="w-5 h-5" />, color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
  { title: "Supports Weight Management", description: "Aids in weight loss efforts by promoting metabolism and reducing appetite.", icon: <Scale className="w-5 h-5" />, color: "bg-violet-50 text-violet-600 border-violet-100" },
  { title: "Aids Digestion", description: "Facilitates healthy digestion, reducing discomfort and promoting nutrient absorption.", icon: <Zap className="w-5 h-5" />, color: "bg-yellow-50 text-yellow-600 border-yellow-100" },
  { title: "Anti-Inflammatory Properties", description: "Reduces inflammation, providing relief from conditions such as arthritis and other inflammatory disorders.", icon: <Dna className="w-5 h-5" />, color: "bg-teal-50 text-teal-600 border-teal-100" },
  { title: "Enhances Fertility", description: "Supports reproductive health in both males and females, potentially improving fertility outcomes.", icon: <Heart className="w-5 h-5" />, color: "bg-pink-50 text-pink-600 border-pink-100" },
  { title: "Relieves Respiratory Conditions", description: "Assists in alleviating symptoms of coughs, asthma, and allergies, promoting respiratory health.", icon: <Wind className="w-5 h-5" />, color: "bg-sky-50 text-sky-600 border-sky-100" },
  { title: "Improves Vision", description: "Provides nutrients that support eye health, potentially enhancing vision.", icon: <Eye className="w-5 h-5" />, color: "bg-purple-50 text-purple-600 border-purple-100" },
  { title: "Addresses Reproductive Health Issues", description: "Traditionally used to manage conditions such as fibroids and ovarian cysts, supporting reproductive system health.", icon: <ShieldCheck className="w-5 h-5" />, color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100" },
  { title: "Supports Gastrointestinal Health", description: "Assists in managing ulcers and promoting a healthy digestive tract.", icon: <Stethoscope className="w-5 h-5" />, color: "bg-lime-50 text-lime-600 border-lime-100" },
  { title: "Hepatoprotective Effects", description: "Offers protective benefits to the liver, supporting its vital functions.", icon: <ShieldCheck className="w-5 h-5" />, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { title: "Alleviates Hemorrhoids (Piles)", description: "Provides relief from the discomfort associated with hemorrhoids, promoting rectal health.", icon: <Activity className="w-5 h-5" />, color: "bg-slate-50 text-slate-600 border-slate-100" },
  { title: "Supports Stroke Recovery", description: "Assists in the recovery process post-stroke, supporting neurological health.", icon: <Zap className="w-5 h-5" />, color: "bg-amber-50 text-amber-600 border-amber-100" }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'jinja-herbal-extract-guide',
    title: 'Jinja Herbal Extract: A Holistic Approach to Modern Wellness',
    image: 'http://desirebrand.com/images1/jinjabig750.png',
    date: 'May 14, 2024',
    category: 'Wellness Guide',
    author: 'Jinja Health Team',
    color: 'bg-[#e8f5e9]',
    excerpt: 'Discover how this 100% natural formula leverages organic plant-based ingredients to enhance immune function and protect against various health challenges.',
    content: (
      <>
        <p className="text-xl text-gray-500 italic mb-8 border-l-4 border-herb-primary pl-6 py-2 bg-herb-bg/30 rounded-r-xl">
          Jinja Herbal Extract is a natural supplement formulated with organic, plant-based ingredients, offering a holistic approach to enhancing immune function and protecting against various health challenges.
        </p>

        <p className="mb-8">
          This herbal extract serves as a natural alternative to chemical-based supplements, providing a gentle yet effective option for those seeking to improve their overall health. Unlike synthetic solutions that often address symptoms in isolation, Jinja works in harmony with the body's natural systems to restore balance and vitality.
        </p>

        <div className="bg-herb-primary/5 rounded-[2rem] p-8 mb-10 border border-herb-primary/10">
          <h3 className="text-2xl font-display font-bold text-herb-primary mb-8 flex items-center gap-3">
            <Zap className="w-6 h-6" /> Key 20 Benefits for Your Health
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border ${benefit.color}`}>
                  {benefit.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 leading-tight group-hover:text-herb-primary transition-colors">{benefit.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 flex gap-4 items-start mb-10">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <p className="text-sm text-amber-800 font-medium">
              <strong>Quality Note:</strong> While Jinja Herbal Extract offers a range of traditional health benefits, it is essential to consult with a healthcare professional before incorporating any new supplement into your routine, especially if you have existing health conditions or are on medication.
            </p>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'detoxing-naturally-guide',
    title: 'Detoxing Naturally: A Guide with Jinja Herbal Extract',
    image: 'http://desirebrand.com/images1/jinjabig750.png',
    date: 'May 10, 2024',
    category: 'Detox Tips',
    author: 'Wellness Expert',
    color: 'bg-blue-50',
    excerpt: 'One of the best ways to help the body restore balance, improve energy levels, and support internal cleansing.',
    content: (
      <div className="space-y-6">
        <p>In today’s fast-paced world, our bodies are constantly exposed to unhealthy foods, pollution, stress, and toxins that can affect our overall wellness. Detoxing naturally is one of the best ways to help the body restore balance, improve energy levels, and support internal cleansing. One natural solution many people are turning to is <strong>Jinja Herbal Extract</strong>.</p>
        
        <p>Made from carefully selected herbal ingredients, Jinja Herbal Extract is designed to support the body’s natural detoxification process. The liver, kidneys, digestive system, and skin all play important roles in removing toxins from the body, and herbal remedies have long been used to help these organs function more effectively.</p>
        
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
           <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2"><Droplets className="w-5 h-5" /> Natural Cleansing Process</h4>
           <p>Jinja Herbal Extract contains natural plant compounds known for their cleansing and digestive-support properties. Regular use may help improve digestion, reduce bloating, support bowel movement regularity, and promote a feeling of lightness and wellness.</p>
        </div>

        <p>Detoxing naturally is not about extreme dieting or starvation. It involves supporting the body with healthy hydration, nutritious foods, exercise, proper rest, and natural herbal support. Incorporating Jinja Herbal Extract into a healthy lifestyle may help individuals feel more refreshed, energized, and balanced.</p>
        
        <p className="bg-gray-50 p-4 rounded-xl border-l-4 border-herb-primary italic">
          For best results, detoxing should be combined with drinking enough water, reducing processed foods, and maintaining healthy daily habits. Natural wellness is a journey, and herbal support can be a valuable part of that process.
        </p>
      </div>
    )
  },
  {
    id: 'immune-support-secrets',
    title: 'Immune Support Secrets with Jinja Herbal Extract',
    image: 'http://desirebrand.com/images1/jinjabig750.png',
    date: 'Apr 28, 2024',
    category: 'Immune Health',
    author: 'Nutritional Specialist',
    color: 'bg-green-50',
    excerpt: 'A strong immune system is essential for maintaining good health and protecting against environmental stressors.',
    content: (
      <div className="space-y-6">
        <p>A strong immune system is essential for maintaining good health and protecting the body against everyday environmental stressors. As people become more health-conscious, many are exploring natural ways to strengthen their immune defenses. One effective option is <strong>Jinja Herbal Extract</strong>, a herbal blend created to support overall wellness and immune health naturally.</p>
        
        <p>The immune system works continuously to defend the body against harmful bacteria, viruses, and toxins. However, factors such as stress, poor nutrition, lack of sleep, and environmental pollutants can weaken the body’s natural defense system. This is why immune support is important for maintaining energy, vitality, and long-term wellness.</p>
        
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
           <h4 className="font-bold text-green-900 mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> The Power of Consistency</h4>
           <p>Jinja Herbal Extract combines herbal ingredients traditionally known for their immune-supporting and antioxidant properties. Natural herbs are often rich in vitamins, minerals, and bioactive compounds that help support healthy body functions and improve the body’s resilience.</p>
        </div>

        <p>One of the secrets to maintaining a strong immune system is consistency. Healthy eating, proper sleep, hydration, exercise, and regular herbal supplementation can work together to support the body naturally. Jinja Herbal Extract may help support internal balance, improve general wellness, and promote a healthier lifestyle.</p>
      </div>
    )
  },
  {
    id: 'antiseptic-herbs-power',
    title: 'The Power of Antiseptic Herbs in IRU Antiseptic Soap',
    image: 'http://desirebrand.com/images1/iru.png',
    date: 'Apr 15, 2024',
    category: 'Herbal Science',
    author: 'Traditional Healer',
    color: 'bg-yellow-50',
    excerpt: 'Antiseptic herbs have been used for centuries to help cleanse the body and support overall health.',
    content: (
      <div className="space-y-6">
        <p>For centuries, herbs with antiseptic properties have been used in traditional wellness practices to help cleanse the body and support overall health. Today, natural herbal products such as <strong>IRU Antiseptic Soap</strong> continue to gain popularity because of their plant-based wellness benefits and natural support for the body.</p>
        
        <p>Antiseptic herbs are herbs that contain natural compounds known for helping maintain cleanliness and balance within the body. These herbs have traditionally been valued for their cleansing, soothing, and protective properties. Many herbal plants contain antioxidants and phytochemicals that support the body’s natural defense and recovery processes.</p>
        
        <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
           <h4 className="font-bold text-amber-900 mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Plant-Based Cleanliness</h4>
           <p><strong>IRU Antiseptic Soap</strong> incorporates carefully selected herbal ingredients that are associated with natural wellness and internal cleansing support. These herbs may help support skin health, promote external balance, and contribute to overall body wellness when combined with healthy living practices.</p>
        </div>

        <p>Incorporating herbal products like <strong>IRU Antiseptic Soap</strong> into a balanced lifestyle may help individuals maintain a greater sense of wellness and vitality. While herbs have long been respected for their traditional uses, it is always important to use herbal supplements responsibly and combine them with proper nutrition, hydration, and healthy habits.</p>
      </div>
    )
  }
];

export const RANKS: Rank[] = [
  {
    id: 1,
    name: "SAPPHIRE RANK",
    requirements: [
      "You need 3,000pvs in total, the LLPV must have minimum of 1,500pvs.",
      "You MUST be on STANDARD and personally sponsor two STANDARD packages 1 on each leg."
    ],
    reward: "A whopping sum of N70,000",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-blue-50 text-blue-600 border-blue-100"
  },
  {
    id: 2,
    name: "BRONZE RANK",
    requirements: [
      "You need 9,000pvs in total, the LLPV must have minimum of 4,500pvs.",
      "You MUST be on ADVANCE package and personally sponsor two Standard packages 1 on each leg."
    ],
    reward: "A whopping sum of N150,000",
    icon: <Award className="w-6 h-6" />,
    color: "bg-orange-50 text-orange-600 border-orange-100"
  },
  {
    id: 3,
    name: "SILVER RANK",
    requirements: [
      "You need 22,000pvs in total, the LLPV must have minimum of 11,000pvs.",
      "You MUST be on EXCEL package and personally sponsor two ADVANCE packages 1 on each leg."
    ],
    reward: "A whopping sum of N300,000",
    icon: <Medal className="w-6 h-6" />,
    color: "bg-slate-50 text-slate-400 border-slate-100"
  },
  {
    id: 4,
    name: "GOLD RANK",
    requirements: [
      "You need 62,000pvs in total, the LLPV must have minimum of 31,000pvs.",
      "You MUST be on FLOURISH package and have two SILVER DOWNLINES 1 on each leg and MUST not be your personal sponsor."
    ],
    reward: "A whopping sum of N1,000,000",
    icon: <Target className="w-6 h-6" />,
    color: "bg-yellow-50 text-yellow-600 border-yellow-100"
  },
  {
    id: 5,
    name: "RUBY RANK",
    requirements: [
      "You need 140,000pvs in total, the LLPV must have minimum of 70,000pvs.",
      "You MUST be on FLOURISH package and have two SILVER DOWNLINES 1 on each leg and MUST not be your personal sponsored account."
    ],
    reward: "A whopping sum of N2,000,000",
    icon: <TrendingUp className="w-6 h-6" />,
    color: "bg-red-50 text-red-600 border-red-100"
  },
  {
    id: 6,
    name: "JADE RANK",
    requirements: [
      "You need 360,000pvs in total, the LLPV must have minimum of 180,000pvs.",
      "You MUST be on FLOURISH package and have two SILVER DOWNLINES 1 on each leg and MUST not be your personal sponsored account."
    ],
    reward: "A whopping sum of N6,000,000",
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "bg-teal-50 text-teal-600 border-teal-100"
  },
  {
    id: 7,
    name: "CRYSTAL RANK",
    requirements: [
      "You need 796,000pvs in total, the LLPV must have minimum of 398,000pvs.",
      "You MUST be on FLOURISH package and have two GOLD DOWNLINES 1 on each leg and MUST not be your personal sponsored account."
    ],
    reward: "A whopping sum of N11,000,000",
    icon: <Gem className="w-6 h-6" />,
    color: "bg-indigo-50 text-indigo-600 border-indigo-100"
  },
  {
    id: 8,
    name: "1ST STAR DIAMOND RANK",
    requirements: [
      "You need 1,800,000pvs in total, the LLPV must have minimum of 900,000pvs.",
      "You MUST be on FLOURISH package and have two CRYSTAL DOWNLINES 1 on each leg and MUST be your personal sponsored ACCOUNTS."
    ],
    reward: "A whopping sum of N25,000,000",
    icon: <Star className="w-6 h-6" />,
    color: "bg-blue-100 text-blue-700 border-blue-200"
  },
  {
    id: 9,
    name: "2ND STAR DIAMOND RANK",
    requirements: [
      "You need 3,800,000pvs in total, the LLPV must have minimum of 1,900,000pvs.",
      "You MUST be on FLOURISH package and have two CRYSTAL DOWNLINES 1 on each leg and MUST be your personal sponsored ACCOUNTS."
    ],
    reward: "A whopping sum of N50,000,000",
    icon: <Star className="w-6 h-6" />,
    color: "bg-purple-100 text-purple-700 border-purple-200"
  },
  {
    id: 10,
    name: "PLATINUM RANK",
    requirements: [
      "You need 7,700,000pvs in total, the LLPV must have minimum of 3,850,000pvs.",
      "You MUST be on FLOURISH package and have two 2 STAR DIAMOND DOWNLINES 1 on each leg and MUST be your personal sponsored ACCOUNTS."
    ],
    reward: "A whopping sum of N100,000,000",
    icon: <Trophy className="w-6 h-6" />,
    color: "bg-emerald-100 text-emerald-800 border-emerald-200"
  }
];
