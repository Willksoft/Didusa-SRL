
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Check, MapPin, Briefcase, Phone } from 'lucide-react';
import { useData } from '../context/DataContext';
import { slugify } from '../utils';
import { Reveal } from './Reveal';
import { AboutSection, WhyChooseUsSection } from './Features';
import { CtaBanner, BottomBanner, MapSection, StatsSection } from './Sections';
import { FEATURES, WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants';
import { SEO } from './SEO';

// Helper for dynamic headers
export const PageHeader = ({ title, subtitle, bgImage }: { title: string, subtitle: string, bgImage: string }) => (
  <div className="relative h-[400px] flex items-center justify-center text-center bg-dark">
    <div className="absolute inset-0 bg-black/60 z-10" />
    <img src={bgImage} alt={title} className="absolute inset-0 w-full h-full object-cover" />
    <div className="relative z-20 container mx-auto px-6 pt-20">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">{subtitle}</p>
      </Reveal>
    </div>
  </div>
);

export const AboutPageLogic = () => {
  const { pageHeaders } = useData();
  const header = pageHeaders['about'];

  return (
    <>
      <SEO 
        title={header.title} 
        description={header.subtitle} 
        image={header.bgImage}
        url="https://www.didusasrl.com/about"
      />
      <PageHeader title={header.title} subtitle={header.subtitle} bgImage={header.bgImage} />
      <AboutSection />
      <StatsSection />
      <WhyChooseUsSection />
      <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-12">Nuestros Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {FEATURES.slice(0,3).map((f: any, i: number) => (
                      <div key={i} className="bg-white p-8 rounded shadow-sm hover:shadow-lg transition">
                          <div className="flex justify-center mb-4 text-primary">
                               <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <CheckCircle2 size={20} />
                               </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-dark">{f.title}</h3>
                          <p className="text-gray-500">{f.description}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
      <BottomBanner />
    </>
  );
};

export const ServicesPageLogic = () => {
  const { services, pageHeaders } = useData();
  const header = pageHeaders['services'];
  
  return (
    <>
      <SEO 
        title={header.title} 
        description={header.subtitle} 
        image={header.bgImage}
        url="https://www.didusasrl.com/services"
      />
      <PageHeader title={header.title} subtitle={header.subtitle} bgImage={header.bgImage} />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-16">
             {services.map((s, idx) => (
               <Reveal key={s.id} delay={idx * 100}>
                 <div className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                    <div className="lg:w-1/2 w-full h-80 lg:h-96 rounded-lg overflow-hidden shadow-xl relative group">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition"></div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="flex items-center space-x-3 mb-4 text-primary">
                          <h2 className="text-3xl font-bold text-dark">{s.title}</h2>
                        </div>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">{s.description}</p>
                        <div className="flex flex-wrap gap-2 mb-8">
                           {s.subcategories?.map((sub, i) => (
                              <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                                 <Check size={12} className="mr-1 text-primary"/> {sub}
                              </span>
                           ))}
                        </div>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block bg-dark text-white px-8 py-3 rounded font-semibold hover:bg-primary transition shadow-lg">Solicitar Cotización</a>
                    </div>
                 </div>
               </Reveal>
             ))}
          </div>
        </div>
      </section>
      <div className="bg-gray-50"><CtaBanner /></div>
      <BottomBanner />
    </>
  );
};

export const ProjectsPageLogic = () => {
  const { projects, pageHeaders } = useData();
  const header = pageHeaders['projects'];

  return (
    <>
      <SEO 
        title={header.title} 
        description={header.subtitle} 
        image={header.bgImage}
        url="https://www.didusasrl.com/projects"
      />
      <PageHeader title={header.title} subtitle={header.subtitle} bgImage={header.bgImage} />
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((p) => (
                      <Link to={`/projects/${slugify(p.title)}`} key={p.id} className="group block shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
                          <div className="h-64 overflow-hidden relative">
                              <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded">{p.category}</div>
                          </div>
                          <div className="p-6">
                              <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition">{p.title}</h3>
                              <span className="text-secondary font-semibold text-sm flex items-center">Ver Detalles <ArrowLeft className="rotate-180 ml-2" size={14}/></span>
                          </div>
                      </Link>
                  ))}
              </div>
          </div>
      </section>
      <BottomBanner />
    </>
  );
};

