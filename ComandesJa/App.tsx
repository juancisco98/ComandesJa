import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';
import DemoView from './components/DemoView';
import Dashboard from './components/Dashboard';
import RegistrationModal from './components/RegistrationModal';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { getSession } from './src/lib/supabase';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'demo' | 'dashboard' | 'admin'>('landing');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Plan Mensual');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Check for admin route on mount
  useEffect(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;

    // Check if this is an OAuth callback (has hash with access_token)
    if (hash && hash.includes('access_token')) {
      console.log('OAuth callback detected, checking session...');
      checkAdminAuth();
    } else if (path === '/admin') {
      checkAdminAuth();
    }
  }, []);

  const checkAdminAuth = async () => {
    setView('admin');
    const { session } = await getSession();
    if (session?.user?.email === 'juan.sada98@gmail.com') {
      setIsAdminAuthenticated(true);
      // Clean up the URL hash
      window.history.replaceState({}, document.title, '/admin');
    } else {
      setIsAdminAuthenticated(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setView('landing');
    window.history.pushState({}, '', '/');
  };

  // Basic smooth scroll implementation for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          document.querySelector(targetId)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  const handleRegister = (planName?: string) => {
    if (planName) setSelectedPlan(planName);
    setIsRegisterOpen(true);
  };

  // Admin view
  if (view === 'admin') {
    if (isAdminAuthenticated) {
      return <AdminDashboard onLogout={handleAdminLogout} />;
    } else {
      return <AdminLogin onLoginSuccess={handleAdminLogin} />;
    }
  }

  if (view === 'demo') {
    return <DemoView onBack={() => setView('landing')} />;
  }

  if (view === 'dashboard') {
    return <Dashboard onLogout={() => setView('landing')} />;
  }

  return (
    <div className="min-h-screen bg-background text-text selection:bg-primary/30 font-body overflow-x-hidden">
      <Navbar onRegister={() => handleRegister()} />

      <main>
        <Hero
          onDemoClick={() => setView('demo')}
          onDashboardClick={() => setView('dashboard')}
          onRegister={() => handleRegister()}
        />
        <Features />

        {/* Divider with unique shape */}
        <div className="w-full h-24 bg-gradient-to-b from-transparent to-primary/5 rounded-b-[50%] scale-x-150 origin-top"></div>

        <Pricing onRegister={handleRegister} />

        <Testimonials />
      </main>

      <StickyCTA onRegister={() => handleRegister()} />
      <Footer />

      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default App;