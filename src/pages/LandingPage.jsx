import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu as MenuIcon, X, Phone, MapPin, Clock, Calendar, Users, MessageSquare, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { id: 1, title: 'Crispy Masala Dosa', subtitle: 'A Golden Masterpiece', img: '/sng-hero.jpg', overlay: 'bg-black/10' },
  { id: 2, title: 'Banana Leaf Meals', subtitle: 'The Authentic Feast', img: '/sng-biryani.jpg', overlay: 'bg-black/12' },
  { id: 3, title: 'Filter Coffee', subtitle: 'Our Signature Brew', img: '/sng-coffee.jpg', overlay: 'bg-black/20' },
  { id: 4, title: 'Ghee Podi Idli', subtitle: 'Soft, Spicy, Melting', img: '/sng-idli.jpg', overlay: 'bg-black/8' },
  { id: 5, title: 'Crispy Medu Vada', subtitle: 'Perfectly Golden', img: '/sng-vada.jpg', overlay: 'bg-black/12' },
  { id: 6, title: 'Traditional Pongal', subtitle: 'Rich & Comforting', img: '/sng-pongal.jpg', overlay: 'bg-black/10' },
  { id: 7, title: 'Poori Masala', subtitle: 'Fluffy & Flavorful', img: '/sng-poori.jpg', overlay: 'bg-black/10' },
  { id: 8, title: 'The Ambience', subtitle: 'Premium Dining', img: '/sng-ambience-new.jpg', overlay: 'bg-black/15' },
];

