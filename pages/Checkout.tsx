import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, cartTotal, clearCart, removeFromCart } = useShop();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qris' | 'bank'>('card');
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    // Simulate order placement
    setTimeout(() => {
        setIsLoading(false);
        clearCart();
        navigate('/profile');
    }, 2000);
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
            <div className={`${step >= 1 ? 'text-primary' : 'text-slate-400'} pb-2 cursor-pointer transition-colors`} onClick={() => setStep(1)}>01 Shipping</div>
            <div className={`${step >= 2 ? 'text-primary' : 'text-slate-400'} pb-2 cursor-pointer transition-colors`} onClick={() => setStep(2)}>02 Payment</div>
            <div className={`${step >= 3 ? 'text-primary' : 'text-slate-400'} pb-2 cursor-pointer transition-colors`}>03 Confirmation</div>
          </div>

          {step === 1 && (
            <section className="animate-fade-in">
              <h2 className="text-2xl font-display font-bold mb-6">Shipping Information</h2>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">First Name</label>
                    <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required placeholder="John" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Name</label>
                    <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required placeholder="Doe" type="text"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required placeholder="john.doe@example.com" type="email"/>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Street Address</label>
                  <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required placeholder="123 Futurist Avenue" type="text"/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">City</label>
                    <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required placeholder="Neo Tokyo" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Country</label>
                    <select className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Japan</option>
                      <option>France</option>
                      <option>Indonesia</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Postal Code</label>
                    <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" required placeholder="100-0001" type="text"/>
                  </div>
                </div>
                
                <h2 className="text-2xl font-display font-bold mt-10 mb-6">Shipping Method</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border-2 border-primary bg-primary/5 dark:bg-primary/10 rounded-xl cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="shipping" defaultChecked className="accent-primary w-5 h-5"/>
                      <div>
                        <p className="font-bold">Standard Delivery</p>
                        <p className="text-sm text-slate-500">3-5 Business Days</p>
                      </div>
                    </div>
                    <span className="font-bold">Free</span>
                  </label>
                  <label className="flex items-center justify-between p-4 border-2 border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors rounded-xl cursor-pointer">
                    <div className="flex items-center gap-4">
                      <input type="radio" name="shipping" className="accent-primary w-5 h-5"/>
                      <div>
                        <p className="font-bold">Express Futurist</p>
                        <p className="text-sm text-slate-500">Next Day Delivery</p>
                      </div>
                    </div>
                    <span className="font-bold">$25.00</span>
                  </label>
                </div>

                <div className="pt-6">
                    <button type="submit" className="w-full md:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                        Continue to Payment
                    </button>
                </div>
              </form>
            </section>
          )}

          {step === 2 && (
             <section className="animate-fade-in">
                <h2 className="text-2xl font-display font-bold mb-6">Payment Method</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                    <button 
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/30'}`}
                    >
                        <span className="material-icons text-3xl">credit_card</span>
                        <span className="text-xs font-bold uppercase">Credit Card</span>
                    </button>
                    <button 
                        onClick={() => setPaymentMethod('qris')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'qris' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/30'}`}
                    >
                        <span className="material-icons text-3xl">qr_code_scanner</span>
                        <span className="text-xs font-bold uppercase">QRIS</span>
                    </button>
                    <button 
                        onClick={() => setPaymentMethod('bank')}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${paymentMethod === 'bank' ? 'border-primary bg-primary/5' : 'border-slate-200 dark:border-slate-800 hover:border-primary/30'}`}
                    >
                        <span className="material-icons text-3xl">account_balance</span>
                        <span className="text-xs font-bold uppercase">Transfer</span>
                    </button>
                </div>

                {paymentMethod === 'card' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Card Number</label>
                            <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="0000 0000 0000 0000" type="text"/>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Expiry Date</label>
                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="MM/YY" type="text"/>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">CVC</label>
                                <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="123" type="text"/>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Cardholder Name</label>
                            <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" type="text"/>
                        </div>
                    </div>
                )}

                {paymentMethod === 'qris' && (
                    <div className="flex flex-col items-center text-center animate-fade-in py-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <p className="text-sm font-bold uppercase tracking-widest mb-4">Scan to Pay</p>
                        <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                             <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PEDRO_PAYMENT_INITIATED" alt="QRIS Code" className="w-48 h-48 mix-blend-multiply" />
                        </div>
                        <p className="text-xs text-slate-500">Supported by GoPay, OVO, Dana, ShopeePay</p>
                        <div className="mt-6 flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                             <div className="h-6 w-10 bg-slate-300 rounded"></div>
                             <div className="h-6 w-10 bg-slate-300 rounded"></div>
                             <div className="h-6 w-10 bg-slate-300 rounded"></div>
                        </div>
                    </div>
                )}

                {paymentMethod === 'bank' && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">BCA</div>
                                <div>
                                    <p className="font-bold">Bank Central Asia</p>
                                    <p className="text-xs text-slate-500">Virtual Account</p>
                                </div>
                            </div>
                            <span className="material-icons text-slate-400">chevron_right</span>
                        </div>
                        <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-xs">MDR</div>
                                <div>
                                    <p className="font-bold">Mandiri</p>
                                    <p className="text-xs text-slate-500">Virtual Account</p>
                                </div>
                            </div>
                            <span className="material-icons text-slate-400">chevron_right</span>
                        </div>
                         <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-primary transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">BNI</div>
                                <div>
                                    <p className="font-bold">Bank Negara Indonesia</p>
                                    <p className="text-xs text-slate-500">Virtual Account</p>
                                </div>
                            </div>
                            <span className="material-icons text-slate-400">chevron_right</span>
                        </div>
                    </div>
                )}

                <div className="flex gap-4 pt-8">
                     <button onClick={() => setStep(1)} className="px-6 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        Back
                    </button>
                    <button onClick={handlePlaceOrder} disabled={isLoading} className="flex-1 bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
                        {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Complete Order'}
                    </button>
                </div>
             </section>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none sticky top-28">
            <h2 className="text-2xl font-display font-bold mb-8">Order Summary</h2>
            <div className="space-y-6 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item, idx) => (
                 <div key={`${item.id}-${idx}`} className="flex gap-4 relative group">
                    <div className="w-20 h-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg leading-tight">{item.name}</h3>
                            <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className="text-sm text-slate-500 flex gap-2">
                            <span>{item.selectedSize || 'Standard'}</span>
                            <span>•</span>
                            <span>{item.selectedColor || 'Default'}</span>
                        </div>
                        <p className="text-sm mt-1 text-primary font-bold">Qty: {item.quantity}</p>
                    </div>
                    <button 
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <span className="material-icons text-xs">close</span>
                    </button>
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

            {step === 1 && (
                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium uppercase tracking-widest">
                    <span className="material-icons text-sm">lock</span>
                    Secure & Encrypted Checkout
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;