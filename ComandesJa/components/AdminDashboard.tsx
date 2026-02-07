import React, { useEffect, useState } from 'react';
import { LogOut, Users, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import RegistrationsList from './RegistrationsList';
import { getCurrentUser, signOut, supabase, BusinessRegistration } from '../src/lib/supabase';

interface AdminDashboardProps {
    onLogout: () => void;
    isDemo?: boolean;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, isDemo = false }) => {
    const [user, setUser] = useState<any>(null);
    const [registrations, setRegistrations] = useState<BusinessRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        contacted: 0,
        approved: 0
    });

    useEffect(() => {
        if (isDemo) {
            loadMockData();
        } else {
            loadUser();
            loadRegistrations();
        }
    }, [isDemo]);

    const loadMockData = () => {
        setLoading(true);
        // Datos de ejemplo para el modo demo
        const mockData: BusinessRegistration[] = [
            {
                id: '1',
                nombre_local: 'Burger Town',
                email: 'contacto@burgertown.com',
                owner_name: 'Carlos Ruiz',
                telefono: '600 123 456',
                categoria: 'Restaurante',
                plan_contratado: 'Plan Mensual',
                status: 'pending',
                created_at: new Date().toISOString()
            },
            {
                id: '2',
                nombre_local: 'Café Central',
                email: 'hola@cafecentral.es',
                owner_name: 'Ana Gómez',
                telefono: '600 987 654',
                categoria: 'Cafetería',
                plan_contratado: 'Plan Anual',
                status: 'contacted',
                created_at: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: '3',
                nombre_local: 'La Pizzería',
                email: 'info@lapizzeria.com',
                owner_name: 'Mario Rossi',
                telefono: '600 555 555',
                categoria: 'Restaurante',
                plan_contratado: 'Plan Semestral',
                status: 'approved',
                created_at: new Date(Date.now() - 172800000).toISOString()
            }
        ];

        setRegistrations(mockData);
        setStats({
            total: 3,
            pending: 1,
            contacted: 1,
            approved: 1
        });
        setUser({ email: 'juan.sada98@gmail.com (Demo)' });
        setLoading(false);
    };

    const loadUser = async () => {
        const { user } = await getCurrentUser();
        setUser(user);
    };

    const loadRegistrations = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('locales')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setRegistrations(data || []);

            // Calculate stats
            const total = data?.length || 0;
            const pending = data?.filter(r => r.status === 'pending').length || 0;
            const contacted = data?.filter(r => r.status === 'contacted').length || 0;
            const approved = data?.filter(r => r.status === 'approved').length || 0;

            setStats({ total, pending, contacted, approved });
        } catch (error: any) {
            console.error('Error loading registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        onLogout();
    };

    const handleRegistrationUpdate = (updatedRegistration?: BusinessRegistration) => {
        if (isDemo && updatedRegistration) {
            setRegistrations(prev => {
                const updatedList = prev.map(r => r.id === updatedRegistration.id ? updatedRegistration : r);

                // Recalculate stats immediately for better UX
                const total = updatedList.length;
                const pending = updatedList.filter(r => r.status === 'pending').length;
                const contacted = updatedList.filter(r => r.status === 'contacted').length;
                const approved = updatedList.filter(r => r.status === 'approved').length;
                setStats({ total, pending, contacted, approved });

                return updatedList;
            });
        } else {
            // Normal behavior: Reload from DB
            loadRegistrations();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {isDemo && (
                        <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-sm" role="alert">
                            <p className="font-bold">Modo Demo Activo</p>
                            <p>Estás viendo datos de ejemplo simulados. Los cambios no se guardarán en la base de datos real.</p>
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-heading font-bold text-2xl text-gray-800">
                                Panel de Control - Creador
                            </h1>
                            <p className="text-sm text-gray-600">
                                Gestión Global del Sistema
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            onClick={handleSignOut}
                            className="flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Cerrar Sesión
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">{stats.total}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                                <Clock size={24} className="text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Contactados</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.contacted}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <CheckCircle size={24} className="text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel rounded-2xl p-6 bg-white/60 backdrop-blur-xl border border-white/50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Aprobados</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{stats.approved}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle size={24} className="text-green-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Registrations List */}
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="animate-spin text-primary" size={48} />
                    </div>
                ) : (
                    <RegistrationsList
                        registrations={registrations}
                        onUpdate={handleRegistrationUpdate}
                        isDemo={isDemo}
                    />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