export default function LandingPage() {
  const reduce = useReducedMotion();
  const mainRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStickyReserve, setShowStickyReserve] = useState(false);

  // Reservation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [submitError, setSubmitError] = useState("");

  // Slider state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timelineRef = useRef(null);

  // Handle slide exit and rotation
  useEffect(() => {
    if (reduce || isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(true);

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
          setIsTransitioning(false);
        }
      });

      timelineRef.current = tl;

      tl.to('.hero-image-active', { opacity: 0, scale: 0.95, duration: 1, ease: 'power2.inOut' }, 0)
        .to('.hero-text-active', { opacity: 0, y: -40, duration: 0.8, ease: 'power2.in' }, 0);

    }, 5000);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [currentSlideIndex, isTransitioning, reduce]);

  // Handle slide mount and enter animation
  useEffect(() => {
    if (reduce) return;

    const tl = gsap.timeline();
    
    gsap.set('.hero-image-active', { opacity: 0, scale: 1.12 });
    gsap.set('.hero-text-active', { opacity: 0, y: 40 });

    tl.to('.hero-image-active', { opacity: 1, scale: 1.02, duration: 1.2, ease: 'power2.out' }, 0)
      .to('.hero-image-active', { scale: 1, duration: 5.5, ease: 'none' }, 0)
      .to('.hero-text-active', { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, 0.4);

    return () => {
      tl.kill();
    };
  }, [currentSlideIndex, reduce]);

  // Scroll Animations & Sticky Button
  useEffect(() => {
    if (reduce || !mainRef.current) return;
    
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowStickyReserve(true);
      } else {
        setShowStickyReserve(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.parallax-img').forEach((img) => {
        gsap.fromTo(img, 
          { yPercent: -15 },
          {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });

      gsap.utils.toArray('.reveal-section').forEach((section) => {
        const elements = section.querySelectorAll('.reveal-elem');
        gsap.fromTo(elements, 
          { y: 50, opacity: 0 },
          {
            y: 0, 
            opacity: 1,
            duration: 1.5,
            stagger: 0.2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
            }
          }
        );
      });
    }, mainRef);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    }
  }, [reduce]);

  // Hash scroll listener and top scroll on mount
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Real-time Form Validation
  const validateField = (name, value) => {
    let errors = { ...formErrors };
    if (name === 'name') {
      if (!value.trim()) errors.name = "Full name is required.";
      else if (value.trim().length < 3) errors.name = "Name must be at least 3 characters.";
      else delete errors.name;
    }
    if (name === 'phone') {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!value) errors.phone = "Mobile number is required.";
      else if (!phoneRegex.test(value)) errors.phone = "Enter a valid 10-digit mobile number.";
      else delete errors.phone;
    }
    if (name === 'date') {
      if (!value) errors.date = "Reservation date is required.";
      else delete errors.date;
    }
    setFormErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Form Submission
  const handleReservationSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");
    
    // Final check
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.phone) errors.phone = "Mobile number is required.";
    if (!formData.date) errors.date = "Date is required.";

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
          throw new Error("Popup blocked");
        }
        setIsSubmitting(false);
        setIsModalOpen(false);
      } catch (err) {
        setIsSubmitting(false);
        setSubmitError("We couldn't open WhatsApp. Please call us directly at +91 7671856676.");
      }
    }, 1500);
  };

  const activeSlide = slides[currentSlideIndex];

  return (
    <main ref={mainRef} className="bg-[#fdfcfb] text-[#2d140a] min-h-screen font-sans selection:bg-[#7a3e23] selection:text-[#fdfcfb] overflow-x-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${mobileMenuOpen ? 'bg-[#1c1917]' : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent pb-24'}`}>
        <div className="flex items-start justify-between px-6 md:px-12 py-6">
          
          <Link to="/" className="flex flex-col drop-shadow-2xl z-50 hover:opacity-90 transition-opacity">
            <div className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-[0.03em] font-medium leading-none mb-2 text-[#fdfcfb]">
              Sri Narayana Grand
            </div>
            <div className="font-sans text-[0.6rem] md:text-xs uppercase tracking-[0.4em] text-[#e7e5e4] font-medium ml-1 opacity-90">
              Authentic Udupi Cuisine
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.2em] mt-2 drop-shadow-md text-white">
            <Link to="/menu" className="hover:text-[#c87a53] transition-colors py-2">Menu</Link>
            <a href="#story" className="hover:text-[#c87a53] transition-colors py-2">Story</a>
            <a href="#contact" className="hover:text-[#c87a53] transition-colors py-2">Contact</a>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 border border-white/30 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
            >
              Reserve
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden text-white mt-1 z-50 p-2 -mr-2"
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
          <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c87a53] transition-colors">Menu</Link>
          <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c87a53] transition-colors">Our Story</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#c87a53] transition-colors">Contact</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setIsModalOpen(true); }}
            className="mt-8 px-8 py-4 bg-[#c87a53] text-white text-sm font-sans uppercase tracking-[0.2em] w-max"
          >
            Reserve a Table
          </button>
        </div>
      </div>

      {/* GSAP Hero Slider (Apple-style Carousel with DOM unmounting) */}
      <section className="relative h-[100dvh] w-full overflow-hidden bg-stone-900">
        
        {/* Only one slide exists in the DOM at any point, with a unique key to force a clean React mount/unmount cycle */}
        <div key={`${activeSlide.id}-${currentSlideIndex}`} className="absolute inset-0">
          
          {/* Adaptive overlay percentage for maximum food visibility and support */}
          <div className={`absolute inset-0 z-10 ${activeSlide.overlay} transition-colors duration-1000`} />
          
          {/* Exposure and warmth correction (sepia, brightness, contrast, saturate) for cinematic morning sunlight look */}
          <img 
            src={activeSlide.img} 
            alt={activeSlide.title}
            className="hero-image-active w-full h-full object-cover origin-center absolute inset-0 z-0 select-none"
            style={{
              filter: 'brightness(1.22) contrast(1.08) saturate(1.15) sepia(0.08)'
            }}
          />
          
          <div className="hero-text-active absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 mt-16 pointer-events-none">
            <span className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] mb-4 text-[#e7e5e4] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              {activeSlide.subtitle}
            </span>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              {activeSlide.title}
            </h2>
          </div>
        </div>

        {/* Fixed Hero CTA (Persists on top of the changing slides) */}
        <div className="absolute bottom-16 left-0 right-0 z-30 flex justify-center gap-4 md:gap-8 px-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-[#c87a53] hover:bg-[#b8663d] text-white rounded-full text-xs md:text-sm uppercase tracking-widest transition-colors duration-300 shadow-lg"
          >
            Reserve Table
          </button>
          <Link to="/menu" className="px-8 py-4 border-2 border-white/40 hover:border-white text-white rounded-full text-xs md:text-sm uppercase tracking-widest transition-colors duration-300 bg-black/10 backdrop-blur-[2px]">
            Explore Menu
          </Link>
        </div>
      </section>

      {/* Storytelling: The Asymmetrical Culinary Journey */}
      <section id="story" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 reveal-section">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center">
          <div className="md:w-5/12 order-2 md:order-1">
            <span className="reveal-elem text-[#c87a53] text-xs uppercase tracking-[0.3em] font-semibold mb-8 block">Craftsmanship</span>
            <h2 className="reveal-elem font-serif text-5xl md:text-6xl lg:text-7xl text-[#2d140a] leading-[1.05] mb-10">
              Where tradition <br className="hidden lg:block"/> meets the tawa.
            </h2>
            <div className="reveal-elem text-[#532917] text-lg md:text-xl font-light leading-relaxed space-y-8">
              <p>
                A symphony of sizzling batter and aromatic spices. Our chefs, masters of their craft, orchestrate an authentic culinary experience daily. 
              </p>
              <p>
                From the crisp fold of a perfectly fermented dosa to the rich, slow-cooked indulgence of our royal biryanis, every dish is an ode to our heritage.
              </p>
            </div>
          </div>
          <div className="md:w-7/12 order-1 md:order-2 w-full h-[60vh] md:h-[85vh] overflow-hidden reveal-elem">
            <img 
              src="/sng-hero.jpg" 
              alt="Craftsmanship" 
              className="w-full h-full object-cover parallax-img scale-[1.2]"
              style={{
                filter: 'brightness(1.12) contrast(1.05) saturate(1.05)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Signature Dish Highlight */}
      <section className="py-24 md:py-40 px-6 md:px-12 bg-[#f6ebe2] reveal-section overflow-hidden">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-center">
          <div className="md:w-6/12 w-full h-[60vh] md:h-[80vh] overflow-hidden reveal-elem relative">
             <img 
              src="/sng-biryani.jpg" 
              alt="Luxurious South Indian Biryani" 
              className="absolute inset-0 w-full h-full object-cover parallax-img scale-[1.25]"
              style={{
                filter: 'brightness(1.15) contrast(1.05) saturate(1.1)'
              }}
            />
          </div>
          <div className="md:w-5/12 md:pl-8">
             <span className="reveal-elem text-[#c87a53] text-xs uppercase tracking-[0.3em] font-semibold mb-8 block">The Crown Jewel</span>
             <h2 className="reveal-elem font-serif text-5xl md:text-6xl lg:text-7xl text-[#2d140a] leading-[1.05] mb-10">
              Royal Feasts <br/> & Biryanis.
            </h2>
            <p className="reveal-elem text-[#532917] text-lg md:text-xl font-light leading-relaxed mb-10">
              Served steaming hot in traditional brass, our luxurious South Indian Biryani is slow-cooked to perfection. Pair it with our grand banana leaf meals for an unforgettable journey through authentic Udupi and Andhra flavors.
            </p>
            <Link to="/menu" className="reveal-elem inline-block px-8 py-4 border border-[#2d140a] hover:bg-[#2d140a] hover:text-[#f6ebe2] rounded-full text-xs uppercase tracking-widest transition-colors duration-500">
              Discover the Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Coffee Asymmetry */}
      <section className="py-24 md:py-40 px-6 md:px-12 reveal-section">
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-end">
          <div className="md:w-5/12 pb-12 md:pb-24 order-2 md:order-1 pl-0 md:pl-12">
            <h2 className="reveal-elem font-serif text-5xl md:text-6xl lg:text-7xl text-[#2d140a] leading-[1.05] mb-10">
              A ritual in <br/> every drop.
            </h2>
            <p className="reveal-elem text-[#532917] text-lg md:text-xl font-light leading-relaxed">
              Freshly roasted aroma. The rhythmic pour between tumbler and dabarah creating a rich golden froth. Our signature filter coffee is the heartbeat of Sri Narayana Grand.
            </p>
          </div>
          <div className="md:w-7/12 order-1 md:order-2 w-full h-[70vh] overflow-hidden reveal-elem">
            <img 
              src="/sng-coffee.jpg" 
              alt="Authentic Filter Coffee Pour" 
              className="w-full h-full object-cover parallax-img scale-[1.15]"
              style={{
                filter: 'brightness(1.15) contrast(1.05) saturate(1.1)'
              }}
            />
          </div>
        </div>
      </section>

      {/* Modern Contact / Info Section */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-[#f6ebe2] border-t border-[#e7e5e4] reveal-section">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="reveal-elem text-[#c87a53] text-xs uppercase tracking-[0.3em] font-semibold mb-6 block">Location & Contact</span>
            <h2 className="reveal-elem font-serif text-4xl md:text-5xl text-[#2d140a] tracking-wide">Visit Sri Narayana Grand</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-[#2d140a]">
            
            <div className="reveal-elem flex flex-col items-center text-center p-8 bg-[#fdfcfb] rounded-lg border border-[#e7e5e4] shadow-sm">
              <Phone className="text-[#c87a53] mb-6" size={32} />
              <h3 className="font-serif text-xl font-medium mb-3">Call & WhatsApp</h3>
              <p className="text-stone-600 mb-6 font-light">Reach out for immediate assistance or manual bookings.</p>
              <a href="tel:+917671856676" className="text-lg font-semibold hover:underline mb-2">+91 7671856676</a>
              <a 
                href={`https://wa.me/917671856676?text=${encodeURIComponent("Hello Sri Narayana Grand, I visited your website and would like to know more about your restaurant. Please assist me.")}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 bg-[#25d366] text-white rounded-full text-xs uppercase tracking-widest mt-2 hover:opacity-90 transition-opacity"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="reveal-elem flex flex-col items-center text-center p-8 bg-[#fdfcfb] rounded-lg border border-[#e7e5e4] shadow-sm">
              <MapPin className="text-[#c87a53] mb-6" size={32} />
              <h3 className="font-serif text-xl font-medium mb-3">Find Us</h3>
              <p className="text-stone-600 mb-6 font-light">123 Heritage Street, Culinary District, Udupi 576101</p>
              <a 
                href="https://maps.google.com/?q=Sri+Narayana+Grand+Udupi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#2d140a] hover:bg-[#2d140a] hover:text-white rounded-full text-xs uppercase tracking-widest transition-colors"
              >
                Open Google Maps
              </a>
            </div>

            <div className="reveal-elem flex flex-col items-center text-center p-8 bg-[#fdfcfb] rounded-lg border border-[#e7e5e4] shadow-sm">
              <Clock className="text-[#c87a53] mb-6" size={32} />
              <h3 className="font-serif text-xl font-medium mb-3">Opening Hours</h3>
              <p className="text-stone-600 font-light">Daily service breakfast through dinner.</p>
              <div className="mt-6 text-sm space-y-1 text-stone-700">
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
            <p className="text-[#a8a29e] font-light text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              One of the finest authentic Udupi restaurants in South India. Craftsmanship, warmth, and an unforgettable dining experience.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 text-[#c87a53]">Location</h4>
            <p className="text-[#a8a29e] font-light leading-loose text-lg">
              123 Heritage Street<br/>
              Culinary District<br/>
              Udupi 576101
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] font-semibold mb-8 text-[#c87a53]">Reservations</h4>
            <p className="text-[#a8a29e] font-light leading-loose text-lg mb-8">
              +91 7671856676<br/>
              reservations@srinarayanagrand.com
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-3 border border-[#555] hover:border-white hover:text-white transition-colors rounded-full text-xs uppercase tracking-wider"
            >
              Book a Table
            </button>
          </div>
        </div>
        <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row justify-between items-center text-xs tracking-widest text-[#555] font-light uppercase">
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
        <span className="text-xs uppercase tracking-widest font-semibold px-2">Reserve</span>
      </button>

      {/* Reservation Modal (Native App feel) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#fdfcfb] text-[#2d140a] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-[#e7e5e4] flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#e7e5e4] flex items-center justify-between bg-[#f6ebe2]">
              <div>
                <h3 className="font-serif text-2xl font-medium">Table Reservation</h3>
                <p className="text-xs text-stone-500 uppercase tracking-wider mt-0.5">Sri Narayana Grand</p>
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
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-start gap-2">
                  <Info size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className={`w-full bg-[#f6ebe2] border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all ${formErrors.name ? 'border-red-400' : 'border-transparent'}`}
                  disabled={isSubmitting}
                />
                {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">Mobile Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit mobile number"
                  className={`w-full bg-[#f6ebe2] border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all ${formErrors.phone ? 'border-red-400' : 'border-transparent'}`}
                  disabled={isSubmitting}
                />
                {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Guests */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">Guests</label>
                  <select 
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-[#f6ebe2] border border-transparent rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all"
                    disabled={isSubmitting}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>

                {/* Time */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">Time</label>
                  <input 
                    type="time" 
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full bg-[#f6ebe2] border border-transparent rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">Reservation Date</label>
                <input 
                  type="date" 
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full bg-[#f6ebe2] border rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all ${formErrors.date ? 'border-red-400' : 'border-transparent'}`}
                  disabled={isSubmitting}
                />
                {formErrors.date && <p className="text-red-600 text-xs mt-1">{formErrors.date}</p>}
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">Special Requests (Optional)</label>
                <textarea 
                  name="requests"
                  value={formData.requests}
                  onChange={handleInputChange}
                  placeholder="E.g., high chair, corner table, vegetarian allergy notes..."
                  rows="3"
                  className="w-full bg-[#f6ebe2] border border-transparent rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:bg-white focus:border-[#c87a53] transition-all resize-none"
                  disabled={isSubmitting}
                />
              </div>

              {/* CTA */}
              <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-end gap-3">
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
