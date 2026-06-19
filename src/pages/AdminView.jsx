import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  DollarSign, ShoppingBag, Users, Bell, Clock, Edit3, Check, 
  Trash2, ToggleLeft, ToggleRight, Sparkles, LayoutDashboard, 
  Utensils, ClipboardList, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// Dynamic food emoji lookup based on dish name
const getFoodEmoji = (name) => {
  const lower = name ? name.toLowerCase() : "";
  if (lower.includes("coffee") || lower.includes("filter coffee") || lower.includes("tea")) return "☕";
  if (lower.includes("majjiga") || lower.includes("buttermilk") || lower.includes("lassi") || lower.includes("beverage")) return "🥛";
  if (lower.includes("pootharekulu") || lower.includes("double") || lower.includes("dessert") || lower.includes("sweet")) return "🍨";
  if (lower.includes("kodi") || lower.includes("chicken") || lower.includes("mutton") || lower.includes("fish") || lower.includes("chepala") || lower.includes("mamsam")) return "🍗";
  return "🍲";
};

// Accessible Image wrapper with dynamic emoji fallback for missing/broken network assets
const AccessibleImage = ({ src, alt, name, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const initials = name
      ? name.split(' ').map(w => w[0]).filter(c => /[a-zA-Z0-9]/.test(c)).slice(0, 2).join('').toUpperCase()
      : "FD";
    return (
      <div className={`w-full h-full bg-gradient-to-br from-stone-850 to-stone-900 flex flex-col items-center justify-center text-center select-none border border-stone-800/40 rounded-lg ${className}`}>
        <span className="text-xl mb-0.5 filter drop-shadow">{getFoodEmoji(name)}</span>
        <span className="text-[8px] font-black text-brand-400 font-mono tracking-wider">{initials}</span>
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={() => setHasError(true)} 
      className={`w-full h-full object-cover ${className}`} 
    />
  );
};

export default function AdminView() {
  const { 
    menu, orders, tables, waiterRequests, 
    updateOrderStatus, toggleStockStatus, updateItemPrice, 
    updateTableStatus, resolveWaiterRequest 
  } = useApp();

  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, menu, tables, requests
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState("");

  // Calculations
  const completedOrders = orders.filter(o => o.status === "completed");
  const activeOrdersCount = orders.filter(o => o.status === "pending" || o.status === "preparing" || o.status === "ready").length;
  
  const calculatedRevenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
  const totalRevenue = 420.00 + calculatedRevenue; // Base baseline + live sales
  
  const occupiedTables = tables.filter(t => t.status === "occupied").length;
  const occupancyRate = Math.round((occupiedTables / tables.length) * 100);
  
  const activeRequests = waiterRequests.filter(r => r.status === "pending");

  // Charts Mock Data
  const salesTrendData = [
    { hour: '11 AM', sales: 120 },
    { hour: '12 PM', sales: 340 },
    { hour: '1 PM', sales: 480 },
    { hour: '2 PM', sales: 220 },
    { hour: '5 PM', sales: 180 },
    { hour: '6 PM', sales: 610 },
    { hour: '7 PM', sales: 980 },
    { hour: '8 PM', sales: 1150 },
    { hour: '9 PM', sales: 850 },
  ];

  const popularDishesData = [
    { name: 'Old Fashioned', sales: 34 },
    { name: 'Edamame Gyoza', sales: 28 },
    { name: 'Miso Salmon', sales: 24 },
    { name: 'Ribeye Steak', sales: 19 },
    { name: 'Lava Cake', sales: 15 },
  ];

  const COLORS = ['#c87a53', '#e8b923', '#78716c', '#a8a29e', '#57524f'];

  const startEditingPrice = (item) => {
    setEditingPriceId(item.id);
    setTempPrice(item.price.toString());
  };

  const savePrice = (itemId) => {
    updateItemPrice(itemId, parseFloat(tempPrice) || 0);
    setEditingPriceId(null);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 border-r border-stone-850 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 bg-brand-500 rounded-xl flex items-center justify-center font-bold text-stone-950 shadow-lg shadow-brand-500/20">
              DT
            </div>
            <span className="font-extrabold text-xl tracking-tight">
              Dine<span className="text-brand-500">Tab</span> Admin
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "dashboard"
                  ? "bg-brand-500 text-stone-950 shadow-md shadow-brand-500/10"
                  : "text-stone-400 hover:text-stone-250 hover:bg-stone-850"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Overview Dashboard
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "menu"
                  ? "bg-brand-500 text-stone-950 shadow-md shadow-brand-500/10"
                  : "text-stone-400 hover:text-stone-250 hover:bg-stone-850"
              }`}
            >
              <Utensils className="w-4 h-4" />
              Menu Management
            </button>
            <button
              onClick={() => setActiveTab("tables")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "tables"
                  ? "bg-brand-500 text-stone-950 shadow-md shadow-brand-500/10"
                  : "text-stone-400 hover:text-stone-250 hover:bg-stone-850"
              }`}
            >
              <Users className="w-4 h-4" />
              Table Layout Map
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === "requests"
                  ? "bg-brand-500 text-stone-950 shadow-md shadow-brand-500/10"
                  : "text-stone-400 hover:text-stone-250 hover:bg-stone-850"
              }`}
            >
              <span className="flex items-center gap-3">
                <Bell className="w-4 h-4" />
                Service Requests
              </span>
              {activeRequests.length > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'requests' ? 'bg-stone-950 text-brand-400' : 'bg-brand-500 text-stone-950'
                }`}>
                  {activeRequests.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-stone-850 text-stone-500 text-xs mt-8 md:mt-0">
          <p>DineTab Control Center</p>
          <p className="font-mono mt-1 text-[10px]">V1.0.0 (Local Demo)</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Top bar */}
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-stone-900">
          <div>
            <h2 className="text-2xl font-black tracking-tight uppercase text-stone-100">
              {activeTab === 'dashboard' && "Operational Overview"}
              {activeTab === 'menu' && "Menu Configuration"}
              {activeTab === 'tables' && "Table Layout Map"}
              {activeTab === 'requests' && "Waiter Service Feed"}
            </h2>
            <p className="text-stone-400 text-xs font-light mt-1">
              {activeTab === 'dashboard' && "Review real-time sales performance, table occupancy, and kitchen tickets."}
              {activeTab === 'menu' && "Update pricing, manage inventory stock levels, and toggle dish availability."}
              {activeTab === 'tables' && "Monitor physical table states, guest capacities, and operational seating."}
              {activeTab === 'requests' && "Respond to table guest alerts (waiter call, water, bill requests)."}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold bg-stone-900 border border-stone-850 px-3 py-1.5 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Live Dashboard Sync
          </div>
        </header>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Revenue */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-stone-450 font-bold uppercase tracking-wider">Today's Revenue</span>
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm">
                    ₹
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-100">₹{totalRevenue.toFixed(2)}</h3>
                <p className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-0.5">
                  +12.4% <span className="text-stone-500 font-light">vs yesterday</span>
                </p>
              </div>

              {/* Card 2: Active Orders */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-stone-450 font-bold uppercase tracking-wider">Active Tickets</span>
                  <div className="w-7 h-7 rounded-lg bg-brand-500/10 text-brand-400 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-100">{activeOrdersCount}</h3>
                <p className="text-[10px] text-brand-400 font-semibold mt-1">
                  {orders.filter(o => o.status === "preparing").length} in prep line
                </p>
              </div>

              {/* Card 3: Table Occupancy */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-stone-450 font-bold uppercase tracking-wider">Occupancy Rate</span>
                  <div className="w-7 h-7 rounded-lg bg-gold-500/10 text-gold-400 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-100">{occupancyRate}%</h3>
                <p className="text-[10px] text-stone-500 font-light mt-1">
                  {occupiedTables} of {tables.length} tables active
                </p>
              </div>

              {/* Card 4: Service Requests */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-stone-450 font-bold uppercase tracking-wider">Waiter Alerts</span>
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-stone-100">{activeRequests.length}</h3>
                <p className="text-[10px] text-rose-400 font-semibold mt-1">
                  Needs immediate response
                </p>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sales Trend Line */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850">
                <h3 className="font-bold text-stone-250 text-sm mb-4">Hourly Sales Volume (₹)</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={salesTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#c87a53" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#c87a53" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="hour" stroke="#57524f" fontSize={10} tickLine={false} />
                      <YAxis stroke="#57524f" fontSize={10} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '12px' }}
                        labelStyle={{ color: '#fafaf9', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#c87a53" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Popular items chart */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850">
                <h3 className="font-bold text-stone-250 text-sm mb-4">Top Dishes Ordered (Units)</h3>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={popularDishesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#57524f" fontSize={10} tickLine={false} />
                      <YAxis stroke="#57524f" fontSize={10} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1c1917', border: '1px solid #44403c', borderRadius: '12px' }}
                        labelStyle={{ color: '#fafaf9', fontWeight: 'bold' }}
                      />
                      <Bar dataKey="sales" radius={[8, 8, 0, 0]}>
                        {popularDishesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Quick Map and Requests split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tables grid mini */}
              <div className="lg:col-span-2 glass-panel p-5 rounded-2xl border border-stone-850 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-stone-250 text-sm">Table Live Map</h3>
                  <button onClick={() => setActiveTab("tables")} className="text-xs text-brand-400 flex items-center hover:underline">
                    View Detail Map <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {tables.map(t => (
                    <div 
                      key={t.id} 
                      className={`p-3 rounded-xl border text-center relative ${
                        t.status === 'occupied' 
                          ? 'bg-brand-500/10 border-brand-500/30 text-brand-400' 
                          : 'bg-stone-900/30 border-stone-850 text-stone-500'
                      }`}
                    >
                      <span className="text-[10px] text-stone-400 block">T {t.number}</span>
                      <span className="text-[9px] font-bold mt-1 inline-block uppercase">
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Requests mini */}
              <div className="glass-panel p-5 rounded-2xl border border-stone-850 space-y-4 flex flex-col">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-stone-250 text-sm">Waiter Requests</h3>
                  <button onClick={() => setActiveTab("requests")} className="text-xs text-brand-400 flex items-center hover:underline">
                    Manage <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="space-y-2 flex-1 overflow-y-auto max-h-44">
                  {activeRequests.length === 0 ? (
                    <div className="text-center py-6 text-stone-600 text-xs">
                      All clean! No requests.
                    </div>
                  ) : (
                    activeRequests.slice(0, 3).map(req => (
                      <div key={req.id} className="flex justify-between items-center text-xs bg-stone-950/60 p-2 rounded-lg border border-stone-850">
                        <div>
                          <span className="font-bold text-stone-300">Table {req.tableNumber}</span>
                          <span className="text-[9px] block text-stone-500 capitalize">{req.type}</span>
                        </div>
                        <button 
                          onClick={() => resolveWaiterRequest(req.id)}
                          className="p-1 bg-brand-500/20 text-brand-400 rounded hover:bg-brand-500 hover:text-stone-950 transition-colors"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MENU MANAGEMENT */}
        {activeTab === "menu" && (
          <div className="glass-panel rounded-2xl border border-stone-850 overflow-hidden">
            <div className="p-4 border-b border-stone-850 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
              <span className="text-xs text-stone-400 font-semibold">Active Menu Configuration Grid</span>
              <p className="text-[10px] text-brand-400 italic">
                *Toggling items out of stock disables them instantly from the client-facing QR menu.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-850 text-xs text-stone-450 uppercase font-bold bg-stone-900/40">
                    <th className="p-4">Dish Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Base Price</th>
                    <th className="p-4">Availability</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-850 text-xs">
                  {menu.map(item => (
                    <tr key={item.id} className={`hover:bg-stone-900/20 ${!item.inStock ? 'bg-rose-500/[0.01]' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-lg bg-stone-900 shrink-0">
                            <AccessibleImage src={item.image} alt={item.name} name={item.name} />
                          </div>
                          <div>
                            <span className="font-bold text-stone-200 block">{item.name}</span>
                            <span className="text-[10px] text-stone-500 block max-w-xs truncate">{item.description}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-stone-400">{item.category}</td>
                      <td className="p-4">
                        {editingPriceId === item.id ? (
                          <div className="flex items-center gap-1">
                            <span className="text-stone-500">₹</span>
                            <input
                              type="number"
                              step="1"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-16 bg-stone-950 border border-stone-800 focus:border-brand-500 rounded p-1 text-center font-mono font-semibold"
                            />
                            <button 
                              onClick={() => savePrice(item.id)}
                              className="w-6 h-6 bg-emerald-500 text-stone-950 flex items-center justify-center rounded"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-semibold text-stone-300">₹{item.price.toFixed(2)}</span>
                            <button 
                              onClick={() => startEditingPrice(item)}
                              className="text-stone-500 hover:text-stone-300"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                          item.inStock 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}>
                          {item.inStock ? "IN STOCK" : "OUT OF STOCK"}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleStockStatus(item.id)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-colors ${
                            item.inStock
                              ? 'bg-stone-900 border-stone-850 hover:bg-stone-800 text-stone-400'
                              : 'bg-brand-500/10 border-brand-500/20 text-brand-400'
                          }`}
                        >
                          {item.inStock ? "Set Out of Stock" : "Activate Item"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: TABLE MAP */}
        {activeTab === "tables" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tables grid */}
              <div className="md:col-span-2 glass-panel p-6 rounded-2xl border border-stone-850 space-y-6">
                <h3 className="font-bold text-stone-150 text-base">Dining Floor Layout Map</h3>
                <div className="grid grid-cols-3 gap-4">
                  {tables.map(t => {
                    const hasActiveOrder = orders.some(o => o.tableNumber === t.number && (o.status === "pending" || o.status === "preparing" || o.status === "ready"));
                    
                    return (
                      <div 
                        key={t.id} 
                        className={`p-5 rounded-2xl border flex flex-col justify-between h-40 transition-all ${
                          t.status === 'occupied' 
                            ? 'bg-brand-500/[0.03] border-brand-500/40 text-stone-200' 
                            : 'bg-stone-900/20 border-stone-850 text-stone-500'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] text-stone-450 block uppercase font-bold">Table</span>
                            <span className="text-2xl font-black text-stone-100">{t.number}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[8px] font-bold uppercase ${
                            t.status === 'occupied' ? 'bg-brand-500 text-stone-950' : 'bg-stone-800 text-stone-400'
                          }`}>
                            {t.status}
                          </span>
                        </div>

                        <div>
                          <p className="text-[10px] text-stone-450">Capacity: {t.capacity} Guests</p>
                          {hasActiveOrder && (
                            <span className="text-[9px] bg-gold-500/10 text-gold-400 border border-gold-500/20 px-1.5 py-0.5 rounded font-semibold inline-flex items-center gap-1 mt-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-gold-450 animate-ping" /> Cooking
                            </span>
                          )}
                        </div>

                        {/* Interactive toggle */}
                        <div className="flex gap-1 pt-3 border-t border-stone-850 mt-3">
                          <button
                            onClick={() => updateTableStatus(t.id, t.status === 'vacant' ? 'occupied' : 'vacant')}
                            className="flex-1 py-1.5 bg-stone-900 hover:bg-stone-800 text-[10px] font-bold rounded-lg border border-stone-800 text-stone-300 transition-colors"
                          >
                            Toggle Status
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status explanation */}
              <div className="glass-panel p-6 rounded-2xl border border-stone-850 space-y-4">
                <h3 className="font-bold text-stone-150 text-base">Status Legend</h3>
                <div className="space-y-4 text-xs font-light text-stone-400">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-stone-900 border border-stone-850" />
                    <div>
                      <span className="font-bold text-stone-200 block">Vacant</span>
                      Table is clean and ready for seating. QR scan triggers order activation.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-brand-500/20 border border-brand-500/50" />
                    <div>
                      <span className="font-bold text-stone-200 block">Occupied</span>
                      Table has seated guests who are ordering or waiting for meal prep.
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded bg-gold-500/20 border border-gold-500/50" />
                    <div>
                      <span className="font-bold text-stone-200 block">Order Active</span>
                      Guests have active cooking tickets in the kitchen queue.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SERVICE REQUESTS */}
        {activeTab === "requests" && (
          <div className="glass-panel rounded-2xl border border-stone-850 overflow-hidden">
            <div className="p-4 border-b border-stone-850 flex justify-between items-center bg-stone-900/20">
              <span className="text-xs text-stone-400 font-semibold">Active Guest Assistance Requests</span>
              <span className="text-[10px] bg-brand-500 text-stone-950 px-2 py-0.5 rounded-full font-bold">
                {activeRequests.length} Pending Alert(s)
              </span>
            </div>

            <div className="divide-y divide-stone-850">
              {activeRequests.length === 0 ? (
                <div className="text-center py-16 text-stone-500 text-sm flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-stone-700" />
                  <span>No active waiter calls or bill requests. Floor is operating smoothly.</span>
                </div>
              ) : (
                activeRequests.map(req => {
                  const elapsedMs = Date.now() - new Date(req.createdAt).getTime();
                  const minsAgo = Math.floor(elapsedMs / (60 * 1000));

                  return (
                    <div key={req.id} className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-stone-900/10">
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${
                          req.type === 'waiter' ? 'bg-brand-500/10 border-brand-500/20 text-brand-400' :
                          req.type === 'water' ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' :
                          'bg-gold-500/10 border-gold-500/20 text-gold-400 active-pulse'
                        }`}>
                          {req.type === 'waiter' && <Bell className="w-5 h-5" />}
                          {req.type === 'water' && <Users className="w-5 h-5" />}
                          {req.type === 'bill' && <span className="font-black text-lg">₹</span>}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-base text-stone-100">Table {req.tableNumber}</h4>
                          <p className="text-xs text-stone-400 mt-0.5">
                            Request: <span className="font-semibold text-stone-300 capitalize">{req.type} Service</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start">
                        <span className="text-[10px] text-stone-500 font-mono flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {minsAgo === 0 ? "just now" : `${minsAgo}m ago`}
                        </span>
                        <button
                          onClick={() => resolveWaiterRequest(req.id)}
                          className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-stone-950 text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Resolve Alert
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
