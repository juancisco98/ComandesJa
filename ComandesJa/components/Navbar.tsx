import React, { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import Button from './Button';

interface NavbarProps {
  onRegister: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onRegister }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="glass-panel rounded-full px-6 py-3 flex justify-between items-center shadow-glass backdrop-blur-xl bg-white/60 border border-white/50">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-primary to-green-300 p-2 rounded-full text-white shadow-lg">
            <ShoppingBag size={20} strokeWidth={2.5} />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-gray-800">
            Comandes<span className="text-green-600">Ja</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-bold text-gray-600 hover:text-primary hover:bg-white/40 px-3 py-2 rounded-full transition-all cursor-pointer">Características</a>
          <a href="#testimonials" className="text-sm font-bold text-gray-600 hover:text-primary hover:bg-white/40 px-3 py-2 rounded-full transition-all cursor-pointer">Testimonios</a>
          <a href="#pricing" className="text-sm font-bold text-gray-600 hover:text-primary hover:bg-white/40 px-3 py-2 rounded-full transition-all cursor-pointer">Precios</a>
          <Button variant="primary" size="sm" className="rounded-full shadow-lg shadow-green-500/20" onClick={onRegister}>
            Registrar mi Local
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 p-2 hover:bg-white/40 rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-4 mx-2 glass-panel rounded-3xl p-6 flex flex-col gap-4 animate-fade-in-down md:hidden bg-white/80 backdrop-blur-xl">
          <a href="#features" className="text-lg font-bold text-gray-700 p-2 hover:bg-white/50 rounded-xl transition-all text-center cursor-pointer" onClick={closeMenu}>Características</a>
          <a href="#testimonials" className="text-lg font-bold text-gray-700 p-2 hover:bg-white/50 rounded-xl transition-all text-center cursor-pointer" onClick={closeMenu}>Testimonios</a>
          <a href="#pricing" className="text-lg font-bold text-gray-700 p-2 hover:bg-white/50 rounded-xl transition-all text-center cursor-pointer" onClick={closeMenu}>Precios</a>
          <Button variant="primary" className="w-full rounded-full" onClick={() => { closeMenu(); onRegister(); }}>
            Registrar mi Local
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;