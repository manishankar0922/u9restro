import { useState, useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon, X, Phone, MapPin, Clock, Info, Search, Heart, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const menuCategories = [
  { id: 'breakfast', name: 'Signature Breakfast' },
  { id: 'dosas', name: 'Dosas' },
  { id: 'idli-vada', name: 'Idli & Vada' },
  { id: 'tiffins', name: 'Tiffins' },
  { id: 'meals', name: 'South Indian Meals' },
  { id: 'rice-specials', name: 'Rice Specials' },
  { id: 'beverages', name: 'Beverages' },
  { id: 'coffee', name: 'Traditional Filter Coffee' },
  { id: 'desserts', name: 'Desserts' }
];

const menuItems = [
  // Signature Breakfast
  {
    id: 'b1',
    name: 'Ghee Podi Idli',
    description: '4 pieces of soft, steaming hot idli topped with spicy gun powder (podi) and pure home-made cow ghee. Served with coconut chutney and fresh sambar.',
    price: 120,
    category: 'breakfast',
    image: '/sng-idli.jpg',
    spicy: true,
    veg: true,
    recommended: true
  },
  {
    id: 'b2',
    name: 'Crispy Masala Dosa',
    description: 'A golden-brown thin rice crepe cooked with fresh butter, stuffed with seasoned potato mash. Served with tomato, ginger, and coconut chutneys and hot sambar.',
    price: 140,
    category: 'breakfast',
    image: '/sng-hero.jpg',
    spicy: false,
    veg: true,
    recommended: true
  },
  {
    id: 'b3',
    name: 'Medu Vada',
    description: '2 pieces of crispy fried lentil donuts seasoned with black pepper, curry leaves, and green chillies. Golden outside, fluffy inside.',
    price: 90,
    category: 'breakfast',
    image: '/sng-vada.jpg',
    spicy: false,
    veg: true,
    recommended: false
  },
  {
    id: 'b4',
    name: 'Rava Khara Bhath',
    description: 'Spiced semolina breakfast cooked to perfection, seasoned with ghee, mustard seeds, curry leaves, and roasted cashew nuts.',
    price: 100,
    category: 'breakfast',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },

  // Dosas
  {
    id: 'd1',
    name: 'Ghee Roast Dosa',
    description: 'Classic paper-thin golden crepe roasted with generous helpings of pure aromatic cow ghee.',
    price: 130,
    category: 'dosas',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },
  {
    id: 'd2',
    name: 'Mysore Masala Dosa',
    description: 'Crisp crepe lined with our signature spicy red garlic-chilli chutney, filled with rich potato masala and ghee.',
    price: 150,
    category: 'dosas',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    spicy: true,
    veg: true,
    recommended: true
  },
  {
    id: 'd3',
    name: 'Andhra Spicy Karam Dosa',
    description: 'Flavored crepe spread with fiery Andhra onion-chili karam paste and finished with roasted chana powder.',
    price: 145,
    category: 'dosas',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80',
    spicy: true,
    veg: true,
    recommended: false
  },
  {
    id: 'd4',
    name: 'Cheese Podi Dosa',
    description: 'Modern fusion of melted mozzarella cheese and our traditional spicy gunpowder (podi) inside a crisp golden crepe.',
    price: 170,
    category: 'dosas',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    spicy: true,
    veg: true,
    recommended: false
  },

  // Idli & Vada
  {
    id: 'iv1',
    name: 'Sambar Idli (2 Pcs)',
    description: 'Fluffy steamed idlis completely immersed in hot, aromatic, freshly brewed South Indian sambar, topped with pure ghee and raw onions.',
    price: 110,
    category: 'idli-vada',
    image: '/sng-idli.jpg',
    spicy: false,
    veg: true,
    recommended: true
  },
  {
    id: 'iv2',
    name: 'Button Ghee Idli (14 Pcs)',
    description: 'Fourteen bite-sized mini idlis floating in a bowl of piping hot sambar, generously drizzled with pure melted ghee.',
    price: 130,
    category: 'idli-vada',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: true
  },
  {
    id: 'iv3',
    name: 'Vada Sambar (2 Pcs)',
    description: 'Two crunchy deep-fried lentil vadas soaked in hot, sweet-and-sour sambar. Topped with fresh coriander.',
    price: 110,
    category: 'idli-vada',
    image: '/sng-vada.jpg',
    spicy: false,
    veg: true,
    recommended: false
  },

  // Tiffins
  {
    id: 't1',
    name: 'Traditional Pongal',
    description: 'Classic comforting rice and green gram mash seasoned with crushed pepper, cumin, ginger, and loaded with cashews roasted in ghee.',
    price: 120,
    category: 'tiffins',
    image: '/sng-pongal.jpg',
    spicy: false,
    veg: true,
    recommended: true
  },
  {
    id: 't2',
    name: 'Poori Masala (3 Pcs)',
    description: 'Golden fluffy puffed deep-fried whole wheat pooris, served with a classic spiced potato-onion curry and coconut chutney.',
    price: 120,
    category: 'tiffins',
    image: '/sng-poori.jpg',
    spicy: false,
    veg: true,
    recommended: false
  },
  {
    id: 't3',
    name: 'Rava Onion Dosa',
    description: 'Crispy lacy crepe made from semolina and rice flour batter, sprinkled with finely chopped green chilies, ginger, and fresh onions.',
    price: 140,
    category: 'tiffins',
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },

  // South Indian Meals
  {
    id: 'm1',
    name: 'Royal Banana Leaf Meal',
    description: 'The ultimate traditional feast: Steamed sona masuri rice, ghee, paruppu (dal), sambar, rasam, special kootu, poriyal, spicy Andhra pickle, appalam, fresh curd, and traditional sweet payasam.',
    price: 280,
    category: 'meals',
    image: '/sng-biryani.jpg',
    spicy: true,
    veg: true,
    recommended: true
  },
  {
    id: 'm2',
    name: 'Sri Narayana Deluxe Meal',
    description: 'Executive meal containing sweet, 2 flatbreads (chapati), dry vegetable curry, dal, rice, sambar, rasam, fresh curd, and papad.',
    price: 240,
    category: 'meals',
    image: '/sng-ambience.jpg',
    spicy: false,
    veg: true,
    recommended: false
  },

  // Rice Specials
  {
    id: 'r1',
    name: 'Andhra Gongura Rice',
    description: 'Tangy and spicy rice preparation incorporating sautéed gongura (sorrel leaves) paste, green chilies, and crunchy cashews.',
    price: 190,
    category: 'rice-specials',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80',
    spicy: true,
    veg: true,
    recommended: true
  },
  {
    id: 'r2',
    name: 'Bisi Bele Bhath',
    description: 'Authentic Karnataka dish of rice, lentils, and mixed vegetables cooked together with a special home-made spice blend and pure ghee.',
    price: 180,
    category: 'rice-specials',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80',
    spicy: true,
    veg: true,
    recommended: false
  },
  {
    id: 'r3',
    name: 'Curd Rice (Bagala Bhath)',
    description: 'Soothing soft cooked rice mixed with rich fresh unsoured curd, tempered with mustard seeds, curry leaves, ginger, and green chilies.',
    price: 130,
    category: 'rice-specials',
    image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },

  // Beverages
  {
    id: 'bev1',
    name: 'Spiced Butter Milk (Neer Moru)',
    description: 'Refreshing churned diluted yogurt blended with crushed ginger, green chillies, fresh coriander, and curry leaves.',
    price: 70,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },
  {
    id: 'bev2',
    name: 'Badam Milk (Chilled)',
    description: 'Thick milk simmered with ground almond paste, saffron strands, and green cardamom, served ice-cold topped with pistachios.',
    price: 90,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },
  {
    id: 'bev3',
    name: 'Fresh Lime Soda',
    description: 'Fizzy soda mixed with fresh lime juice, option of sweet, salted, or mixed to refresh your palate.',
    price: 80,
    category: 'beverages',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  },

  // Filter Coffee
  {
    id: 'c1',
    name: 'Signature Filter Coffee',
    description: 'Our proprietary strong chicory-coffee decoction blended with hot foaming milk. Served frothy in the traditional brass Dabarah & Tumbler.',
    price: 60,
    category: 'coffee',
    image: '/sng-coffee.jpg',
    spicy: false,
    veg: true,
    recommended: true
  },

  // Desserts
  {
    id: 'des1',
    name: 'Elaneer Payasam',
    description: 'A luxurious dessert made with fresh tender coconut pulp, coconut milk, and sweetened condensed milk, served chilled.',
    price: 150,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: true
  },
  {
    id: 'des2',
    name: 'Rava Kesari',
    description: 'Classic semolina pudding cooked with sugar syrup, generous amounts of ghee, saffron infusion, and garnished with roasted cashews and raisins.',
    price: 100,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80',
    spicy: false,
    veg: true,
    recommended: false
  }
];

export default function MenuPage() {
  const reduce = useReducedMotion();
  const menuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showStickyReserve, setShowStickyReserve] = useState(false);

  // Reservation state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '19:30',
    requests: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Sticky reservation button based on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowStickyReserve(true);
      } else {
        setShowStickyReserve(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP card entrance animation
  useEffect(() => {
    if (reduce) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-card', 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.05, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.menu-grid',
            start: 'top 85%'
          }
        }
      );
    }, menuRef);

    return () => ctx.revert();
  }, [searchQuery, activeCategory, reduce]);

  // Handle active category highlighting based on scroll position
  useEffect(() => {
    const handleScrollHighlight = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (let i = 0; i < menuCategories.length; i++) {
        const categoryId = menuCategories[i].id;
        const element = document.getElementById(categoryId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(categoryId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollHighlight);
    return () => window.removeEventListener('scroll', handleScrollHighlight);
  }, []);

  // Scroll to category
  const scrollToCategory = (id) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Offset for sticky search and category bars
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Form input validation
  const validateField = (name, value) => {
    let errors = { ...formErrors };
    if (name === 'name') {
      if (!value.trim()) errors.name = 'Full name is required.';
      else if (value.trim().length < 3) errors.name = 'Name must be at least 3 characters.';
      else delete errors.name;
    }
    if (name === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!value) errors.phone = 'Mobile number is required.';
      else if (!phoneRegex.test(value)) errors.phone = 'Enter a valid 10-digit mobile number.';
      else delete errors.phone;
    }
    if (name === 'date') {
      if (!value) errors.date = 'Reservation date is required.';
      else delete errors.date;
    }
    setFormErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    const errors = {};
    if (!formData.name.trim()) errors.name = 'Full name is required.';
    if (!formData.phone) errors.phone = 'Mobile number is required.';
    if (!formData.date) errors.date = 'Date is required.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    const message = `Hello Sri Narayana Grand,

I'd like to reserve a table.

Name: ${formData.name}
Phone: ${formData.phone}
Guests: ${formData.guests}
Date: ${formData.date}
Time: ${formData.time}
Special Requests: ${formData.requests || 'None'}

Please confirm my reservation.`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/917671856676?text=${encodedMessage}`;

    setTimeout(() => {
      try {
        const newWindow = window.open(waUrl, '_blank');
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
          throw new Error('Popup blocked');
        }
        setIsSubmitting(false);
        setIsModalOpen(false);
      } catch (err) {
        setIsSubmitting(false);
        setSubmitError("We couldn't open WhatsApp. Please call us directly at +91 7671856676.");
      }
    }, 1500);
  };

  // Filtering items based on search query
  const filteredItems = menuItems.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  // Check if a category has any search hits
  const categoryHasHits = (categoryId) => {
    return filteredItems.some(item => item.category === categoryId);
  };

  return (
    <main ref={menuRef} className="bg-[#fdfcfb] text-[#2d140a] min-h-screen font-sans selection:bg-[#7a3e23] selection:text-[#fdfcfb] overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${mobileMenuOpen ? 'bg-[#1c1917]' : 'bg-[#1c1917]/95 backdrop-blur-md border-b border-stone-800'}`}>
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          
          <Link to="/" className="flex flex-col drop-shadow-2xl z-50 hover:opacity-90 transition-opacity">
            <div className="font-serif text-2xl md:text-4xl tracking-[0.03em] font-medium leading-none mb-1 text-[#fdfcfb]">
              Sri Narayana Grand
            </div>
            <div className="font-sans text-[0.55rem] md:text-xs uppercase tracking-[0.4em] text-[#e7e5e4] font-medium ml-0.5 opacity-90">
              Authentic Udupi Cuisine
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em] drop-shadow-md text-white">
            <Link to="/" className="hover:text-[#c87a53] transition-colors py-2 flex items-center gap-1.5"><ArrowLeft size={14} /> Back to Home</Link>
            <a href="/#story" className="hover:text-[#c87a53] transition-colors py-2">Story</a>
            <a href="/#contact" className="hover:text-[#c87a53] transition-colors py-2">Contact</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 bg-[#c87a53] rounded-full text-white hover:bg-[#b8663d] transition-colors duration-300 shadow-md font-semibold tracking-widest text-xs cursor-pointer"
            >
              Reserve
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden text-white z-50 p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div className={`fixed inset-0 bg-[#1c1917] z-40 transition-transform duration-700 ease-in-out flex flex-col justify-center px-12 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col gap-10 text-white font-serif text-4xl">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c87a53] transition-colors">Home</Link>
          <a href="/#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c87a53] transition-colors">Our Story</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c87a53] transition-colors">Contact</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
            className="mt-8 px-8 py-4 bg-[#c87a53] text-white text-sm font-sans uppercase tracking-[0.2em] w-max rounded-full"
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* Hero Header spacer */}
      <div className="h-24 md:h-28 bg-[#1c1917]" />

      {/* Title & Search Section */}
      <section className="bg-[#f6ebe2] py-12 md:py-16 px-6 border-b border-[#e7e5e4] shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <nav className="text-xs uppercase tracking-widest text-stone-500 mb-3 flex items-center gap-2">
              <Link to="/" className="hover:underline">Home</Link>
              <ChevronRight size={10} />
              <span className="text-[#c87a53] font-semibold">Our Menu</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-6xl text-[#2d140a] font-semibold leading-tight tracking-tight">
              The Grand Culinary Feast
            </h1>
            <p className="text-stone-600 mt-3 font-light text-base md:text-lg max-w-xl">
              Fresh ingredients, traditional preparation methods, and authentic South Indian recipes passed down through generations.
            </p>
          </div>
          
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-stone-400 pointer-events-none">
              <Search size={18} />
            </span>
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e7e5e4] rounded-full py-3.5 pl-12 pr-6 text-sm focus:outline-none focus:border-[#c87a53] focus:ring-1 focus:ring-[#c87a53] transition-all shadow-sm text-stone-800"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Sticky Categories Navigation */}
      <div className="sticky top-20 z-30 bg-[#fdfcfb]/95 backdrop-blur-md border-b border-[#e7e5e4] shadow-sm overflow-x-auto whitespace-nowrap scrollbar-none py-4 px-6 md:px-12 flex justify-start md:justify-center gap-2 md:gap-4 scroll-smooth">
        {menuCategories.map((category) => {
          const hasHits = categoryHasHits(category.id);
          if (!hasHits) return null;
          
          return (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === category.id
                  ? 'bg-[#7a3e23] text-white shadow-md'
                  : 'bg-[#f6ebe2] text-[#532917] hover:bg-[#ebdcd1]'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Menu Sections container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 rounded-2xl border border-stone-200 shadow-sm max-w-xl mx-auto px-6">
            <Info className="text-stone-400 mx-auto mb-4" size={48} />
            <h3 className="font-serif text-2xl text-stone-700 font-medium">No menu items found</h3>
            <p className="text-stone-500 mt-2 font-light">We couldn't find anything matching "{searchQuery}". Try modifying your keywords.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 px-6 py-2.5 bg-[#c87a53] text-white rounded-full text-xs uppercase tracking-widest hover:bg-[#b8663d] transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-24">
            {menuCategories.map((category) => {
              const categoryItems = filteredItems.filter(item => item.category === category.id);
              if (categoryItems.length === 0) return null;

              return (
                <section key={category.id} id={category.id} className="scroll-mt-36">
                  {/* Category Title */}
                  <div className="border-b-2 border-[#f6ebe2] pb-4 mb-10 flex items-baseline justify-between">
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2d140a] font-semibold tracking-tight">
                      {category.name}
                    </h2>
                    <span className="text-xs uppercase tracking-widest text-[#c87a53] font-bold">
                      {categoryItems.length} {categoryItems.length === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  {/* Menu Items Grid */}
                  <div className="menu-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                    {categoryItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="menu-card bg-white rounded-2xl border border-[#e7e5e4] shadow-sm hover:shadow-xl hover:border-[#ebdcd1] transition-all duration-500 overflow-hidden flex flex-col group transform hover:-translate-y-1.5"
                      >
                        {/* Food Image Container */}
                        <div className="h-56 md:h-60 w-full overflow-hidden relative bg-stone-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            loading="lazy"
                            style={{
                              filter: 'brightness(1.05) contrast(1.02)'
                            }}
                          />
                          {/* Recommended Badge */}
                          {item.recommended && (
                            <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[0.6rem] md:text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-md flex items-center gap-1.5">
                              <Sparkles size={10} /> Chef Recommended
                            </span>
                          )}
                          {/* Veg/Spicy Indicators */}
                          <div className="absolute bottom-4 right-4 flex gap-1.5">
                            {item.veg && (
                              <span className="bg-green-600/90 text-white text-[0.55rem] font-bold uppercase tracking-widest py-0.5 px-2 rounded backdrop-blur-[2px] border border-green-500">
                                Veg
                              </span>
                            )}
                            {item.spicy && (
                              <span className="bg-red-600/90 text-white text-[0.55rem] font-bold uppercase tracking-widest py-0.5 px-2 rounded backdrop-blur-[2px] border border-red-500">
                                Spicy
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Info Content */}
                        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-4 mb-2">
                              <h3 className="font-serif text-lg md:text-xl text-[#2d140a] font-semibold group-hover:text-[#c87a53] transition-colors leading-tight">
                                {item.name}
                              </h3>
                              <span className="font-sans text-base md:text-lg font-bold text-[#7a3e23]">
                                ₹{item.price}
                              </span>
                            </div>
                            <p className="text-stone-500 font-light text-xs md:text-sm leading-relaxed mt-2.5 font-sans">
                              {item.description}
                            </p>
                          </div>

                          <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                            <button 
                              onClick={() => setIsModalOpen(true)}
                              className="text-stone-400 group-hover:text-[#c87a53] text-[0.7rem] md:text-xs font-semibold uppercase tracking-widest flex items-center gap-1 hover:underline transition-colors cursor-pointer"
                            >
                              Order via Table Reservation <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>

      {/* Modern Contact / Info Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#f6ebe2] border-t border-[#e7e5e4]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#c87a53] text-xs uppercase tracking-[0.3em] font-semibold mb-6 block">Location & Contact</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d140a] tracking-wide">Visit Sri Narayana Grand</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[#2d140a]">
            
            <div className="flex flex-col items-center text-center p-8 bg-[#fdfcfb] rounded-lg border border-[#e7e5e4] shadow-sm">
              <Phone className="text-[#c87a53] mb-6" size={32} />
              <h3 className="font-serif text-xl font-medium mb-3">Call & WhatsApp</h3>
              <p className="text-stone-600 mb-6 font-light font-sans">Reach out for immediate assistance or manual bookings.</p>
              <a href="tel:+917671856676" className="text-lg font-semibold hover:underline mb-2 font-sans">+91 7671856676</a>
              <a 
                href={`https://wa.me/917671856676?text=${encodeURIComponent("Hello Sri Narayana Grand, I visited your website and would like to know more about your restaurant. Please assist me.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-[#25d366] text-white rounded-full text-xs uppercase tracking-widest mt-2 hover:opacity-90 transition-opacity font-sans font-semibold"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-[#fdfcfb] rounded-lg border border-[#e7e5e4] shadow-sm">
              <MapPin className="text-[#c87a53] mb-6" size={32} />
              <h3 className="font-serif text-xl font-medium mb-3">Find Us</h3>
              <p className="text-stone-600 mb-6 font-light font-sans">123 Heritage Street, Culinary District, Udupi 576101</p>
              <a 
                href="https://maps.google.com/?q=Sri+Narayana+Grand+Udupi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#2d140a] hover:bg-[#2d140a] hover:text-white rounded-full text-xs uppercase tracking-widest transition-colors font-sans font-semibold"
              >
                Open Google Maps
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-8 bg-[#fdfcfb] rounded-lg border border-[#e7e5e4] shadow-sm">
              <Clock className="text-[#c87a53] mb-6" size={32} />
              <h3 className="font-serif text-xl font-medium mb-3">Opening Hours</h3>
              <p className="text-stone-600 font-light font-sans">Daily service breakfast through dinner.</p>
              <div className="mt-6 text-sm space-y-1 text-stone-700 font-sans">
                <p><strong>Breakfast:</strong> 7:00 AM - 11:30 AM</p>
                <p><strong>Meals & Rice:</strong> 11:30 AM - 4:00 PM</p>
                <p><strong>Dinner:</strong> 6:30 PM - 10:30 PM</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#111] text-[#f6ebe2] py-24 px-6 md:px-12 text-center md:text-left">
        <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 border-b border-[#333] pb-24 mb-12">
          <div className="md:col-span-2 pr-0 md:pr-24">
            <h3 className="font-serif text-4xl md:text-5xl mb-8 text-white">Sri Narayana Grand</h3>
            <p className="text-[#a8a29e] font-light text-lg leading-relaxed max-w-md mx-auto md:mx-0 font-sans">
              One of the finest authentic Udupi restaurants in South India. Craftsmanship, warmth, and an unforgettable dining experience.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 text-[#c87a53]">Location</h4>
            <p className="text-[#a8a29e] font-light leading-loose text-lg font-sans">
              123 Heritage Street<br/>
              Culinary District<br/>
              Udupi 576101
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 text-[#c87a53]">Reservations</h4>
            <p className="text-[#a8a29e] font-light leading-loose text-lg mb-8 font-sans">
              +91 7671856676<br/>
              reservations@srinarayanagrand.com
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 border border-[#555] hover:border-white hover:text-white transition-colors rounded-full text-xs uppercase tracking-wider cursor-pointer font-sans font-semibold"
            >
              Book a Table
            </button>
          </div>
        </div>
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-[#555] font-light uppercase font-sans">
          <p>&copy; {new Date().getFullYear()} Sri Narayana Grand</p>
          <div className="flex gap-10 mt-8 md:mt-0 text-stone-400">
            <a href="https://instagram.com/srinarayanagrand" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Buttons */}
      
      {/* Floating WhatsApp Button (Bottom Left) */}
      <a 
        href={`https://wa.me/917671856676?text=${encodeURIComponent("Hello Sri Narayana Grand, I visited your website and would like to know more about your restaurant. Please assist me.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 left-6 z-40 bg-[#25d366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${showStickyReserve ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}`}
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.717-1.465L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.793 1.453 5.429 0 9.856-4.417 9.859-9.849.002-2.63-1.023-5.101-2.885-6.964C16.55 1.93 14.076 1.05 11.453 1.05c-5.435 0-9.859 4.417-9.86 9.85 0 1.951.51 3.852 1.478 5.534L2.09 21.94l5.658-1.486z" />
        </svg>
      </a>

      {/* Sticky Mobile CTA (Bottom Right) */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-6 right-6 md:hidden z-40 bg-[#c87a53] text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform ${showStickyReserve ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}`}
        aria-label="Reserve Table"
      >
        <span className="text-xs uppercase tracking-widest font-semibold px-2 font-sans">Reserve</span>
      </button>

      {/* Reservation Modal (Native App feel) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#fdfcfb] text-[#2d140a] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#e7e5e4] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#e7e5e4] flex items-center justify-between bg-[#f6ebe2]">
              <div>
                <h3 className="font-serif text-2xl font-medium">Table Reservation</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5 font-sans">Sri Narayana Grand</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleReservationSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
              
              {submitError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2 font-sans">
                  <Info size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 font-sans">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className={`w-full bg-[#f6ebe2] border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all font-sans ${formErrors.name ? 'border-red-400' : 'border-transparent'}`}
                  disabled={isSubmitting}
                />
                {formErrors.name && <p className="text-red-600 text-xs mt-1 font-sans">{formErrors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 font-sans">Mobile Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full bg-[#f6ebe2] border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all font-sans ${formErrors.phone ? 'border-red-400' : 'border-transparent'}`}
                  disabled={isSubmitting}
                />
                {formErrors.phone && <p className="text-red-600 text-xs mt-1 font-sans">{formErrors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 font-sans">Guests</label>
                  <select 
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-[#f6ebe2] border border-transparent rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all font-sans"
                    disabled={isSubmitting}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 font-sans">Time</label>
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-[#f6ebe2] border border-transparent rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all font-sans"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 font-sans">Reservation Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full bg-[#f6ebe2] border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all font-sans ${formErrors.date ? 'border-red-400' : 'border-transparent'}`}
                  disabled={isSubmitting}
                />
                {formErrors.date && <p className="text-red-600 text-xs mt-1 font-sans">{formErrors.date}</p>}
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2 font-sans">Special Requests (Optional)</label>
                <textarea 
                  name="requests"
                  value={formData.requests}
                  onChange={handleInputChange}
                  placeholder="E.g., high chair, corner table, vegetarian allergy notes..."
                  rows="3"
                  className="w-full bg-[#f6ebe2] border border-transparent rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all resize-none font-sans"
                  disabled={isSubmitting}
                />
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-end gap-3 font-sans">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-sm font-semibold text-stone-600 rounded-lg hover:bg-stone-100 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#c87a53] text-white rounded-lg text-sm font-semibold hover:bg-[#b8663d] transition-colors shadow flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Preparing reservation...</span>
                    </>
                  ) : (
                    <span>Confirm & Connect</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}
