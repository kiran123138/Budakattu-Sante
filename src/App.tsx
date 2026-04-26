import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  MapPin, 
  ShoppingBag, 
  Menu,
  Sparkles,
  Search,
  LogOut,
  User as UserIcon,
  ShoppingBag as CartIcon
} from 'lucide-react';
import { auth, db } from './lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User
} from 'firebase/auth';
import { storeService } from './services/storeService';
import { seedDatabase } from './services/seedService';
import { Artisan, Product } from './types';
import { ProductCard, ArtisanSection, BottomNav } from './components/UI';
import { ProductDetail } from './components/ProductDetail';

const Header: React.FC<{ user: User | null; onLogin: () => void }> = ({ user, onLogin }) => (
  <header className="px-6 py-8 flex justify-between items-center bg-earth-100">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-1">Rural Tech Concept</span>
      <h1 className="text-3xl font-bold tracking-tighter">Budakattu Sante</h1>
    </div>
    <div className="flex items-center gap-3">
      {user ? (
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => signOut(auth)}
          className="h-12 w-12 rounded-full border-2 border-white overflow-hidden shadow-lg"
        >
          <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-full h-full object-cover" />
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onLogin}
          className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-lg text-earth-800"
        >
          <UserIcon className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  </header>
);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    const init = async () => {
      try {
        await seedDatabase();
        const [a, p] = await Promise.all([
          storeService.getArtisans(),
          storeService.getProducts()
        ]);
        setArtisans(a);
        setProducts(p);
      } catch (error) {
        console.error("Initialization error:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-earth-100 p-10 text-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full mb-6"
        />
        <h2 className="text-2xl font-bold italic mb-2">Budakattu Sante</h2>
        <p className="text-sm text-earth-800/60">Connecting tribal heritage to the modern world...</p>
      </div>
    );
  }

  const selectedArtisan = selectedProduct 
    ? artisans.find(a => a.id === selectedProduct.artisanId) 
    : null;

  return (
    <div className="min-h-screen bg-earth-100 flex flex-col pb-32 max-w-[600px] mx-auto relative overflow-x-hidden">
      <Header user={user} onLogin={handleLogin} />

      <main className="flex-1">
        {activeTab === 'home' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Hero Section */}
            <div className="px-6 mb-8">
              <div className="bg-earth-800 rounded-[40px] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold leading-tight mb-4">Support Local <br/><span className="text-accent italic">Craftsmanship</span></h2>
                  <p className="text-sm opacity-70 mb-6 max-w-[200px]">100% of your payment goes directly to the tribal family bank accounts.</p>
                  <button className="px-6 py-3 bg-accent rounded-full text-sm font-bold flex items-center gap-2">
                    Explore Stories <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-48 h-full bg-accent/20 rounded-l-full blur-3xl" />
              </div>
            </div>

            {/* Artisan Carousel */}
            <ArtisanSection artisans={artisans} />

            {/* Featured Products */}
            <div className="px-6 py-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Latest Arrivals</h2>
                <div className="flex items-center gap-2 text-earth-800/40">
                  <span className="text-xs font-bold uppercase tracking-widest">Filter</span>
                  <Menu className="w-4 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 pb-10">
                {products.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    artisan={artisans.find(a => a.id === product.artisanId)}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'search' && (
          <div className="px-6 p-10 text-center flex flex-col items-center justify-center h-[50vh]">
            <Search className="w-12 h-12 text-earth-200 mb-4" />
            <h3 className="text-xl font-bold opacity-30 italic">Searching for Heritage...</h3>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="px-6 p-10 text-center flex flex-col items-center justify-center h-[50vh]">
            <ShoppingBag className="w-12 h-12 text-earth-200 mb-4" />
            <h3 className="text-xl font-bold opacity-30 italic">Your collection will appear here</h3>
          </div>
        )}

         {activeTab === 'profile' && (
          <div className="px-6 p-6">
            {!user ? (
               <div className="flex flex-col items-center justify-center h-[40vh] bg-white rounded-[32px] p-10 shadow-sm border border-earth-200">
                  <UserIcon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Join the Community</h3>
                  <p className="text-sm text-earth-800/60 mb-8 max-w-[200px]">Sign in to track orders and save your favorite artisans.</p>
                  <button 
                    onClick={handleLogin}
                    className="w-full h-16 bg-earth-800 text-white rounded-full font-bold"
                  >
                    Continue with Google
                  </button>
               </div>
            ) : (
               <div className="flex flex-col gap-6">
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-earth-200 flex flex-col items-center text-center">
                    <img src={user.photoURL || ''} className="w-24 h-24 rounded-full border-4 border-earth-100 mb-4" />
                    <h3 className="text-2xl font-bold">{user.displayName}</h3>
                    <p className="text-sm text-earth-800/60">{user.email}</p>
                    <button 
                      onClick={() => signOut(auth)}
                      className="mt-6 flex items-center gap-2 text-red-500 font-bold text-sm"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="bg-primary text-white p-6 rounded-[32px]">
                        <h4 className="text-sm opacity-70 mb-1">Impact Level</h4>
                        <span className="text-2xl font-bold tracking-tighter italic">Friend of Tribe</span>
                     </div>
                     <div className="bg-accent text-white p-6 rounded-[32px]">
                        <h4 className="text-sm opacity-70 mb-1">Artisans Helped</h4>
                        <span className="text-3xl font-bold">04</span>
                     </div>
                  </div>
               </div>
            )}
          </div>
        )}
      </main>

      {/* Navigations */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-32 left-6 right-6 z-[100] bg-earth-800 text-white p-6 rounded-[32px] flex items-center gap-4 shadow-2xl"
          >
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold">Transaction Simulated</h4>
              <p className="text-xs opacity-70">Payment sent to the artisan's account.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {selectedProduct && selectedArtisan && (
          <ProductDetail 
            product={selectedProduct} 
            artisan={selectedArtisan} 
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => {
              setShowSuccess(true);
              setSelectedProduct(null);
              setTimeout(() => setShowSuccess(false), 4000);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
