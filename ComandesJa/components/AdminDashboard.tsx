import React, { useEffect, useState } from 'react';
import { LogOut, Users, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import RegistrationsList from './RegistrationsList';
import { getCurrentUser, signOut, supabase, BusinessRegistration } from '../src/lib/supabase';

interface AdminDashboardProps {
    onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
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
        loadUser();
        loadRegistrations();
    }, []);

    const loadUser = async () => {
        const { user } = await getCurrentUser();
        setUser(user);
    };

    const loadRegistrations = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('business_registrations')
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

    const handleRegistrationUpdate = () => {
        // Reload registrations after update
        loadRegistrations();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="font-heading font-bold text-2xl text-gray-800">
                                Panel de Administración
                            </h1>
                            <p className="text-sm text-gray-600">
                                {user?.email}
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
                    />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
