import React from 'react';
import ClayCard from './ClayCard';
import Button from './Button';
import { Check, Sparkles } from 'lucide-react';

interface PricingProps {
  onRegister: (planName: string) => void;
}

const commonFeatures = [
  "Panel de Gestión Completo",
  "Catálogo Digital Ilimitado",
  "Generador de Códigos QR",
  "Sin Comisiones por Venta",
  "Soporte Prioritario",
  "Estadísticas de Negocio",
  "Acceso Móvil y PC"
];

const plans = [
  {
    id: 'monthly',
    name: 'Plan Mensual',
    price: '100€',
    period: '/mes',
    description: 'Flexibilidad total para empezar.',
    highlight: false,
    savings: null
  },
  {
    id: 'semiannual',
    name: 'Plan Semestral',
    price: '540€',
    period: '/semestre',
    description: 'La opción equilibrada a medio plazo.',
    highlight: false,
    savings: 'Ahorras 60€ al semestre',
  },
  {
    id: 'annual',
    name: 'Plan Anual',
    price: '1000€',
    period: '/año',
    description: 'Compromiso total con tu crecimiento.',
    highlight: true,
    savings: 'Ahorras 200€ al año',
    tag: 'Popular'
  }
];

const Pricing: React.FC<PricingProps> = ({ onRegister }) => {
  return (
    <section id="pricing" className="py-24 px-4 relative overflow-hidden">
      {/* Background Blobs for depth */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl -z-10 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl -z-10 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-text">
            Precios que <span className="text-primary">escalan</span> contigo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            Elige el plan que mejor se adapte a tu ritmo. Todas las herramientas, sin letra pequeña.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div key={plan.id} className={`relative ${plan.highlight ? 'md:-mt-4' : ''}`}>
              
              {/* Highlight Tag */}
              {plan.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-10">
                  <div className="bg-gradient-to-r from-accent to-primary text-white text-sm font-bold px-4 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse-slow">
                    <Sparkles size={14} /> {plan.tag}
                  </div>
                </div>
              )}

              <ClayCard 
                className={`
                  p-8 flex flex-col h-full relative
                  ${plan.highlight ? 'border-primary/50 shadow-clay-hover' : 'border-white/60'}
                `}
                hoverEffect={true}
              >
                <div className="mb-6">
                  <h3 className="font-heading font-bold text-xl text-gray-800 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-extrabold text-4xl text-text">{plan.price}</span>
                    <span className="text-gray-500 font-medium">{plan.period}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
                  
                  {plan.savings && (
                    <div className="mt-3 inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
                      {plan.savings}
                    </div>
                  )}
                </div>

                <div className="h-px bg-gray-200 w-full mb-6"></div>

                <ul className="space-y-4 mb-8 flex-1">
                  {commonFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
                      <div className="mt-0.5 min-w-[18px]">
                        <Check size={18} className="text-primary" strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="cta" 
                  className="w-full justify-center"
                  onClick={() => onRegister(plan.name)}
                >
                  Elegir {plan.name}
                </Button>
              </ClayCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;