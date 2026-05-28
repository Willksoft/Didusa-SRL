
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { SERVICES, PROJECTS, BLOG_POSTS, TESTIMONIALS, FAQ_ITEMS, CLIENT_BRANDS, DEFAULT_PAGE_HEADERS } from '../constants';
import { ServiceItem, Project, BlogPost, Testimonial, FAQItem, Feature, PageHeaderData, PageHeaderKeys, Brand } from '../types';

interface DataContextType {
  services: ServiceItem[];
  projects: Project[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  faqItems: FAQItem[];
  clientBrands: Brand[];
  heroSlides: any[];
  heroFeatures: Feature[];
  pageHeaders: Record<PageHeaderKeys, PageHeaderData>;
  maintenanceMode: boolean;
  updateData: (key: string, data: any) => void;
  saveToDb: (key: string, data: any) => Promise<void>;
  toggleMaintenance: (enabled: boolean) => Promise<void>;
  resetData: () => void;
  loading: boolean;
}

// Fallback constants used only if DB is empty or fails initially
const defaultHeroSlides = [
    {
      badge: "Puro Confort",
      title: "Haciendo que cada temporada se sienta perfecta",
      subtitle: "Soluciones de climatización para confort y fiabilidad total.",
      buttonText: "Agendar Reparación",
      bg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
    }
];

const defaultHeroFeatures: Feature[] = [
    {
        title: "Técnicos Expertos",
        description: "Confíe en nosotros para soluciones fiables y servicio excepcional.",
        icon: "Settings"
    }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children?: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  
  const [services, setServices] = useState<ServiceItem[]>(SERVICES);
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(FAQ_ITEMS);
  const [clientBrands, setClientBrands] = useState<Brand[]>(CLIENT_BRANDS);
  const [heroSlides, setHeroSlides] = useState<any[]>(defaultHeroSlides);
  const [heroFeatures, setHeroFeatures] = useState<Feature[]>(defaultHeroFeatures);
  const [pageHeaders, setPageHeaders] = useState<Record<PageHeaderKeys, PageHeaderData>>(DEFAULT_PAGE_HEADERS);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // FETCH DATA FROM SUPABASE
  const fetchData = async () => {
      setLoading(true);
      try {
          // 1. Services
          const { data: sData } = await supabase.from('services').select('*').order('id');
          if (sData && sData.length > 0) setServices(sData);

          // 2. Projects
          const { data: pData } = await supabase.from('projects').select('*').order('id');
          if (pData && pData.length > 0) setProjects(pData);

          // 3. Blog
          const { data: bData } = await supabase.from('blog_posts').select('*').order('id');
          if (bData && bData.length > 0) setBlogPosts(bData);
          
          // 4. Testimonials
          const { data: tData } = await supabase.from('testimonials').select('*').order('id');
          if (tData && tData.length > 0) setTestimonials(tData);

          // 5. FAQ
          const { data: fData } = await supabase.from('faq_items').select('*').order('id');
          if (fData && fData.length > 0) setFaqItems(fData);

          // 6. Brands
          const { data: brData } = await supabase.from('client_brands').select('*').order('id');
          if (brData && brData.length > 0) setClientBrands(brData);

          // 7. Hero Slides
          const { data: hData } = await supabase.from('hero_slides').select('*').order('id');
          if (hData && hData.length > 0) setHeroSlides(hData);

          // 8. Hero Features
          const { data: hfData } = await supabase.from('hero_features').select('*').order('id');
          if (hfData && hfData.length > 0) setHeroFeatures(hfData);

          // 9. Page Headers
          const { data: phData } = await supabase.from('page_headers').select('*');
          if (phData && phData.length > 0) {
              const mappedHeaders = { ...DEFAULT_PAGE_HEADERS };
              phData.forEach((item: any) => {
                  if (item.key && mappedHeaders[item.key as PageHeaderKeys]) {
                      mappedHeaders[item.key as PageHeaderKeys] = {
                          title: item.title,
                          subtitle: item.subtitle,
                          bgImage: item.bgImage
                      };
                  }
              });
              setPageHeaders(mappedHeaders);
          }

          // 10. Site Settings (Maintenance)
          const { data: settings } = await supabase.from('site_settings').select('*').eq('key', 'maintenance_config').single();
          if (settings && settings.value) {
              setMaintenanceMode(settings.value.enabled);
          }

      } catch (error) {
          console.error("Error connecting to Supabase:", error);
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // UPDATE LOCAL STATE (NO DB CALL)
  const updateData = (key: string, data: any) => {
    switch (key) {
      case 'services': setServices(data); break;
      case 'projects': setProjects(data); break;
      case 'blogPosts': setBlogPosts(data); break;
      case 'testimonials': setTestimonials(data); break;
      case 'faqItems': setFaqItems(data); break;
      case 'clientBrands': setClientBrands(data); break;
      case 'heroSlides': setHeroSlides(data); break;
      case 'heroFeatures': setHeroFeatures(data); break;
      case 'pageHeaders': setPageHeaders(data); break;
    }
  };

  // TOGGLE MAINTENANCE
  const toggleMaintenance = async (enabled: boolean) => {
      try {
        const { error } = await supabase.from('site_settings').upsert({
            key: 'maintenance_config',
            value: { enabled }
        });
        if (error) throw error;
        setMaintenanceMode(enabled);
      } catch (error: any) {
        console.error("Error updating maintenance mode:", error);
        alert("Error al actualizar estado de mantenimiento: " + error.message);
      }
  };

  // MANUAL SAVE TO DB
  const saveToDb = async (key: string, data: any) => {
    // DB Update Logic
    try {
        if (key === 'pageHeaders') {
            // Special case: Object not Array
            const upserts = Object.keys(data).map(k => ({
                key: k,
                ...data[k as PageHeaderKeys]
            }));
            const { error } = await supabase.from('page_headers').upsert(upserts);
            if (error) throw error;
        } else {
            // General case: Arrays
            const tableNameMap: Record<string, string> = {
                'services': 'services',
                'projects': 'projects',
                'blogPosts': 'blog_posts',
                'testimonials': 'testimonials',
                'faqItems': 'faq_items',
                'clientBrands': 'client_brands',
                'heroSlides': 'hero_slides',
                'heroFeatures': 'hero_features'
            };

            const tableName = tableNameMap[key];
            if (!tableName) return;

            // 1. Get current IDs in DB
            const { data: currentDbData, error: fetchError } = await supabase.from(tableName).select('id');
            if (fetchError) throw fetchError;

            const currentIds = currentDbData?.map((r: any) => r.id) || [];
            const newIds = data.map((r: any) => r.id).filter((id: any) => id);
            
            // 2. Delete items that are no longer in the new data
            const idsToDelete = currentIds.filter((id: number) => !newIds.includes(id));
            if (idsToDelete.length > 0) {
                const { error: deleteError } = await supabase.from(tableName).delete().in('id', idsToDelete);
                if (deleteError) throw deleteError;
            }

            // 3. Upsert (Insert or Update) the rest
            const sanitizedData = data.map((item: any) => {
                const isTempId = item.id && item.id > 100000000000; // Heuristic for Date.now()
                // Si es un proyecto, asegurarnos de que los campos opcionales existan aunque sean null/vacíos para evitar errores de tipo si la columna existe
                if (key === 'projects') {
                    if (!item.gallery) item.gallery = [];
                    if (!item.scope) item.scope = [];
                }
                
                if (isTempId) {
                    const { id, ...rest } = item; // Remove temp ID to let Postgres generate one
                    return rest;
                }
                return item;
            });

            const { error: upsertError } = await supabase.from(tableName).upsert(sanitizedData);
            if (upsertError) throw upsertError;
        }
        
        // Success
        alert("Cambios guardados correctamente en la base de datos.");

    } catch (err: any) {
        console.error("Error saving to DB:", err);
        // Specialized error message for 400 (Bad Request) which usually means schema mismatch
        if (err.code === '400' || err.status === 400 || err.message?.includes('400') || err.message?.includes('column')) {
             alert(`¡ERROR DE BASE DE DATOS (400)!\n\nSupabase no encuentra las columnas nuevas.\n\nSOLUCIÓN:\n1. Ve al 'SQL Editor' en tu panel de Supabase.\n2. Copia y pega el código del archivo 'db_setup.sql' que he creado.\n3. Ejecútalo para crear las columnas 'gallery', 'description', etc.`);
        } else {
             alert(`Error guardando cambios: ${err.message}`);
        }
    }
  };

  const resetData = async () => {
    if(confirm("¿Recargar datos? Esto volverá a leer la base de datos y perderás cambios no guardados.")) {
        fetchData();
    }
  };

  return (
    <DataContext.Provider value={{
      services, projects, blogPosts, testimonials, faqItems, clientBrands, heroSlides, heroFeatures, pageHeaders, maintenanceMode,
      updateData, saveToDb, toggleMaintenance, resetData, loading
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
