import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, User } from '../types';
import { MOCK_USER } from '../constants';

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, rememberMe: boolean) => void;
  register: (name: string, email: string) => void;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
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

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
    
    const localAuth = localStorage.getItem('isAuthenticated');
    const sessionAuth = sessionStorage.getItem('isAuthenticated');

    if (localAuth === 'true' || sessionAuth === 'true') {
        const savedUser = localStorage.getItem('user_data');
        setUser(savedUser ? JSON.parse(savedUser) : MOCK_USER);
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
      const newUser = { ...MOCK_USER, email };
      setUser(newUser);
      setIsAuthenticated(true);
      
      if (rememberMe) {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_data', JSON.stringify(newUser));
      } else {
        sessionStorage.setItem('isAuthenticated', 'true');
      }
  };

  const register = (name: string, email: string) => {
      const newUser: User = { 
          ...MOCK_USER, 
          name, 
          email, 
          tier: 'Silver', 
          points: 0 
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      sessionStorage.setItem('isAuthenticated', 'true');
      sessionStorage.setItem('user_data', JSON.stringify(newUser));
  };

  const logout = () => {
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('isAuthenticated');
  };

  const updateUserProfile = (data: Partial<User>) => {
      if (user) {
          const updatedUser = { ...user, ...data };
          setUser(updatedUser);
          if (localStorage.getItem('isAuthenticated')) {
              localStorage.setItem('user_data', JSON.stringify(updatedUser));
          }
      }
  };

  const addToCart = (product: Product, size: string = 'Standard', color: string = 'Default', quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => 
          item.id === product.id && 
          (item.selectedSize || 'Standard') === size && 
          (item.selectedColor || 'Default') === color
      );

      if (existing) {
        return prev.map(item => 
          (item.id === product.id && (item.selectedSize || 'Standard') === size && (item.selectedColor || 'Default') === color)
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      let adjustedPrice = product.price;
      if (size === 'Large') {
          adjustedPrice = product.price * 1.2;
      }

      return [...prev, { 
          ...product, 
          price: adjustedPrice,
          quantity, 
          selectedSize: size, 
          selectedColor: color 
      }];
    });
  };

  const removeFromCart = (productId: string, size: string = 'Standard', color: string = 'Default') => {
    setCart(prev => prev.filter(item => 
        !(item.id === productId && (item.selectedSize || 'Standard') === size && (item.selectedColor || 'Default') === color)
    ));
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
        register,
        logout,
        updateUserProfile,
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