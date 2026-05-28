
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Phone, Check, ClipboardList, PenTool, Wrench, ShieldCheck, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Reveal } from './Reveal';
import { Link } from 'react-router-dom';
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants';

export const BrandsSection = () => {
  const { clientBrands } = useData();
  return (
      <section className="py-8 bg-white border-b border-gray-100 overflow-hidden">
         <div className="container mx-auto px-6 mb-8 text-center">
            <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest">Nuestros Clientes de Confianza</h3>
         </div>
         <div className="flex relative overflow-hidden group">
            <div className="flex animate-marquee whitespace-nowrap items-center">
               {clientBrands.concat(clientBrands).map((brand, idx) => (
                  <div key={idx} className="mx-12 flex items-center justify-center min-w-[150px]">
                     {brand.logo ? (
                         <img src={brand.logo} alt={brand.name} className="h-20 md:h-24 w-auto object-contain opacity-60 hover:opacity-100 transition duration-300 filter grayscale hover:grayscale-0" />
                     ) : (
                        <span className="text-2xl font-bold text-gray-300 hover:text-primary transition-colors cursor-default">
                            {brand.name}
                        </span>
                     )}
                  </div>
               ))}
            </div>
            <div className="flex absolute top-0 animate-marquee2 whitespace-nowrap items-center">
               {clientBrands.concat(clientBrands).map((brand, idx) => (
                  <div key={idx} className="mx-12 flex items-center justify-center min-w-[150px]">
                      {brand.logo ? (
                         <img src={brand.logo} alt={brand.name} className="h-20 md:h-24 w-auto object-contain opacity-60 hover:opacity-100 transition duration-300 filter grayscale hover:grayscale-0" />
                     ) : (
                        <span className="text-2xl font-bold text-gray-300 hover:text-primary transition-colors cursor-default">
                            {brand.name}
                        </span>
                     )}
                  </div>
               ))}
            </div>
         </div>
      </section>
  );
};

export const CtaBanner = () => (
  <section className="relative py-32 bg-fixed bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1513262627961-c67b2049e32a?q=80&w=2070&auto=format&fit=crop)' }}>
    <div className="absolute inset-0 bg-gray-900/80"></div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-white">
          <Reveal direction="left">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-sm">
              Expertos HVAC
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Somos Didusa SRL, especializados en servicios técnicos para proyectos de gran escala.
            </h2>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-secondary hover:bg-blue-600 text-white px-8 py-3.5 rounded font-semibold transition shadow-lg shadow-blue-500/30">
              Solicitar Cotización
            </a>
          </Reveal>
        </div>
        <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-end">
           {/* Image placeholder for team or project */}
           <Reveal direction="right" className="relative">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop" className="rounded-lg shadow-2xl max-w-sm border-4 border-white/10" alt="Team Work" />
           </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export const ProcessSection = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 text-center">
       <Reveal>
         <span className="bg-gray-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
            Metodología
          </span>
       </Reveal>
      <Reveal delay={100}>
        <h2 className="text-4xl font-bold text-dark mb-16">Cómo Trabajamos</h2>
      </Reveal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { step: 1, title: 'Evaluación', color: 'bg-blue-600', icon: ClipboardList },
          { step: 2, title: 'Diseño', color: 'bg-blue-700', icon: PenTool },
          { step: 3, title: 'Instalación', color: 'bg-blue-800', icon: Wrench },
          { step: 4, title: 'Mantenimiento', color: 'bg-blue-900', icon: ShieldCheck },
        ].map((item, idx) => (
          <Reveal key={item.step} delay={idx * 200} className={`${item.color} text-white p-8 rounded shadow-lg transform hover:-translate-y-2 transition duration-300 group`}>
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-3 rounded-full group-hover:scale-110 transition-transform">
                <item.icon size={32} />
              </div>
            </div>
            <div className="text-xs font-semibold opacity-75 mb-2">Fase {item.step}</div>
            <h3 className="text-xl font-bold">{item.title}</h3>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export const ProjectsSection = () => {
  const { projects } = useData();

  return (
      <section id="projects" className="py-24 bg-dark text-white">
        <div className="container mx-auto px-6">
           <div className="text-center mb-16">
              <Reveal>
                 <span className="bg-white/10 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block backdrop-blur-sm">
                  Portafolio
                </span>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="text-4xl font-bold mb-4">Proyectos Destacados</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Una muestra de nuestra experiencia entregando soluciones de calidad en toda la República Dominicana.
                </p>
              </Reveal>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                 <Reveal key={project.id} delay={idx * 150}>
                    <Link to={`/projects/${project.id}`} className="block group relative overflow-hidden rounded-lg cursor-pointer h-72 bg-gray-800">
                       <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <span className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                             {project.category}
                          </span>
                          <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">
                             {project.title}
                          </h3>
                       </div>
                    </Link>
                 </Reveal>
              ))}
           </div>
           
           <Reveal delay={300} className="text-center mt-12">
              <Link to="/projects" className="inline-block border border-white/20 hover:bg-white hover:text-dark text-white px-8 py-3 rounded font-semibold transition">
                 Ver Todos los Proyectos
              </Link>
           </Reveal>
        </div>
      </section>
  );
};

