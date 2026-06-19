import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Check, Sparkles, Flame, Clock, ArrowRight, Star, ShoppingBag, 
  Globe, Sun, Moon, CheckCircle2, ChevronLeft, Heart, ShieldAlert 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TRANSLATIONS = {
  en: {
    welcome: "Welcome to Table",
    chooseLanguage: "Please select your language to start",
    specials: "Chef's Special Recommendation",
    specialsDesc: "Guntur Karam Kodi & Nellore Chepala Pulusu - Authentic spicy Andhra recipes.",
    veg: "Veg Only",
    nonveg: "Non-Veg Only",
    gf: "Gluten-Free",
    spicyOnly: "Spicy Only",
    popularOnly: "Best Sellers",
    all: "All Dishes",
    addToCart: "Add to Order",
    cartTitle: "Your Tray",
    cartEmpty: "Your tray is empty.",
    loyaltyReward: "🎉 Loyalty Reward: You will earn 150 Points on this meal!",
    payButton: "Pay Safely via Paytm",
    checkoutSuccess: "Payment Successful!",
    waitingTitle: "Your food is being prepared with care!",
    waitingSubtitle: "Watch the timer below to see when it's ready.",
    smsReassurance: "💬 We will send you updates via SMS and WhatsApp so you can relax.",
    rateMeal: "How was your food? Tap to rate:",
    submittedFeedback: "Thank you for your feedback!",
    customOptions: "Custom Options",
    noOnions: "No Onions",
    extraSpicy: "Extra Spicy",
    extraCheese: "Extra Ghee / Butter",
    done: "Add to Tray",
    backToMenu: "Back to Menu",
    viewCart: "View My Tray",
    total: "Total",
    tableNo: "Table",
    readingMode: "Visual Reading Mode",
    callServant: "Call Waiter",
    assistanceSent: "Waiter request sent!",
    orderIdLabel: "Order ID",
    minLabel: "mins",
    ratingThanks: "Thank you for helping us monitor food quality!",
  },
  hi: {
    welcome: "टेबल पर आपका स्वागत है",
    chooseLanguage: "शुरू करने के लिए कृपया अपनी भाषा चुनें",
    specials: "शेफ की विशेष सिफारिश",
    specialsDesc: "गुंटूर करम कोडी और नेल्लोर चेपला पुलुसु - प्रामाणिक तीखे आंध्र व्यंजन।",
    veg: "केवल शाकाहारी",
    nonveg: "केवल मांसाहारी",
    gf: "ग्लूटेन-मुक्त",
    spicyOnly: "केवल तीखा",
    popularOnly: "लोकप्रिय",
    all: "सभी व्यंजन",
    addToCart: "ऑर्डर में जोड़ें",
    cartTitle: "आपकी थाली",
    cartEmpty: "आपकी थाली खाली है।",
    loyaltyReward: "🎉 इनाम: इस भोजन पर आप 150 लॉयल्टी पॉइंट्स कमाएंगे!",
    payButton: "Paytm द्वारा सुरक्षित भुगतान करें",
    checkoutSuccess: "भुगतान सफल रहा!",
    waitingTitle: "आपका भोजन प्यार से तैयार किया जा रहा है!",
    waitingSubtitle: "भोजन कब तैयार होगा, यह देखने के टाइमर देखें।",
    smsReassurance: "💬 हम आपको SMS और WhatsApp पर अपडेट भेजेंगे ताकि आप आराम कर सकें।",
    rateMeal: "आपका भोजन कैसा था? रेटिंग देने के लिए छुएं:",
    submittedFeedback: "आपकी प्रतिक्रिया के लिए धन्यवाद!",
    customOptions: "ऑर्डर कस्टमाइज़ करें",
    noOnions: "प्याज न डालें",
    extraSpicy: "ज्यादा तीखा",
    extraCheese: "अतिरिक्त घी / मक्खन",
    done: "थाली में जोड़ें",
    backToMenu: "मेन्यू पर वापस जाएं",
    viewCart: "मेरी थाली देखें",
    total: "कुल मूल्य",
    tableNo: "टेबल",
    readingMode: "पढ़ने के लिए रंग",
    callServant: "वेटेर बुलाएं",
    assistanceSent: "वेटेर को बुलाने का अनुरोध भेजा गया है!",
    orderIdLabel: "ऑर्डर संख्या",
    minLabel: "मिनट",
    ratingThanks: "गुणवत्ता बनाए रखने में हमारी मदद करने के लिए धन्यवाद!",
  }
};

