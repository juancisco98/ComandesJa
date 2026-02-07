import React, { useState, useEffect } from 'react';
import ClayCard from './ClayCard';
import { Testimonial } from '../types';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jordi Soler',
    role: 'Chef Ejecutivo',
    business: 'GastroBar Centre',
    content: 'Antes era un caos de papeles y llamadas perdidas. Ahora todos los pedidos entran ordenados directamente a cocina. Hemos reducido los errores a cero.',
    avatar: 'https://picsum.photos/100/100?random=11'
  },
  {
    id: '2',
    name: 'Marta Vives',
    role: 'Gerente',
    business: 'Pizzeria Da Luigi',
    content: 'Lo mejor es la organización. Veo en tiempo real qué sale y qué entra. Nos ha permitido optimizar los turnos del personal y vender más los fines de semana.',
    avatar: 'https://picsum.photos/100/100?random=22'
  },
  {
    id: '3',
    name: 'Pere Antich',
    role: 'Propietario',
    business: 'Pollos al Ast Pere',
    content: 'Tener una app propia nos da una imagen muy profesional. Los clientes agradecen no tener que esperar al teléfono para encargar el domingo.',
    avatar: 'https://picsum.photos/100/100?random=33'
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-4 bg-gradient-to-b from-transparent to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent -z-10 blur-3xl"></div>

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-text mb-12">
          Organización que da <span className="text-accent">frutos</span>
        </h2>

        <div className="relative h-[400px] flex items-center justify-center">
          {testimonials.map((t, index) => {
            const isActive = index === activeIndex;
            // Calculate styles for carousel effect
            let translateX = '0%';
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;
            
            if (index !== activeIndex) {
                scale = 0.8;
                opacity = 0.5;
                zIndex = 0;
                // Simple logic for left/right positioning
                // This is a simplified 3-item carousel logic
                if (index === (activeIndex + 1) % testimonials.length) {
                    translateX = '50%';
                } else {
                    translateX = '-50%';
                }
            }

            return (
              <div 
                key={t.id}
                className="absolute transition-all duration-700 ease-in-out w-full max-w-lg px-4"
                style={{
                  transform: `translateX(${isActive ? '0%' : translateX}) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: isActive ? 'auto' : 'none' 
                }}
              >
                <ClayCard className="p-8 md:p-12 bg-white/60 backdrop-blur-sm relative">
                  <Quote size={48} className="absolute top-6 left-6 text-primary/20" />
                  
                  <div className="flex flex-col items-center gap-6 relative z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-full blur-md opacity-50"></div>
                        <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full object-cover border-4 border-white relative shadow-lg" />
                    </div>
                    
                    <p className="text-xl md:text-2xl font-body italic text-gray-700 leading-relaxed">
                      "{t.content}"
                    </p>
                    
                    <div className="mt-4">
                      <h4 className="font-heading font-bold text-lg text-text">{t.name}</h4>
                      <p className="text-sm font-semibold text-cta">{t.role} - {t.business}</p>
                    </div>
                  </div>
                </ClayCard>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 mt-8">
            <button onClick={prev} className="p-3 rounded-full bg-white shadow-clay hover:scale-110 transition-transform text-primary">
                <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2 items-center">
                {testimonials.map((_, i) => (
                    <button 
                        key={i} 
                        onClick={() => setActiveIndex(i)}
                        className={`h-3 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-cta' : 'w-3 bg-gray-300'}`}
                    />
                ))}
            </div>
            <button onClick={next} className="p-3 rounded-full bg-white shadow-clay hover:scale-110 transition-transform text-primary">
                <ChevronRight size={24} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;