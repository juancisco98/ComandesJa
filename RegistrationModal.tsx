import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import Button from './Button';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    ownerName: '',
    businessName: '',
    category: 'Restaurante', // Default category
    phone: '',
    email: '',
    plan: selectedPlan || 'Plan Mensual'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Update plan if prop changes
  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulating API Call
    setTimeout(() => {
      setStatus('success');
      
      // OPTIONAL: This constructs a mailto link to actually open the user's email client
      // asking to send the data to you. 
      // Replace 'tu-email@dominio.com' with your real email.
      const subject = `Nuevo Registro: ${formData.businessName} (${formData.category})`;
      const body = `Hola, quiero registrar mi local.\n\nDueño: ${formData.ownerName}\nLocal: ${formData.businessName}\nCategoría: ${formData.category}\nTeléfono: ${formData.phone}\nEmail: ${formData.email}\nPlan deseado: ${formData.plan}`;
      
      // Uncomment the line below if you want to force open the email client
      // window.location.href = `mailto:tu-email@dominio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-[#f0fdf4] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-scale-in border border-white/50">
        
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-xl p-6 border-b border-white/50 flex justify-between items-center">
           <h3 className="font-heading font-bold text-xl text-gray-800">
             {status === 'success' ? '¡Todo listo!' : 'Registra tu Local'}
           </h3>
           <button onClick={onClose} className="p-2 hover:bg-gray-200/50 rounded-full transition-colors">
             <X size={20} className="text-gray-500" />
           </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[80vh]">
          {status === 'success' ? (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                 <CheckCircle size={40} strokeWidth={3} />
               </div>
               <h4 className="font-heading font-bold text-2xl text-gray-800 mb-2">¡Solicitud Enviada!</h4>
               <p className="text-gray-600 mb-8">
                 Hemos recibido tus datos correctamente. Nos pondremos en contacto contigo al <strong>{formData.phone}</strong> en breve para activar tu cuenta como <strong>{formData.category}</strong>.
               </p>
               <Button variant="cta" onClick={onClose} className="w-full">
                 Entendido, gracias
               </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Nombre del Dueño</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Juan Pérez"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.ownerName}
                  onChange={e => setFormData({...formData, ownerName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Nombre del Local</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ej. Burger Town"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.businessName}
                  onChange={e => setFormData({...formData, businessName: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Categoría del Negocio</label>
                <select 
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Restaurante">🍔 Restaurante / Comida</option>
                    <option value="Cafetería">☕ Cafetería / Panadería</option>
                    <option value="Bar">🍺 Bar / Pub</option>
                    <option value="Farmacia">💊 Farmacia</option>
                    <option value="Supermercado">🛒 Supermercado / Tienda</option>
                    <option value="Tabaquería">🚬 Tabaquería</option>
                    <option value="Ropa">👗 Tienda de Ropa</option>
                    <option value="Servicios">💇‍♂️ Peluquería / Servicios</option>
                    <option value="Otro">✨ Otro</option>
                  </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Teléfono</label>
                  <input 
                    required
                    type="tel" 
                    placeholder="600 000 000"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Plan</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.plan}
                    onChange={e => setFormData({...formData, plan: e.target.value})}
                  >
                    <option value="Plan Mensual">Mensual (100€)</option>
                    <option value="Plan Semestral">Semestral (540€)</option>
                    <option value="Plan Anual">Anual (1000€)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Correo Electrónico</label>
                <input 
                  required
                  type="email" 
                  placeholder="hola@tulocal.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="cta" 
                  className="w-full py-4 text-lg shadow-xl shadow-green-600/20"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="animate-spin" /> Enviando...</>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Sin compromiso de pago inmediato.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;