// Add Telugu language configuration falling back to English strings per user request
TRANSLATIONS.te = {
  ...TRANSLATIONS.en,
  welcome: "టేబుల్ కి స్వాగతం",
  chooseLanguage: "మొదలు పెట్టడానికి మీ భాషను ఎంచుకోండి",
  spicyOnly: "కారం మాత్రమే",
  popularOnly: "ప్రసిద్ధ వంటకాలు",
  all: "అన్ని వంటకాలు"
};

// Visual components for Veg / Non-veg indicators
const VegSymbol = () => (
  <div className="w-5 h-5 border-2 border-emerald-600 flex items-center justify-center bg-white p-0.5 rounded flex-shrink-0" title="Vegetarian">
    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
  </div>
);

const NonVegSymbol = () => (
  <div className="w-5 h-5 border-2 border-rose-600 flex items-center justify-center bg-white p-0.5 rounded flex-shrink-0" title="Non-Vegetarian">
    <div className="w-2.5 h-2.5 rounded-full bg-rose-600" />
  </div>
);

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
      <div className={`w-full h-full bg-gradient-to-br from-stone-850 to-stone-900 flex flex-col items-center justify-center p-3 text-center select-none border border-stone-800/50 ${className}`}>
        <span className="text-4xl mb-1 filter drop-shadow">{getFoodEmoji(name)}</span>
        <span className="text-[10px] font-black text-brand-400 font-mono tracking-wider">{initials}</span>
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

