
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { RotateCcw, LayoutDashboard, Briefcase, FileText, HelpCircle, Image as ImageIcon, Layers, Tag, Monitor, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
    HeroEditor, 
    HeroFeaturesEditor, 
    PageHeadersEditor, 
    BrandsEditor, 
    ServicesEditor, 
    ProjectsEditor, 
    BlogEditor, 
    FAQEditor,
    SettingsEditor
} from './AdminEditors';

const TabButton = ({ active, label, icon: Icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition text-left ${active ? 'bg-primary text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
  >
    <Icon size={18} className="flex-shrink-0" />
    <span className="font-medium text-sm whitespace-nowrap">{label}</span>
  </button>
);

export const AdminPanel = ({ onLogout }: { onLogout: () => void }) => {
  const { resetData } = useData();
  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl flex flex-col z-10 flex-shrink-0">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-primary">Didusa Admin</h1>
          <p className="text-xs text-gray-500">Panel de Control v1.3</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <TabButton active={activeTab === 'hero'} label="Inicio / Hero" icon={LayoutDashboard} onClick={() => setActiveTab('hero')} />
          <TabButton active={activeTab === 'hero_features'} label="Tarjetas Hero" icon={Layers} onClick={() => setActiveTab('hero_features')} />
          <TabButton active={activeTab === 'page_headers'} label="Encabezados Páginas" icon={Monitor} onClick={() => setActiveTab('page_headers')} />
          <TabButton active={activeTab === 'brands'} label="Marcas / Clientes" icon={Tag} onClick={() => setActiveTab('brands')} />
          <TabButton active={activeTab === 'services'} label="Servicios" icon={Briefcase} onClick={() => setActiveTab('services')} />
          <TabButton active={activeTab === 'projects'} label="Proyectos" icon={ImageIcon} onClick={() => setActiveTab('projects')} />
          <TabButton active={activeTab === 'blog'} label="Noticias" icon={FileText} onClick={() => setActiveTab('blog')} />
          <TabButton active={activeTab === 'faq'} label="Preguntas Freq." icon={HelpCircle} onClick={() => setActiveTab('faq')} />
          <div className="pt-4 mt-4 border-t">
              <TabButton active={activeTab === 'settings'} label="Configuración" icon={Settings} onClick={() => setActiveTab('settings')} />
          </div>
        </nav>
        <div className="p-4 border-t space-y-2">
            <Link to="/" className="block w-full text-center py-2 border border-gray-300 rounded hover:bg-gray-50 transition text-sm">Ver Sitio Web</Link>
            <button onClick={resetData} className="flex items-center justify-center w-full py-2 text-red-500 hover:bg-red-50 rounded transition text-sm">
                <RotateCcw size={14} className="mr-1"/> Restaurar Todo
            </button>
            <button onClick={onLogout} className="block w-full bg-dark text-white py-2 rounded hover:bg-black transition text-sm">Cerrar Sesión</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-4xl mx-auto">
           {activeTab === 'hero' && <HeroEditor />}
           {activeTab === 'hero_features' && <HeroFeaturesEditor />}
           {activeTab === 'page_headers' && <PageHeadersEditor />}
           {activeTab === 'brands' && <BrandsEditor />}
           {activeTab === 'services' && <ServicesEditor />}
           {activeTab === 'projects' && <ProjectsEditor />}
           {activeTab === 'blog' && <BlogEditor />}
           {activeTab === 'faq' && <FAQEditor />}
           {activeTab === 'settings' && <SettingsEditor />}
        </div>
      </main>
    </div>
  );
};
