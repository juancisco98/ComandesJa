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

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'demo' | 'dashboard'>('landing');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Plan Mensual');
  
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