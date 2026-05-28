import React from 'react';
import { FEATURES, ICON_MAP } from '../constants';
import { useData } from '../context/DataContext';
import { Reveal } from './Reveal';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const DynamicIcon = ({ icon, className = "w-6 h-6 text-secondary" }: { icon: string, className?: string }) => {
    // Lookup the component from the map using the string key
    // If lookup fails or icon is invalid (e.g. from bad localstorage), fallback to Settings
    const iconKey = (typeof icon === 'string' && ICON_MAP[icon]) ? icon : 'Settings';
    const IconComponent = ICON_MAP[iconKey];
    
    return <IconComponent className={className} />;
};

const SectionHeader = ({ subtitle, title, description, align = 'center' }: { subtitle: string, title: string, description?: string, align?: 'center' | 'left' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <Reveal>
      <span className="bg-gray-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
        {subtitle}
      </span>
    </Reveal>
    <Reveal delay={200}>
      <h2 className="text-4xl font-bold text-dark mb-4">{title}</h2>
    </Reveal>
    {description && (
      <Reveal delay={300}>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </Reveal>
    )}
  </div>
);

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <Reveal direction="left">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop" 
                  alt="Didusa Construction Site" 
                  className="w-full object-cover"
                />
                 {/* Floating Badge */}
                <div className="absolute bottom-6 right-6 bg-white p-4 rounded shadow-lg max-w-[200px]">
                   <div className="flex items-center space-x-2 mb-2">
                      <div className="text-blue-500 font-bold text-xl">10+</div>
                      <span className="font-bold text-dark">Años</span>
                   </div>
                   <p className="text-xs text-gray-500">De experiencia liderando el mercado dominicano.</p>
                </div>
              </div>
            </Reveal>
            {/* Decorative dots */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-dots-pattern opacity-20 hidden md:block"></div>
          </div>
          
          <div className="lg:w-1/2">
            <Reveal direction="right">
              <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                Sobre Nosotros
              </span>
              <h2 className="text-4xl font-bold text-dark mb-6 leading-tight">
                Diseños e Instalaciones de Ductos Didusa SRL
              </h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                Somos una empresa dominicana líder en el sector de la climatización (HVAC), aislamiento térmico, acabados técnicos y fontanería. Nos especializamos en ofrecer soluciones integrales para proyectos residenciales, industriales y comerciales, destacando por el uso de estándares internacionales de calidad y la implementación de tecnologías innovadoras.
              </p>
              <Link to="/about" className="inline-block bg-primary hover:bg-blue-900 text-white px-8 py-3 rounded font-medium transition">
                Más sobre Didusa
              </Link>

              {/* Certifications Mockup */}
              <div className="mt-12 flex space-x-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                 <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-[10px] text-center font-bold text-primary">HVAC<br/>Cert</div>
                 <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-[10px] text-center font-bold text-primary">ISO<br/>9001</div>
                 <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-[10px] text-center font-bold text-primary">Seguridad<br/>Ind.</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export const ServicesSection = () => {
  const { services } = useData();

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <SectionHeader 
          subtitle="Lo que hacemos"
          title="Nuestros Servicios"
          description="Soluciones técnicas especializadas para climatización, construcción ligera y fontanería."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <Reveal key={service.id} delay={idx * 150}>
              <div className="bg-white group hover:shadow-xl transition duration-300 rounded overflow-hidden h-full flex flex-col">
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white p-3 rounded shadow-md">
                     <DynamicIcon icon={service.icon} />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-dark mb-4 group-hover:text-secondary transition">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{service.description}</p>
                  
                  {/* Subcategories List */}
                  {service.subcategories && (
                    <ul className="space-y-3 mb-6 flex-grow">
                      {service.subcategories.map((item, subIdx) => (
                        <li key={subIdx} className="flex items-start text-sm text-gray-500">
                          <Check className="w-4 h-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto">
                    <Link to="/services" className="inline-block text-center px-6 py-2 bg-gray-100 text-dark text-sm font-semibold rounded hover:bg-secondary hover:text-white transition w-full">
                        Detalles
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
         <SectionHeader 
          subtitle="Nuestros Valores"
          title="Por Qué Elegir Didusa"
          description="Comprometidos con la excelencia, la seguridad y la innovación en cada proyecto."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {FEATURES.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                     <DynamicIcon icon={feature.icon} className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};