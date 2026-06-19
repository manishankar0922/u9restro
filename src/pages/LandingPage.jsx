import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, ChefHat, LayoutDashboard, Layers, Sparkles, QrCode, Play, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const { resetAllData } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="relative min-height-screen bg-stone-950 text-stone-50 overflow-hidden flex flex-col justify-between py-12 px-6">
      {/* Background radial glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gold-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-brand-500 rounded-xl flex items-center justify-center font-bold text-stone-950 text-lg shadow-lg shadow-brand-500/20">
            DT
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-stone-50">
            Dine<span className="text-brand-500">Tab</span>
          </span>
        </div>
        <button
          onClick={resetAllData}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-lg text-sm border border-stone-800 transition-colors"
          title="Reset mock data to clean state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Demo Data
        </button>
      </div>

      {/* Main Pitch Content */}
      <div className="max-w-6xl mx-auto w-full text-center my-auto py-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-full text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Client Pitch Demo • High Fidelity
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
            Next-Gen QR Dining & <br />
            <span className="bg-gradient-to-r from-brand-400 via-gold-400 to-brand-600 bg-clip-text text-transparent">
              Kitchen Operations
            </span>
          </h1>
          <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed mb-12">
            A seamless restaurant solution connecting customers, cooking lines, and managers in real-time. Witness live data synchronization across roles.
          </p>
        </motion.div>

        {/* Live Simulator Spotlight Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-4xl mx-auto mb-16 p-0.5 rounded-3xl bg-gradient-to-r from-brand-500 via-gold-500 to-stone-800 shadow-2xl shadow-brand-500/10"
        >
          <div className="bg-stone-900 rounded-[22px] p-8 text-left md:flex justify-between items-center gap-8">
            <div className="mb-6 md:mb-0">
              <span className="text-gold-400 font-semibold text-sm uppercase tracking-widest flex items-center gap-1 mb-2">
                <Layers className="w-4 h-4" /> Recommended Pitch Experience
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-stone-50 mb-3">
                Live Ecosystem Simulator
              </h2>
              <p className="text-stone-400 text-sm md:text-base max-w-xl font-light">
                Launch the split-screen control room to view the **Customer Mobile View**, the **Kitchen Display (KDS)**, and the **Admin Console** working side-by-side. Add orders in one panel and watch updates propagate instantly.
              </p>
            </div>
            <Link
              to="/simulator"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 w-full md:w-auto px-6 py-4 bg-brand-500 hover:bg-brand-600 text-stone-950 font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-stone-950" />
              Launch Live Simulator
            </Link>
          </div>
        </motion.div>

        {/* Role cards container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {/* Customer Card */}
          <motion.div variants={itemVariants} className="group">
            <Link
              to="/customer"
              className="block h-full bg-stone-900/50 hover:bg-stone-900/80 border border-stone-800 hover:border-brand-500/50 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-brand-500/5"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-5 group-hover:bg-brand-500 group-hover:text-stone-950 transition-all duration-300">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-2 flex items-center justify-between">
                Customer View
                <span className="text-xs bg-stone-800 text-stone-400 font-mono px-2 py-0.5 rounded">/customer</span>
              </h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Scan-to-order mobile menu interface. Custom notes, live order tracking, waiter calling action, and a visual cart system.
              </p>
            </Link>
          </motion.div>

          {/* Kitchen Card */}
          <motion.div variants={itemVariants} className="group">
            <Link
              to="/kitchen"
              className="block h-full bg-stone-900/50 hover:bg-stone-900/80 border border-stone-800 hover:border-gold-500/50 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-gold-500/5"
            >
              <div className="h-12 w-12 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-50 group-hover:text-stone-950 transition-all duration-300">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-2 flex items-center justify-between">
                Kitchen Display (KDS)
                <span className="text-xs bg-stone-800 text-stone-400 font-mono px-2 py-0.5 rounded">/kitchen</span>
              </h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Kitchen order screen with sound alerts, status filters, cook timers, ticket age highlights, and quick ticket progression controls.
              </p>
            </Link>
          </motion.div>

          {/* TV Display Signage Card */}
          <motion.div variants={itemVariants} className="group">
            <Link
              to="/tv-display"
              className="block h-full bg-stone-900/50 hover:bg-stone-900/80 border border-stone-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-5 group-hover:bg-emerald-500 group-hover:text-stone-950 transition-all duration-300">
                <span className="text-xl">📺</span>
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-2 flex items-center justify-between">
                TV Signage Display
                <span className="text-xs bg-stone-800 text-stone-400 font-mono px-2 py-0.5 rounded">/tv-display</span>
              </h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                Large-screen digital signage dashboard for the dining hall. High contrast list showing orders preparing and ready for pickup with bell alerts.
              </p>
            </Link>
          </motion.div>

          {/* Admin Card */}
          <motion.div variants={itemVariants} className="group">
            <Link
              to="/admin"
              className="block h-full bg-stone-900/50 hover:bg-stone-900/80 border border-stone-800 hover:border-brand-500/50 rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-brand-500/5"
            >
              <div className="h-12 w-12 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-400 mb-5 group-hover:bg-brand-500 group-hover:text-stone-950 transition-all duration-300">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-100 mb-2 flex items-center justify-between">
                Admin Console
                <span className="text-xs bg-stone-800 text-stone-400 font-mono px-2 py-0.5 rounded">/admin</span>
              </h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                KPI metrics, table status grids, visual analytics charts, real-time waiter response feed, and live menu stock toggles.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto w-full text-center border-t border-stone-900 pt-8 z-10">
        <div className="flex justify-between items-center text-stone-500 text-xs">
          <span>&copy; {new Date().getFullYear()} DineTab Inc. All rights reserved.</span>
          <div className="flex items-center gap-1.5 text-stone-400">
            <QrCode className="w-4.5 h-4.5 text-brand-500" />
            <span>Interactive QR Ecosystem Pitch</span>
          </div>
        </div>
      </div>
    </div>
  );
}
