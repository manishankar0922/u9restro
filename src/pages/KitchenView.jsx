import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, AlertTriangle, Check, Play, Award, Volume2, VolumeX, Archive, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Veg / Non-veg icons for KDS display
const VegSymbol = () => (
  <div className="w-4.5 h-4.5 border border-emerald-600 flex items-center justify-center bg-white p-0.5 rounded flex-shrink-0" title="Vegetarian">
    <div className="w-2 h-2 rounded-full bg-emerald-600" />
  </div>
);

const NonVegSymbol = () => (
  <div className="w-4.5 h-4.5 border border-rose-600 flex items-center justify-center bg-white p-0.5 rounded flex-shrink-0" title="Non-Vegetarian">
    <div className="w-2 h-2 rounded-full bg-rose-600" />
  </div>
);

export default function KitchenView() {
  const { menu, orders, updateOrderStatus, waiterRequests } = useApp();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Dining Room TV Alert Simulation State
  const [showTvPopup, setShowTvPopup] = useState(false);
  const [tvOrder, setTvOrder] = useState(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter orders by status
  const pendingOrders = orders.filter(o => o.status === "pending");
  const preparingOrders = orders.filter(o => o.status === "preparing");
  const readyOrders = orders.filter(o => o.status === "ready");
  const completedOrders = orders.filter(o => o.status === "completed").slice(0, 5); // limit past 5

  // Calculate ticket age in seconds
  const getTicketAgeInSeconds = (createdAt) => {
    const elapsedMs = currentTime.getTime() - new Date(createdAt).getTime();
    return Math.max(0, Math.floor(elapsedMs / 1000));
  };

  const formatMinutes = (totalSeconds) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Triggers the Dining Room TV display popup when an order is completed/cooked
  const handleMarkCooked = (order) => {
    setTvOrder(order);
    setShowTvPopup(true);
    updateOrderStatus(order.id, "ready");
    
    // Auto dismiss TV alert after 4 seconds
    setTimeout(() => {
      setShowTvPopup(false);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 flex flex-col font-sans p-6 select-none relative">
      
      {/* Visual background glare reduction filter overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/98 to-stone-950 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-stone-900 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="text-2xl font-black uppercase tracking-tight">
              KDS Tablet Command <span className="text-brand-500">Board</span>
            </h1>
          </div>
          <p className="text-stone-400 text-xs font-light mt-0.5">
            Station: Hot Kitchen Mains & Starters • Wall Display Mode
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto justify-between md:justify-start">
          <div className="bg-stone-900 border border-stone-850 px-4 py-2 rounded-xl text-right">
            <span className="text-[9px] text-stone-500 uppercase tracking-widest block font-bold">Station Time</span>
            <span className="font-mono text-sm font-bold text-stone-300">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`h-11 px-4 rounded-xl border flex items-center gap-2 text-sm font-semibold transition-all ${
              audioEnabled
                ? "bg-brand-500/10 border-brand-500/20 text-brand-400"
                : "bg-stone-900 border-stone-800 text-stone-500"
            }`}
          >
            {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span>Audio {audioEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </header>

      {/* BILL REQUEST ALERTS */}
      {waiterRequests.filter(r => r.status === 'pending' && r.type === 'bill').length > 0 && (
        <div className="relative z-10 mb-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between text-red-400">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 animate-pulse flex-shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              PENDING BILL SETTLEMENTS: Table(s) {waiterRequests.filter(r => r.status === 'pending' && r.type === 'bill').map(r => r.tableNumber).join(', ')}
            </span>
          </div>
        </div>
      )}

      {/* MAIN KDS COLUMNS GRID */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        
        {/* COLUMN 1: NEW TICKETS */}
        <div className="bg-stone-900/30 border border-stone-900 rounded-2xl p-4 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-4 border-b border-stone-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-yellow-500/10 text-yellow-400 flex items-center justify-center text-xs font-bold font-mono">
                {pendingOrders.length}
              </span>
              <h2 className="font-bold text-stone-200 text-base">New Tickets</h2>
            </div>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">Ready to Accept</span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[70vh] pr-1 no-scrollbar">
            <AnimatePresence>
              {pendingOrders.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-stone-600 text-sm py-12">
                  No incoming tickets
                </div>
              ) : (
                pendingOrders.map(order => {
                  const elapsedSeconds = getTicketAgeInSeconds(order.createdAt);
                  const isOverdue = elapsedSeconds >= 300; // 5 minutes (300 secs)

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className={`glass-panel rounded-2xl p-5 border transition-all duration-300 relative ${
                        isOverdue 
                          ? 'border-red-500/50 bg-red-950/10 active-pulse shadow-lg shadow-red-500/5' 
                          : 'border-yellow-500/20 hover:border-yellow-500/40 bg-stone-900/50'
                      }`}
                    >
                      {/* Overdue Banner */}
                      {isOverdue && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-stone-950 font-bold px-2 py-0.5 rounded-md text-[9px] flex items-center gap-0.5 shadow-md">
                          <AlertTriangle className="w-3 h-3" /> OVERDUE
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider font-mono">
                            Token: {order.id.replace('order-', '#')}
                          </span>
                          <h3 className="text-2xl font-black text-stone-100 mt-0.5">Table {order.tableNumber}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-stone-500 block uppercase font-bold">In Queue</span>
                          <span className="font-mono text-sm font-bold text-stone-300 flex items-center gap-1 mt-0.5">
                            <Clock className="w-4 h-4 text-stone-500" />
                            {formatMinutes(elapsedSeconds)}
                          </span>
                        </div>
                      </div>

                      {/* Ordered Items List */}
                      <div className="space-y-3 mb-5 border-t border-stone-850 pt-3">
                        {order.items.map((item, idx) => {
                          const mItem = menu.find(m => m.id === item.id || m.name === item.name);
                          
                          return (
                            <div key={idx} className="flex flex-col text-sm border-b border-stone-850/30 pb-2 last:border-0 last:pb-0">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-yellow-500 text-lg">{item.quantity}x</span>
                                  <span className="font-extrabold text-stone-250 text-base">{item.name}</span>
                                </div>

                                {/* Dietary badges */}
                                <div className="flex gap-1">
                                  {mItem?.tags.includes("Veg") ? <VegSymbol /> : <NonVegSymbol />}
                                  {mItem?.tags.includes("Gluten-Free") && (
                                    <span className="text-[8px] bg-amber-500/15 text-amber-400 font-bold border border-amber-500/25 px-1 py-0.5 rounded">GF</span>
                                  )}
                                </div>
                              </div>

                              {/* Alert details for modifications */}
                              {item.notes && (
                                <div className="flex items-start gap-1 mt-1 text-rose-500 font-black text-xs bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-lg">
                                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                  <span>ALLERGY/MOD: {item.notes.toUpperCase()}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* General Ticket Comments */}
                      {order.notes && (
                        <div className="text-[10px] text-stone-400 bg-stone-950 p-2.5 rounded-xl mb-4 border border-stone-850">
                          <span className="font-bold text-stone-450 block uppercase text-[8px] mb-0.5">Kitchen Note:</span>
                          "{order.notes}"
                        </div>
                      )}

                      {/* Accept Action */}
                      <div className="space-y-2">
                        <button
                          onClick={() => updateOrderStatus(order.id, "preparing")}
                          className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-stone-950 font-black rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                        >
                          <Play className="w-4 h-4 fill-stone-950" />
                          Accept Order
                        </button>
                        <p className="text-[9px] text-stone-500 text-center font-bold">
                          💡 Acceptance triggers live customer tracker countdown and updates.
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COLUMN 2: IN PREPARATION */}
        <div className="bg-stone-900/30 border border-stone-900 rounded-2xl p-4 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-4 border-b border-stone-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-brand-500/10 text-brand-400 flex items-center justify-center text-xs font-bold font-mono">
                {preparingOrders.length}
              </span>
              <h2 className="font-bold text-stone-200 text-base">In Progress</h2>
            </div>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">Smart Timers</span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[70vh] pr-1 no-scrollbar">
            <AnimatePresence>
              {preparingOrders.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-stone-600 text-sm py-12">
                  No active cooks
                </div>
              ) : (
                preparingOrders.map(order => {
                  const elapsedSeconds = getTicketAgeInSeconds(order.createdAt);
                  const isOverdue = elapsedSeconds >= 720; // 12 minutes (720 secs)

                  // Compute prep pacing for table alignment
                  const itemPrepTimes = order.items.map(item => {
                    const mItem = menu.find(m => m.id === item.id || m.name === item.name);
                    return mItem ? mItem.prepTime : 10;
                  });
                  const maxPrepMin = Math.max(...itemPrepTimes);

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className={`glass-panel rounded-2xl p-5 border transition-all duration-300 relative ${
                        isOverdue 
                          ? 'border-red-500/50 bg-red-950/10 active-pulse shadow-lg shadow-red-500/5' 
                          : 'border-brand-500/20 hover:border-brand-500/40 bg-stone-900/50'
                      }`}
                    >
                      {/* Critical Warning Flag */}
                      {isOverdue && (
                        <div className="absolute -top-2 -right-2 bg-red-500 text-stone-950 font-bold px-2 py-0.5 rounded-md text-[9px] flex items-center gap-0.5 shadow-md">
                          <AlertTriangle className="w-3 h-3" /> CRITICAL AGE
                        </div>
                      )}

                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-[10px] font-bold text-brand-400 uppercase tracking-wider font-mono">
                            Token: {order.id.replace('order-', '#')}
                          </span>
                          <h3 className="text-2xl font-black text-stone-100 mt-0.5">Table {order.tableNumber}</h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-stone-500 block uppercase font-bold">Total Prep</span>
                          <span className="font-mono text-sm font-bold text-brand-400 flex items-center gap-1 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                            {formatMinutes(elapsedSeconds)} / {maxPrepMin}m
                          </span>
                        </div>
                      </div>

                      {/* Smart Sync Timer Items */}
                      <div className="space-y-4 mb-5 border-t border-stone-850 pt-3">
                        {order.items.map((item, idx) => {
                          const mItem = menu.find(m => m.id === item.id || m.name === item.name);
                          const itemPrepMin = mItem ? mItem.prepTime : 10;
                          
                          // Smart Scheduling Logic
                          const startDelaySec = (maxPrepMin - itemPrepMin) * 60;
                          const itemPrepSec = itemPrepMin * 60;
                          
                          let statusText = "";
                          let statusColorClass = "";
                          let progressPct = 0;
                          
                          if (elapsedSeconds < startDelaySec) {
                            // Waiting to start
                            const waitRemaining = startDelaySec - elapsedSeconds;
                            statusText = `Wait to start (${formatMinutes(waitRemaining)} left)`;
                            statusColorClass = "text-stone-500 font-bold";
                            progressPct = 0;
                          } else {
                            // Active cooking
                            const activeSec = elapsedSeconds - startDelaySec;
                            const cookingRemaining = Math.max(0, itemPrepSec - activeSec);
                            progressPct = Math.min(100, (activeSec / itemPrepSec) * 100);
                            
                            if (progressPct >= 100) {
                              statusText = "Completed / Ready";
                              statusColorClass = "text-emerald-400 font-extrabold";
                            } else {
                              statusText = `Cooking (${formatMinutes(cookingRemaining)} left)`;
                              statusColorClass = "text-brand-400 font-bold";
                            }
                          }

                          return (
                            <div key={idx} className="space-y-1.5 border-b border-stone-850/30 pb-2 last:border-0 last:pb-0">
                              <div className="flex justify-between items-center text-sm">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-stone-300">{item.quantity}x</span>
                                  <span className="font-semibold text-stone-200">{item.name}</span>
                                </div>
                                <span className={`text-xs ${statusColorClass}`}>{statusText}</span>
                              </div>

                              {/* Progress bar representing sync state */}
                              <div className="w-full h-2 bg-stone-950 rounded-full overflow-hidden border border-stone-850">
                                <div 
                                  className={`h-full transition-all duration-1000 ${
                                    progressPct >= 100 
                                      ? 'bg-emerald-500' 
                                      : progressPct > 0 
                                        ? 'bg-gradient-to-r from-brand-500 to-brand-400' 
                                        : 'bg-stone-800'
                                  }`} 
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>

                              {/* Modifications warnings */}
                              {item.notes && (
                                <div className="flex items-center gap-1 text-rose-500 font-black text-[11px] bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                                  <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                                  <span>MOD: {item.notes.toUpperCase()}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Cooked Action */}
                      <button
                        onClick={() => handleMarkCooked(order)}
                        className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        Cooked (Mark Ready)
                      </button>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* COLUMN 3: READY TO SERVE */}
        <div className="bg-stone-900/30 border border-stone-900 rounded-2xl p-4 flex flex-col min-h-[500px]">
          <div className="flex justify-between items-center mb-4 border-b border-stone-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-md bg-gold-500/10 text-gold-400 flex items-center justify-center text-xs font-bold font-mono">
                {readyOrders.length}
              </span>
              <h2 className="font-bold text-stone-200 text-base">At the Pass</h2>
            </div>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">Ready for Table</span>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto max-h-[70vh] pr-1 no-scrollbar">
            <AnimatePresence>
              {readyOrders.length === 0 ? (
                <div className="h-full flex items-center justify-center text-center text-stone-600 text-sm py-12">
                  No tickets ready
                </div>
              ) : (
                readyOrders.map(order => (
                  <motion.div
                    key={order.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="glass-panel rounded-2xl p-5 border border-gold-500/30 hover:border-gold-500/50 bg-gold-500/[0.02] relative active-pulse"
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[10px] font-bold text-gold-450 uppercase tracking-wider font-mono">
                          Token: {order.id.replace('order-', '#')}
                        </span>
                        <h3 className="text-2xl font-black text-stone-100 mt-0.5">Table {order.tableNumber}</h3>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-stone-550 block uppercase font-bold">Waiter Alert</span>
                        <span className="text-[9px] bg-gold-500 text-stone-950 px-2.5 py-1 rounded-full font-black flex items-center gap-1 mt-1">
                          <Bell className="w-3 h-3 animate-bounce" /> CALLING
                        </span>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2 mb-4 border-t border-stone-850 pt-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gold-450 text-base">{item.quantity}x</span>
                            <span className="font-semibold text-stone-250">{item.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Serve Action */}
                    <button
                      onClick={() => updateOrderStatus(order.id, "completed")}
                      className="w-full py-3 bg-gold-500 hover:bg-gold-600 text-stone-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      Mark Served (Complete)
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>

            {/* Collapsible Completed Section */}
            {completedOrders.length > 0 && (
              <div className="mt-8 pt-6 border-t border-stone-900">
                <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Archive className="w-3.5 h-3.5" /> Recent Completed Tickets
                </h3>
                <div className="space-y-2">
                  {completedOrders.map(order => (
                    <div 
                      key={order.id} 
                      className="bg-stone-900/20 border border-stone-900 rounded-xl p-3 flex justify-between items-center text-xs opacity-60"
                    >
                      <div>
                        <span className="font-extrabold text-stone-300 block">Table {order.tableNumber}</span>
                        <p className="text-[10px] text-stone-500 font-mono mt-0.5">{order.items.length} items • {order.id.toUpperCase()}</p>
                      </div>
                      <span className="text-emerald-500 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4 stroke-[3]" /> Served
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* OVERLAY: SIMULATED DINING ROOM PICKUP TV */}
      <AnimatePresence>
        {showTvPopup && tvOrder && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-stone-900 border-4 border-dashed border-gold-500 rounded-3xl p-8 max-w-lg w-full text-center relative shadow-2xl shadow-gold-500/10 active-pulse"
            >
              <button 
                onClick={() => setShowTvPopup(false)}
                className="absolute top-4 right-4 p-2 bg-stone-950 hover:bg-stone-800 text-stone-500 hover:text-stone-300 rounded-full transition-colors border border-stone-850"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 rounded-full bg-gold-500/15 border-4 border-gold-500 flex items-center justify-center mx-auto text-gold-400 mb-6 active-pulse">
                <Bell className="w-10 h-10 animate-bounce" />
              </div>

              <span className="text-xs bg-gold-500 text-stone-950 px-4 py-1.5 rounded-full font-black uppercase tracking-widest inline-block mb-3">
                Dining Room Announcement
              </span>

              <h2 className="text-3xl font-black text-stone-100 uppercase tracking-tight mb-2">
                Order Ready for Pickup
              </h2>
              
              <div className="py-6 my-4 bg-stone-950 rounded-2xl border border-stone-850">
                <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black block">Customer Token ID</span>
                <span className="text-5xl font-black text-gold-500 font-mono tracking-tight block my-2">
                  {tvOrder.id.replace('order-', '#').toUpperCase()}
                </span>
                <span className="text-lg font-bold text-stone-300 block">
                  Table {tvOrder.tableNumber}
                </span>
              </div>

              <p className="text-stone-400 text-xs font-light">
                This overlay represents the dining room display flashing for guests and service staff.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
