
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import { LandingPage } from './components/LandingPage';
import { AdminPanel } from './components/Admin/AdminPanel';
import { Login } from './components/Admin/Login';
import { Navbar, Footer } from './components/Layout';
import { MaintenanceScreen } from './components/MaintenanceScreen';
import { 
  AboutPage, 
  ServicesPage, 
  ProjectsPage, 
  ProjectDetailPage, 
  BlogPage, 
  BlogPostPage, 
  ContactPage 
} from './components/Pages';
import { supabase } from './supabaseClient';
import { Loader2 } from 'lucide-react';

// ScrollToTop Component
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// Protected Route Wrapper using Real Supabase Auth
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary w-10 h-10" />
            </div>
        );
    }

    if (!session) {
        // If no session, show Login component
        return <Login onLogin={() => {}} />; 
    }

    if (!children) return null;

    // Pass logout handler to children
    return React.cloneElement(children as React.ReactElement<any>, { 
        onLogout: async () => {
            await supabase.auth.signOut();
        } 
    });
};

// Wrapper for internal pages to include Navbar and Footer automatically
const LayoutWrapper = ({ children }: { children?: React.ReactNode }) => (
    <div className="font-sans antialiased text-gray-800 bg-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
    </div>
);

// Inner Content that has access to Context
const AppContent = () => {
    const { maintenanceMode, loading } = useData();
    const [isBypassed, setIsBypassed] = useState(() => {
        return localStorage.getItem('didusa_bypass_maintenance') === 'true';
    });

    const handleBypass = () => {
        localStorage.setItem('didusa_bypass_maintenance', 'true');
        setIsBypassed(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-primary w-10 h-10" />
            </div>
        );
    }

    // Check Maintenance Mode (fetched from Supabase in DataContext)
    if (maintenanceMode && !isBypassed) {
        return <MaintenanceScreen onBypass={handleBypass} />;
    }

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminPanel onLogout={() => {}} />
                    </ProtectedRoute>
                } />

                {/* Public Pages */}
                <Route path="/about" element={<LayoutWrapper><AboutPage /></LayoutWrapper>} />
                <Route path="/services" element={<LayoutWrapper><ServicesPage /></LayoutWrapper>} />
                <Route path="/projects" element={<LayoutWrapper><ProjectsPage /></LayoutWrapper>} />
                <Route path="/projects/:id" element={<LayoutWrapper><ProjectDetailPage /></LayoutWrapper>} />
                <Route path="/blog" element={<LayoutWrapper><BlogPage /></LayoutWrapper>} />
                <Route path="/blog/:id" element={<LayoutWrapper><BlogPostPage /></LayoutWrapper>} />
                <Route path="/contact" element={<LayoutWrapper><ContactPage /></LayoutWrapper>} />

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

function App() {
  return (
    <DataProvider>
        <AppContent />
    </DataProvider>
  );
}

export default App;
