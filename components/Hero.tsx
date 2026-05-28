
import React, { useState, useEffect, useRef } from 'react';
import { ICON_MAP, WHATSAPP_LINK } from '../constants';
import { useData } from '../context/DataContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DynamicIcon = ({ icon }: { icon: string }) => {
    const iconKey = (typeof icon === 'string' && ICON_MAP[icon]) ? icon : 'Settings';
    const IconComponent = ICON_MAP[iconKey];
    return <IconComponent className="w-8 h-8 text-white" />;
};

const Hero = () => {
  const { heroSlides, heroFeatures } = useData();
  const [activeSlide, setActiveSlide] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- PARTICLE SYSTEM LOGIC ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Mouse interaction state
    let mouse = {
        x: -1000, // Start off screen
        y: -1000,
        radius: 150 // Interaction radius
    };

    // Configuration
    const particleCount = 180; // Cantidad de nieve/partículas
    
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
        this.size = Math.random() * 2.5 + 0.5; // Tamaño variado
        this.speedX = Math.random() * 1 - 0.5; // Viento suave lateral
        this.speedY = Math.random() * 1.5 + 0.5; // Gravedad (caída)
        this.opacity = Math.random() * 0.5 + 0.1;
        this.density = (Math.random() * 20) + 1; // Used for interaction weight
      }

      update() {
        // 1. Standard Movement (Gravity & Wind)
        this.x += this.speedX;
        this.y += this.speedY;

        // 2. Mouse Interaction (Repulsion/Gravity Field)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            // Calculate force vector
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            
            // The closer the mouse, the stronger the force
            const force = (maxDistance - distance) / maxDistance;
            
            // Push particle away (Repulsion)
            // Multiplier determines "wind strength" of the mouse
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;

            this.x -= directionX;
            this.y -= directionY;
        }

        // 3. Reset if out of bounds (Loop effect)
        if (this.y > canvas!.height) {
          this.y = 0 - this.size;
          this.x = Math.random() * canvas!.width;
          // Reset speed slightly random each loop for natural feel
          this.speedY = Math.random() * 1.5 + 0.5;
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
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.x;
        mouse.y = e.y;
    };

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    // Initialize
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
  // -----------------------------

  useEffect(() => {
    if(heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); 
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if(heroSlides.length === 0) return null;

  const currentSlide = heroSlides[activeSlide];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-dark">
      {/* Background Image with Transition */}
      {heroSlides.map((slide, index) => (
        <div 
          key={slide.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`}
        >
           {/* Dark Overlay with blue tint for "Cold" feeling */}
          <div className="absolute inset-0 bg-slate-900/60 z-10" />
          <img 
            src={slide.bg} 
            alt="Hero Background" 
            className={`w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear ${activeSlide === index ? 'scale-110' : 'scale-100'}`}
          />
        </div>
      ))}

      {/* CANVAS PARTICLES LAYER (SNOW/GRAVITY EFFECT) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 pointer-events-none opacity-60"
      />

      {/* Main Content Centered - Added pt-32 to fix navbar overlap */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center items-center text-center pt-32 pb-32">
         <div key={activeSlide} className="flex flex-col items-center max-w-5xl">
             
             {/* Pill Badge - Glassmorphism style */}
             <div className="animate-[fadeInDown_1s_ease-out] mb-8">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium px-6 py-2 rounded-full uppercase tracking-wider shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                  {currentSlide.badge}
                </span>
             </div>

             {/* Headline - Big & Bold */}
             <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight tracking-tight animate-[fadeInUp_1s_ease-out_0.2s] drop-shadow-lg">
               {currentSlide.title}
             </h1>

             {/* Subtitle */}
             <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light max-w-3xl animate-[fadeInUp_1s_ease-out_0.4s]">
               {currentSlide.subtitle}
             </p>

             {/* CTA Button - WhatsApp */}
             <div className="animate-[fadeInUp_1s_ease-out_0.6s]">
               <a 
                 href={WHATSAPP_LINK}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block bg-primary hover:bg-blue-600 text-white text-lg px-10 py-4 rounded font-semibold transition shadow-lg shadow-blue-500/30 transform hover:-translate-y-1"
               >
                 {currentSlide.buttonText || "Solicitar Servicio"}
               </a>
             </div>
         </div>
      </div>

      {/* Floating Features Bottom - Glass Cards */}
      <div className="absolute bottom-0 left-0 w-full z-30 hidden md:block border-t border-white/10">
        <div className="container mx-auto">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {heroFeatures.map((feature, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md p-10 flex items-center space-x-6 text-white hover:bg-slate-900/60 transition-colors duration-300 group cursor-pointer h-40">
                 {/* Circle Icon Container */}
                 <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 border-4 border-blue-400/30">
                    <DynamicIcon icon={feature.icon} />
                 </div>
                 <div className="flex flex-col justify-center">
                    <h4 className="font-bold text-xl mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-300 font-light leading-snug group-hover:text-white transition-colors">
                        {feature.description}
                    </p>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Counter (Bottom Right) */}
      <div className="absolute bottom-48 right-10 z-30 text-white font-mono text-xl tracking-widest hidden md:block">
        <span className="font-bold">0{activeSlide + 1}</span>
        <span className="opacity-50 mx-2">/</span> 
        <span className="opacity-50">0{heroSlides.length}</span>
      </div>
      
      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-8 z-30 hidden md:flex">
         <button 
           className="text-white/50 hover:text-white p-4 transition rounded-full hover:bg-white/10"
           onClick={() => setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
         >
            <ChevronLeft size={48} strokeWidth={1} />
         </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-8 z-30 hidden md:flex">
         <button 
           className="text-white/50 hover:text-white p-4 transition rounded-full hover:bg-white/10"
           onClick={() => setActiveSlide((prev) => (prev + 1) % heroSlides.length)}
         >
             <ChevronRight size={48} strokeWidth={1} />
         </button>
      </div>
    </div>
  );
};

export default Hero;
