import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import Button from './Button';
import { supabase, BusinessRegistration } from '../src/lib/supabase';

interface RegistrationDetailProps {
    registration: BusinessRegistration;
    onClose: () => void;
    onUpdate: () => void;
}

const RegistrationDetail: React.FC<RegistrationDetailProps> = ({ registration, onClose, onUpdate }) => {
    const [status, setStatus] = useState(registration.status || 'pending');
    const [notes, setNotes] = useState(registration.notes || '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        setSaving(true);
        setError('');

        try {
            const { error } = await supabase
                .from('business_registrations')
                .update({
                    status,
                    notes,
                    updated_at: new Date().toISOString()
                })
                .eq('id', registration.id);

            if (error) throw error;

            onUpdate();
        } catch (error: any) {
            console.error('Error updating registration:', error);
            setError(error.message || 'Error al guardar los cambios');
            setSaving(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
            <div className="glass-panel rounded-3xl max-w-2xl w-full bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-primary/5 to-green-50">
                    <div>
                        <h3 className="font-heading font-bold text-2xl text-gray-800">
                            {registration.business_name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{registration.category}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all shadow-md"
                    >
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Business Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Dueño
                                </label>
                                <p className="text-gray-800 font-semibold mt-1">{registration.owner_name}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Email
                                </label>
                                <p className="text-gray-800 font-semibold mt-1">{registration.email}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Teléfono
                                </label>
                                <p className="text-gray-800 font-semibold mt-1">{registration.phone}</p>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    Plan Seleccionado
                                </label>
                                <p className="text-gray-800 font-semibold mt-1">{registration.selected_plan}</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Fecha de Registro
                                    </label>
                                    <p className="text-gray-800 mt-1">{formatDate(registration.created_at)}</p>
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Última Actualización
                                    </label>
                                    <p className="text-gray-800 mt-1">{formatDate(registration.updated_at)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Update */}
                        <div className="border-t border-gray-200 pt-4">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                                Estado
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer font-semibold"
                            >
                                <option value="pending">⏳ Pendiente</option>
                                <option value="contacted">📞 Contactado</option>
                                <option value="approved">✅ Aprobado</option>
                                <option value="rejected">❌ Rechazado</option>
                            </select>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                                Notas Internas
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Agregar notas sobre este registro..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50/50 flex gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="flex-1"
                        disabled={saving}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="cta"
                        onClick={handleSave}
                        disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Guardando...
                            </>
                        ) : (
                            <>
                                <Save size={18} />
                                Guardar Cambios
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDetail;
