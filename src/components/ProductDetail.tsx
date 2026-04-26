import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Heart, Share2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Artisan, Product } from '../types';

interface DetailViewProps {
  product: Product;
  artisan: Artisan;
  onClose: () => void;
  onAddToCart: () => void;
}

export const ProductDetail: React.FC<DetailViewProps> = ({ product, artisan, onClose, onAddToCart }) => {
  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-earth-100 flex flex-col"
    >
      <div className="relative h-[45vh]">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent">
          <button onClick={onClose} className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-3">
             <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-6 right-6">
           <h1 className="text-4xl font-bold text-white leading-tight drop-shadow-lg">{product.name}</h1>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-10 bg-earth-100 rounded-t-[40px]" />
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-primary">₹ {product.price}</span>
            <div className="flex items-center gap-1 text-green-700 text-xs font-bold uppercase tracking-wider mt-1">
              <ShieldCheck className="w-4 h-4" /> 100% Direct to Artisan
            </div>
          </div>
          <div className="px-4 py-2 bg-earth-200 rounded-2xl flex items-center gap-2">
            <span className="text-sm font-bold">Qty: 01</span>
          </div>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Product Story</h2>
          <p className="text-earth-800/80 leading-relaxed font-sans">
            {product.description}
          </p>
        </section>

        <section className="mb-8 bg-primary rounded-[32px] p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src={artisan.photoUrl} 
                alt={artisan.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-2xl font-bold">{artisan.name}</h3>
                <span className="text-sm opacity-70 italic">{artisan.tribe} Community</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-90 italic mb-6">
              "{artisan.story}"
            </p>
            <div className="bg-white/10 p-4 rounded-2xl">
              <h4 className="text-xs font-bold uppercase tracking-widest mb-1 text-accent">Your Impact</h4>
              <p className="text-sm font-medium">{product.impactScore}</p>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-10">
             <ShoppingCart className="w-48 h-48 rotate-12" />
          </div>
        </section>
      </div>

      <div className="fixed bottom-8 left-6 right-6 z-[61]">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onAddToCart}
          className="w-full bg-accent text-white h-20 rounded-[100px] flex items-center justify-between px-8 text-xl font-bold shadow-2xl shadow-accent/40"
        >
          <span>Add to Bag</span>
          <div className="flex items-center gap-2">
            <span>₹ {product.price}</span>
            <ArrowLeft className="w-6 h-6 rotate-180" />
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};
