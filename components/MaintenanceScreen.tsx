
import React from 'react';
import { Lock, Clock, Hammer, Mail } from 'lucide-react';
import { WHATSAPP_LINK } from '../constants';

interface MaintenanceProps {
  onBypass: () => void;
}

export const MaintenanceScreen: React.FC<MaintenanceProps> = ({ onBypass }) => {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-dark/90 z-10"></div>
         <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070" className="w-full h-full object-cover" alt="Background" />
      </div>

      <div className="relative z-20 text-center max-w-3xl animate-fadeInUp">
        {/* Logo Area */}
        <div className="mb-12 flex justify-center">
            <div className="bg-white/5 p-4 rounded-full border border-white/10">
                <Hammer size={48} className="text-primary" />
            </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Sitio en <br/>
          <span className="text-secondary">Mantenimiento</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
          Estamos realizando mejoras importantes en nuestra plataforma para brindarle un mejor servicio. Por favor, contáctenos directamente si requiere asistencia inmediata.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
           <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="bg-whatsapp hover:bg-whatsappDark text-white px-8 py-3 rounded-full font-bold transition shadow-lg shadow-green-500/30 flex items-center">
             <Clock size={18} className="mr-2" />
             Contactar por WhatsApp
           </a>
           <a href="mailto:fferreras@didusa.onmicrosoft.com" className="text-gray-400 hover:text-white transition flex items-center">
             <Mail size={18} className="mr-2" />
             fferreras@didusa.onmicrosoft.com
           </a>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-6 text-center w-full z-20 flex flex-col items-center gap-1">
         <p className="text-gray-600 text-xs uppercase tracking-widest">Didusa SRL &copy; 2025</p>
      </div>

      {/* HIDDEN BUTTON TO BYPASS */}
      <button 
        onClick={onBypass}
        className="absolute bottom-4 right-4 z-50 p-2 text-white opacity-5 hover:opacity-100 transition-opacity duration-500"
        title="Acceso Administrativo"
      >
        <Lock size={20} />
      </button>
    </div>
  );
};
