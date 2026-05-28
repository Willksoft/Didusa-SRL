
import { 
  Wind, 
  Settings, 
  ShieldCheck, 
  Clock, 
  Award, 
  Zap, 
  CheckCircle2,
  Thermometer,
  Construction,
  Droplets,
  Calendar,
  PenTool,
  Wrench,
  ClipboardList,
  MapPin,
  Phone,
  Mail,
  Briefcase
} from 'lucide-react';
import { ServiceItem, Feature, Testimonial, BlogPost, FAQItem, Project, PageHeaderData, PageHeaderKeys, Brand } from './types';

// WhatsApp Configuration
export const WHATSAPP_NUMBER = "+1 (829) 208-8107";
export const WHATSAPP_LINK = "https://wa.me/18292088107?text=Hola,%20me%20gustaría%20solicitar%20más%20información%20sobre%20sus%20servicios%20de%20climatización%20y%20ductos.";

// Map for dynamic lookup and persistence
export const ICON_MAP: Record<string, any> = {
  Wind,
  Settings,
  ShieldCheck, 
  Clock,
  Award,
  Zap,
  CheckCircle2,
  Thermometer,
  Construction,
  Droplets,
  Calendar,
  PenTool,
  Wrench,
  ClipboardList,
  MapPin,
  Phone,
  Mail,
  Briefcase
};

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export const DEFAULT_PAGE_HEADERS: Record<PageHeaderKeys, PageHeaderData> = {
  about: {
    title: "Sobre Nosotros",
    subtitle: "Más de una década construyendo confianza y excelencia técnica en República Dominicana.",
    bgImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
  },
  services: {
    title: "Nuestros Servicios",
    subtitle: "Soluciones integrales de ingeniería, climatización y construcción para proyectos exigentes.",
    bgImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
  },
  projects: {
    title: "Nuestros Proyectos",
    subtitle: "Galería de obras recientes en los sectores industrial, hotelero y comercial.",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  blog: {
    title: "Noticias y Artículos",
    subtitle: "Mantente informado sobre las últimas tendencias en HVAC y construcción.",
    bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop"
  },
  contact: {
    title: "Contacto",
    subtitle: "Estamos listos para atender sus requerimientos las 24 horas.",
    bgImage: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop"
  }
};

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: 'Diseño e Instalación de Ductos',
    description: 'Desarrollo de sistemas de conductos para aire acondicionado, ventilación, agua helada, agua caliente, sistemas contra incendios y electricidad.',
    subcategories: [
      'Conductos de Aire Acondicionado',
      'Sistemas de Ventilación',
      'Agua Helada y Caliente',
      'Sistemas Contra Incendios',
      'Ductos Eléctricos'
    ],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
    icon: 'Wind'
  },
  {
    id: 2,
    title: 'Climatización y Aislamiento',
    description: 'Mantenimiento e igualado de aires acondicionados. Aislamiento térmico de tuberías y calderas con enchaquetado de aluminio y PVC.',
    subcategories: [
      'Mantenimiento de Aires',
      'Aislamiento Térmico de Tuberías',
      'Aislamiento de Calderas',
      'Enchaquetado Aluminio/PVC',
      'Igualado de Sistemas'
    ],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
    icon: 'Thermometer'
  },
  {
    id: 3,
    title: 'Acabados y Construcción Ligera',
    description: 'Terminación de Sheetrock y plafones. Diseño e instalación de ventanas acústicas y sistemas contra ruido para plantas industriales.',
    subcategories: [
      'Terminación de Sheetrock',
      'Plafones Comerciales',
      'Ventanas Acústicas',
      'Sistemas Contra Ruido',
      'Acabados Técnicos'
    ],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    icon: 'Construction'
  },
  {
    id: 4,
    title: 'Fontanería Profesional',
    description: 'Trabajos generales de plomería y sistemas de agua para proyectos residenciales, industriales y comerciales.',
    subcategories: [
      'Plomería General',
      'Sistemas Hidráulicos',
      'Proyectos Industriales',
      'Instalaciones Comerciales',
      'Mantenimiento de Redes'
    ],
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?q=80&w=800&auto=format&fit=crop',
    icon: 'Droplets'
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Seguridad',
    description: 'Priorizamos el bienestar y la seguridad en cada etapa de nuestros proyectos.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Calidad Internacional',
    description: 'Utilizamos materiales de primera y seguimos normas internacionales de calidad.',
    icon: 'Award'
  },
  {
    title: 'Innovación',
    description: 'Nos adaptamos a las nuevas tecnologías, incluyendo simulaciones 3D de flujo de aire.',
    icon: 'Zap'
  },
  {
    title: 'Experiencia',
    description: 'Más de 10 años de experiencia en el mercado de servicios electromecánicos y civiles.',
    icon: 'CheckCircle2'
  },
  {
    title: 'Servicio 24 Horas',
    description: 'Atención disponible 24 horas para emergencias y requerimientos especiales.',
    icon: 'Clock'
  },
  {
    title: 'Soluciones Integrales',
    description: 'Desde diseño hasta instalación para proyectos residenciales, industriales y comerciales.',
    icon: 'Settings'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Ing. Carlos R.',
    role: 'Gerente de Proyecto Hotelero',
    content: 'La instalación de los ductos en nuestro complejo hotelero fue impecable. Didusa demostró profesionalismo y cumplimiento en los plazos.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    rating: 5
  },
  {
    id: 2,
    name: 'María F.',
    role: 'Administradora Residencial',
    content: 'Su equipo de climatización resolvió problemas de aislamiento que teníamos hace años. La eficiencia energética mejoró notablemente.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    rating: 5
  },
  {
    id: 3,
    name: 'Roberto L.',
    role: 'Director de Planta Industrial',
    content: 'La implementación de ventanas acústicas y sistemas contra ruido transformó nuestro ambiente laboral. Altamente recomendados.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop',
    rating: 5
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Importancia del Aislamiento Térmico en Tuberías',
    category: 'Eficiencia',
    image: 'https://images.unsplash.com/photo-1629760086300-c5e3f5d54a2a?w=800&auto=format&fit=crop',
    date: '12 de Agosto, 2024',
    excerpt: 'Descubra cómo el aislamiento adecuado en tuberías de agua helada y caliente reduce costos energéticos significativamente.'
  },
  {
    id: 2,
    title: 'Innovación en Diseño de Ductos 3D',
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1524514587602-35a4a7569d4d?w=800&auto=format&fit=crop',
    date: '15 de Agosto, 2024',
    excerpt: 'Utilizamos software avanzado para simulaciones de flujo de aire, garantizando la máxima eficiencia en ventilación.'
  },
  {
    id: 3,
    title: 'Acabados Técnicos: Sheetrock y Plafones',
    category: 'Construcción',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop',
    date: '18 de Agosto, 2024',
    excerpt: 'La calidad en la terminación de espacios interiores es crucial para la estética y funcionalidad de proyectos comerciales.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "¿Qué tipos de proyectos manejan?",
    answer: "Manejamos proyectos residenciales, comerciales e industriales, especializándonos en hoteles y grandes infraestructuras."
  },
  {
    question: "¿Ofrecen servicios de emergencia?",
    answer: "Sí, contamos con un servicio de atención 24 horas para atender cualquier eventualidad crítica en sus sistemas."
  },
  {
    question: "¿Realizan diseño de sistemas desde cero?",
    answer: "Absolutamente. Ofrecemos diseño e instalación completa de sistemas de ductos, climatización y fontanería."
  },
  {
    question: "¿Qué estándares de calidad siguen?",
    answer: "Nos regimos por estándares internacionales de calidad y seguridad, asegurando durabilidad y cumplimiento normativo en cada instalación."
  },
  {
    question: "¿Dónde están ubicados?",
    answer: "Operamos en República Dominicana, con capacidad para atender proyectos en diversas zonas turísticas e industriales."
  }
];

