
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Twitter, 
  Youtube, 
  Instagram, 
  Menu, 
  X,
  MapPin,
  Send
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { WHATSAPP_LINK, WHATSAPP_NUMBER } from '../constants';

const TopBar = () => {
  return (
    <div className="bg-primary text-white text-xs py-3 hidden lg:block">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex space-x-6">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-blue-200 transition">
            <Phone size={14} className="text-whatsapp" />
            <span>{WHATSAPP_NUMBER}</span>
          </a>
          <a href="mailto:fferreras@didusa.onmicrosoft.com" className="flex items-center space-x-2 hover:text-blue-200 transition">
            <Mail size={14} className="text-blue-200" />
            <span>fferreras@didusa.onmicrosoft.com</span>
          </a>
          <div className="flex items-center space-x-2">
            <Clock size={14} className="text-blue-200" />
            <span>Servicio 24 Horas</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-200 transition"><Facebook size={14} /></a>
          <a href="#" className="hover:text-blue-200 transition"><Instagram size={14} /></a>
        </div>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/services' },
    { name: 'Nosotros', path: '/about' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen ? 'top-0 bg-dark/95 backdrop-blur-sm shadow-lg' : 'top-0 lg:top-[40px] bg-transparent'}`}>
      <TopBar /> 
      
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center text-white">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>
            <div className="text-blue-400">
               <svg width="40" height="30" viewBox="0 0 50 30" fill="currentColor">
                  <path d="M5,15 Q15,5 25,15 T45,15" fill="none" stroke="currentColor" strokeWidth="4" />
                  <path d="M5,22 Q15,12 25,22 T45,22" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
               </svg>
            </div>
            <span>DIDUSA SRL</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-medium hover:text-blue-400 transition ${location.pathname === link.path ? 'text-blue-400' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp hover:bg-whatsappDark text-white px-6 py-2.5 rounded text-sm font-semibold transition shadow-lg shadow-green-500/30 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <Phone size={16} />
              Contactar
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark absolute w-full px-6 py-8 border-t border-gray-800">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="text-white text-lg font-medium hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <a 
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp text-center text-white px-6 py-3 rounded font-semibold flex justify-center items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Phone size={18} />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-dark text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 text-2xl font-bold text-white mb-6">
              <div className="text-blue-400">
                 <svg width="40" height="30" viewBox="0 0 50 30" fill="currentColor">
                    <path d="M5,15 Q15,5 25,15 T45,15" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path d="M5,22 Q15,12 25,22 T45,22" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.6" />
                 </svg>
              </div>
              <span>DIDUSA SRL</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              Líderes en diseño e instalación de ductos, climatización, aislamiento y construcción ligera en República Dominicana.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-8 h-8 flex items-center justify-center rounded transition text-white"><Facebook size={14} /></a>
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-8 h-8 flex items-center justify-center rounded transition text-white"><Instagram size={14} /></a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h3 className="text-white font-bold mb-6">Compañía</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition">Inicio</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Servicios</Link></li>
              <li><Link to="/projects" className="hover:text-blue-400 transition">Proyectos</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition">Noticias</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contacto</Link></li>
              <li className="pt-1"><Link to="/presentation" className="text-secondary hover:text-white font-bold transition flex items-center gap-1.5">🖨️ Dossier Corporativo</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h3 className="text-white font-bold mb-6">Servicios</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/services" className="hover:text-blue-400 transition">Ductos e Instalación</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Climatización (HVAC)</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Aislamiento Térmico</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Sheetrock y Plafones</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Fontanería</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition">Ventanas Acústicas</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6">Contacto</h3>
            
            <div className="border-b border-gray-800 pb-4 mb-4">
              <span className="block text-xs font-bold text-blue-400 uppercase mb-2">República Dominicana</span>
              <div className="text-lg text-white font-bold mb-1">
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-whatsapp transition flex items-center gap-2 text-base">
                    <Phone size={16} className="text-whatsapp"/>
                    {WHATSAPP_NUMBER}
                  </a>
              </div>
              <div className="text-base text-white font-bold mb-2">+1 (809) 662-8574</div>
              <div className="flex items-start space-x-2 text-xs text-gray-400">
                 <MapPin className="flex-shrink-0 text-blue-500 mt-0.5" size={14} />
                 <span>Santo Domingo, República Dominicana</span>
              </div>
            </div>

            <div className="border-b border-gray-800 pb-4 mb-4">
              <span className="block text-xs font-bold text-secondary uppercase mb-2">Jamaica</span>
              <div className="text-base text-white font-bold mb-2">
                <a href="tel:+18768263246" className="hover:text-blue-400 flex items-center gap-2 text-base">
                  <Phone size={16} className="text-blue-400" />
                  +1 (876) 826-3246
                </a>
              </div>
              <div className="flex items-start space-x-2 text-xs text-gray-400">
                 <MapPin className="flex-shrink-0 text-blue-500 mt-0.5" size={14} />
                 <span>Half Moon Shopping Village, Unidad n.° 9 y 10, Rose Hall, Bahía de Montego, St. James</span>
              </div>
            </div>

            <a href="mailto:fferreras@didusa.onmicrosoft.com" className="flex items-start space-x-3 text-sm hover:text-blue-400 transition">
               <Send className="flex-shrink-0 text-blue-500 mt-1" size={16} />
               <span className="break-all">fferreras@didusa.onmicrosoft.com</span>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
             <p>Copyright 2025 - Didusa SRL</p>
             <span className="hidden md:block text-gray-700">|</span>
             <p className="opacity-75">Desarrollado por <span className="text-blue-400">Willksoft</span></p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Términos y Condiciones</a>
            <a href="#" className="hover:text-white">Política de Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
