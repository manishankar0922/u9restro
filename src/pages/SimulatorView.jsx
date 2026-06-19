import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import CustomerView from './CustomerView';
import KitchenView from './KitchenView';
import AdminView from './AdminView';
import { 
  ArrowLeft, Sparkles, RefreshCw, Smartphone, ChefHat, 
  LayoutDashboard, Play, Radio, Laptop, HelpCircle
} from 'lucide-react';

export default function SimulatorView() {
  const { resetAllData, orders, waiterRequests } = useApp();

  // Compute live activity stats for the status feed
  const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;
  const pendingRequests = waiterRequests.filter(r => r.status === "pending");

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Premium Ambient Glowing Background Spots */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-500/[0.04] rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-gold-500/[0.03] rounded-full blur-[180px] pointer-events-none z-0" />

      {/* Top Header Control Bar */}
      <header className="bg-stone-900/60 backdrop-blur-md border-b border-stone-850 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="w-10 h-10 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-400 hover:text-stone-200 rounded-xl flex items-center justify-center transition-all duration-250 active:scale-95"
            title="Back to Landing Hub"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-stone-100 via-stone-250 to-stone-400 bg-clip-text text-transparent">
                Ecosystem Live Showcase
              </h1>
            </div>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              Test end-to-end synchronized states dynamically across simulated client hardware.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-stone-400 bg-stone-950/80 border border-stone-850 px-4 py-2.5 rounded-xl max-w-sm">
            <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0 animate-pulse" />
            <span>
              Tap items on the <strong>phone 📱</strong>. Watch <strong>kitchen 🍳</strong> & <strong>admin 📊</strong> sync instantly.
            </span>
          </div>

          <button
            onClick={() => window.open('/tv-display', '_blank')}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-650 hover:from-emerald-600 hover:to-teal-700 text-stone-950 rounded-xl text-xs font-black transition-all shadow-lg shadow-emerald-500/10 active:scale-95 cursor-pointer"
          >
            <span>📺</span>
            Launch TV Signage
          </button>

          <button
            onClick={resetAllData}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 text-stone-300 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset State
          </button>
        </div>
      </header>

      {/* Simulator 3-Column Board */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 overflow-hidden z-10 relative">
        
        {/* COLUMN 1: Customer View (iPhone Mockup) */}
        <section className="xl:col-span-3 flex flex-col bg-stone-900/30 backdrop-blur-md border border-stone-900 rounded-3xl p-5 shadow-xl shadow-black/25">
          <div className="flex items-center justify-between w-full mb-4 px-1">
            <span className="text-[10px] font-black tracking-widest text-brand-450 uppercase flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              Customer App
            </span>
            <span className="text-[9px] bg-brand-500/10 text-brand-400 font-bold px-2 py-0.5 rounded-full border border-brand-500/20">
              Table 5 Menu
            </span>
          </div>

          {/* High-Fidelity iPhone 15 Pro Frame */}
          <div className="relative mx-auto border-[7px] border-stone-800 rounded-[44px] shadow-2xl overflow-hidden aspect-[9/19.2] w-full max-w-[275px] bg-stone-950 flex flex-col ring-1 ring-white/10 hover:ring-brand-500/20 transition-all duration-300">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-4 w-16 bg-stone-900 rounded-full z-45 flex items-center justify-center border border-stone-800/30">
              <div className="w-1.5 h-1.5 rounded-full bg-stone-950 border border-stone-800/20 mr-1.5" />
              <div className="w-6 h-0.5 bg-stone-950 rounded-full" />
            </div>

            {/* Screen shine reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none z-40" />

            {/* Status bar */}
            <div className="h-7 pt-1 px-6 bg-stone-950 flex justify-between items-center text-[9px] text-stone-400 font-black z-30 select-none">
              <span>12:00 PM</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span className="w-3.5 h-2 border border-stone-400 rounded-sm bg-stone-300" />
              </div>
            </div>

            {/* Viewport Frame */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-stone-950">
              <CustomerView defaultTable={5} isEmbedded={true} />
            </div>
            
            {/* Home indicator */}
            <div className="h-3.5 bg-stone-950 flex items-center justify-center pb-1 z-35 select-none">
              <div className="w-20 h-1 bg-stone-800 rounded-full" />
            </div>
          </div>
        </section>

        {/* COLUMN 2: Kitchen Display System (iPad Mockup) */}
        <section className="xl:col-span-4 flex flex-col bg-stone-900/30 backdrop-blur-md border border-stone-900 rounded-3xl p-5 shadow-xl shadow-black/25">
          <div className="flex items-center justify-between w-full mb-4 px-1">
            <span className="text-[10px] font-black tracking-widest text-gold-400 uppercase flex items-center gap-1.5">
              <ChefHat className="w-3.5 h-3.5" />
              Kitchen Display (KDS)
            </span>
            <span className="text-[9px] bg-gold-500/10 text-gold-400 font-bold px-2 py-0.5 rounded-full border border-gold-500/20">
              Tablet Mode
            </span>
          </div>

          {/* iPad Frame Wrapper */}
          <div className="flex-1 bg-stone-950 border-[9px] border-stone-850 rounded-[28px] shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5 hover:ring-gold-500/20 transition-all duration-300">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <KitchenView />
            </div>
          </div>
        </section>

        {/* COLUMN 3: Admin Console (Laptop Frame) */}
        <section className="xl:col-span-5 flex flex-col bg-stone-900/30 backdrop-blur-md border border-stone-900 rounded-3xl p-5 shadow-xl shadow-black/25">
          <div className="flex items-center justify-between w-full mb-4 px-1">
            <span className="text-[10px] font-black tracking-widest text-sky-400 uppercase flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" />
              Admin Command Console
            </span>
            <span className="text-[9px] bg-sky-500/10 text-sky-400 font-bold px-2 py-0.5 rounded-full border border-sky-500/20">
              Live Overview
            </span>
          </div>

          {/* Desktop/Laptop Panel Frame */}
          <div className="flex-1 bg-stone-950 border-[9px] border-stone-850 rounded-[28px] shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5 hover:ring-sky-500/20 transition-all duration-300">
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <AdminView />
            </div>
          </div>
        </section>

      </main>

      {/* Bottom Live Sync Status Activity Ticker */}
      <footer className="bg-stone-900/40 backdrop-blur-md border-t border-stone-850 px-6 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-3 z-10 select-none">
        <div className="flex items-center gap-3 text-xs text-stone-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-stone-500">Sync Channel active:</span>
          {latestOrder ? (
            <span className="text-stone-250 font-medium">
              Latest order <strong className="text-brand-400">#{latestOrder.id.replace('order-', '')}</strong> for Table {latestOrder.tableNumber} is currently <strong className="text-gold-400 uppercase font-black">{latestOrder.status}</strong>
            </span>
          ) : (
            <span className="text-stone-500">No active orders yet. Scan to place one.</span>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
          <span>Active Requests: <strong className="text-red-400 font-black">{pendingRequests.length} pending</strong></span>
          <span className="text-stone-700">|</span>
          <span>Status: <strong className="text-emerald-400 font-black">ONLINE</strong></span>
        </div>
      </footer>

    </div>
  );
}