export const CLIENT_BRANDS: Brand[] = [
  { id: 1, name: "Hilton La Romana", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Hilton_Hotels_%26_Resorts_logo.svg/2560px-Hilton_Hotels_%26_Resorts_logo.svg.png" },
  { id: 2, name: "Marriott", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Marriott_International.svg/2560px-Marriott_International.svg.png" },
  { id: 3, name: "Playa Resorts", logo: "https://www.playaresorts.com/images/logos/playa-logo-color.svg" },
  { id: 4, name: "Bahia Principe", logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Logo_Bahia_Principe_Hotels_%26_Resorts.png" },
  { id: 5, name: "Iberostar", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Iberostar_Hotels_%26_Resorts_Logo.svg/1200px-Iberostar_Hotels_%26_Resorts_Logo.svg.png" }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Sistema HVAC Hotel Bahía Príncipe",
    category: "Climatización Hotelera",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1513262627961-c67b2049e32a?q=80&w=800',
        caption: 'Unidades centrales de aire'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800',
        caption: 'Instalación de ductos principales'
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder video
        caption: 'Recorrido de la instalación (Demo)'
      }
    ]
  },
  {
    id: 2,
    title: "Ductos Industriales Zona Franca",
    category: "Ventilación Industrial",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Torre Corporativa Santo Domingo",
    category: "Aislamiento Térmico",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Complejo Residencial Punta Cana",
    category: "Fontanería General",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Plaza Comercial Blue Mall",
    category: "Acabados y Sheetrock",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Hospital General Regional",
    category: "Sistemas Contra Incendios",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
  }
];
