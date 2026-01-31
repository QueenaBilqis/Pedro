import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, User } from '../types';
import { MOCK_USER } from '../constants';

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, rememberMe: boolean) => void;
  logout: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme based on preference or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    // Check for auth (mock) - check both local (Remember Me) and session (Single Session)
    const localAuth = localStorage.getItem('isAuthenticated');
    const sessionAuth = sessionStorage.getItem('isAuthenticated');

    if (localAuth === 'true' || sessionAuth === 'true') {
        setUser(MOCK_USER);
        setIsAuthenticated(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  const login = (email: string, rememberMe: boolean) => {
      // Mock login logic
      setUser({ ...MOCK_USER, email });
      setIsAuthenticated(true);
      
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        sessionStorage.setItem('isAuthenticated', 'true');
      }
  };

  const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('isAuthenticated');
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const addToWishlist = (product: Product) => {
      setWishlist(prev => {
          if (prev.find(item => item.id === product.id)) return prev;
          return [...prev, product];
      });
  };

  const removeFromWishlist = (productId: string) => {
      setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId: string) => {
      return wishlist.some(item => item.id === productId);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <ShopContext.Provider value={{ 
        cart, 
        wishlist,
        addToCart, 
        removeFromCart, 
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        cartTotal, 
        user, 
        isAuthenticated,
        login,
        logout,
        isDarkMode, 
        toggleTheme, 
        clearCart 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};