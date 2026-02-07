import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

interface StickyCTAProps {
  onRegister: () => void;
}

const StickyCTA: React.FC<StickyCTAProps> = ({ onRegister }) => {
  return (
    <div className="fixed bottom-6 left-4 right-4 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto max-w-2xl w-full glass-panel bg-text/95 backdrop-blur-xl p-3 px-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-white/20 transform transition-transform hover:scale-[1.01]">
        <div className="hidden sm:block pl-2">
            <p className="text-white font-heading font-bold text-lg leading-tight">Potencia tu local</p>
            <p className="text-gray-300 text-sm">Prueba 7 días gratis sin compromiso.</p>
        </div>
        <div className="block sm:hidden pl-2">
             <p className="text-white font-bold">7 días gratis 🎉</p>
        </div>
        
        <Button 
          variant="cta" 
          size="md" 
          className="whitespace-nowrap shadow-none border-none ring-2 ring-cta/50 ring-offset-2 ring-offset-gray-900 h-10"
          onClick={onRegister}
        >
          Empezar Gratis <ArrowRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default StickyCTA;