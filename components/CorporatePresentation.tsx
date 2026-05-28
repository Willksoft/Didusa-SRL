import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Printer, 
  Layers, 
  Compass, 
  Wrench, 
  Award, 
  Target, 
  Eye, 
  Droplet,
  CheckCircle2, 
  Phone, 
  MapPin, 
  Mail, 
  Globe, 
  Flame, 
  Building2, 
  Wind, 
  ShieldCheck,
  FileCheck,
  Activity,
  FileText
} from 'lucide-react';

export const CorporatePresentation = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'all'>('slide'); // 'slide' for presentation mode, 'all' for print/scroll list

  const WHATSAPP_LINK = "https://wa.me/18292088107";
  const EMAIL_CONTACT = "fferreras@didusa.onmicrosoft.com";

  // Prevent parent scroll from disrupting single slide view
  useEffect(() => {
    if (viewMode === 'slide') {
      document.body.classList.add('overflow-hidden-desktop');
    } else {
      document.body.classList.remove('overflow-hidden-desktop');
    }
    return () => {
      document.body.classList.remove('overflow-hidden-desktop');
    };
  }, [viewMode]);

  const slidesCount = 5;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  // Keyboard controls for slides
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'slide') return;
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none antialiased print:bg-white print:text-black">
      {/* Dynamic Style block for precise print control and desktop scroll locks */}
      <style>{`
        @media print {
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 12pt !important;
          }
          .no-print {
            display: none !important;
          }
          .print-slide {
            width: 11in !important;
            height: 8.5in !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            break-after: page !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background-color: #ffffff !important;
            color: #000000 !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: space-between !important;
            position: relative !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          /* High-impact black text in print */
          .print-text-dark {
            color: #111827 !important;
          }
          .print-text-muted {
            color: #4b5563 !important;
          }
          .print-bg-light {
            background-color: #f3f4f6 !important;
          }
          .print-border {
            border-color: #d1d5db !important;
          }
          .print-primary-bg {
            background-color: #0056b3 !important;
          }
          .print-primary-text {
            color: #0056b3 !important;
          }
        }
        @media (min-width: 1024px) {
          .overflow-hidden-desktop {
            overflow: hidden;
            height: 100vh;
          }
        }
        /* Lock aspect ratio in desktop slideshow */
        .landscape-slide-frame {
          aspect-ratio: 11 / 8.5;
          max-height: calc(100vh - 120px);
          width: 100%;
          max-width: 1050px;
        }
      `}</style>

      {/* FLOATING ACTION HEADER (HIDDEN WHEN PRINTING) */}
      <header className="no-print bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-secondary hover:text-white transition flex items-center gap-1.5 text-sm font-medium">
            <ArrowLeft size={16} />
            <span>Volver a Inicio</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <Layers className="text-secondary" size={20} />
            <h1 className="font-extrabold tracking-tight text-white text-base">DIDUSA SRL <span className="font-light text-slate-400">· Dossier de Presentación</span></h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-lg flex items-center gap-1">
            <button
              onClick={() => { setViewMode('slide'); setActiveSlide(0); }}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                viewMode === 'slide' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Diapositiva
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                viewMode === 'all' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ver Todo (Imprimible)
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-whatsapp hover:bg-whatsappDark text-dark px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow-lg"
          >
            <Printer size={16} />
            Imprimir Dossier (PDF)
          </button>
        </div>
      </header>

      {/* PRESENTATION CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 overflow-y-auto print:p-0 print:overflow-visible">
        
        {/* INTERACTIVE NAVIGATION IN SLIDESHOW MODE AND SLIDE TITLE */}
        {viewMode === 'slide' && (
          <div className="no-print w-full max-w-[1050px] flex items-center justify-between mb-4">
            <div className="text-xs text-slate-400 font-mono tracking-wider font-semibold">
              DIAPOSITIVA {activeSlide + 1} DE {slidesCount}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition"
                title="Diapositiva Anterior"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 transition"
                title="Siguiente Diapositiva"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* DIAPOSITIVAS DISPLAY */}
        <div className={`w-full flex flex-col items-center gap-8 print:gap-0 print:w-auto print:block ${
          viewMode === 'slide' ? 'justify-center flex-1' : ''
        }`}>
          
          {/* SLIDE 1: PORTADA */}
          {(viewMode === 'all' || activeSlide === 0) && (
            <div className="print-slide landscape-slide-frame bg-slate-950 border border-slate-800 shadow-2xl rounded-2xl p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden text-slate-100 transition-all duration-300">
              {/* Engineering Blueprint lines effect */}
              <div className="absolute inset-0 opacity-10 pointer-events-none stroke-blue-400">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
              </div>

              {/* Decorative side badge */}
              <div className="absolute top-0 right-0 h-40 w-40 bg-gradient-to-br from-primary/30 to-secondary/10 blur-3xl pointer-events-none" />

              {/* Slider Header */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-secondary rounded-full animate-pulse print:bg-blue-600 block" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-secondary print:text-blue-600 font-mono">Dossier Institucional</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black tracking-tight text-white print:text-blue-900 font-mono">DIDUSA SRL</div>
                  <div className="text-[9px] text-slate-400 print:text-gray-500 tracking-wider">DISEÑOS E INSTALACIONES DE DUCTOS</div>
                </div>
              </div>

              {/* Cover Main Content */}
              <div className="my-auto z-10 space-y-4">
                <h2 className="text-5xl lg:text-6xl font-black tracking-tight leading-none text-white print:text-black">
                  INFORME <br />
                  <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent print:from-blue-600 print:to-blue-900 print:text-blue-600">
                    CORPORATIVO EMPRESARIAL
                  </span>
                </h2>
                <div className="h-1.5 w-32 bg-primary print:bg-blue-600" />
                <p className="text-lg text-slate-300 print:text-gray-700 max-w-2xl font-light">
                  Líderes apasionados en el diseño, fabricación e instalación integral de ductos, sistemas de climatización industrial avanzados (HVAC), fontanería y construcción ligera.
                </p>
              </div>

              {/* Slider Footer */}
              <div className="border-t border-slate-800/80 pt-6 flex justify-between items-end z-10 print:border-gray-300">
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 print:text-gray-400 block uppercase tracking-wider">Ubicación</span>
                    <strong className="text-slate-300 print:text-gray-900 font-medium flex items-center gap-1">
                      <MapPin size={12} className="text-secondary print:text-blue-600" /> Santo Domingo, RD
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 print:text-gray-400 block uppercase tracking-wider">Contacto</span>
                    <strong className="text-slate-300 print:text-gray-900 font-medium flex items-center gap-1">
                      <Mail size={12} className="text-secondary print:text-blue-600" /> {EMAIL_CONTACT}
                    </strong>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-500 print:text-gray-400">
                  didusasrl.com · Pág. 1
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: PERFIL & MISION, VISION, VALORES */}
          {(viewMode === 'all' || activeSlide === 1) && (
            <div className="print-slide landscape-slide-frame bg-slate-950 border border-slate-800 shadow-2xl rounded-2xl p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-100">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 print:border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-secondary rounded-lg print:bg-blue-50 print:text-blue-600">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-white print:text-gray-900 text-lg">Didusa SRL</h3>
                    <p className="text-[10px] text-slate-400 print:text-gray-500 uppercase tracking-widest font-semibold">Perfil & Filosofía Corporativa</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 print:text-gray-500 font-mono">
                  Dossier Institucional · Pág. 2
                </div>
              </div>

              {/* Left/Right Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-auto py-2">
                {/* Perfil (Left) */}
                <div className="md:col-span-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-secondary print:text-blue-600 font-mono">Perfil de la Empresa</h4>
                  <div className="space-y-3">
                    <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed">
                      Somos una empresa dominicana especializada en soluciones electromecánicas integrales, dedicada al diseño, fabricación, instalación y mantenimiento de sistemas industriales, comerciales y residenciales.
                    </p>
                    <p className="text-sm text-slate-300 print:text-gray-800 leading-relaxed font-light">
                      Contamos con personal técnico altamente capacitado y amplia experiencia para afrontar los desafíos climáticos y de ingeniería en proyectos de gran envergadura.
                    </p>
                  </div>
                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-200">
                    <p className="text-xs text-slate-400 print:text-gray-600 leading-relaxed font-medium italic">
                      "Garantizamos calidad, eficiencia y un profundo respaldo técnico especializado en cada etapa para de esta forma asegurar la satisfacción de nuestra distinguida clientela."
                    </p>
                  </div>
                </div>

                {/* Misión, Visión, Valores (Right) */}
                <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mission */}
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-200">
                    <div className="flex items-center gap-2 text-secondary print:text-blue-600 mb-2">
                      <Target size={18} />
                      <h5 className="font-extrabold text-sm text-white print:text-gray-900">Misión</h5>
                    </div>
                    <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
                      Brindar soluciones electromecánicas integrales con altos estándares de calidad, garantizando eficiencia, innovación y satisfacción total a nuestros clientes.
                    </p>
                  </div>

                  {/* Vision */}
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-200">
                    <div className="flex items-center gap-2 text-secondary print:text-blue-600 mb-2">
                      <Eye size={18} />
                      <h5 className="font-extrabold text-sm text-white print:text-gray-900">Visión</h5>
                    </div>
                    <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
                      Ser una empresa líder en servicios electromecánicos, HVAC e hidráulicos, reconocida por la excelencia técnica, confiabilidad y compromiso en cada proyecto.
                    </p>
                  </div>

                  {/* Valores (Span both columns) */}
                  <div className="sm:col-span-2 bg-slate-900/40 p-4 rounded-xl border border-slate-800 print:bg-gray-50 print:border-gray-200">
                    <div className="flex items-center gap-2 text-secondary print:text-blue-600 mb-3">
                      <Award size={18} />
                      <h5 className="font-extrabold text-sm text-white print:text-gray-900">Nuestros Valores Pilares</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['Responsabilidad', 'Honestidad', 'Profesionalismo', 'Compromiso', 'Calidad', 'Innovación', 'Trabajo en equipo'].map((val, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700/80 text-secondary text-[11px] font-semibold print:bg-blue-50 print:border-blue-100 print:text-blue-700"
                        >
                          ✓ {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-xs text-slate-500 print:border-gray-150 print:text-gray-400 font-mono">
                <div>didusasrl.com · Climatización Profesional</div>
                <div>Líderes en RD</div>
              </div>
            </div>
          )}

          {/* SLIDE 3: PORTAFOLIO PARTE 1 (DUCTOS, HVAC GENERAL, TRANE) */}
          {(viewMode === 'all' || activeSlide === 2) && (
            <div className="print-slide landscape-slide-frame bg-slate-950 border border-slate-800 shadow-2xl rounded-2xl p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-100">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 print:border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-secondary rounded-lg print:bg-blue-50 print:text-blue-600">
                    <Wind size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-white print:text-gray-900 text-lg">Catálogo de Soluciones</h3>
                    <p className="text-[10px] text-slate-400 print:text-gray-500 uppercase tracking-widest font-semibold">ÁREAS DE SERVICIO (PARTE I)</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 print:text-gray-500 font-mono">
                  Dossier Institucional · Pág. 3
                </div>
              </div>

              {/* Services Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-2">
                
                {/* area 1: ductos */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60 flex flex-col justify-between h-full hover:border-slate-700 transition print:bg-gray-50 print:border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 print:bg-white print:border-gray-200">SECTOR 01</span>
                      <Wind size={18} className="text-secondary print:text-blue-500" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white print:text-blue-900 uppercase">Fabricación e Instalación de Ductos</h4>
                    <p className="text-[11px] text-slate-300 print:text-gray-600 leading-relaxed">
                      Sistemas óptimos de conducción de aire para complejos hoteleros, comerciales e industriales.
                    </p>
                    <ul className="space-y-2 pt-2 text-[11px] text-slate-300 print:text-gray-700 font-medium">
                      {['Fabricación de ductos galvanizados', 'Sistemas de ventilación y extracción', 'Instalación de aire acondicionado', 'Balanceo y distribución de aire', 'Mantenimiento y reparación'].map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="text-secondary mt-0.5 flex-shrink-0 print:text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* area 3: HVAC General */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60 flex flex-col justify-between h-full hover:border-slate-700 transition print:bg-gray-50 print:border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 print:bg-white print:border-gray-200">SECTOR 02</span>
                      <Activity size={18} className="text-secondary print:text-blue-500" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white print:text-blue-900 uppercase">HVAC en General (Climatización)</h4>
                    <p className="text-[11px] text-slate-300 print:text-gray-600 leading-relaxed">
                      Llevamos aire de calidad y temperatura controlada de forma eficiente y silenciosa.
                    </p>
                    <ul className="space-y-2 pt-2 text-[11px] text-slate-300 print:text-gray-700 font-medium">
                      {['Instalación avanzada de sistemas HVAC', 'Mantenimiento preventivo y correctivo', 'Chillers enfriadores y sistemas VRF', 'Ventilación mecánica forzada', 'Automatización integral y controles'].map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="text-secondary mt-0.5 flex-shrink-0 print:text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* area 4: Representantes TRANE */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60 flex flex-col justify-between h-full hover:border-slate-700 transition print:bg-gray-50 print:border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 print:bg-white print:border-gray-200">SECTOR 03</span>
                      <ShieldCheck size={18} className="text-secondary print:text-blue-500" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white print:text-blue-900 uppercase">Alianza TRANE Autorizada</h4>
                    <p className="text-[11px] text-slate-300 print:text-gray-600 leading-relaxed">
                      Soporte de ingeniería directa y equipos mecánicos de clase mundial garantizados.
                    </p>
                    <ul className="space-y-2 pt-2 text-[11px] text-slate-300 print:text-gray-700 font-medium">
                      {['Distribución y venta oficial de equipos TRANE', 'Instalación técnicamente certificada', 'Soporte y diseño de ingeniería directa', 'Servicio técnico y mantenimiento autorizado'].map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="text-secondary mt-0.5 flex-shrink-0 print:text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-xs text-slate-500 print:border-gray-150 print:text-gray-400 font-mono">
                <div>didusasrl.com · Ingeniería Electromecánica en República Dominicana</div>
                <div>Garantía y Confiabilidad</div>
              </div>
            </div>
          )}

          {/* SLIDE 4: PORTAFOLIO PARTE 2 (FONTANERIA, PLANOS ELECTROMECANICOS, MANTENIMIENTO) */}
          {(viewMode === 'all' || activeSlide === 3) && (
            <div className="print-slide landscape-slide-frame bg-slate-950 border border-slate-800 shadow-2xl rounded-2xl p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-100">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 print:border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-secondary rounded-lg print:bg-blue-50 print:text-blue-600">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-white print:text-gray-900 text-lg">Estructuras e Ingeniería</h3>
                    <p className="text-[10px] text-slate-400 print:text-gray-500 uppercase tracking-widest font-semibold">ÁREAS DE SERVICIO (PARTE II)</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 print:text-gray-500 font-mono">
                  Dossier Institucional · Pág. 4
                </div>
              </div>

              {/* Services Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto py-2">
                
                {/* area 2: fontaneria */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60 flex flex-col justify-between h-full hover:border-slate-700 transition print:bg-gray-50 print:border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 print:bg-white print:border-gray-200">SECTOR 04</span>
                      <Droplet size={18} className="text-secondary print:text-blue-500" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white print:text-blue-900 uppercase">Fontanería y Redes Hidráulicas</h4>
                    <p className="text-[11px] text-slate-300 print:text-gray-600 leading-relaxed">
                      Sistemas confiables de transporte de fluidos, aguas heladas y redes sanitarias técnicas.
                    </p>
                    <ul className="space-y-2 pt-2 text-[11px] text-slate-300 print:text-gray-700 font-medium">
                      {['Distribución de agua fría y caliente', 'Líneas e impulsiones de aguas heladas', 'Redes de desagües sanitarias e hidráulicas', 'Montaje de bombas y tanques presurizados', 'Reparaciones mayores y correctivo'].map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="text-secondary mt-0.5 flex-shrink-0 print:text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* area 5: planos y diseño */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60 flex flex-col justify-between h-full hover:border-slate-700 transition print:bg-gray-50 print:border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 print:bg-white print:border-gray-200">SECTOR 05</span>
                      <FileText size={18} className="text-secondary print:text-blue-500" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white print:text-blue-900 uppercase">Diseño de Planos y Supervisión</h4>
                    <p className="text-[11px] text-slate-300 print:text-gray-600 leading-relaxed">
                      Planificación rigurosa de planos electromecánicos e hidráulicos utilizando CAD/BIM de vanguardia.
                    </p>
                    <ul className="space-y-2 pt-2 text-[11px] text-slate-300 print:text-gray-700 font-medium">
                      {['Planos técnicos electromecánicos completos', 'Planos de climatización e instalación HVAC', 'Sistemas de distribución sanitarios complex', 'Cómputos e ingeniería aplicada de ductos', 'Supervisión técnica de obras presencial'].map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="text-secondary mt-0.5 flex-shrink-0 print:text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* area 6: Mantenimiento general */}
                <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800/60 flex flex-col justify-between h-full hover:border-slate-700 transition print:bg-gray-50 print:border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800 print:bg-white print:border-gray-200">SECTOR 06</span>
                      <Wrench size={18} className="text-secondary print:text-blue-500" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white print:text-blue-900 uppercase">Mantenimiento Preventivo</h4>
                    <p className="text-[11px] text-slate-300 print:text-gray-600 leading-relaxed">
                      Programas diseñados para salvaguardar la durabilidad de sus activos electromecánicos e instalaciones.
                    </p>
                    <ul className="space-y-2 pt-2 text-[11px] text-slate-300 print:text-gray-700 font-medium">
                      {['Contratos recurrentes preventivos', 'Soporte inmediato de mantenimiento correctivo', 'Auditorías e inspecciones técnicas integrales', 'Limpieza y descontaminación industrial', 'Control operativo empresarial regular'].map((item, index) => (
                        <li key={index} className="flex items-start gap-1.5">
                          <CheckCircle2 size={11} className="text-secondary mt-0.5 flex-shrink-0 print:text-blue-600" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-xs text-slate-500 print:border-gray-150 print:text-gray-400 font-mono">
                <div>didusasrl.com · Soporte de Ingeniería Integrada de Clase Mundial</div>
                <div>Garantía PostVenta</div>
              </div>
            </div>
          )}

          {/* SLIDE 5: CLIENTES, SECTORES & CONCLUSION */}
          {(viewMode === 'all' || activeSlide === 4) && (
            <div className="print-slide landscape-slide-frame bg-slate-950 border border-slate-800 shadow-2xl rounded-2xl p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-100">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-800/80 print:border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-900 text-secondary rounded-lg print:bg-blue-50 print:text-blue-600">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-white print:text-gray-900 text-lg">Clientes, Sectores y Conclusión</h3>
                    <p className="text-[10px] text-slate-400 print:text-gray-500 uppercase tracking-widest font-semibold">Alcance y Compromiso Técnico</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 print:text-gray-500 font-mono">
                  Dossier Institucional · Pág. 5
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-2">
                
                {/* Clientes y Sectores */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-secondary print:text-blue-600 font-mono">Sectores Clave que Atendemos</h4>
                  <p className="text-xs text-slate-300 print:text-gray-700 leading-relaxed md:max-w-md">
                    Nuestras soluciones escalables están adaptadas a las normativas de seguridad y los rigurosos estándares técnicos requeridos por diferentes renglones de la industria:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Constructoras', 'Hoteles', 'Hospitales', 'Industrias', 
                      'Restaurantes', 'Centros comerciales', 'Oficinas corporativas', 'Sectores residenciales'
                    ].map((sector, index) => (
                      <div key={index} className="flex items-center gap-2 p-1.5 rounded bg-slate-900/60 border border-slate-800/80 print:bg-gray-50 print:border-gray-200 print:text-gray-900 font-medium">
                        <span className="h-2 w-2 rounded-full bg-secondary print:bg-blue-600" />
                        <span>{sector}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conclusion & Contact Information */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-800/60 print:bg-gray-50 print:border-gray-200">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 print:text-gray-900 font-mono mb-2">Conclusiones de la Empresa</h4>
                    <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed italic">
                      "Ofrecemos soluciones verdaderamente completas en las áreas de climatización, HVAC, fontanería, ductería, diseño electromecánico y mantenimiento general, garantizando calidad superior, eficiencia energética insuperable y respaldo técnico en cada entrega."
                    </p>
                  </div>

                  {/* Direct details formatted for printable sheet */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-4 rounded-xl border border-slate-800 print:from-white print:to-white print:border-gray-300 grid grid-cols-2 gap-3 text-[11px]">
                    <div className="space-y-1">
                      <div className="text-slate-400 print:text-gray-500 font-semibold uppercase tracking-wider text-[9px]">Sede Central</div>
                      <div className="font-bold text-white print:text-gray-900 flex items-center gap-1">
                        <MapPin size={10} className="text-secondary print:text-blue-600" /> Santo Domingo, RD
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 print:text-gray-500 font-semibold uppercase tracking-wider text-[9px]">Ingeniero de Enlace</div>
                      <div className="font-bold text-white print:text-gray-900 flex items-center gap-1 flex-wrap break-all">
                        <Mail size={10} className="text-secondary print:text-blue-600 flex-shrink-0" /> fferreras@didusa.onmicrosoft.com
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 print:text-gray-500 font-semibold uppercase tracking-wider text-[9px]">Teléfonos Directos</div>
                      <div className="font-bold text-white print:text-gray-900 flex items-center gap-1">
                        <Phone size={10} className="text-secondary print:text-blue-600" /> +1 (829) 208-8107
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-slate-400 print:text-gray-500 font-semibold uppercase tracking-wider text-[9px]">Línea de Whatsapp</div>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-bold text-whatsapp hover:underline flex items-center gap-1">
                        <span>💬 +1 (829) 208-8107</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-900 pt-4 flex justify-between items-center text-xs text-slate-500 print:border-gray-150 print:text-gray-400 font-mono">
                <div>didusasrl.com · Excelencia en Ingeniería Mecánica 2026</div>
                <div>Santo Domingo, RD</div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAVIGATION IN SLIDESHOW MODE ENCOURAGING ACTION */}
        {viewMode === 'slide' && (
          <div className="no-print mt-6 flex items-center gap-3">
            {Array.from({ length: slidesCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx 
                    ? 'w-8 bg-secondary' 
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Ir a Diapositiva ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