export default function CustomerView({ defaultTable = 5, isEmbedded = false }) {
  const { menu, orders, placeOrder, addWaiterRequest } = useApp();

  const [tableNumber] = useState(defaultTable);
  const [lang, setLang] = useState(null); // welcome step triggers language selection
  const [isDarkMode, setIsDarkMode] = useState(true); // Accessible high-contrast toggle
  const [activeStep, setActiveStep] = useState("menu"); // menu, customizing, cart, waiting
  
  // Cart items
  const [cart, setCart] = useState([]);
  const [selectedItemForCustomization, setSelectedItemForCustomization] = useState(null);
  
  // Checkboxes for customization
  const [customExtraSpicy, setCustomExtraSpicy] = useState(false);
  const [customNoOnions, setCustomNoOnions] = useState(false);
  const [customExtraCheese, setCustomExtraCheese] = useState(false);

  // Filters
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);
  const [nonVegOnlyFilter, setNonVegOnlyFilter] = useState(false);
  const [spicyOnlyFilter, setSpicyOnlyFilter] = useState(false);
  const [gfOnlyFilter, setGfOnlyFilter] = useState(false);
  const [popularOnlyFilter, setPopularOnlyFilter] = useState(false);

  // Feedback Rating
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Countdown timer for active orders
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2500);
  };

  // Find active orders for current table
  const activeOrder = orders.find(
    o => o.tableNumber === parseInt(tableNumber, 10) && 
    (o.status === "pending" || o.status === "preparing" || o.status === "ready")
  );

  const prevStatusRef = useRef(null);

  useEffect(() => {
    if (activeOrder) {
      const prevStatus = prevStatusRef.current;
      if (prevStatus && prevStatus !== activeOrder.status) {
        if (activeOrder.status === "preparing") {
          showToast("🍳 Chef Manishankar accepted your order! Preparing food.");
        } else if (activeOrder.status === "ready") {
          showToast("🔔 Order Ready! Please collect it from the counter.");
        }
      }
      prevStatusRef.current = activeOrder.status;
    } else {
      prevStatusRef.current = null;
    }
  }, [activeOrder?.status, activeOrder?.id]);

  // Countdown clock tick
  useEffect(() => {
    let timer;
    if (activeStep === "waiting" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeStep, countdown]);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleLanguageSelect = (selectedLang) => {
    setLang(selectedLang);
  };

  const t = lang ? TRANSLATIONS[lang] : TRANSLATIONS.en;

  const handleOpenCustomization = (item) => {
    setSelectedItemForCustomization(item);
    setCustomExtraSpicy(false);
    setCustomNoOnions(false);
    setCustomExtraCheese(false);
    setActiveStep("customizing");
  };

  const handleConfirmCustomization = () => {
    const item = selectedItemForCustomization;
    
    // Build notes string from checkboxes
    const notesArray = [];
    if (customExtraSpicy) notesArray.push(t.extraSpicy);
    if (customNoOnions) notesArray.push(t.noOnions);
    if (customExtraCheese) notesArray.push(t.extraCheese);
    const notes = notesArray.join(', ');

    setCart(prev => {
      const existingIdx = prev.findIndex(i => i.id === item.id && i.notes === notes);
      if (existingIdx > -1) {
        return prev.map((i, index) => index === existingIdx ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, notes }];
    });

    setActiveStep("menu");
    showToast(`Added ${item.name} to tray`);
  };

  const updateCartQty = (idx, delta) => {
    setCart(prev => {
      return prev.map((item, index) => {
        if (index === idx) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handlePay = () => {
    if (cart.length === 0) return;
    
    // Assemble order notes
    const generalNotes = cart.map(i => i.notes ? `${i.name} (${i.notes})` : "").filter(Boolean).join('. ');
    
    placeOrder(tableNumber, cart, generalNotes);
    setCart([]);
    setCountdown(600); // reset 10m countdown
    setActiveStep("waiting");
    showToast(t.checkoutSuccess);
  };

  const handleCallAssistance = () => {
    addWaiterRequest(tableNumber, "waiter");
    showToast(t.assistanceSent);
  };

  // Filtered menu
  const filteredMenu = menu.filter(item => {
    if (vegOnlyFilter && !item.tags.includes("Veg")) return false;
    if (nonVegOnlyFilter && !item.tags.includes("Non-Veg")) return false;
    if (spicyOnlyFilter && !item.tags.includes("Spicy")) return false;
    if (gfOnlyFilter && !item.tags.includes("Gluten-Free")) return false;
    if (popularOnlyFilter && !item.popular) return false;
    return true;
  });

  // Calculations
  const cartTotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // Styled Theme Tokens based on accessible Dark Mode toggle
  const themeClass = isDarkMode 
    ? "bg-stone-950 text-stone-50 border-stone-850" 
    : "bg-amber-50/20 text-stone-900 border-stone-200";
    
  const cardClass = isDarkMode
    ? "bg-stone-900 border border-stone-850"
    : "bg-white border border-stone-200 shadow-md shadow-stone-200/50";
    
  const subtextClass = isDarkMode
    ? "text-stone-400 font-light"
    : "text-stone-600 font-normal";
    
  const titleTextClass = isDarkMode
    ? "text-stone-100"
    : "text-stone-900";

  // STEP 1: WELCOME SCREEN (If lang is not selected)
  if (!lang) {
    return (
      <div className={`flex-1 min-h-screen p-8 flex flex-col justify-between items-center bg-stone-950 text-stone-100 font-sans`}>
        {/* Top Spacer */}
        <div className="w-full text-center pt-8">
          <div className="h-16 w-16 bg-brand-500 rounded-2xl flex items-center justify-center font-black text-stone-950 text-2xl shadow-xl shadow-brand-500/20 mx-auto mb-4">
            DT
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">DineTab Bistro</h1>
          <p className="text-stone-400 text-base font-light mt-1 font-mono">Andhra Specialty Dine-In • Table {tableNumber}</p>
        </div>

        {/* Center: Language Selection */}
        <div className="w-full max-w-sm space-y-5">
          <h2 className="text-center font-bold text-lg text-stone-300">Choose Language / భాష ఎంచుకోండి</h2>
          
          <button
            onClick={() => handleLanguageSelect("en")}
            className="w-full h-20 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-650 hover:to-brand-700 text-stone-950 font-black text-xl rounded-2xl flex items-center justify-between px-8 shadow-lg transition-transform transform active:scale-95"
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">🇬🇧</span> English
            </span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={() => handleLanguageSelect("hi")}
            className="w-full h-20 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-550 hover:to-amber-550 text-stone-950 font-black text-xl rounded-2xl flex items-center justify-between px-8 shadow-lg transition-transform transform active:scale-95"
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">🇮🇳</span> हिंदी (Hindi)
            </span>
            <ArrowRight className="w-6 h-6 stroke-[3]" />
          </button>

          <button
            onClick={() => handleLanguageSelect("te")} // Telugu language button
            className="w-full h-20 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-550 hover:to-emerald-550 text-stone-950 font-black text-xl rounded-2xl flex items-center justify-between px-8 shadow-lg transition-transform transform active:scale-95"
          >
            <span className="flex items-center gap-3">
              <span className="text-2xl">🇮🇳</span> తెలుగు (Telugu)
            </span>
            <span className="text-xs bg-stone-950 text-emerald-400 font-mono px-2 py-1 rounded-md">Default: English</span>
          </button>
        </div>

        {/* Bottom footer reassurance */}
        <div className="text-center text-xs text-stone-500 pb-4 max-w-xs">
          Tap any language button to start. Large print and high contrast enabled.
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen ${isEmbedded ? 'max-w-md border-x shadow-2xl' : 'max-w-2xl'} mx-auto ${themeClass} flex flex-col font-sans transition-colors duration-200 select-none pb-28`}>
      
      {/* Toast Alert popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 16 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
          >
            <div className="bg-brand-500 text-stone-950 font-extrabold text-base px-6 py-4 rounded-2xl shadow-xl flex items-center gap-2 pointer-events-auto border border-brand-400">
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessible Header Controls */}
      <header className="p-4 border-b flex justify-between items-center gap-2 z-30">
        <div className="flex flex-col">
          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black leading-none">{t.tableNo}</span>
          <span className="text-2xl font-black tracking-tight">{tableNumber}</span>
        </div>

        {/* Big visual reading toggles */}
        <div className="flex items-center gap-3">
          {activeOrder && activeStep !== "waiting" && (
            <button
              onClick={() => setActiveStep("waiting")}
              className="h-14 px-4 bg-emerald-500 hover:bg-emerald-600 text-stone-950 rounded-2xl flex items-center gap-2 text-sm font-black shadow-lg shadow-emerald-500/10 animate-pulse"
            >
              <Clock className="w-5 h-5 shrink-0" />
              <span>Track Order</span>
            </button>
          )}

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="h-14 px-4 bg-stone-900/10 hover:bg-stone-900/20 border rounded-2xl flex items-center gap-2 text-sm font-black transition-colors"
            title={t.readingMode}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-5 h-5 text-gold-400 fill-gold-400" />
                <span className="hidden sm:inline text-stone-300">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-brand-600 fill-brand-600" />
                <span className="hidden sm:inline text-stone-800 font-bold">Dark Mode</span>
              </>
            )}
          </button>

          <button
            onClick={handleCallAssistance}
            className="h-14 px-4 bg-red-500 hover:bg-red-650 text-white rounded-2xl flex items-center gap-1.5 text-sm font-black shadow-lg shadow-red-500/10"
          >
            <ShieldAlert className="w-5 h-5" />
            <span>{t.callServant}</span>
          </button>
        </div>
      </header>

      {/* STEP 2: MAIN MENU VIEW */}
      {activeStep === "menu" && (
        <div className="p-6 space-y-8 flex-1">
          
          {/* Chef Recommendations Banner */}
          <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-r from-brand-900/40 via-gold-950/20 to-brand-950/30 border border-brand-500/20 shadow-xl">
            <span className="text-xs bg-gold-500 text-stone-950 px-3 py-1 rounded-full font-black uppercase tracking-wider mb-3 inline-block">
              🌶️ {t.specials}
            </span>
            <h2 className="text-2xl font-black mb-1">Guntur Karam Kodi</h2>
            <p className={`${subtextClass} text-sm mb-4`}>{t.specialsDesc}</p>
            <div className="flex items-center gap-2 text-xs font-black text-brand-400">
              <Sparkles className="w-4 h-4" /> Tap any item below to add to your meal tray.
            </div>
          </div>

          {/* Horizontal scrollable Filter Pills Bar */}
          <div>
            <div 
              className="flex gap-2.5 overflow-x-auto pb-2.5 -mx-6 px-6" 
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch' 
              }}
            >
              {/* All Dishes Pill */}
              <button
                onClick={() => {
                  setVegOnlyFilter(false);
                  setNonVegOnlyFilter(false);
                  setSpicyOnlyFilter(false);
                  setGfOnlyFilter(false);
                  setPopularOnlyFilter(false);
                }}
                className={`h-12 px-5 rounded-full border text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  (!vegOnlyFilter && !nonVegOnlyFilter && !spicyOnlyFilter && !gfOnlyFilter && !popularOnlyFilter)
                    ? "bg-brand-500 border-brand-500 text-stone-950 shadow-md shadow-brand-500/20"
                    : isDarkMode
                      ? "bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-700"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span>🍽️</span>
                <span>{t.all}</span>
              </button>

              {/* Veg Only Pill */}
              <button
                onClick={() => {
                  setVegOnlyFilter(!vegOnlyFilter);
                  setNonVegOnlyFilter(false);
                }}
                className={`h-12 px-5 rounded-full border text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  vegOnlyFilter
                    ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                    : isDarkMode
                      ? "bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-700"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <VegSymbol />
                <span>{t.veg}</span>
              </button>

              {/* Non-Veg Only Pill */}
              <button
                onClick={() => {
                  setNonVegOnlyFilter(!nonVegOnlyFilter);
                  setVegOnlyFilter(false);
                }}
                className={`h-12 px-5 rounded-full border text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  nonVegOnlyFilter
                    ? "bg-rose-500/20 border-rose-500 text-rose-450"
                    : isDarkMode
                      ? "bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-700"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <NonVegSymbol />
                <span>{t.nonveg}</span>
              </button>

              {/* Spicy Only Pill */}
              <button
                onClick={() => {
                  setSpicyOnlyFilter(!spicyOnlyFilter);
                }}
                className={`h-12 px-5 rounded-full border text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  spicyOnlyFilter
                    ? "bg-amber-500/20 border-amber-500 text-amber-450"
                    : isDarkMode
                      ? "bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-700"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span>🌶️</span>
                <span>{t.spicyOnly}</span>
              </button>

              {/* Gluten Free Pill */}
              <button
                onClick={() => {
                  setGfOnlyFilter(!gfOnlyFilter);
                }}
                className={`h-12 px-5 rounded-full border text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  gfOnlyFilter
                    ? "bg-teal-500/20 border-teal-500 text-teal-400"
                    : isDarkMode
                      ? "bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-700"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span>🌾</span>
                <span>{t.gf}</span>
              </button>

              {/* Best Sellers Pill */}
              <button
                onClick={() => {
                  setPopularOnlyFilter(!popularOnlyFilter);
                }}
                className={`h-12 px-5 rounded-full border text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  popularOnlyFilter
                    ? "bg-brand-500/20 border-brand-550 text-brand-400"
                    : isDarkMode
                      ? "bg-stone-900 border-stone-850 text-stone-300 hover:border-stone-700"
                      : "bg-white border-stone-200 text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span>⭐</span>
                <span>{t.popularOnly}</span>
              </button>
            </div>
          </div>

          {/* Accessible Menu List */}
          <div className="space-y-6">
            {filteredMenu.map(item => (
              <div 
                key={item.id}
                onClick={() => item.inStock && handleOpenCustomization(item)}
                className={`${cardClass} rounded-3xl overflow-hidden p-4 flex flex-col sm:flex-row gap-5 cursor-pointer transform hover:scale-[1.01] transition-transform`}
              >
                {/* Appetizing Photo */}
                <div className="relative w-full sm:w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-stone-900">
                  <AccessibleImage src={item.image} alt={item.name} name={item.name} />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-rose-500 font-bold text-sm">
                      Sold Out
                    </div>
                  )}
                </div>

                {/* Text details */}
                <div className="flex-1 flex flex-col justify-between py-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      {item.tags.includes("Veg") ? <VegSymbol /> : <NonVegSymbol />}
                      <h3 className={`text-2xl font-black ${titleTextClass} leading-tight`}>
                        {item.name}
                      </h3>
                    </div>
                    <p className={`text-base ${subtextClass} mt-1.5 line-clamp-2`}>
                      {item.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <span className="text-2xl font-black text-brand-500 font-mono">
                      ₹{item.price.toFixed(2)}
                    </span>
                    
                    {item.inStock ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCustomization(item);
                        }}
                        className="h-16 px-6 bg-brand-500 hover:bg-brand-600 text-stone-950 rounded-2xl text-lg font-black flex items-center gap-2 shadow-lg shadow-brand-500/10 transition-transform transform active:scale-95"
                      >
                        <span className="text-2xl">+</span>
                        <span>{t.addToCart}</span>
                      </button>
                    ) : (
                      <span className="text-rose-500 text-sm font-bold bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating cart bar */}
          {cart.length > 0 && (
            <div className="fixed bottom-6 left-6 right-6 z-40 max-w-2xl mx-auto">
              <button
                onClick={() => setActiveStep("cart")}
                className="w-full h-20 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-550 hover:to-teal-650 text-white rounded-2xl flex justify-between items-center px-8 shadow-2xl transition-transform transform active:scale-95 border border-emerald-400"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 px-3 py-1.5 rounded-xl text-sm font-black">
                    {cartCount}
                  </span>
                  <span className="text-xl font-black uppercase tracking-wider">{t.viewCart}</span>
                </div>
                <span className="text-2xl font-black font-mono">
                  ₹{cartTotal.toFixed(2)}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 3: EASY CUSTOMIZATION MODAL (Checkbox list) */}
      {activeStep === "customizing" && selectedItemForCustomization && (
        <div className="p-6 space-y-8 flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep("menu")}
              className="p-2 hover:bg-stone-900/10 rounded-xl"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>
            <h2 className={`text-2xl font-black ${titleTextClass}`}>{t.customOptions}</h2>
          </div>

          <div className={`${cardClass} p-6 rounded-3xl space-y-4`}>
            <div className="flex gap-4 items-center border-b pb-4">
              <div className="w-20 h-20 overflow-hidden rounded-xl bg-stone-900 shrink-0">
                <AccessibleImage 
                  src={selectedItemForCustomization.image} 
                  alt={selectedItemForCustomization.name} 
                  name={selectedItemForCustomization.name}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  {selectedItemForCustomization.tags.includes("Veg") ? <VegSymbol /> : <NonVegSymbol />}
                  <h3 className="text-xl font-black text-stone-100">{selectedItemForCustomization.name}</h3>
                </div>
                <p className="text-brand-500 font-mono font-bold text-lg">₹{selectedItemForCustomization.price.toFixed(2)}</p>
              </div>
            </div>

            <span className="text-xs text-stone-500 uppercase tracking-widest font-black block pt-2">
              Select Cooking Additions:
            </span>

            {/* Giant Checkbox touch options */}
            <div className="space-y-4">
              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer select-none transition-colors ${
                  customExtraSpicy 
                    ? 'bg-brand-500/10 border-brand-500 text-brand-400' 
                    : isDarkMode ? 'bg-stone-950 border-stone-850 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={customExtraSpicy} 
                  onChange={() => setCustomExtraSpicy(!customExtraSpicy)} 
                  className="w-6 h-6 rounded-md accent-brand-500 cursor-pointer"
                />
                <span className="text-lg font-black flex items-center gap-1.5">
                  🌶️ {t.extraSpicy}
                </span>
              </label>

              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer select-none transition-colors ${
                  customNoOnions 
                    ? 'bg-brand-500/10 border-brand-500 text-brand-400' 
                    : isDarkMode ? 'bg-stone-950 border-stone-850 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={customNoOnions} 
                  onChange={() => setCustomNoOnions(!customNoOnions)} 
                  className="w-6 h-6 rounded-md accent-brand-500 cursor-pointer"
                />
                <span className="text-lg font-black flex items-center gap-1.5">
                  🧅 {t.noOnions}
                </span>
              </label>

              <label 
                className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer select-none transition-colors ${
                  customExtraCheese 
                    ? 'bg-brand-500/10 border-brand-500 text-brand-400' 
                    : isDarkMode ? 'bg-stone-950 border-stone-850 text-stone-300' : 'bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <input 
                  type="checkbox" 
                  checked={customExtraCheese} 
                  onChange={() => setCustomExtraCheese(!customExtraCheese)} 
                  className="w-6 h-6 rounded-md accent-brand-500 cursor-pointer"
                />
                <span className="text-lg font-black flex items-center gap-1.5">
                  🧈 {t.extraCheese}
                </span>
              </label>
            </div>
          </div>

          <button
            onClick={handleConfirmCustomization}
            className="w-full h-20 bg-brand-500 hover:bg-brand-600 text-stone-950 font-black text-xl rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-brand-500/10"
          >
            <Check className="w-6 h-6 stroke-[3]" />
            {t.done}
          </button>
        </div>
      )}

      {/* STEP 4: CART & ONE-CLICK CHECKOUT */}
      {activeStep === "cart" && (
        <div className="p-6 space-y-8 flex-1">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStep("menu")}
              className="p-2 hover:bg-stone-900/10 rounded-xl"
            >
              <ChevronLeft className="w-6 h-6 stroke-[3]" />
            </button>
            <h2 className={`text-2xl font-black ${titleTextClass}`}>{t.cartTitle}</h2>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16 text-stone-500 text-lg">
              {t.cartEmpty}
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Cart List */}
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className={`${cardClass} p-4 rounded-3xl flex gap-4 items-center`}>
                    <div className="w-20 h-20 overflow-hidden rounded-2xl bg-stone-900 shrink-0">
                      <AccessibleImage src={item.image} alt={item.name} name={item.name} />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          {item.tags.includes("Veg") ? <VegSymbol /> : <NonVegSymbol />}
                          <h4 className={`text-lg font-black ${titleTextClass}`}>{item.name}</h4>
                        </div>
                        {item.notes && (
                          <p className="text-xs text-brand-400 mt-0.5 italic font-bold">
                            ({item.notes})
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-3">
                        <span className="font-mono font-black text-brand-500">₹{(item.price * item.quantity).toFixed(2)}</span>
                        
                        {/* Giant Qty selectors */}
                        <div className="flex items-center gap-3 bg-stone-950/20 border rounded-xl p-1">
                          <button
                            onClick={() => updateCartQty(idx, -1)}
                            className="w-10 h-10 bg-stone-900 hover:bg-stone-850 text-stone-300 font-extrabold text-lg flex items-center justify-center rounded-lg border border-stone-800"
                          >
                            -
                          </button>
                          <span className="text-base font-black px-1">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(idx, 1)}
                            className="w-10 h-10 bg-stone-900 hover:bg-stone-850 text-stone-300 font-extrabold text-lg flex items-center justify-center rounded-lg border border-stone-800"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Loyalty Reward Box */}
              <div className="bg-brand-500/10 border border-brand-500/20 rounded-3xl p-5 text-center text-brand-400 font-black text-base flex items-center justify-center gap-2">
                <span>{t.loyaltyReward}</span>
              </div>

              {/* Calculations */}
              <div className="p-6 rounded-3xl bg-stone-900/10 border space-y-3">
                <div className="flex justify-between text-base text-stone-400 font-semibold">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base text-stone-400 font-semibold">
                  <span>GST & CGST (5%)</span>
                  <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-2xl font-black border-t pt-3 mt-3">
                  <span className={titleTextClass}>{t.total}</span>
                  <span className="text-brand-500 font-mono">₹{(cartTotal * 1.05).toFixed(2)}</span>
                </div>
              </div>

              {/* Paytm Checkout */}
              <button
                onClick={handlePay}
                className="w-full h-24 bg-gradient-to-r from-sky-500 via-sky-650 to-sky-700 hover:from-sky-600 hover:to-sky-850 text-white font-black text-xl rounded-3xl flex items-center justify-center gap-3 shadow-2xl transition-transform transform active:scale-95 border border-sky-400"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-sky-600 font-extrabold text-xs shadow-md">
                  Paytm
                </div>
                <span>{t.payButton}</span>
              </button>

              <button
                onClick={() => setActiveStep("menu")}
                className="w-full h-16 bg-stone-900/20 hover:bg-stone-900/40 border text-stone-400 text-sm font-bold rounded-2xl"
              >
                {t.backToMenu}
              </button>
            </div>
          )}
        </div>
      )}

      {/* STEP 5: THE 'WAITING' & FEEDBACK SCREEN */}
      {activeStep === "waiting" && (
        <div className="p-6 space-y-8 flex-1 text-center flex flex-col justify-center">
          
          {/* Dynamic Status Icon & Title */}
          <div className="space-y-4">
            {(!activeOrder || activeOrder?.status === "pending") && (
              <>
                <div className="w-20 h-20 rounded-full bg-amber-500/10 border-4 border-amber-500 flex items-center justify-center mx-auto text-amber-500 shadow-xl shadow-amber-500/15 animate-pulse">
                  <Clock className="w-10 h-10 stroke-[3]" />
                </div>
                <div className="space-y-2">
                  <h2 className={`text-3xl font-black ${titleTextClass}`}>Order Placed</h2>
                  <p className={`text-base ${subtextClass} max-w-sm mx-auto`}>
                    Waiting for Chef Manishankar to accept your order...
                  </p>
                </div>
              </>
            )}
            
            {activeOrder?.status === "preparing" && (
              <>
                <div className="w-20 h-20 rounded-full bg-orange-500/10 border-4 border-orange-500 flex items-center justify-center mx-auto text-orange-500 shadow-xl shadow-orange-500/15 animate-bounce">
                  <Flame className="w-10 h-10 stroke-[3] text-orange-500 fill-orange-500" />
                </div>
                <div className="space-y-2">
                  <h2 className={`text-3xl font-black ${titleTextClass}`}>Order Accepted!</h2>
                  <p className={`text-base ${subtextClass} max-w-sm mx-auto`}>
                    Chef Manishankar has accepted your order and is cooking it.
                  </p>
                </div>
              </>
            )}

            {activeOrder?.status === "ready" && (
              <>
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/30 animate-pulse">
                  <span className="text-4xl animate-bounce">🔔</span>
                </div>
                <div className="space-y-2">
                  <h2 className={`text-3xl font-black text-emerald-400`}>Your Food is Ready!</h2>
                  <p className={`text-base ${subtextClass} max-w-sm mx-auto font-bold`}>
                    Please collect your items from the counter. Enjoy!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Step-by-Step Progress Bar */}
          <div className="max-w-xs mx-auto pt-4 pb-2">
            <div className="flex items-center justify-between relative">
              {/* Line background */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-stone-850 z-0 rounded" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald-500 z-0 rounded transition-all duration-500" 
                style={{ 
                  width: !activeOrder || activeOrder?.status === "pending" ? "15%" : activeOrder?.status === "preparing" ? "50%" : "100%" 
                }}
              />

              {/* Step 1: Placed */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors ${
                  activeOrder ? "bg-emerald-500 text-stone-950" : "bg-stone-850 text-stone-500"
                }`}>
                  1
                </div>
                <span className="text-[10px] font-black uppercase mt-1 text-stone-400">Placed</span>
              </div>

              {/* Step 2: Preparing */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  activeOrder?.status === "preparing" || activeOrder?.status === "ready"
                    ? "bg-emerald-500 text-stone-950 scale-110" 
                    : "bg-stone-850 text-stone-500"
                }`}>
                  2
                </div>
                <span className="text-[10px] font-black uppercase mt-1 text-stone-400">Cooking</span>
              </div>

              {/* Step 3: Ready */}
              <div className="flex flex-col items-center z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  activeOrder?.status === "ready"
                    ? "bg-emerald-500 text-stone-950 scale-110" 
                    : "bg-stone-850 text-stone-500"
                }`}>
                  3
                </div>
                <span className="text-[10px] font-black uppercase mt-1 text-stone-400">Ready</span>
              </div>
            </div>
          </div>

          {/* Countdown Clock (Smart kitchen timer link) */}
          <div className="p-8 rounded-full border-4 border-dashed border-brand-500/30 w-52 h-52 flex flex-col items-center justify-center mx-auto bg-stone-900/5 select-none active-pulse">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-black">Ready In</span>
            <span className="text-4xl font-black font-mono text-brand-500 my-1">{formatCountdown(countdown)}</span>
            <span className="text-xs text-stone-450">{t.minLabel}</span>
          </div>

          {/* SMS/WhatsApp reassurance prompt */}
          <div className="p-5 rounded-3xl bg-stone-900/20 border max-w-sm mx-auto text-sm font-bold text-brand-400">
            {t.smsReassurance}
          </div>

          {/* Post-Meal 5-Star Feedback Widget */}
          <div className={`${cardClass} p-6 rounded-3xl max-w-sm mx-auto space-y-4`}>
            <h3 className="font-black text-base text-stone-300">{t.rateMeal}</h3>
            
            {feedbackSubmitted ? (
              <p className="text-emerald-400 font-bold text-sm">{t.ratingThanks}</p>
            ) : (
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(starNum => (
                  <button
                    key={starNum}
                    onClick={() => {
                      setRating(starNum);
                      setFeedbackSubmitted(true);
                      showToast(t.submittedFeedback);
                    }}
                    className="p-2 transform active:scale-95 transition-transform"
                  >
                    <Star 
                      className={`w-9 h-9 ${
                        starNum <= rating 
                          ? 'text-gold-500 fill-gold-500' 
                          : 'text-stone-600 hover:text-stone-500'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveStep("menu")}
            className="w-full h-16 bg-stone-900/40 hover:bg-stone-900/60 border border-stone-850 text-stone-300 text-sm font-bold rounded-2xl max-w-sm mx-auto mt-4"
          >
            {t.backToMenu}
          </button>
        </div>
      )}

    </div>
  );
}
