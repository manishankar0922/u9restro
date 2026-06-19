import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Clock, Bell, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TvDisplayView() {
  const { orders } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter and process orders
  // Preparing list: status === "preparing"
  const preparingOrders = orders.filter(o => o.status === "preparing");

  // Ready list: active ready (status === "ready") + recently completed (status === "completed")
  const activeReady = orders.filter(o => o.status === "ready");
  const recentlyServed = orders.filter(o => o.status === "completed");

  // Combine to keep the last 6 ready/completed items for pickup history, prioritizing active ready
  const combinedReadyList = [...activeReady, ...recentlyServed].slice(0, 6);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans select-none overflow-hidden">
      
      {/* Top Banner Header */}
      <header className="bg-stone-900 border-b-4 border-stone-800 p-6 flex justify-between items-center z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-brand-500 rounded-xl flex items-center justify-center font-black text-stone-950 text-xl shadow-lg">
            DT
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-stone-50">
              Now Serving
            </h1>
            <p className="text-stone-400 text-xs font-mono uppercase tracking-widest leading-none mt-1">
              DineTab Bistro Live Pickup Board
            </p>
          </div>
        </div>

        {/* Big Digital Clock */}
        <div className="flex items-center gap-2 bg-stone-950 px-5 py-2.5 rounded-2xl border border-stone-850 font-mono">
          <Clock className="w-5 h-5 text-brand-400" />
          <span className="text-xl font-extrabold text-stone-300">
            {currentTime.toLocaleTimeString()}
          </span>
        </div>
      </header>

      {/* Main Split Column Layout */}
      <div className="flex-1 grid grid-cols-2 divide-x-4 divide-stone-900 relative">
        
        {/* LEFT COLUMN: PREPARING (AMBER) */}
        <div className="bg-stone-950 flex flex-col p-8 relative">
          {/* Subtle amber background radial pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-amber-950/[0.04] rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center gap-3 border-b-2 border-amber-500/20 pb-4 mb-6 shrink-0">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 animate-pulse" />
            <h2 className="text-2xl font-black uppercase tracking-wider text-amber-500">
              Preparing
            </h2>
            <span className="ml-auto text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-bold">
              {preparingOrders.length} Cooking
            </span>
          </div>

          {/* Tokens List */}
          <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 gap-4 auto-rows-max">
            <AnimatePresence>
              {preparingOrders.length === 0 ? (
                <div className="col-span-2 h-full flex flex-col items-center justify-center text-stone-700 py-20 text-center gap-2">
                  <AlertCircle className="w-8 h-8" />
                  <span className="text-lg font-bold">All orders prepared</span>
                </div>
              ) : (
                preparingOrders.map(order => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="bg-stone-900/60 border border-stone-850 p-6 rounded-2xl text-center shadow-lg"
                  >
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black block">Token ID</span>
                    <span className="text-4xl font-extrabold text-stone-200 font-mono tracking-tight block my-1">
                      {order.id.replace('order-', '#').toUpperCase()}
                    </span>
                    <span className="text-xs bg-stone-950 text-amber-500/80 px-2 py-0.5 rounded font-bold">
                      Table {order.tableNumber}
                    </span>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* RIGHT COLUMN: READY FOR PICKUP (GREEN) */}
        <div className="bg-stone-950 flex flex-col p-8 relative">
          {/* Subtle green background radial pulse */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-emerald-950/[0.04] rounded-full blur-[80px] pointer-events-none" />

          <div className="flex items-center gap-3 border-b-2 border-emerald-500/20 pb-4 mb-6 shrink-0">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping" />
            <h2 className="text-2xl font-black uppercase tracking-wider text-emerald-400">
              Ready for Pickup
            </h2>
            <span className="ml-auto text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
              {activeReady.length} Ready
            </span>
          </div>

          {/* Tokens List */}
          <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-2 gap-4 auto-rows-max">
            <AnimatePresence>
              {combinedReadyList.length === 0 ? (
                <div className="col-span-2 h-full flex flex-col items-center justify-center text-stone-700 py-20 text-center gap-2">
                  <Bell className="w-8 h-8" />
                  <span className="text-lg font-bold">Waiting for tickets</span>
                </div>
              ) : (
                combinedReadyList.map(order => {
                  const isActive = order.status === "ready";
                  
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={
                        isActive 
                          ? { 
                              scale: [1, 1.12, 1, 1.12, 1], 
                              opacity: 1,
                              borderColor: ["#10b981", "#34d399", "#10b981"]
                            }
                          : { scale: 1, opacity: 0.5 }
                      }
                      transition={
                        isActive 
                          ? { duration: 1.5, ease: "easeInOut" } 
                          : { duration: 0.3 }
                      }
                      className={`p-6 rounded-2xl text-center shadow-2xl relative flex flex-col justify-between overflow-hidden border ${
                        isActive 
                          ? 'bg-emerald-950/20 border-emerald-500 text-stone-100 shadow-emerald-500/5' 
                          : 'bg-stone-900/40 border-stone-850 text-stone-500'
                      }`}
                    >
                      {/* Active notification indicator */}
                      {isActive && (
                        <div className="absolute top-2 right-2 text-emerald-400 animate-bounce">
                          <Bell className="w-4 h-4 fill-emerald-400" />
                        </div>
                      )}

                      <div>
                        <span className={`text-[10px] uppercase tracking-widest font-black block ${isActive ? 'text-emerald-400' : 'text-stone-600'}`}>
                          Token ID
                        </span>
                        <span className={`text-5xl font-black font-mono tracking-tight block my-2 ${isActive ? 'text-white' : 'text-stone-500'}`}>
                          {order.id.replace('order-', '#').toUpperCase()}
                        </span>
                      </div>

                      <div className="flex justify-center gap-1.5 mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                          isActive 
                            ? 'bg-emerald-500/10 text-emerald-350' 
                            : 'bg-stone-950 text-stone-600'
                        }`}>
                          Table {order.tableNumber}
                        </span>
                        {isActive && (
                          <span className="text-xs bg-emerald-500 text-stone-950 px-2 py-0.5 rounded font-black uppercase flex items-center gap-0.5">
                            <Sparkles className="w-3 h-3 fill-stone-950" /> Pickup
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Bottom informational bar */}
      <footer className="bg-stone-900 p-4 border-t-2 border-stone-850 text-center text-xs text-stone-500 font-bold shrink-0 z-10">
        Please matching your mobile device Token ID when collecting dishes from the pass. Enjoy your food!
      </footer>
    </div>
  );
}
