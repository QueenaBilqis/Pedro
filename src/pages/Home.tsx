import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';

const Home: React.FC = () => {
  const featured = PRODUCTS.slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-20 px-4">
        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          <div className="relative flex items-center justify-center">
            <h2 className="font-grotesk font-black text-[22vw] lg:text-[320px] leading-none text-slate-900 dark:text-white flex items-center justify-center gap-[10vw] opacity-90 select-none">
              your choice
            </h2>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[40%] max-w-[450px] z-20">
              <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl animate-float">
                <img 
                  alt="Pink Metallic Luxury Bag" 
                  className="w-full h-auto drop-shadow-xl" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeu8fd7i5TcoK5kOgAg-kb3pHvKYRtAHx3Hb0BtvTOg0HBWher0hV6RJW8WTMEIMeIWzoG0TzjFD-zgovynqZuFkegUh2xlsReDR783noPjAZ5_m72egk6NVoK-zJGGdDPfJihZ0PzjkshgjRy0tl0WdAxekR4WBx3VMPR5mrJO1d3JxUatxPMDlrxhpIkgjcP3w8KCGAPfItBapiUadStC0theT0KnaFHVMEL72ly8uEh3kFASxffoOJ65335b1546uKDxJX7wzFu"
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start mt-12 px-6 lg:px-12 text-left relative z-30">
            <div className="max-w-xs mb-8 md:mb-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">About us</p>
              <p className="text-sm font-bold leading-tight">What we do</p>
            </div>
            <div className="max-w-xs flex flex-col items-end text-right">
              <p className="text-[11px] leading-relaxed mb-6 text-slate-500 dark:text-slate-400 font-medium">
                Each PEDRO brand bag is the perfect combination of creativity and practicality. Designed for the futuristic aesthetic.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-primary/80 hover:bg-primary text-white py-2 px-6 rounded-full transition-all text-xs font-bold group shadow-lg shadow-primary/30">
                Explore Collection
                <span className="bg-white text-primary rounded-full w-4 h-4 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <span className="material-icons text-[10px]">arrow_forward</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-primary py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
             <h3 className="text-white text-2xl font-display font-bold">New Arrivals</h3>
             <Link to="/shop" className="text-white text-xs font-bold uppercase tracking-widest border-b border-white pb-1">View All</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <Link to={`/product/${product.id}`}>
                    <div className="bg-[#F1A7BC] rounded-[2.5rem] p-12 aspect-[4/5] flex flex-col items-center justify-center relative mb-6 overflow-hidden transition-transform hover:-translate-y-2 duration-300">
                    {product.isEco && (
                        <div className="absolute top-6 left-8 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-white text-[9px] font-bold tracking-widest">
                            <span className="material-icons text-[10px]">eco</span> ECO
                        </div>
                    )}
                    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                        <img 
                            alt={product.name} 
                            className="w-full drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal" 
                            src={product.image}
                        />
                    </div>
                    </div>
                </Link>
                <div className="flex justify-between items-center px-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{product.name}</h3>
                    <p className="text-white/80 text-xs font-medium">${product.price}</p>
                  </div>
                  <Link to={`/product/${product.id}`} className="bg-white text-primary py-2 px-6 rounded-full text-xs font-bold hover:bg-slate-50 transition-colors">
                    Shop
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 px-6 bg-background-light dark:bg-background-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
                <h2 className="font-display text-4xl lg:text-6xl font-bold mb-8">FUTURISM & <br/><span className="text-primary">INNOVATION</span></h2>
                <div className="space-y-6 max-w-md">
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        We love experimenting with modern materials, technologies and shapes to create products that not only meet your needs, but also inspire new possibilities.
                    </p>
                    <button className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 px-8 rounded-full hover:opacity-90 transition-all text-xs font-bold uppercase tracking-widest">
                        Read Our Story
                    </button>
                </div>
                <div className="mt-20">
                     <div className="text-[120px] leading-none font-grotesk font-black text-primary/10 select-none">PEDRO</div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuArmV6q7d4k-hN7g7Sy_DUR3-bUA-H5Xt8gz9gsxRfzxUhof-wuTEoFxig8E--2crQv_pVGUHagUrzYhvzf7n7E6RL_gU-mfbqJmuoLU-lMVgQaL5f7enNslp3yJqG0CdyjUAa8JxJCndbBGQNLASGb-1HqWifGviYA36m-8wNNWmuy_lunZI7v36115xjqtW48RdpX23w6oHx9dhkwbqaoVxCbtmQQCKjfq56-eBfBT0oGaIotzaSSOjZA0s-ry0sbt31kcwTIr1KA" className="w-full h-48 object-cover rounded-[2rem]" alt="Pink detail" />
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvgqqWWW8bE50zAZjkR5TVkJoD8PVlIbqzhwTyWCIF9aKhs3QU3IrbxbWpyxYtmCRcVt4Ad43or7l8RB9nFCwL5Eaucn_ea2QC162h6MUhuKXez6ey8iYucyQumL5lbOH9FmSS6rrvJcaOBcxWJ1t5a66-OCRW1CwdfOjGTIGpLiYflUHX7Umb5Ljm5xs14pzsrFkadZ7YVcb2eHQ4_mDxTBUrAsPWETNuZOrTuZc8X2xiuY-Ce9YfhQkFc_iFuqjIg4TE9FiHLJ9L" className="w-full h-80 object-cover rounded-[2.5rem]" alt="Robot Model" />
                </div>
                <div className="space-y-4">
                     <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWLbtoALHiAJfXFbQR9JaBunnAqTJ_vLdYZ1Z-irk_snbY20jiiIb0sGqG-O9mJ8ZCsVLsGVp7zj1SELKaMevGBWK5yXJn2-n7G_j2CKKabsKZiLjdrvVMUeypcS_-HUrTeN-42wp9D_PLeERtiTrSTwdM83XMJBwzxOAMooOOQRDb8NCvDagBsUrPOEc3wBxzqWA_OgqdIWeA2waAtO9GCH_2lPZPNeWNgbWDXSYjFzdsMhz0Wq4lYMFGRYwSCaTH_NDx0pf5YJYd" className="w-full h-64 object-cover rounded-[2.5rem]" alt="Abstract Metal" />
                     <div className="bg-slate-900 rounded-full h-32 w-32 ml-auto border-4 border-white dark:border-slate-800 flex items-center justify-center overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_55QNVvuMnTqapO83Wb82U1zW1NszX9irqK57C5C2GC8DkcD_pzrBYWqvHo9R_M0UMn6eE_Cd_VSvIeuRvlsdnlhpV_pmbEau7PDLN5g0WWqjZMB6KtwmAdfP82XAq3yfxvfqnOVE4UJU5WX1z7HyZYiAp1Rt5rN6jd_mEUxVAvzPxBcO27NHWrqUPyr-Rty-lqMNpvCx73HA2R6gGJ96x6FekXh7QUWsQwSdW62xojUWn8zxu5ZKWJrI1bZQIvyL8jG1Q4ELvy7" className="w-full h-full object-cover animate-spin-slow opacity-60" alt="Spiral" />
                     </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;