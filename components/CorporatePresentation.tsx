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
  Activity,
  FileText,
  UserCheck
} from 'lucide-react';

export const CorporatePresentation = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [viewMode, setViewMode] = useState<'slide' | 'all'>('slide'); // 'slide' for presentation mode, 'all' for print/scroll list

  const WHATSAPP_LINK = "https://wa.me/18292088107";
  const EMAIL_CONTACT = "fferreras@didusa.onmicrosoft.com";
  const MAIN_PHONE = "+1 (809) 662-8574";

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
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans select-none antialiased print:bg-white print:text-black">
      {/* Dynamic Style block for precise print control and desktop scroll locks */}
      <style>{`
        @media print {
          html, body {
            background-color: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 11pt !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
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
            padding: 1.2in !important;
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
          max-height: calc(100vh - 140px);
          width: 100%;
          max-width: 1050px;
        }
      `}</style>

      {/* FLOATING ACTION HEADER (HIDDEN WHEN PRINTING) */}
      <header className="no-print bg-white border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-sm text-slate-800">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5 text-sm font-semibold">
            <ArrowLeft size={16} />
            <span>Volver a la Web</span>
          </Link>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <Layers className="text-blue-600" size={20} />
            <h1 className="font-extrabold tracking-tight text-slate-900 text-base">
              DIDUSA SRL <span className="font-light text-slate-500">· Dossier de Presentación</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => { setViewMode('slide'); setActiveSlide(0); }}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                viewMode === 'slide' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vista Diapositivas
            </button>
            <button
              onClick={() => setViewMode('all')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                viewMode === 'all' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vista Imprimible (Todo)
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition shadow"
          >
            <Printer size={16} />
            Imprimir Dossier (11x8.5)
          </button>
        </div>
      </header>

      {/* PRESENTATION CONTAINER */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 lg:p-6 overflow-y-auto print:p-0 print:overflow-visible">
        
        {/* INTERACTIVE NAVIGATION IN SLIDESHOW MODE AND SLIDE TITLE */}
        {viewMode === 'slide' && (
          <div className="no-print w-full max-w-[1050px] flex items-center justify-between mb-3 text-slate-600">
            <div className="text-xs font-mono tracking-wider font-bold bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm text-blue-600">
              PÁGINA {activeSlide + 1} DE {slidesCount} · 11" x 8.5"
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition shadow-sm"
                title="Diapositiva Anterior"
              >
                <ArrowLeft size={16} />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition shadow-sm"
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
            <div className="print-slide landscape-slide-frame bg-white border border-slate-200 shadow-2xl rounded-2xl p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300">
              {/* Engineering Blue grid overlay for subtle corporate style */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none stroke-blue-700">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid-pattern-light" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid-pattern-light)" />
                </svg>
              </div>

              {/* Cover Background Graphic */}
              <div className="absolute top-0 right-0 w-1/2 h-full hidden md:block">
                <div 
                  className="w-full h-full object-cover rounded-r-2xl"
                  style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 15%, transparent 100%), url('https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1000&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              {/* Slider Header */}
              <div className="flex justify-between items-start z-10">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 bg-blue-600 rounded-full animate-pulse block" />
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-600 font-mono">Dossier de Presentación</span>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black tracking-tight text-blue-900 font-sans">DIDUSA SRL</div>
                  <div className="text-[9px] text-slate-500 font-mono tracking-wider font-semibold uppercase">Ingeniería & Climatización</div>
                </div>
              </div>

              {/* Cover Main Content */}
              <div className="my-auto z-10 space-y-4 max-w-2xl">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded">Mundo Electromecánico</span>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-slate-900 pt-1">
                    INFORME <br />
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      CORPORATIVO EMPRESARIAL
                    </span>
                  </h2>
                </div>
                <div className="h-1.5 w-32 bg-blue-600 rounded" />
                <p className="text-base text-slate-600 leading-relaxed max-w-xl font-medium">
                  Diseño, fabricación e instalación integral de ductos galvanizados, sistemas de climatización industrial avanzados (HVAC), fontanería especializada y obras electromecánicas comerciales.
                </p>
              </div>

              {/* Slider Footer */}
              <div className="border-t border-slate-100 pt-6 flex justify-between items-end z-10">
                <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Ubicación Central</span>
                    <strong className="text-slate-700 font-semibold flex items-center gap-1 mt-0.5">
                      <MapPin size={13} className="text-blue-600" /> Punta Cana, Rep. Dom.
                    </strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Enlace Administrativo</span>
                    <strong className="text-slate-700 font-semibold flex items-center gap-1 mt-0.5">
                      <Mail size={13} className="text-blue-600" /> {EMAIL_CONTACT}
                    </strong>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Residencial Sol Bavaro · Pág. 1
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 2: PERFIL & MISION, VISION, VALORES */}
          {(viewMode === 'all' || activeSlide === 1) && (
            <div className="print-slide landscape-slide-frame bg-white border border-slate-200 shadow-2xl rounded-2xl p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-800">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-slate-950 text-base">DIDUSA SRL</h3>
                    <p className="text-[10px] text-blue-600 uppercase tracking-widest font-bold">Perfil & Organización</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono">
                  Dossier Institucional · Pág. 2
                </div>
              </div>

              {/* Grid Content with Unsplash Image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto py-2 items-center">
                
                {/* Text Block left (7 Cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Quiénes Somos</span>
                    <h4 className="text-xl font-bold text-slate-900 leading-tight">Soluciones Electromecánicas y Climatización de Vanguardia</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Somos una empresa dominicana especializada en soluciones electromecánicas integrales. Nos dedicamos con pasión al diseño, fabricación, montaje y mantenimiento de sistemas residenciales, comerciales e industriales a nivel nacional.
                    </p>
                  </div>

                  {/* Mission / Vision Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <Target size={15} />
                        <h5 className="font-bold text-xs text-slate-950">Misión</h5>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        Brindar servicios electromecánicos excepcionales con altos estándares de calidad, asegurando eficiencia térmica, durabilidad e innovación continua.
                      </p>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2 text-blue-600 mb-1">
                        <Eye size={15} />
                        <h5 className="font-bold text-xs text-slate-950">Visión</h5>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        Ser líderes absolutos en climatización avanzada y ductos, reconocidos por la excelencia de ingeniería y valor ético en cada obra.
                      </p>
                    </div>
                  </div>

                  {/* Valores */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Valores Corporativos</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Responsabilidad', 'Honestidad', 'Profesionalismo', 'Calidad', 'Innovación', 'Trabajo en Equipo'].map((val, i) => (
                        <span key={i} className="px-2 py-0.5 text-[10px] bg-blue-50 border border-blue-100 text-blue-700 font-semibold rounded">
                          ✓ {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side - curated Image */}
                <div className="md:col-span-5 h-full min-h-[180px] md:min-h-[260px] relative rounded-xl overflow-hidden shadow-md border border-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80"
                    alt="Ingeniería Civil y Planificación"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1">
                      <UserCheck size={12} className="text-blue-600" /> Presencia e Impacto
                    </p>
                    <p className="text-[9px] text-slate-500 font-medium">Ubicados en Punta Cana para servicio expedito a toda la región Este y el país.</p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-400 font-mono">
                <div>Residencial Sol Bavaro, Punta Cana · Rep. Dominicana</div>
                <div>Compromiso y Confiabilidad</div>
              </div>
            </div>
          )}

          {/* SLIDE 3: PORTAFOLIO PARTE 1 (DUCTOS, HVAC GENERAL, TRANE) */}
          {(viewMode === 'all' || activeSlide === 2) && (
            <div className="print-slide landscape-slide-frame bg-white border border-slate-200 shadow-2xl rounded-2xl p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-800">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Wind size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-slate-950 text-base">Soluciones Mecánicas</h3>
                    <p className="text-[10px] text-blue-600 uppercase tracking-widest font-bold font-mono">PORTAFOLIO DE SERVICIOS · PARTE I</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono">
                  Dossier Institucional · Pág. 3
                </div>
              </div>

              {/* Service block with an elegant 3-column service grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-auto py-2">
                
                {/* Sector 1: Ductos */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-full hover:border-blue-300 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">ÁREA 01</span>
                      <Wind size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">Fabricación de Ductos</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Sistemas de conducción de aire galvanizados.</p>
                    </div>

                    {/* Miniature Curated image to make it eye-catching as requested */}
                    <div className="h-16 w-full rounded overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80" 
                        className="w-full h-full object-cover"
                        alt="Ductos de Climatización"
                      />
                    </div>

                    <ul className="space-y-1 text-[10px] text-slate-600 font-medium">
                      {['Ductos circulares y rectangulares', 'Sistemas de ventilación y extracción', 'Instalación de aire acondicionado', 'Balanceo técnico de distribución', 'Aislamiento térmico de conductos'].map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sector 2: HVAC Climatización */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-full hover:border-blue-300 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">ÁREA 02</span>
                      <Activity size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">HVAC & Climatización</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Control de temperatura y sanidad de aire.</p>
                    </div>

                    {/* Miniature image */}
                    <div className="h-16 w-full rounded overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=400&q=80" 
                        className="w-full h-full object-cover"
                        alt="Instalaciones HVAC"
                      />
                    </div>

                    <ul className="space-y-1 text-[10px] text-slate-600 font-medium">
                      {['Chillers enfriadores por agua y aire', 'Sistemas VRF volumen variable', 'Maniobras y ventilación mecánica', 'Sistemas de calefacción y calderas', 'Controles automáticos inteligentes'].map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sector 3: Trane */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-full hover:border-blue-300 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">ÁREA 03</span>
                      <ShieldCheck size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">Equipos TRANE</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Distribución y soporte autorizado.</p>
                    </div>

                    {/* Miniature image of premium hotel climate setup */}
                    <div className="h-16 w-full rounded overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&q=80" 
                        className="w-full h-full object-cover"
                        alt="Climatización Hotelera"
                      />
                    </div>

                    <ul className="space-y-1 text-[10px] text-slate-600 font-medium">
                      {['Distribución oficial de la marca', 'Instalación certificada por ingenieros', 'Diagnóstico de eficiencia energética', 'Mantenimiento preventivo autorizado', 'Piezas y repuestos oficiales TRANE'].map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-400 font-mono">
                <div>Av. Barceló, Res. Sol Bavaro, Punta Cana · RD</div>
                <div>Ingeniería Autorizada con Estándar Internacional</div>
              </div>
            </div>
          )}

          {/* SLIDE 4: PORTAFOLIO PARTE 2 (FONTANERIA, PLANOS ELECTROMECANICOS, MANTENIMIENTO) */}
          {(viewMode === 'all' || activeSlide === 3) && (
            <div className="print-slide landscape-slide-frame bg-white border border-slate-200 shadow-2xl rounded-2xl p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-800">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Compass size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-slate-950 text-base">Ingeniería & Flujo</h3>
                    <p className="text-[10px] text-blue-600 uppercase tracking-widest font-bold font-mono">PORTAFOLIO DE SERVICIOS · PARTE II</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono">
                  Dossier Institucional · Pág. 4
                </div>
              </div>

              {/* Services Grid (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-auto py-2">
                
                {/* Sector 4: Fontanería */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-full hover:border-blue-300 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">ÁREA 04</span>
                      <Droplet size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">Fontanería General</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Redes sanitarias e impulsiones hidráulicas.</p>
                    </div>

                    {/* Miniature image */}
                    <div className="h-16 w-full rounded overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80" 
                        className="w-full h-full object-cover"
                        alt="Tuberías y Fontanería"
                      />
                    </div>

                    <ul className="space-y-1 text-[10px] text-slate-600 font-medium">
                      {['Sistemas de agua fría y caliente', 'Distribución de aguas heladas', 'Redes de desagües cloacales', 'Instalación de bombas principales', 'Sistemas hidroneumáticos presurizados'].map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sector 5: Planos */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-full hover:border-blue-300 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">ÁREA 05</span>
                      <FileText size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">Diseño de Planos</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-sans">Planos electromecánicos certificados.</p>
                    </div>

                    {/* Miniature image (BIM CAD design plans) */}
                    <div className="h-16 w-full rounded overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80" 
                        className="w-full h-full object-cover"
                        alt="Dibujo Técnico Planos"
                      />
                    </div>

                    <ul className="space-y-1 text-[10px] text-slate-600 font-medium">
                      {['Diseños y diagramación de ductos', 'Ingeniería hidráulica y de fluidos', 'Planos de cableado y fuerza', 'Supervisión técnica de obras', 'Asesoramiento de proyectos constructores'].map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sector 6: Mantenimiento */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm flex flex-col justify-between h-full hover:border-blue-300 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold bg-slate-200/50 px-2 py-0.5 rounded">ÁREA 06</span>
                      <Wrench size={16} className="text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 uppercase">Mantenimiento General</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">Preservando el rendimiento operativo.</p>
                    </div>

                    {/* Miniature image */}
                    <div className="h-16 w-full rounded overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80" 
                        className="w-full h-full object-cover"
                        alt="Inspección Mantenimiento"
                      />
                    </div>

                    <ul className="space-y-1 text-[10px] text-slate-600 font-medium">
                      {['Contratos preventivos periódicos', 'Mantenimiento correctivo de emergencia', 'Inspecciones termográficas técnicas', 'Limpieza profunda de serpentines', 'Optimización de consumo energético'].map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-blue-600 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-400 font-mono">
                <div>Proyectos con Calidad Certificada · DIDUSA SRL</div>
                <div>Garantía PostVenta</div>
              </div>
            </div>
          )}

          {/* SLIDE 5: CLIENTES, SECTORES & CONCLUSION */}
          {(viewMode === 'all' || activeSlide === 4) && (
            <div className="print-slide landscape-slide-frame bg-white border border-slate-200 shadow-2xl rounded-2xl p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden transition-all duration-300 text-slate-800">
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold tracking-tight text-slate-950 text-base">Sectores y Contacto</h3>
                    <p className="text-[10px] text-blue-600 uppercase tracking-widest font-bold font-mono">Resumen Administrativo</p>
                  </div>
                </div>
                <div className="text-right text-xs text-slate-400 font-mono">
                  Dossier Institucional · Pág. 5
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-2 items-center">
                
                {/* Clientes y Sectores */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Alcance de Operación</span>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">Sectores que Confían en Nosotros</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Constructoras', 'Complejos Hoteleros', 'Hospitales & Clínicas', 'Fábricas e Industrias', 
                      'Gastro & Restaurantes', 'Centros Comerciales', 'Oficinas Corporativas', 'Obras Residenciales'
                    ].map((sector, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-700 font-semibold shadow-xs">
                        <span className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                        <span className="truncate">{sector}</span>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-xs text-slate-500 italic max-w-sm">
                    "Todas nuestras instalaciones cumplen estrictamente con los lineamientos ASHRAE e internacionales de seguridad e impacto ambiental."
                  </p>
                </div>

                {/* Conclusion & Contact Information */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-800 font-mono mb-1">Garantía DIDUSA</h4>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      Ofrecemos soluciones verdaderamente integrales con ingeniería de primer nivel para toda la República Dominicana. Nuestro enfoque se centra en el ahorro energético, confort y flujo óptimo.
                    </p>
                  </div>

                  {/* Direct details formatted for printable sheet */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Sede Central</div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1">
                        <MapPin size={12} className="text-blue-600 flex-shrink-0" /> Punta Cana, Rep. Dom.
                      </div>
                      <div className="text-[9px] text-slate-500 font-medium">Residencial Sol Bavaro, Av. Barceló</div>
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Ingeniero a Cargo</div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-0.5 truncate">
                        <Mail size={12} className="text-blue-600 flex-shrink-0" /> fferreras
                      </div>
                      <div className="text-[9px] text-slate-500 italic">fferreras@didusa.onmicrosoft.com</div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Contactos Oficiales</div>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1">
                        <Phone size={11} className="text-blue-600" /> {MAIN_PHONE}
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-slate-400 font-bold uppercase tracking-wider text-[8px]">Canal de WhatsApp</div>
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="font-extrabold text-emerald-600 hover:underline flex items-center gap-1">
                        <span>💬 +1 (829) 208-8107</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-400 font-mono">
                <div>didusasrl.com · Excelencia en Climatización & Ductería 2026</div>
                <div>Punta Cana, RD</div>
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM NAVIGATION IN SLIDESHOW MODE ENCOURAGING ACTION */}
        {viewMode === 'slide' && (
          <div className="no-print mt-5 flex items-center gap-2">
            {Array.from({ length: slidesCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx 
                    ? 'w-8 bg-blue-600' 
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Ir a la Página ${idx + 1}`}
              />
            ))}
          </div>
        )}

      </main>
    </div>
  );
};
