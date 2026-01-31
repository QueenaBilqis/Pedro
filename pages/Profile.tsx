import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MOCK_ORDERS } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { user, wishlist, addToCart, removeFromWishlist, logout } = useShop();
  const [activeTab, setActiveTab] = useState('overview');
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      navigate('/login');
  };

  if (!user) return null;

  const NavItem = ({ id, icon, label }: { id: string, icon: string, label: string }) => (
      <button 
        onClick={() => setActiveTab(id)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === id ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'hover:bg-primary/5 text-gray-600 dark:text-gray-300'}`}
      >
        <span className="material-icons-outlined">{icon}</span>
        <p className={`text-sm ${activeTab === id ? 'font-bold' : 'font-semibold'}`}>{label}</p>
      </button>
  );

  const OrderTable = ({ limit }: { limit?: number }) => {
      const orders = limit ? MOCK_ORDERS.slice(0, limit) : MOCK_ORDERS;
      return (
        <div className="glass-card rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-primary/5 text-[10px] uppercase tracking-[0.2em] font-black text-primary/70">
                    <th className="px-6 py-4">Item</th>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="material-icons text-slate-400">shopping_bag</span>
                        </div>
                        <span className="font-bold text-sm">{order.items[0]}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 text-sm font-black">${order.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                        {order.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        <button 
                            onClick={() => setTrackingOrderId(order.id)}
                            className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all"
                        >
                            Track
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
      );
  }

  return (
    <div className="flex flex-1 justify-center px-4 md:px-10 lg:px-20 py-10 gap-8 max-w-[1600px] mx-auto w-full relative">
      {/* Tracking Modal */}
      {trackingOrderId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setTrackingOrderId(null)}></div>
              <div className="bg-white dark:bg-surface-dark w-full max-w-2xl rounded-3xl p-8 shadow-2xl relative animate-float border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-8">
                      <div>
                          <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Tracking Shipment</p>
                          <h3 className="text-2xl font-display font-bold">{trackingOrderId}</h3>
                      </div>
                      <button onClick={() => setTrackingOrderId(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                          <span className="material-icons">close</span>
                      </button>
                  </div>

                  {/* Map Placeholder */}
                  <div className="w-full h-48 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-8 relative overflow-hidden flex items-center justify-center">
                       <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/city-fields.png')]"></div>
                       <span className="material-icons text-primary text-4xl animate-bounce">location_on</span>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                      <div className="relative pl-12">
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 z-10">
                              <span className="material-icons text-white text-sm">check</span>
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">Order Delivered</h4>
                              <p className="text-slate-500 text-sm">Oct 26, 2023 - 14:30 PM</p>
                              <p className="text-sm mt-2 font-medium">Package received by customer.</p>
                          </div>
                      </div>
                      <div className="relative pl-12">
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white dark:bg-surface-dark border-4 border-primary flex items-center justify-center z-10">
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">Out for Delivery</h4>
                              <p className="text-slate-500 text-sm">Oct 26, 2023 - 08:00 AM</p>
                          </div>
                      </div>
                      <div className="relative pl-12 opacity-50">
                          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center z-10">
                              <span className="material-icons text-slate-400 text-sm">inventory_2</span>
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">Processing</h4>
                              <p className="text-slate-500 text-sm">Oct 24, 2023</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* SideNavBar Component */}
      <aside className="hidden lg:flex w-72 flex-col gap-8 shrink-0">
        <div className="glass-card rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center border-b border-primary/10 pb-6 mb-6">
            <div className="relative">
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-20 border-4 border-white dark:border-[#3d1c25] shadow-xl" 
                style={{backgroundImage: `url("${user.image}")`}}
              ></div>
              <div className="absolute bottom-0 right-0 size-6 bg-primary rounded-full border-2 border-white dark:border-[#3d1c25] flex items-center justify-center">
                <span className="material-icons text-white text-[12px] font-bold">star</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{user.tier} Member</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <NavItem id="overview" icon="grid_view" label="Overview" />
            <NavItem id="orders" icon="history" label="Order History" />
            <NavItem id="wishlist" icon="favorite" label="Wishlist" />
            <NavItem id="addresses" icon="location_on" label="Saved Addresses" />
            <NavItem id="payment" icon="credit_card" label="Payment Methods" />
            <NavItem id="settings" icon="settings" label="Settings" />
          </nav>
        </div>
        <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full rounded-xl py-4 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 transition-all border border-transparent hover:border-red-200"
        >
          <span className="material-icons-outlined">logout</span>
          <span>Logout Account</span>
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* PageHeading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col">
            <h2 className="text-4xl font-black tracking-tight font-display">
                {activeTab === 'overview' && <span>Welcome back, <span className="text-primary">{user.name.split(' ')[0]}</span></span>}
                {activeTab === 'wishlist' && "Your Wishlist"}
                {activeTab === 'orders' && "Order History"}
                {activeTab === 'payment' && "Payment Methods"}
                {activeTab === 'addresses' && "Saved Addresses"}
                {activeTab === 'settings' && "Account Settings"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mt-1 font-medium">
                {activeTab === 'overview' ? 'Your curated dashboard is ready.' : 'Manage your items and preferences.'}
            </p>
          </div>
          {activeTab === 'overview' && (
            <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 border border-primary/20 rounded-xl shadow-sm hover:shadow-md transition-all text-sm font-bold">
                <span className="material-icons-outlined text-primary">edit</span>
                Edit Profile
            </button>
          )}
        </div>

        {activeTab === 'overview' && (
        <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-card flex flex-col gap-2 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Total Orders</p>
                <span className="material-icons-outlined text-primary/50">shopping_cart</span>
                </div>
                <p className="text-4xl font-black mt-2 font-display">12</p>
                <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold mt-2">
                <span className="material-icons text-[16px]">trending_up</span>
                <span>+20% this month</span>
                </div>
            </div>
            <div className="glass-card flex flex-col gap-2 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Reward Points</p>
                <span className="material-icons-outlined text-primary/50">stars</span>
                </div>
                <p className="text-4xl font-black mt-2 font-display">{user.points.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-emerald-500 text-sm font-bold mt-2">
                <span className="material-icons text-[16px]">add_circle</span>
                <span>+150 pending</span>
                </div>
            </div>
            <div className="glass-card flex flex-col gap-2 rounded-xl p-6 shadow-sm bg-gradient-to-br from-white to-primary/5 dark:from-background-dark dark:to-primary/10">
                <div className="flex justify-between items-start">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-wider">Tier Status</p>
                <span className="material-icons-outlined text-primary/50">workspace_premium</span>
                </div>
                <p className="text-4xl font-black mt-2 text-primary font-display">{user.tier}</p>
                <div className="w-full bg-primary/10 h-1.5 rounded-full mt-4">
                <div className="bg-primary h-1.5 rounded-full" style={{width: '75%'}}></div>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">550 pts to Diamond Status</p>
            </div>
            </div>

            {/* Order List */}
            <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
                <h3 className="text-2xl font-black font-display">Recent Orders</h3>
                <a className="text-primary font-bold text-sm hover:underline cursor-pointer" onClick={() => setActiveTab('orders')}>View all orders</a>
            </div>
            <OrderTable limit={3} />
            </div>
        </>
        )}

        {activeTab === 'orders' && (
            <div className="animate-fade-in">
                <OrderTable />
            </div>
        )}

        {activeTab === 'wishlist' && (
            <div className="animate-fade-in">
                {wishlist.length === 0 ? (
                    <div className="glass-card rounded-xl p-20 flex flex-col items-center justify-center text-center">
                        <span className="material-icons text-6xl text-slate-300 mb-4">favorite_border</span>
                        <h3 className="text-2xl font-bold mb-2">Your wishlist is empty</h3>
                        <p className="text-slate-500 mb-8 max-w-sm">Save items you love here to buy them later. Explore our collections to find your favorites.</p>
                        <Link to="/shop" className="bg-primary text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-primary-dark transition-colors">
                            Explore Collections
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map(item => (
                            <div key={item.id} className="glass-card rounded-2xl overflow-hidden group">
                                <div className="relative aspect-square bg-white dark:bg-slate-900 p-8 flex items-center justify-center">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform group-hover:scale-105" />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight mb-1">{item.name}</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{item.category}</p>
                                        </div>
                                        <span className="font-bold text-lg">${item.price}</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                addToCart(item);
                                                removeFromWishlist(item.id);
                                            }}
                                            className="flex-1 bg-primary text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl hover:bg-primary-dark transition-colors"
                                        >
                                            Add to Cart
                                        </button>
                                        <button 
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="w-10 flex items-center justify-center border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-red-500"
                                        >
                                            <span className="material-icons text-sm">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}

        {activeTab === 'payment' && (
            <div className="animate-fade-in space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="relative h-56 rounded-3xl p-8 text-white overflow-hidden shadow-2xl transition-transform hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600"></div>
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <span className="font-display font-bold tracking-widest text-lg">PEDRO BANK</span>
                                <span className="material-icons text-3xl">contactless</span>
                            </div>
                            <div className="space-y-4">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-6 bg-yellow-400/80 rounded flex overflow-hidden relative">
                                        <div className="absolute inset-0 border border-black/10"></div>
                                    </div>
                                    <span className="material-icons">wifi</span>
                                </div>
                                <p className="font-mono text-xl tracking-[0.2em] drop-shadow-md">4823 **** **** 0921</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] uppercase opacity-70 mb-1">Card Holder</p>
                                    <p className="font-bold tracking-wider">{user.name.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase opacity-70 mb-1">Expires</p>
                                    <p className="font-bold tracking-wider">09/28</p>
                                </div>
                                <span className="font-bold italic text-2xl">VISA</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative h-56 rounded-3xl p-8 text-white overflow-hidden shadow-xl transition-transform hover:-translate-y-1 bg-slate-900 border border-slate-700">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                         <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className="flex justify-between items-start">
                                <span className="font-display font-bold tracking-widest text-lg text-slate-400">NEO CORP</span>
                            </div>
                            <div className="space-y-4">
                                <p className="font-mono text-xl tracking-[0.2em] text-slate-300">5521 **** **** 8832</p>
                            </div>
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] uppercase opacity-50 mb-1">Card Holder</p>
                                    <p className="font-bold tracking-wider text-slate-300">{user.name.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase opacity-50 mb-1">Expires</p>
                                    <p className="font-bold tracking-wider text-slate-300">12/26</p>
                                </div>
                                <div className="flex -space-x-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500/80"></div>
                                    <div className="w-8 h-8 rounded-full bg-yellow-500/80"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Add New */}
                    <button className="h-56 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">
                        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <span className="material-icons text-3xl">add</span>
                        </div>
                        <p className="font-bold uppercase tracking-widest text-sm">Add New Method</p>
                    </button>
                </div>

                <div className="glass-card rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">Billing History</h3>
                    <div className="space-y-4">
                        {[1,2,3].map(i => (
                            <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <span className="material-icons text-sm">receipt_long</span>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">Invoice #INV-2023-00{i}</p>
                                        <p className="text-xs text-slate-500">Oct 2{i}, 2023</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold">-$240.00</p>
                                    <p className="text-xs text-emerald-500 font-bold">Paid</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default Profile;