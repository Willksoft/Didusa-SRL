
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, User, CheckCircle2, Play, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { PageHeader, AboutPageLogic, ServicesPageLogic, ProjectsPageLogic, ContactPageLogic } from './PublicPages';
import { BottomBanner } from './Sections';
import { WHATSAPP_LINK } from '../constants';

// --- EXPORTED PAGES FROM MODULE ---
export const AboutPage = AboutPageLogic;
export const ServicesPage = ServicesPageLogic;
export const ProjectsPage = ProjectsPageLogic;
export const ContactPage = ContactPageLogic;

// --- DETAIL PAGES KEPT HERE FOR SIMPLICITY ---

export const ProjectDetailPage = () => {
    const { id } = useParams();
    const { projects } = useData();
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const project = projects.find(p => p.id === Number(id));

    // Reset lightbox when project changes
    useEffect(() => {
        setLightboxIndex(null);
    }, [id]);

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (lightboxIndex === null) return;
            if (e.key === 'Escape') setLightboxIndex(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex]);

    if (!project) return <div className="py-40 text-center">Proyecto no encontrado</div>;

    const gallery = project.gallery || [];
    
    // Logic for related projects (show 3 projects that are NOT the current one)
    const relatedProjects = projects.filter(p => p.id !== project.id).slice(0, 3);

    const getEmbedUrl = (url: string) => {
        // Simple helper to convert standard youtube links to embed
        if (url.includes('youtube.com/watch?v=')) {
            return url.replace('watch?v=', 'embed/');
        } else if (url.includes('youtu.be/')) {
            return url.replace('youtu.be/', 'youtube.com/embed/');
        }
        return url; // Assume already embed or direct video file
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + gallery.length) % gallery.length : null));
    };

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % gallery.length : null));
    };

    return (
        <>
            <div className="h-[60vh] relative">
                <div className="absolute inset-0 bg-black/40 z-10"/>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover"/>
                <div className="absolute bottom-0 left-0 w-full z-20 p-12 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <div className="container mx-auto px-6">
                        <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-4"><ArrowLeft size={16} className="mr-2"/> Volver</Link>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
                        <span className="bg-primary px-3 py-1 rounded text-sm font-bold">{project.category}</span>
                    </div>
                </div>
            </div>
            
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-16">
                    <div className="lg:w-2/3">
                        <h2 className="text-2xl font-bold mb-6 text-dark">Sobre el Proyecto</h2>
                        
                        {project.description ? (
                             <p className="text-gray-600 text-lg leading-relaxed mb-6 whitespace-pre-line">
                                {project.description}
                             </p>
                        ) : (
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                Este proyecto destaca por la implementación de técnicas avanzadas en {project.category}. 
                                Nuestro equipo se encargó de garantizar los más altos estándares de calidad y seguridad.
                                <br/><br/>
                                <span className="text-sm italic text-gray-400">* Descripción pendiente de actualización en admin.</span>
                            </p>
                        )}
                        
                        <h3 className="font-bold text-xl mb-4 text-dark mt-8">Alcance del Trabajo</h3>
                        {project.scope && project.scope.length > 0 ? (
                            <ul className="space-y-2 mb-12">
                               {project.scope.map((item, i) => (
                                    <li key={i} className="flex items-center text-gray-600">
                                        <CheckCircle2 className="text-green-500 mr-2 flex-shrink-0" size={18}/> 
                                        <span>{item}</span>
                                    </li>
                               ))}
                            </ul>
                        ) : (
                            <ul className="space-y-2 mb-12 opacity-50">
                               <li className="flex items-center text-gray-600"><CheckCircle2 className="text-green-500 mr-2" size={18}/> Planificación y Diseño Técnico</li>
                               <li className="flex items-center text-gray-600"><CheckCircle2 className="text-green-500 mr-2" size={18}/> Ejecución y Supervisión</li>
                               <li className="flex items-center text-gray-600"><CheckCircle2 className="text-green-500 mr-2" size={18}/> Pruebas de Calidad</li>
                            </ul>
                        )}

                        {/* GALLERY SECTION */}
                        {gallery.length > 0 && (
                            <div className="mt-12">
                                <h3 className="text-2xl font-bold mb-6 text-dark flex items-center">
                                    <ImageIcon className="mr-2" size={24}/> Galería Multimedia
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {gallery.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="rounded-lg overflow-hidden shadow-md bg-black cursor-pointer transform hover:scale-[1.02] transition duration-300"
                                            onClick={() => setLightboxIndex(idx)}
                                        >
                                            {item.type === 'video' ? (
                                                <div className="aspect-video w-full relative group">
                                                    {/* Video Cover / Placeholder to allows click */}
                                                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                                                        <Play size={48} className="text-white opacity-80 group-hover:scale-110 transition"/>
                                                    </div>
                                                    <iframe 
                                                        src={getEmbedUrl(item.url)} 
                                                        className="w-full h-full pointer-events-none" // Disable interaction in preview to allow lightbox click
                                                        title={`Video ${idx}`} 
                                                        frameBorder="0"
                                                    ></iframe>
                                                </div>
                                            ) : (
                                                <div className="aspect-video w-full group relative overflow-hidden">
                                                    <img 
                                                        src={item.url} 
                                                        alt={item.caption || `Galería ${idx}`} 
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                                                         <ImageIcon className="text-white opacity-0 group-hover:opacity-100 transition transform scale-50 group-hover:scale-100" />
                                                    </div>
                                                    {item.caption && (
                                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition">
                                                            {item.caption}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 sticky top-24">
                            <h3 className="font-bold text-xl mb-6 pb-4 border-b">Ficha Técnica</h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Cliente</span>
                                    <span className="text-dark font-medium">{project.client || "Cliente Confidencial"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Ubicación</span>
                                    <span className="text-dark font-medium">{project.location || "República Dominicana"}</span>
                                </div>
                                <div>
                                    <span className="block text-xs font-bold text-gray-400 uppercase">Servicios</span>
                                    <span className="text-dark font-medium">{project.category}</span>
                                </div>
                            </div>
                            <a 
                                href={WHATSAPP_LINK}
                                target="_blank"
                                rel="noopener noreferrer" 
                                className="block w-full bg-primary text-white text-center py-3 rounded mt-8 hover:bg-blue-700 transition font-bold"
                            >
                               Cotizar Similar
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* RELATED PROJECTS SECTION */}
            {relatedProjects.length > 0 && (
                <section className="py-20 bg-gray-50 border-t border-gray-200">
                    <div className="container mx-auto px-6">
                        <h3 className="text-2xl font-bold mb-8 text-dark">Quizás te pueda interesar</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedProjects.map(p => (
                                <Link to={`/projects/${p.id}`} key={p.id} className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
                                     <div className="h-48 overflow-hidden relative">
                                        <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700"/>
                                        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">{p.category}</div>
                                     </div>
                                     <div className="p-6">
                                        <h4 className="font-bold text-dark group-hover:text-primary transition line-clamp-1 mb-2">{p.title}</h4>
                                        <div className="flex items-center text-xs text-secondary font-semibold">
                                            Ver proyecto <ArrowLeft className="rotate-180 ml-1" size={12}/>
                                        </div>
                                     </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* LIGHTBOX MODAL */}
            {lightboxIndex !== null && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setLightboxIndex(null)}>
                    {/* Close Button */}
                    <button 
                        onClick={() => setLightboxIndex(null)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition p-2 bg-white/10 rounded-full"
                    >
                        <X size={32} />
                    </button>

                    {/* Navigation Buttons */}
                    <button 
                        onClick={handlePrev}
                        className="absolute left-4 text-white/70 hover:text-white transition p-4 bg-white/10 hover:bg-white/20 rounded-full hidden md:block"
                    >
                        <ChevronLeft size={40} />
                    </button>
                    <button 
                        onClick={handleNext}
                        className="absolute right-4 text-white/70 hover:text-white transition p-4 bg-white/10 hover:bg-white/20 rounded-full hidden md:block"
                    >
                        <ChevronRight size={40} />
                    </button>

                    {/* Content */}
                    <div 
                        className="max-w-[90vw] max-h-[85vh] relative flex flex-col items-center justify-center" 
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
                    >
                        {gallery[lightboxIndex].type === 'video' ? (
                            <div className="aspect-video w-[80vw] md:w-[60vw]">
                                <iframe 
                                    src={getEmbedUrl(gallery[lightboxIndex].url)} 
                                    className="w-full h-full rounded shadow-2xl" 
                                    title="Lightbox Video" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <img 
                                src={gallery[lightboxIndex].url} 
                                alt={gallery[lightboxIndex].caption || 'Imagen'} 
                                className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl"
                            />
                        )}
                        
                        {/* Caption & Counter */}
                        <div className="mt-4 text-center text-white">
                            <p className="text-lg font-medium">{gallery[lightboxIndex].caption}</p>
                            <p className="text-sm text-gray-400 mt-1">
                                {lightboxIndex + 1} / {gallery.length}
                            </p>
                        </div>

                         {/* Mobile Nav Helper (Below Image) */}
                         <div className="flex md:hidden justify-center gap-8 mt-4">
                            <button onClick={handlePrev} className="p-3 bg-white/10 rounded-full text-white"><ChevronLeft /></button>
                            <button onClick={handleNext} className="p-3 bg-white/10 rounded-full text-white"><ChevronRight /></button>
                         </div>
                    </div>
                </div>
            )}

            <BottomBanner />
        </>
    )
}

export const BlogPage = () => {
  const { blogPosts, pageHeaders } = useData();
  const header = pageHeaders['blog'];

  return (
    <>
      <PageHeader title={header.title} subtitle={header.subtitle} bgImage={header.bgImage} />
      <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {blogPosts.map(post => (
                      <Link to={`/blog/${post.id}`} key={post.id} className="group cursor-pointer">
                          <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                               <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                               <div className="absolute top-4 right-4 bg-white text-primary text-xs font-bold px-2 py-1 rounded">{post.category}</div>
                          </div>
                          <div className="flex items-center text-gray-400 text-xs mb-2 space-x-4">
                              <span className="flex items-center"><Calendar size={12} className="mr-1"/> {post.date}</span>
                              <span className="flex items-center"><User size={12} className="mr-1"/> Didusa</span>
                          </div>
                          <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition">{post.title}</h3>
                          <p className="text-gray-500 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                          <span className="text-primary font-semibold text-sm underline">Leer artículo completo</span>
                      </Link>
                  ))}
              </div>
          </div>
      </section>
      <BottomBanner />
    </>
  );
};

export const BlogPostPage = () => {
    const { id } = useParams();
    const { blogPosts } = useData();
    const post = blogPosts.find(p => p.id === Number(id));

    if (!post) return <div className="py-40 text-center">Artículo no encontrado</div>;

    return (
        <>
            <div className="relative h-[50vh] min-h-[400px]">
                <div className="absolute inset-0 bg-dark/60 z-10" />
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 w-full z-20 p-12 text-white text-center">
                    <div className="container mx-auto">
                        <span className="bg-secondary text-white px-3 py-1 rounded text-xs font-bold uppercase mb-4 inline-block">{post.category}</span>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-4xl mx-auto">{post.title}</h1>
                        <div className="flex justify-center space-x-6 text-gray-300">
                            <span className="flex items-center"><Calendar size={16} className="mr-2"/> {post.date}</span>
                            <span className="flex items-center"><User size={16} className="mr-2"/> Didusa Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            <article className="py-24 bg-white">
                <div className="container mx-auto px-6 max-w-3xl">
                     <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-primary mb-8"><ArrowLeft size={16} className="mr-2"/> Volver al Blog</Link>
                     
                     <div className="prose prose-lg prose-blue mx-auto">
                        <p className="lead text-xl text-gray-600 font-medium mb-8 border-l-4 border-secondary pl-4">{post.excerpt}</p>
                        <div className="text-gray-600 leading-relaxed space-y-6">
                            <p>
                              En la industria de la construcción moderna, la eficiencia y la calidad son pilares fundamentales. 
                              {post.title} representa uno de los desafíos más interesantes que enfrentamos hoy en día.
                            </p>
                            <p>
                              Este artículo explora en detalle las mejores prácticas y metodologías aplicadas por Didusa SRL para garantizar resultados óptimos.
                              La integración de nuevas tecnologías y el cumplimiento de normativas internacionales nos permiten ofrecer soluciones duraderas.
                            </p>
                            <h3>Puntos Clave</h3>
                            <ul className="list-disc pl-5 space-y-2">
                               <li>Selección rigurosa de materiales certificados.</li>
                               <li>Cumplimiento de normativas vigentes en República Dominicana.</li>
                               <li>Impacto positivo en la vida útil de la edificación y reducción de costos operativos.</li>
                            </ul>
                            <p>
                              Para más información sobre cómo podemos asistirle en su próximo proyecto, no dude en contactar a nuestro equipo de ingeniería.
                            </p>
                        </div>
                     </div>
                </div>
            </article>
            <BottomBanner />
        </>
    );
};
