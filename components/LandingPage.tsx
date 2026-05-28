
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from './Layout';
import Hero from './Hero';
import { AboutSection, ServicesSection, WhyChooseUsSection } from './Features';
import { 
  CtaBanner, 
  ProcessSection, 
  StatsSection, 
  FAQSection, 
  NewsSection,
  BottomBanner,
  BrandsSection,
  MapSection,
  ProjectsSection,
  JamaicaSection
} from './Sections';
import { SEO } from './SEO';
import { useData } from '../context/DataContext';

export const LandingPage = () => {
  const { heroSlides } = useData();
  const heroImage = heroSlides[0]?.bg;

  return (
    <div className="font-sans antialiased text-gray-800 bg-white relative">
      <SEO 
        title="Inicio" 
        description="Didusa SRL: Líderes en República Dominicana en diseño e instalación de ductos, climatización (HVAC), aislamiento térmico y sheetrock."
        image={heroImage}
        url="https://www.didusasrl.com/"
      />
      <Navbar />
      
      <main>
        <Hero />
        <BrandsSection />
        <AboutSection />
        <JamaicaSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <CtaBanner />
        <ProcessSection />
        <ProjectsSection />
        <StatsSection />
        <FAQSection />
        <NewsSection />
        <MapSection />
        <BottomBanner />
      </main>

      <Footer />
    </div>
  );
};
