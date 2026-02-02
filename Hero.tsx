import React from 'react';
import Button from './Button';
import ClayCard from './ClayCard';
import { ArrowRight, Star, Zap, Store, Smartphone } from 'lucide-react';

interface HeroProps {
  onDemoClick: () => void;
  onDashboardClick?: () => void;
  onRegister?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onDemoClick, onDashboardClick, onRegister }) => {
  return (
    <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden min-h-screen flex items-center justify-center">
      
      {/* --- FLUID BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {/* Animated Blob 1 */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        {/* Animated Blob 2 */}
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        {/* Animated Blob 3 */}
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        
        {/* Glass Overlay Texture (Noise) optional - keeping it clean for glossy look */}
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Text Content */}
        <div className="text-center lg:text-left z-10 space-y-8 max-w-3xl mx-auto lg:mx-0">
          
          {/* Badge - Glassy */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/50 shadow-sm mx-auto lg:mx-0 animate-float">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-bold text-gray-800 tracking-wide">Disponible en Berga</span>
          </div>
          
          <h1 className="font-heading font-extrabold text-5xl md:text-7xl leading-[1.05] text-text tracking-tight">
            Tu negocio <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-700 relative inline-block">
              local
            </span>
            <br />
            <span className="relative z-10">en el móvil de <span className="italic font-serif text-emerald-600">todos</span>.</span>
          </h1>
          
          <p className="font-body text-xl text-gray-600/90 max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance font-medium">
            La plataforma definitiva para conectar con tus vecinos. Pedidos, reservas y visibilidad con una experiencia visual moderna.
          </p>
          
          {/* Main CTA Group */}
          <div className="flex flex-col gap-4 relative z-20">
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <Button 
                    variant="cta" 
                    size="lg" 
                    className="shadow-glow w-full sm:w-auto justify-center rounded-full"
                    onClick={onRegister}
                >
                Empezar Gratis <ArrowRight size={22} strokeWidth={2.5} />
                </Button>
                
                <Button 
                    variant="secondary" 
                    size="lg" 
                    onClick={onDashboardClick} 
                    className="w-full sm:w-auto rounded-full bg-white/40 backdrop-blur-md border border-white/60 hover:bg-white/60 text-gray-800"
                >
                    <Store size={20} />
                    Ver Demo como Local
                </Button>
            </div>
            
            {/* Tertiary Link */}
            <div className="text-center lg:text-left">
                 <button 
                    onClick={onDemoClick}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors py-2"
                 >
                    <Smartphone size={16} className="group-hover:scale-110 transition-transform"/>
                    <span>O mira cómo compran tus clientes (Demo App)</span>
                 </button>
            </div>
          </div>
        </div>

        {/* Visual / Graphic - Floating Glass Cards */}
        <div className="relative z-10 perspective-container hidden md:block h-[600px] flex items-center justify-center">
           
           {/* Abstract Phone/Dashboard Shape */}
           <div className="relative w-[380px] h-[550px] animate-float">
             
             {/* Back Glow */}
             <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl transform rotate-6"></div>

             <ClayCard className="h-full flex flex-col p-0 shadow-2xl border-white/40 !rounded-[3rem] z-20 relative backdrop-blur-2xl bg-white/60">
                {/* Glossy Reflection */}
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-white/80 to-transparent rounded-tr-[3rem] opacity-40 pointer-events-none z-30"></div>

                {/* Header */}
                <div className="h-20 border-b border-white/30 flex items-center justify-between px-8">
                   <div className="w-24 h-6 bg-gray-200/50 rounded-full backdrop-blur-sm"></div>
                   <div className="w-10 h-10 rounded-full bg-green-100/50 border border-white/50"></div>
                </div>
                
                {/* Body Content */}
                <div className="flex-1 p-6 space-y-6">
                   <div className="flex gap-4">
                      <div className="flex-1 h-32 bg-gradient-to-br from-green-400/20 to-green-500/20 rounded-3xl border border-white/50 backdrop-blur-md p-4 flex flex-col justify-end">
                         <div className="w-8 h-8 bg-white/60 rounded-full mb-2 flex items-center justify-center">
                            <Zap size={16} className="text-primary" fill="currentColor"/>
                         </div>
                         <div className="w-16 h-2 bg-white/50 rounded-full"></div>
                      </div>
                      <div className="flex-1 h-32 bg-white/30 rounded-3xl border border-white/50 p-4 flex flex-col justify-end">
                          <div className="w-8 h-8 bg-white/60 rounded-full mb-2"></div>
                          <div className="w-16 h-2 bg-gray-400/20 rounded-full"></div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <div className="h-20 w-full bg-white/40 rounded-3xl border border-white/50 flex items-center px-4 gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-orange-100/50"></div>
                         <div className="space-y-2 flex-1">
                            <div className="w-3/4 h-3 bg-gray-400/20 rounded-full"></div>
                            <div className="w-1/2 h-2 bg-gray-400/10 rounded-full"></div>
                         </div>
                      </div>
                      <div className="h-20 w-full bg-white/40 rounded-3xl border border-white/50 flex items-center px-4 gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-blue-100/50"></div>
                         <div className="space-y-2 flex-1">
                            <div className="w-2/3 h-3 bg-gray-400/20 rounded-full"></div>
                            <div className="w-1/2 h-2 bg-gray-400/10 rounded-full"></div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-20 mt-auto border-t border-white/30 flex justify-around items-center px-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300/20"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300/20"></div>
                </div>
             </ClayCard>

             {/* Floating Elements - Sales */}
             <div className="absolute -top-10 -right-12 animate-float-delayed z-30">
                <ClayCard className="w-48 p-4 flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white/80">
                  <div className="p-3 bg-green-500/10 rounded-2xl text-green-600">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Ventas</p>
                    <p className="text-xl font-extrabold text-gray-800">+124%</p>
                  </div>
                </ClayCard>
             </div>

             <div className="absolute -bottom-12 -left-12 animate-float z-30">
                <ClayCard className="w-56 p-4 flex items-center gap-3 bg-white/70 backdrop-blur-xl border border-white/80">
                  <div className="p-3 bg-yellow-400/10 rounded-2xl text-yellow-600">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Valoración</p>
                    <p className="text-sm font-semibold text-gray-800">"Gestión impecable"</p>
                  </div>
                </ClayCard>
             </div>

           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;