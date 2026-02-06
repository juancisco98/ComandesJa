import React, { useEffect, useState } from 'react';
import { LogIn, Loader2, Mail, Lock } from 'lucide-react';
import Button from './Button';
import { supabase, getSession } from '../src/lib/supabase';

interface AdminLoginProps {
    onLoginSuccess: (isDemo?: boolean) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resetSent, setResetSent] = useState(false);

    useEffect(() => {
        // Check if user is already logged in
        checkSession();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            console.log('Auth state changed:', event, session?.user?.email);

            if (event === 'SIGNED_IN' && session?.user?.email === 'juan.sada98@gmail.com') {
                console.log('Admin authenticated successfully');
                onLoginSuccess();
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [onLoginSuccess]);

    const checkSession = async () => {
        const { session } = await getSession();
        if (session?.user?.email === 'juan.sada98@gmail.com') {
            onLoginSuccess();
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Backdoor for demo/testing as requested
        if (email === 'juan.sada98@gmail.com' && password === '0000') {
            onLoginSuccess(true);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user?.email !== 'juan.sada98@gmail.com') {
                await supabase.auth.signOut();
                throw new Error('Acceso denegado. Solo juan.sada98@gmail.com puede acceder.');
            }

            onLoginSuccess();
        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.message || 'Error al iniciar sesión');
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('Por favor ingresa tu email primero');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/?type=recovery`,
            });

            if (error) throw error;

            setResetSent(true);
            setError('');
        } catch (error: any) {
            setError(error.message || 'Error al enviar email de recuperación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
            <div className="glass-panel rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl bg-white/80 backdrop-blur-xl">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-tr from-primary to-green-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <LogIn size={40} className="text-white" strokeWidth={2.5} />
                    </div>
                    <h1 className="font-heading font-bold text-3xl text-gray-800 mb-2">
                        Acceso - Creador del Sistema
                    </h1>
                    <p className="text-gray-600">
                        Área exclusiva para la gestión global
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                {resetSent && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                        <p className="text-green-600 text-sm">
                            ✅ Email de recuperación enviado. Revisa tu bandeja de entrada.
                        </p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@sistema.com"
                                required
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Contraseña
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

                    <Button
                        type="submit"
                        variant="cta"
                        disabled={loading}
                        className="w-full py-4 text-lg shadow-xl shadow-green-600/20 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={24} />
                                Iniciando sesión...
                            </>
                        ) : (
                            <>
                                <LogIn size={20} />
                                Iniciar Sesión
                            </>
                        )}
                    </Button>
                </form>

                <button
                    type="button"
                    onClick={handleResetPassword}
                    disabled={loading}
                    className="w-full mt-4 text-sm text-gray-600 hover:text-primary transition-colors underline"
                >
                    ¿Olvidaste tu contraseña?
                </button>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Solo accesible para juan.sada98@gmail.com
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
