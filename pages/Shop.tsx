import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';

const Shop: React.FC = () => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Handbags', 'Accessories'];
  
  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const toggleWishlist = (e: React.MouseEvent, product: any) => {
      e.preventDefault();
      e.stopPropagation();
      if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product);
      }
  };

  return (
    <main className="max-w-[1440px] mx-auto px-6 py-12">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">NEW ARRIVALS</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">Exploring the intersection of modern materials, futuristic shapes, and luxury craftsmanship.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-400">Sort by:</span>
            <select className="bg-transparent border-none focus:ring-0 font-bold uppercase tracking-widest text-sm cursor-pointer hover:text-primary transition-colors pr-8">
              <option>Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10">
            <div>
                <h3 className="font-display text-sm font-bold uppercase mb-6 tracking-widest">Category</h3>
                <div className="space-y-3">
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <input 
                                type="radio" 
                                name="category"
                                checked={filter === cat}
                                onChange={() => setFilter(cat)}
                                className="w-5 h-5 border-slate-300 text-primary focus:ring-primary cursor-pointer" 
                            />
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
            
            <div>
                <h3 className="font-display text-sm font-bold uppercase mb-6 tracking-widest">Price Range</h3>
                <div className="space-y-4">
                    <input className="w-full accent-primary bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer" type="range"/>
                    <div className="flex items-center justify-between text-sm font-medium">
                        <span>$150</span>
                        <span>$2,500</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-display text-sm font-bold uppercase mb-6 tracking-widest">Colors</h3>
                <div className="grid grid-cols-5 gap-3">
                    <button className="w-8 h-8 rounded-full bg-primary border-2 border-white dark:border-slate-800 ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark"></button>
                    <button className="w-8 h-8 rounded-full bg-[#E0E0E0] border-2 border-white dark:border-slate-800 hover:scale-110 transition-transform"></button>
                    <button className="w-8 h-8 rounded-full bg-[#1A1A1A] border-2 border-white dark:border-slate-800 hover:scale-110 transition-transform"></button>
                    <button className="w-8 h-8 rounded-full bg-[#C0C0C0] border-2 border-white dark:border-slate-800 hover:scale-110 transition-transform"></button>
                    <button className="w-8 h-8 rounded-full bg-[#F5F5DC] border-2 border-white dark:border-slate-800 hover:scale-110 transition-transform"></button>
                </div>
            </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {filteredProducts.map((product) => (
                <div key={product.id} className={`group ${product.isSoldOut ? 'opacity-60 pointer-events-none' : ''}`}>
                    <div className="relative bg-gradient-to-br from-[#FCE7EB] to-white dark:from-[#2A1A1E] dark:to-[#1A1A1A] aspect-[4/5] rounded-3xl overflow-hidden mb-6 flex items-center justify-center p-8 transition-transform duration-500 group-hover:-translate-y-2">
                        <div className="absolute top-4 left-4 flex gap-2 z-10">
                            {product.isEco && (
                                <span className="bg-white/90 dark:bg-black/90 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1">
                                    <span className="material-icons-outlined text-sm">eco</span> ECO
                                </span>
                            )}
                            {product.isNew && (
                                <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">New</span>
                            )}
                            {product.isSoldOut && (
                                <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Sold Out</span>
                            )}
                        </div>
                        
                        <div className="absolute top-4 right-4 z-20">
                            <button 
                                onClick={(e) => toggleWishlist(e, product)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isInWishlist(product.id) ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'bg-white/80 dark:bg-black/30 text-slate-400 hover:bg-white dark:hover:bg-black hover:text-primary'}`}
                            >
                                <span className="material-icons text-sm">{isInWishlist(product.id) ? 'favorite' : 'favorite_border'}</span>
                            </button>
                        </div>
                        
                        <Link to={`/product/${product.id}`} className="block w-full h-full flex items-center justify-center">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className={`max-w-full h-auto object-contain mix-blend-multiply dark:mix-blend-normal ${product.isSoldOut ? 'grayscale' : ''}`}
                            />
                        </Link>

                        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-primary text-white font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-2xl shadow-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-icons-outlined text-sm">add_shopping_cart</span> Add to Cart
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between items-start px-2">
                        <div>
                            <Link to={`/product/${product.id}`}>
                                <h3 className="font-display font-bold text-lg leading-none mb-1 uppercase hover:text-primary transition-colors">{product.name}</h3>
                            </Link>
                            <p className="text-slate-400 text-sm font-medium">{product.subtitle}</p>
                        </div>
                        <span className={`font-bold text-lg ${product.isNew ? 'text-primary' : ''}`}>${product.price}</span>
                    </div>
                </div>
            ))}
          </div>

          <div className="mt-20 flex items-center justify-center gap-4">
            <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <span className="material-icons-outlined">west</span>
            </button>
            <div className="flex items-center gap-2">
              <button className="w-12 h-12 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/30">1</button>
              <button className="w-12 h-12 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 font-bold transition-colors">2</button>
              <button className="w-12 h-12 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 font-bold transition-colors">3</button>
            </div>
            <button className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <span className="material-icons-outlined">east</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Shop;