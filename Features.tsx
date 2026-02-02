import React from 'react';
import ClayCard from './ClayCard';
import { Store, Truck, Users, Smartphone, TrendingUp, Heart } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    id: '1',
    title: 'Tu Tienda Online',
    description: 'Crea tu catálogo digital en minutos. Sin necesidad de conocimientos técnicos.',
    icon: Store,
    color: 'text-primary'
  },
  {
    id: '2',
    title: 'Delivery Flexible',
    description: '¿Tienes repartidor? ¡Genial! ¿No? El cliente puede recoger en tienda. Tú decides.',
    icon: Truck,
    color: 'text-accent'
  },
  {
    id: '3',
    title: 'Comunidad Real',
    description: 'Conecta con los vecinos. Fideliza a tus clientes con promociones exclusivas.',
    icon: Users,
    color: 'text-cta'
  },
  {
    id: '4',
    title: 'Pedidos Móviles',
    description: 'Tus clientes piden desde el móvil cómodamente. Notificaciones en tiempo real.',
    icon: Smartphone,
    color: 'text-blue-500'
  },
  {
    id: '5',
    title: 'Sin Comisiones',
    description: 'Olvídate de perder el 30% en cada venta. Un plan mensual fijo y justo.',
    icon: TrendingUp,
    color: 'text-green-500'
  },
  {
    id: '6',
    title: 'Apoyo Local',
    description: 'Fomentamos el comercio de proximidad. Juntos hacemos pueblo.',
    icon: Heart,
    color: 'text-red-500'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 relative z-10 scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-text">
            Todo lo que necesitas para <span className="text-cta">crecer</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            Herramientas potentes diseñadas específicamente para la realidad de los negocios locales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ClayCard key={feature.id} className="p-8 group h-full flex flex-col items-start hover:bg-white transition-colors duration-500">
              <div className={`p-4 rounded-2xl bg-white shadow-inner mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.color}`}>
                <feature.icon size={32} strokeWidth={2} />
              </div>
              <h3 className="font-heading font-bold text-xl text-text mb-3">{feature.title}</h3>
              <p className="font-body text-gray-600 leading-relaxed flex-1">
                {feature.description}
              </p>
            </ClayCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;