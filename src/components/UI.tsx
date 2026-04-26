import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  ChevronRight, 
  Star, 
  ArrowRight,
  Heart
} from 'lucide-react';
import { Artisan, Product } from '../types';

export const ProductCard: React.FC<{ product: Product; artisan?: Artisan; onClick: () => void }> = ({ product, artisan, onClick }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="glass-card flex flex-col overflow-hidden text-left w-full h-full"
  >
    <div className="relative aspect-square">
      <img 
        src={product.images[0]} 
        alt={product.name}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
        <Heart className="w-4 h-4 text-white" />
      </div>
      <div className="absolute bottom-4 left-4 right-4">
         <span className="px-3 py-1 bg-accent text-white text-[10px] font-bold uppercase tracking-wider rounded-full">
           {product.category}
         </span>
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold leading-tight">{product.name}</h3>
        <span className="text-lg font-bold text-primary">₹{product.price}</span>
      </div>
      <p className="text-xs text-earth-800/60 line-clamp-2 italic">
        "{product.impactScore}"
      </p>
      {artisan && (
        <div className="mt-auto pt-4 border-t border-earth-200 flex items-center gap-3">
          <img 
            src={artisan.photoUrl} 
            alt={artisan.name}
            className="w-6 h-6 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          <span className="text-[10px] font-semibold text-earth-800/80 uppercase tracking-widest">
            By {artisan.name} ({artisan.tribe})
          </span>
        </div>
      )}
    </div>
  </motion.button>
);

export const ArtisanSection: React.FC<{ artisans: Artisan[] }> = ({ artisans }) => (
  <div className="flex flex-col gap-4 py-6">
    <div className="flex justify-between items-center px-6">
      <h2 className="text-2xl font-bold">The Artisans</h2>
      <button className="text-accent text-sm font-semibold flex items-center gap-1">
        View All <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
      {artisans.map(artisan => (
        <motion.div
          key={artisan.id}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 w-64 bg-primary text-white rounded-[32px] p-6 flex flex-col gap-4"
        >
          <div className="flex items-center gap-4">
            <img 
              src={artisan.photoUrl} 
              alt={artisan.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="font-bold text-lg leading-none">{artisan.name}</h4>
              <span className="text-[10px] opacity-70 uppercase tracking-widest">{artisan.tribe}</span>
            </div>
          </div>
          <p className="text-xs line-clamp-3 opacity-80 leading-relaxed italic">
            "{artisan.story}"
          </p>
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span className="text-xs font-bold">{artisan.rating}</span>
            </div>
            <button className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export const BottomNav: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => (
  <div className="fixed bottom-0 left-0 right-0 p-4 pb-8 z-50 pointer-events-none">
    <div className="container-sm">
      <div className="bg-earth-800 text-white rounded-[100px] p-2 flex justify-around items-center shadow-2xl pointer-events-auto">
        {[
          { id: 'home', icon: Home, label: 'Feed' },
          { id: 'search', icon: Search, label: 'Search' },
          { id: 'orders', icon: ShoppingBag, label: 'Shop' },
          { id: 'profile', icon: User, label: 'Profile' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-[100px] transition-all duration-300 ${
              activeTab === item.id ? 'bg-white text-earth-800' : 'opacity-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {activeTab === item.id && <span className="text-sm font-bold">{item.label}</span>}
          </button>
        ))}
      </div>
    </div>
  </div>
);
