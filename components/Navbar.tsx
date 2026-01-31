import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const Navbar: React.FC = () => {
  const { cart, toggleTheme, isDarkMode, isAuthenticated } = useShop();
  const location = useLocation();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isHome = location.pathname === '/';

  return (
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
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
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
  );
};

export default Navbar;