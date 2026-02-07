import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/50 backdrop-blur-lg pt-16 pb-32 border-t border-white/40">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <span className="font-heading font-extrabold text-2xl text-text">
            Comandes<span className="text-primary">Ja</span>
          </span>
          <p className="text-gray-600 max-w-sm">
            Ayudando a los negocios locales a prosperar en la era digital sin perder su esencia. Hecho con ❤️ para nuestra ciudad.
          </p>
        </div>
        
        <div>
          <h4 className="font-heading font-bold text-lg mb-4">Plataforma</h4>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#" className="hover:text-primary transition-colors">Para Negocios</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Para Clientes</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Soporte</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold text-lg mb-4">Síguenos</h4>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white rounded-xl shadow-clay hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="p-2 bg-white rounded-xl shadow-clay hover:text-blue-600 transition-colors"><Facebook size={20} /></a>
            <a href="#" className="p-2 bg-white rounded-xl shadow-clay hover:text-sky-500 transition-colors"><Twitter size={20} /></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-12 text-gray-400 text-sm">
        © {new Date().getFullYear()} Comandes Ja. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;