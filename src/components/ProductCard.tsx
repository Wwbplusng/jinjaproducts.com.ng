import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Eye, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white rounded-3xl shadow-xl shadow-gray-200/30 overflow-hidden flex flex-col border-2 border-herb-secondary/30 hover:border-herb-primary transition-colors duration-300"
    >
      <div className={`h-64 overflow-hidden relative ${product.color}`}>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply opacity-80 hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-all group"
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover:text-red-400'}`} 
            />
          </button>
        </div>
      </div>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={`star-card-${i}`} 
              className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-herb-accent fill-herb-accent' : 'text-gray-300'}`} 
            />
          ))}
          <span className="text-xs text-gray-500 ml-1 font-medium">({product.reviews} reviews)</span>
        </div>
        <h3 className="text-xl font-display font-bold mb-2">{product.name}</h3>
        {product.nafdac && (
          <div className="mb-3">
             <span className="text-[10px] font-bold text-herb-primary bg-herb-primary/5 px-2 py-0.5 rounded border border-herb-primary/10 uppercase tracking-wider">NAFDAC NO: {product.nafdac}</span>
          </div>
        )}
        <p className="text-gray-600 text-sm mb-6 flex-1 italic line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-bold text-herb-primary">₦{product.price.toLocaleString()}</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => onViewDetails(product)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-herb-brown text-white rounded-xl font-bold hover:brightness-110 transition-colors text-sm"
          >
            <Eye className="w-4 h-4" />
            Details
          </button>
          <button 
            onClick={() => addToCart(product, true)}
            className="bg-herb-primary text-white py-3 rounded-xl font-bold hover:bg-herb-primary-hover shadow-md transition-all text-sm"
          >
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};
