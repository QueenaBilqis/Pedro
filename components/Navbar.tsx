import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../constants';

const Navbar: React.FC = () => {
  const { cart, toggleTheme, isDarkMode, isAuthenticated } = useShop();
  const location = useLocation();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchOpen]);

  // Filter products based on search
  const searchResults = searchQuery.length > 0 
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${isHome ? 'bg-transparent backdrop-blur-sm' : 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800'}`}>
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-primary hover:text-primary-dark transition-colors">
              PEDRO
            </Link>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest text-slate-800 dark:text-slate-200">
              <Link to="/shop" className="hover:text-primary transition-colors">Collections</Link>
              <Link to="/" className="hover:text-primary transition-colors">Futurism</Link>
              <Link to="/shop" className="text-primary underline underline-offset-8 decoration-2">Shop All</Link>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 text-slate-800 dark:text-slate-200">
            <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block"
            >
              <span className="material-icons-outlined">search</span>
            </button>
            
            <Link to="/checkout" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
              <span className="material-icons-outlined">shopping_bag</span>
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link to={isAuthenticated ? "/profile" : "/login"} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-icons-outlined">person</span>
            </Link>

            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isDarkMode ? (
                <span className="material-icons-outlined">light_mode</span>
              ) : (
                <span className="material-icons-outlined">dark_mode</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
          <div className="fixed inset-0 z-[100] bg-white/95 dark:bg-black/95 backdrop-blur-xl animate-fade-in flex flex-col">
              <div className="max-w-[1440px] mx-auto px-6 w-full pt-6 flex justify-end">
                  <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                  >
                      <span className="material-icons text-3xl">close</span>
                  </button>
              </div>
              
              <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-6 mt-10">
                  <div className="relative border-b-2 border-slate-200 dark:border-slate-800 focus-within:border-primary transition-colors">
                      <input 
                          ref={searchInputRef}
                          type="text" 
                          placeholder="Search for products..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-transparent py-6 text-3xl md:text-5xl font-display font-bold outline-none placeholder:text-slate-300 dark:placeholder:text-slate-700"
                      />
                      <span className="material-icons absolute right-0 top-1/2 -translate-y-1/2 text-4xl text-slate-300">search</span>
                  </div>

                  <div className="mt-12 overflow-y-auto pb-20 custom-scrollbar">
                      {searchQuery === '' ? (
                          <div>
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Popular Searches</p>
                              <div className="flex flex-wrap gap-4">
                                  {['Futuristic Handbag', 'Chrome', 'Accessories', 'Eco-friendly'].map(tag => (
                                      <button 
                                          key={tag}
                                          onClick={() => setSearchQuery(tag)}
                                          className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-800 hover:border-primary hover:text-primary transition-colors font-medium"
                                      >
                                          {tag}
                                      </button>
                                  ))}
                              </div>
                          </div>
                      ) : (
                          <div className="space-y-8">
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{searchResults.length} Results Found</p>
                              {searchResults.length > 0 ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {searchResults.map(product => (
                                          <Link 
                                              key={product.id} 
                                              to={`/product/${product.id}`}
                                              onClick={() => setIsSearchOpen(false)}
                                              className="flex gap-6 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors group"
                                          >
                                              <div className="w-24 h-24 rounded-xl bg-white dark:bg-slate-800 p-2 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                                  <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform" />
                                              </div>
                                              <div>
                                                  <h3 className="font-bold text-lg">{product.name}</h3>
                                                  <p className="text-sm text-slate-500 mb-2">{product.category}</p>
                                                  <p className="text-primary font-bold">${product.price}</p>
                                              </div>
                                          </Link>
                                      ))}
                                  </div>
                              ) : (
                                  <div className="text-center py-20 opacity-50">
                                      <span className="material-icons text-6xl mb-4">search_off</span>
                                      <p className="text-xl font-bold">No results found</p>
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </>
  );
};

export default Navbar;