export const ContactPageLogic = () => {
    const { pageHeaders } = useData();
    const header = pageHeaders['contact'];

    return (
    <>
        <SEO 
            title={header.title} 
            description={header.subtitle} 
            image={header.bgImage}
            url="https://www.didusasrl.com/contact"
        />
        <PageHeader title={header.title} subtitle={header.subtitle} bgImage={header.bgImage} />
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-bold mb-6 text-dark flex items-center gap-2">Nuestras Oficinas</h2>
                        <div className="space-y-6">
                            {/* República Dominicana */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-primary/10 text-primary rounded-full">República Dominicana</span>
                                </div>
                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex items-start">
                                        <MapPin className="text-primary mr-3 flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <p className="font-semibold text-dark">Sede Central</p>
                                            <p>Residencial Sol Bavaro, Av. Barceló, Punta Cana, República Dominicana</p>
                                            <p className="text-xs text-gray-400">Servicio a nivel nacional e internacional</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="text-primary mr-3 flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <p className="font-semibold text-dark">Teléfonos</p>
                                            <p className="hover:text-primary transition"><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">{WHATSAPP_NUMBER} (WhatsApp)</a></p>
                                            <p>+1 (809) 662-8574</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Jamaica */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 bg-secondary/10 text-secondary rounded-full">Jamaica Office</span>
                                </div>
                                <div className="space-y-4 text-sm text-gray-600">
                                    <div className="flex items-start">
                                        <MapPin className="text-secondary mr-3 flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <p className="font-semibold text-dark">Dirección</p>
                                            <p>Half Moon Shopping Village, Unidad n.° 9 y 10, Rose Hall</p>
                                            <p>Bahía de Montego, St. James</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="text-secondary mr-3 flex-shrink-0 mt-0.5" size={18} />
                                        <div>
                                            <p className="font-semibold text-dark">Teléfono</p>
                                            <p className="hover:text-secondary transition font-medium"><a href="tel:+18768263246">+1 (876) 826-3246</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Correo general */}
                            <div className="bg-blue-50/40 p-5 rounded-lg border border-blue-100/30 text-sm text-gray-600">
                                <div className="flex items-start">
                                    <Briefcase className="text-primary mr-3 flex-shrink-0 mt-0.5" size={18} />
                                    <div>
                                        <p className="font-semibold text-dark">Correos Corporativos</p>
                                        <a href="mailto:fferreras@didusa.onmicrosoft.com" className="text-gray-600 break-all hover:text-primary transition">fferreras@didusa.onmicrosoft.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-2/3">
                        <form className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-6 text-dark">Envíenos un mensaje</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                   <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                                   <input 
                                     id="contact-name" 
                                     name="name" 
                                     autoComplete="name"
                                     type="text" 
                                     className="p-3 rounded border border-gray-200 w-full focus:border-primary outline-none transition" 
                                   />
                                </div>
                                <div>
                                   <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">Teléfono</label>
                                   <input 
                                     id="contact-phone" 
                                     name="phone" 
                                     autoComplete="tel"
                                     type="text" 
                                     className="p-3 rounded border border-gray-200 w-full focus:border-primary outline-none transition" 
                                   />
                                </div>
                            </div>
                            <div className="mb-6">
                               <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">Correo Electrónico</label>
                               <input 
                                 id="contact-email" 
                                 name="email" 
                                 autoComplete="email"
                                 type="email" 
                                 className="p-3 rounded border border-gray-200 w-full focus:border-primary outline-none transition" 
                               />
                            </div>
                            <div className="mb-6">
                               <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">Mensaje</label>
                               <textarea 
                                 id="contact-message" 
                                 name="message" 
                                 rows={4} 
                                 className="p-3 rounded border border-gray-200 w-full focus:border-primary outline-none transition"
                               ></textarea>
                            </div>
                            <button className="bg-secondary text-white px-8 py-4 rounded font-bold w-full hover:bg-blue-600 transition shadow-lg">Enviar Mensaje</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <MapSection />
    </>
    );
};