export const StatsSection = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
           <Reveal direction="left">
             <span className="bg-gray-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Nuestra Trayectoria
             </span>
            <h2 className="text-4xl font-bold text-dark mb-6">Compromiso con la Calidad y Seguridad</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              En Didusa SRL, cada proyecto es una oportunidad para demostrar nuestra excelencia. Trabajamos con los más altos estándares para garantizar la durabilidad y eficiencia de nuestras instalaciones en hoteles, industrias y residencias.
            </p>
            <div className="bg-primary text-white p-6 rounded inline-block text-center min-w-[200px]">
              <div className="text-4xl font-bold mb-1">10+</div>
              <div className="text-xs opacity-80 uppercase tracking-wide">Años de Experiencia</div>
            </div>
           </Reveal>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
           <Reveal direction="up" delay={200}><img src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=500" className="rounded-lg mb-8" alt="Project 1" /></Reveal>
           <Reveal direction="up" delay={400} className="relative pt-12">
              <div className="bg-white p-6 shadow-xl rounded-lg absolute -top-4 -left-12 z-10 flex flex-col items-center justify-center text-center w-40">
                 <div className="text-3xl font-bold text-dark">100<span className="text-xs align-top">%</span></div>
                 <div className="text-[10px] text-gray-500 uppercase">Compromiso</div>
              </div>
              <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500" className="rounded-lg" alt="Project 2" />
           </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export const TestimonialsSection = () => {
  const { testimonials } = useData();
  return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <Reveal>
               <span className="bg-white text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block shadow-sm">
                  Clientes
               </span>
             </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl font-bold text-dark">Lo que dicen de nosotros</h2>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <Reveal key={t.id} delay={idx * 200}>
                <div className="bg-white p-8 rounded shadow-sm hover:shadow-md transition text-center border-t-4 border-transparent hover:border-secondary h-full">
                  <div className="text-secondary text-4xl leading-none mb-4 font-serif">“</div>
                  <div className="w-16 h-16 mx-auto rounded-full overflow-hidden mb-4">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-dark">{t.name}</h4>
                  <div className="text-xs text-gray-400 uppercase mb-4">{t.role}</div>
                  <p className="text-gray-500 text-sm italic">"{t.content}"</p>
                  <div className="flex justify-center space-x-1 mt-4 text-yellow-400 text-xs">
                     {[...Array(t.rating)].map((_, i) => <span key={i}>★</span>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

export const FAQSection = () => {
  const { faqItems } = useData();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
            <Reveal>
              <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
               Preguntas Frecuentes
             </span>
            </Reveal>
          <Reveal delay={100}>
            <h2 className="text-4xl font-bold text-dark">¿Tienes dudas?</h2>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
               <Reveal key={index} delay={index * 100} direction="up">
                 <div className="border border-gray-100 rounded-lg p-2 bg-gray-50/50 hover:bg-white transition-colors duration-300">
                    <button 
                    className="w-full flex justify-between items-center py-4 px-4 text-left focus:outline-none"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    >
                    <span className={`font-semibold text-lg ${openIndex === index ? 'text-primary' : 'text-dark'}`}>{item.question}</span>
                    {openIndex === index ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 px-4 ${openIndex === index ? 'max-h-96 pb-4' : 'max-h-0'}`}>
                        <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                    </div>
                 </div>
               </Reveal>
            ))}
        </div>

        <Reveal delay={200} className="text-center mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-500 mb-4">¿Aún necesitas ayuda?</p>
            <a 
                href={WHATSAPP_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-3 bg-white border border-gray-200 shadow-sm text-dark font-bold py-3 px-8 rounded-full hover:bg-gray-50 transition group"
            >
                <div className="bg-green-100 p-2 rounded-full group-hover:bg-green-200 transition">
                    <Phone size={18} className="text-green-600" />
                </div>
                <span>{WHATSAPP_NUMBER}</span>
            </a>
        </Reveal>
      </div>
    </section>
  );
};

export const NewsSection = () => {
  const { blogPosts } = useData();
  return (
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
              <Reveal>
                <span className="bg-gray-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Blog y Noticias
                </span>
              </Reveal>
            <Reveal delay={100}>
              <h2 className="text-4xl font-bold text-dark">Novedades del Sector</h2>
            </Reveal>
          </div>
    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <Reveal key={post.id} delay={idx * 200}>
                <div className="group cursor-pointer flex flex-col h-full">
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700 bg-gray-200"
                    />
                    <div className="absolute top-4 right-4 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                      {post.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-secondary transition line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/blog/${post.id}`} className="inline-block text-center text-sm font-semibold bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition">
                      Leer artículo
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
  );
};

export const MapSection = () => (
  <section className="h-96 w-full relative">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d60497.639117290615!2d-68.3971127!3d18.6144614!3m2!1i1024!2i768!4f13.1!2m1!1sdidusa!5e0!3m2!1ses-419!2sdo!4v1765568162199!5m2!1ses-419!2sdo"
      width="100%" 
      height="100%" 
      style={{ border: 0 }} 
      allowFullScreen 
      loading="lazy" 
      referrerPolicy="no-referrer-when-downgrade"
      className="filter grayscale hover:grayscale-0 transition duration-700"
    ></iframe>
    <div className="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur px-4 py-2 rounded shadow text-dark font-bold text-sm hidden md:block">
        DISEÑO E INSTALACIONES DE DUCTO DIDUSA S.R.L.
    </div>
    <div className="absolute bottom-6 left-6 z-10">
       <a 
         href="https://share.google/ywGkH0uL7C7lKnZRn" 
         target="_blank" 
         rel="noopener noreferrer"
         className="bg-white text-primary px-6 py-3 rounded shadow-lg font-bold hover:bg-gray-50 transition flex items-center gap-2 border border-gray-100"
       >
         <MapPin size={20} className="text-secondary" />
         Ver Ubicación Exacta
       </a>
    </div>
  </section>
);

export const BottomBanner = () => (
   <section className="relative">
      <div className="h-64 md:h-80 overflow-hidden">
         <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Call us" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/80 to-primary flex items-center justify-end">
         <div className="container mx-auto px-6 flex justify-end">
             <div className="bg-primary p-8 md:p-12 text-center text-white rounded-l-lg shadow-2xl max-w-lg">
                <div className="text-xs uppercase font-bold opacity-80 mb-2">24 Horas y Emergencias</div>
                <div className="flex flex-col items-center justify-center space-y-2 text-xl md:text-2xl font-bold">
                   <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-200">
                     <Phone size={24}/>
                     <span>{WHATSAPP_NUMBER}</span>
                   </a>
                   <div>
                     <span>+1 (809) 662-8574</span>
                   </div>
                </div>
             </div>
         </div>
      </div>
      <div className="bg-primary py-8">
         <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-white mb-4 md:mb-0">
               <div className="bg-white/20 p-1 rounded-full"><Check size={16} /></div>
               <span className="font-semibold">Calidad, Seguridad e Innovación en cada proyecto</span>
            </div>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-secondary hover:bg-white hover:text-secondary text-white px-6 py-2 rounded text-sm font-semibold transition">
               Contáctanos por WhatsApp
            </a>
         </div>
      </div>
   </section>
);

export const JamaicaSection = () => {
  return (
    <section className="py-24 bg-gray-50 border-t border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 w-full">
            <Reveal direction="left">
              <span className="bg-secondary/10 text-secondary text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-6 inline-block">
                Nueva Expansión Internacional
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-dark mb-6 leading-tight">
                ¡Didusa SRL ahora está en Jamaica!
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Nos enorgullece anunciar el inicio de nuestras operaciones en territorio jamaicano. Llevamos más de una década de experiencia técnica y excelencia como líderes de confianza en diseño e instalación de ductos, climatización (HVAC), aislamiento térmico, acabados de sheetrock y fontanería profesional.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Nuestra nueva sede en Bahía de Montego está diseñada para brindar apoyo directo y continuo a los grandes complejos hoteleros, desarrolladores residenciales, proyectos comerciales e industriales del país.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <div>
                  <h4 className="font-bold text-dark mb-2 flex items-center gap-2 text-base">
                    <MapPin className="text-secondary" size={18} />
                    Dirección
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Half Moon Shopping Village<br />
                    Unidad n.° 9 y 10, Rose Hall<br />
                    Bahía de Montego, St. James
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-2 flex items-center gap-2 text-base">
                    <Phone className="text-secondary" size={18} />
                    Contacto Directo
                  </h4>
                  <p className="text-sm text-gray-400">Teléfono Oficina:</p>
                  <a href="tel:+18768263246" className="text-lg font-bold text-dark hover:text-secondary transition block mb-1">
                    +1 (876) 826-3246
                  </a>
                  <span className="text-xs bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded border border-green-100 inline-block">
                    Soporte e Ingeniería
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:w-1/2 w-full relative">
            <Reveal direction="right">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop" 
                  alt="Resort en Jamaica" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent"></div>
                
                {/* Text Badge absolute bottom */}
                <div className="absolute bottom-8 left-8 right-8 text-white z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary mb-2 block">Creciendo Juntos</span>
                  <p className="text-2xl font-bold font-sans drop-shadow-md">
                    Comprometidos con el desarrollo de proyectos hoteleros y comerciales en el Caribe.
                  </p>
                </div>
              </div>

              {/* Float badge */}
              <div className="absolute -top-6 -right-6 md:right-10 bg-primary text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-xs border border-white/10 select-none">
                <div className="text-3xl font-bold bg-white/15 p-3 rounded-xl border border-white/10">🇯🇲</div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Didusa Jamaica</h4>
                  <p className="text-xs opacity-85 leading-tight">Servicios electromecánicos integrales y construcción.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
