import React, { useState, useEffect, useRef } from 'react';
import { ICON_MAP, WHATSAPP_LINK } from '../constants';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const DynamicIcon = ({ icon, className }: { icon: string; className?: string }) => {
    const iconKey = (typeof icon === 'string' && ICON_MAP[icon]) ? icon : 'Settings';
    const IconComponent = ICON_MAP[iconKey];
    return <IconComponent className={className || "w-7 h-7 text-blue-600"} />;
};

const Hero = () => {
  const { heroSlides, heroFeatures } = useData();
  const [activeSlide, setActiveSlide] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Helper to split slide title for that dual-colored typography shown in reference (WAOOO)
  const splitTitle = (title: string) => {
    if (!title) return { main: '', accent: '' };
    const words = title.split(' ');
    if (words.length <= 2) {
      return { main: words[0] || '', accent: words.slice(1).join(' ') };
    }
    const mid = Math.round(words.length * 0.55); // Spits title nicely
    return {
      main: words.slice(0, mid).join(' '),
      accent: words.slice(mid).join(' ')
    };
  };

  // --- PARTICLE SYSTEM LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    let mouse = {
        x: -1000,
        y: -1000,
        radius: 150
    };

    const particleCount = 120;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      density: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 1.2 + 0.3;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.density = (Math.random() * 20) + 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * this.density * 0.8;
            const directionY = forceDirectionY * force * this.density * 0.8;

            this.x -= directionX;
            this.y -= directionY;
        }

        if (this.y > canvas!.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas!.width;
          this.speedY = Math.random() * 1.2 + 0.3;
        }
        if (this.x > canvas!.width) {
          this.x = 0;
        } else if (this.x < 0) {
           this.x = canvas!.width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 580;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if(heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8500); 
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if(heroSlides.length === 0) return null;

  const currentSlide = heroSlides[activeSlide];
  const { main, accent } = splitTitle(currentSlide.title);

  return (
    <div className="relative h-[580px] w-full flex flex-col justify-between">
      
      {/* Background Images Layer with rounded bottom corners and overflow-hidden */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-b-[40px] md:rounded-b-[50px] lg:rounded-b-[60px] shadow-2xl bg-[#070b19]">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Elegant dark radial and linear gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-slate-900/40 to-[#070b19]/75 z-10" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#070b19]/80 z-10" />
            <img 
              src={slide.bg} 
              alt="Hero Background" 
              className={`w-full h-full object-cover transform transition-transform duration-[12000ms] ease-linear ${activeSlide === index ? 'scale-105' : 'scale-100'}`}
            />
          </div>
        ))}

        {/* Interactive dynamic particle canvas inside the clipped region */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 z-10 pointer-events-none opacity-50"
        />
      </div>

      {/* Main Content Content Wrapper */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center pt-28 pb-20">
        <div key={activeSlide} className="flex flex-col items-start text-left max-w-4xl">
            
            {/* Elegant Pill Badge - Glassmorphism style exactly as reference (WAOOO) */}
            {currentSlide.badge && (
               <div className="mb-4 animate-[fadeInDown_1.2s_ease-out]">
                  <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {currentSlide.badge}
                  </span>
               </div>
            )}

            {/* Headline - Dual color styling to mirror reference */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-white mb-4 leading-[1.15] tracking-tight animate-[fadeInUp_1s_ease-out_0.2s] drop-shadow-md">
              {main} <span className="text-blue-400 font-extrabold">{accent}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-gray-200/90 mb-10 font-normal max-w-2xl leading-relaxed animate-[fadeInUp_1s_ease-out_0.4s]">
              {currentSlide.subtitle}
            </p>

            {/* CTA Buttons in a single row - matching WAOOO structure */}
            <div className="flex flex-col sm:flex-row gap-3.5 items-center animate-[fadeInUp_1s_ease-out_0.6s]">
              <a 
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsappDark text-white font-bold px-7 py-3 rounded-full transition-all duration-300 shadow-lg shadow-green-500/20 active:scale-95 text-sm transform hover:-translate-y-0.5"
              >
                <Phone size={16} />
                {currentSlide.buttonText || "Reservar por WhatsApp"}
              </a>
              
              <Link 
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-white border border-white/30 hover:border-white hover:bg-white/10 font-bold px-7 py-3 rounded-full transition-all duration-300 text-sm transform hover:-translate-y-0.5"
              >
                Nuestros Servicios <span className="text-base leading-none font-light">→</span>
              </Link>
            </div>
            
        </div>
      </div>

      {/* Floating Features Bar - raise overlapping card structure exactly like reference */}
      <div className="relative z-30 w-full px-6 lg:px-12 max-w-7xl mx-auto -mb-16 md:-mb-20 hidden md:block">
        <div className="bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-gray-100 flex flex-col md:flex-row justify-between gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          {heroFeatures.map((feature, idx) => (
            <div key={idx} className="flex-1 flex items-start px-4 first:pl-0 last:pr-0 pt-4 md:pt-0">
               {/* Rounded icon wrapper */}
               <div className="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                  <DynamicIcon icon={feature.icon} className="w-7 h-7 text-blue-600" />
               </div>
               <div className="flex flex-col">
                  <h4 className="font-bold text-gray-900 text-lg mb-1 leading-tight">{feature.title}</h4>
                  <p className="text-sm text-gray-500 leading-normal font-normal">
                      {feature.description}
                  </p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows & Counter Side Indicators */}
      <div className="absolute right-8 bottom-28 z-30 text-white font-mono text-sm tracking-widest hidden lg:flex items-center gap-2">
        <span className="font-bold">0{activeSlide + 1}</span>
        <span className="opacity-40">/</span> 
        <span className="opacity-40">0{heroSlides.length}</span>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 z-30 hidden xl:block">
         <button 
           className="text-white/40 hover:text-white p-3.5 transition rounded-full hover:bg-white/5 border border-white/10 backdrop-blur-sm"
           onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
         >
            <ChevronLeft size={24} />
         </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-6 z-30 hidden xl:block">
         <button 
           className="text-white/40 hover:text-white p-3.5 transition rounded-full hover:bg-white/5 border border-white/10 backdrop-blur-sm"
           onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
         >
             <ChevronRight size={24} />
         </button>
      </div>
      
    </div>
  );
};

export default Hero;
