import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handlePlaceOrder = () => {
    // Simulate order placement
    setTimeout(() => {
        clearCart();
        navigate('/profile');
    }, 1000);
  };

  if (cart.length === 0) {
      return (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <span className="material-icons text-6xl text-slate-300 mb-4">shopping_bag</span>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-slate-500 mb-8">Looks like you haven't made your choice yet.</p>
              <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors">
                  Start Shopping
              </Link>
          </div>
      )
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-10">
          <div className="flex items-center gap-8 text-sm font-display font-bold uppercase tracking-widest pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className={`${step >= 1 ? 'text-primary' : 'text-slate-400'} pb-2 cursor-pointer`} onClick={() => setStep(1)}>01 Shipping</div>
            <div className={`${step >= 2 ? 'text-primary' : 'text-slate-400'} pb-2 cursor-pointer`} onClick={() => setStep(2)}>02 Payment</div>
            <div className={`${step >= 3 ? 'text-primary' : 'text-slate-400'} pb-2 cursor-pointer`}>03 Confirmation</div>
          </div>

          <section className="animate-fade-in">
            <h2 className="text-2xl font-display font-bold mb-6">Shipping Information</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Doe" type="text"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john.doe@example.com" type="email"/>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Street Address</label>
                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="123 Futurist Avenue" type="text"/>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Neo Tokyo" type="text"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Country</label>
                  <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Japan</option>
                    <option>France</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Postal Code</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="100-0001" type="text"/>
                </div>
              </div>
            </form>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold mb-6">Shipping Method</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 border-2 border-primary bg-primary/5 dark:bg-primary/10 rounded-xl cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-4 border-primary bg-white dark:bg-slate-900"></div>
                  <div>
                    <p className="font-bold">Standard Delivery</p>
                    <p className="text-sm text-slate-500">3-5 Business Days</p>
                  </div>
                </div>
                <span className="font-bold">Free</span>
              </label>
              <label className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors rounded-xl cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700"></div>
                  <div>
                    <p className="font-bold">Express Futurist</p>
                    <p className="text-sm text-slate-500">Next Day Delivery</p>
                  </div>
                </div>
                <span className="font-bold">$25.00</span>
              </label>
            </div>
          </section>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-28">
            <h2 className="text-2xl font-display font-bold mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-2">
              {cart.map(item => (
                 <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                            <span className="font-bold">${item.price * item.quantity}</span>
                        </div>
                        <p className="text-sm text-slate-500">{item.subtitle}</p>
                        <p className="text-sm mt-1 text-primary font-bold">Qty: {item.quantity}</p>
                    </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-8">
              <input className="flex-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 focus:ring-primary focus:border-primary outline-none" placeholder="Promo code" type="text"/>
              <button className="px-6 py-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Apply</button>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Estimated Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xl font-display font-bold">Total</span>
                <span className="text-2xl font-display font-bold text-primary">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <button 
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-primary hover:bg-opacity-90 text-white font-display font-bold py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2"
            >
                PLACE ORDER
                <span className="material-icons">arrow_forward</span>
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-widest">
                <span className="material-icons text-sm">lock</span>
                Secure & Encrypted Checkout
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;