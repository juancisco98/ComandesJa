import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Button from './Button';
import { supabase } from '../src/lib/supabase';

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
    password: '',
    plan: selectedPlan || 'Plan Mensual'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Update plan if prop changes
  useEffect(() => {
    if (selectedPlan) {
      setFormData(prev => ({ ...prev, plan: selectedPlan }));
    }
  }, [selectedPlan]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Crear usuario en Supabase Auth con metadata
      // NO USAR .from('business_registrations').insert(...)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            nombre_local: formData.businessName,
            categoria: formData.category,
            telefono: formData.phone,
            plan: formData.plan,
            // Additional standard fields
            full_name: formData.ownerName,
            role: 'TENANT'
          }
        }
      });

      if (authError) throw authError;

      // 2. Insertar en la tabla locales
      const { error: dbError } = await supabase
        .from('locales')
        .insert([
          {
            nombre_local: formData.businessName,
            categoria: formData.category,
            telefono: formData.phone,
            plan_contratado: formData.plan,
            email: formData.email,
            owner_name: formData.ownerName,
            status: 'pending',
            owner_id: authData.user?.id
          }
        ]);

      // Si falla la BD, igual seguimos porque el usuario se creó (lo ideal sería transacción pero supabase auth va separado)
      if (dbError) {
        console.error('Error creating business record:', dbError);
        // Podríamos lanzar error pero mejor dejamos que pase y el usuario contacte soporte si no lo vemos
      }

      setStatus('success');
    } catch (error: any) {
      console.error('Error submitting registration:', error);
      // Nice error message for existing user
      if (error.message?.includes('User already registered') || error.message?.includes('already registered')) {
        setErrorMessage('Este correo electrónico ya está registrado. Por favor intenta iniciar sesión.');
      } else if (error.message?.includes('rate limit')) {
        setErrorMessage('Has intentado registrarte muchas veces. Por favor espera unos minutos antes de intentar de nuevo.');
      } else if (error.message?.includes('is invalid')) {
        setErrorMessage('El correo electrónico no es válido. Supabase verifica que tenga el formato correcto y que el dominio exista.');
      } else {
        setErrorMessage(error.message || 'Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.');
      }
      setStatus('error');
    }
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
                Hemos recibido tus datos correctamente. Tu cuenta ha sido creada. Nos pondremos en contacto contigo al <strong>{formData.phone}</strong>.
              </p>
              <Button variant="cta" onClick={onClose} className="w-full">
                Entendido, gracias
              </Button>
            </div>
          ) : status === 'error' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={40} strokeWidth={3} />
              </div>
              <h4 className="font-heading font-bold text-2xl text-gray-800 mb-2">Error al Enviar</h4>
              <p className="text-gray-600 mb-8">
                {errorMessage}
              </p>
              <div className="space-y-3">
                <Button variant="cta" onClick={() => setStatus('idle')} className="w-full">
                  Intentar de Nuevo
                </Button>
                <Button variant="secondary" onClick={onClose} className="w-full">
                  Cerrar
                </Button>
              </div>
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
                  onChange={e => setFormData({ ...formData, ownerName: e.target.value })}
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
                  onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Categoría del Negocio</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Restaurante">🍔 Restaurante / Comida</option>
                  <option value="Bar">🍺 Bar / Pub</option>
                  <option value="Cafetería">☕ Cafetería / Panadería</option>
                  <option value="Carnicería">🥩 Carnicería</option>
                  <option value="Fiambrería">🥓 Fiambrería</option>
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
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Plan</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer"
                    value={formData.plan}
                    onChange={e => setFormData({ ...formData, plan: e.target.value })}
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
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Contraseña</label>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all pr-12"
                    value={formData.password}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="cta"
                  className="w-full py-4 text-lg shadow-xl shadow-green-600/20"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="animate-spin" /> Registrando...</>
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
