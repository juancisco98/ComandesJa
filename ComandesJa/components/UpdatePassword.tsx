import React, { useState, useEffect } from 'react';
import { Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Button from './Button';
import { supabase } from '../src/lib/supabase';

interface UpdatePasswordProps {
    onSuccess: () => void;
}

const UpdatePassword: React.FC<UpdatePasswordProps> = ({ onSuccess }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 3000);
        } catch (error: any) {
            console.error('Error updating password:', error);
            setError(error.message || 'Error al actualizar la contraseña');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
                <div className="glass-panel rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl bg-white/80 backdrop-blur-xl text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h2 className="font-heading font-bold text-2xl text-gray-800 mb-2">
                        ¡Contraseña Actualizada!
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Tu contraseña ha sido modificada correctamente. Redirigiendo al login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="glass-panel rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl bg-white/80 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-green-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Lock size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="font-heading font-bold text-3xl text-gray-800 mb-2">
                        Nueva Contraseña
                    </h1>
                    <p className="text-gray-600">
                        Ingresa tu nueva contraseña para recuperar el acceso
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Nueva Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="cta"
                        disabled={loading}
                        className="w-full py-4 text-lg shadow-xl shadow-green-600/20 flex items-center justify-center gap-3 mt-6"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                Actualizando...
                            </>
                        ) : (
                            <>
                                <CheckCircle size={20} />
                                Actualizar Contraseña
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
