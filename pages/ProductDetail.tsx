import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useShop } from '../context/ShopContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useShop();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const [activeImage, setActiveImage] = useState(product.image);
  
  // Selection State
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [selectedColor, setSelectedColor] = useState('Default');

  const inWishlist = isInWishlist(product.id);

  // Update active image when product changes
  useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize('Standard');
    setSelectedColor('Default');
  }, [product]);

  const toggleWishlist = () => {
      if (inWishlist) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product);
      }
  };

  const currentPrice = selectedSize === 'Large' ? product.price * 1.2 : product.price;

  const images = [product.image, ...(product.images || [])].slice(0, 4);

  return (
    <div className="pt-10 pb-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Gallery Section */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-surface-light to-white dark:from-surface-dark dark:to-black border border-slate-100 dark:border-slate-800 flex items-center justify-center group">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-110 mix-blend-multiply dark:mix-blend-normal" 
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full font-bold tracking-widest uppercase">New Arrival</span>
              </div>
              <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                <button className="w-12 h-12 rounded-full glass-card flex items-center justify-center hover:bg-primary hover:text-white transition-all text-slate-700 dark:text-slate-200">
                  <span className="material-icons">3d_rotation</span>
                </button>
              </div>
            </div>
            
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                    <div 
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`aspect-square rounded-xl bg-surface-light dark:bg-surface-dark overflow-hidden cursor-pointer border-2 transition-all ${activeImage === img ? 'border-primary' : 'border-transparent hover:border-slate-300'}`}
                    >
                    <img src={img} alt={`Angle ${idx}`} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                    </div>
                ))}
                </div>
            )}
          </div>

          {/* Details Section */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="sticky top-32">
              <div className="mb-8">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">{product.name}</h2>
                  <div className="text-right">
                    <p className="text-2xl font-light text-primary animate-pulse">${currentPrice.toFixed(2)}</p>
                    {selectedSize === 'Large' && <p className="text-xs text-slate-400">+20% for Large</p>}
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-md">
                  {product.description}
                </p>
              </div>

              <div className="space-y-8 mb-10">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4">Select Finish</h3>
                  <div className="flex gap-4">
                    {['Default', 'Matte', 'Chrome'].map((color) => (
                        <button 
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-10 h-10 rounded-full border-2 p-0.5 transition-transform hover:scale-110 ${selectedColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-slate-200 dark:border-slate-800'}`}
                            title={color}
                        >
                            <div className={`w-full h-full rounded-full shadow-inner ${color === 'Default' ? 'bg-primary' : color === 'Matte' ? 'bg-[#1A1A1A]' : 'bg-[#E5E4E2]'}`}></div>
                        </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest">Select Size</h3>
                    <button className="text-[10px] uppercase underline tracking-widest opacity-60 hover:opacity-100 transition-opacity">Size Guide</button>
                  </div>
                  <div className="flex gap-3">
                    <button 
                        onClick={() => setSelectedSize('Standard')}
                        className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${selectedSize === 'Standard' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-800 hover:border-primary'}`}
                    >
                        Standard
                    </button>
                    <button 
                        onClick={() => setSelectedSize('Large')}
                        className={`px-6 py-2 rounded-full border text-sm font-bold transition-all ${selectedSize === 'Large' ? 'border-primary bg-primary/10 text-primary' : 'border-slate-200 dark:border-slate-800 hover:border-primary'}`}
                    >
                        Large
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="flex gap-4">
                    <button 
                    onClick={() => addToCart(product, selectedSize, selectedColor)}
                    className="flex-1 py-5 rounded-full bg-primary text-white font-bold tracking-[0.2em] uppercase hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98]"
                    >
                        Add to Cart
                    </button>
                    <button 
                        onClick={toggleWishlist}
                        className={`w-16 flex items-center justify-center rounded-full border transition-all ${inWishlist ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900 text-red-500' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                    >
                        <span className="material-icons">{inWishlist ? 'favorite' : 'favorite_border'}</span>
                    </button>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800">
                <div className="py-5 border-b border-slate-100 dark:border-slate-800 group cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold uppercase tracking-widest">Product Details</span>
                    <span className="material-icons group-hover:text-primary transition-colors">add</span>
                  </div>
                  <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 space-y-2">
                    <p>• Dimensions: 28cm x 18cm x 12cm</p>
                    <p>• Material: Vegan Metallic Microfiber</p>
                    <p>• Lining: Recycled Poly-silk</p>
                    <p>• Hardware: Chrome-plated Zinc Alloy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <section className="mt-20 lg:mt-32">
            <div className="flex items-end justify-between mb-8">
                <h2 className="text-3xl font-display font-bold">In Motion</h2>
                {!product.video && <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Coming Soon</span>}
            </div>
            
            <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black relative group ring-1 ring-slate-900/5 dark:ring-white/10">
                {product.video ? (
                    <video 
                        src={product.video} 
                        controls 
                        className="w-full h-full object-cover"
                        poster={product.image}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <span className="material-icons text-6xl mb-4 opacity-50">videocam_off</span>
                        <p className="font-display font-bold tracking-widest uppercase z-10">Video Preview Unavailable</p>
                        <p className="text-xs mt-2 opacity-60 z-10">Check back later for visual experience</p>
                    </div>
                )}
            </div>
        </section>

        {/* Recommendations */}
        <section className="mt-32">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-2 block">Complete the look</span>
                    <h2 className="text-3xl font-display font-bold">Recommended for You</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {PRODUCTS.slice(2, 6).map(rec => (
                    <div key={rec.id} className="group cursor-pointer">
                        <Link to={`/product/${rec.id}`}>
                            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-surface-light to-white dark:from-surface-dark dark:to-black mb-4 flex items-center justify-center relative">
                                <img src={rec.image} alt={rec.name} className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" />
                            </div>
                            <h3 className="font-bold tracking-tight uppercase">{rec.name}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">${rec.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;