import React, { useState } from 'react';
import { Eye, Filter } from 'lucide-react';
import RegistrationDetail from './RegistrationDetail';
import { BusinessRegistration } from '../src/lib/supabase';

interface RegistrationsListProps {
    registrations: BusinessRegistration[];
    onUpdate: () => void;
}

const RegistrationsList: React.FC<RegistrationsListProps> = ({ registrations, onUpdate }) => {
    const [selectedRegistration, setSelectedRegistration] = useState<BusinessRegistration | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredRegistrations = filterStatus === 'all'
        ? registrations
        : registrations.filter(r => r.status === filterStatus);

    const getStatusBadge = (status?: string) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
            contacted: 'bg-blue-100 text-blue-700 border-blue-200',
            approved: 'bg-green-100 text-green-700 border-green-200',
            rejected: 'bg-red-100 text-red-700 border-red-200'
        };

        const labels = {
            pending: 'Pendiente',
            contacted: 'Contactado',
            approved: 'Aprobado',
            rejected: 'Rechazado'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles] || styles.pending}`}>
                {labels[status as keyof typeof labels] || 'Pendiente'}
            </span>
        );
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <>
            <div className="glass-panel rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 overflow-hidden">
                {/* Header with Filter */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="font-heading font-bold text-xl text-gray-800">
                        Solicitudes de Registro
                    </h2>
                    <div className="flex items-center gap-2">
                        <Filter size={18} className="text-gray-500" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer"
                        >
                            <option value="all">Todos</option>
                            <option value="pending">Pendientes</option>
                            <option value="contacted">Contactados</option>
                            <option value="approved">Aprobados</option>
                            <option value="rejected">Rechazados</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Negocio
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Dueño
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Categoría
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Plan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Estado
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Fecha
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                                        No hay registros para mostrar
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((registration) => (
                                    <tr
                                        key={registration.id}
                                        className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedRegistration(registration)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-semibold text-gray-800">{registration.business_name}</div>
                                            <div className="text-sm text-gray-500">{registration.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-800">{registration.owner_name}</div>
                                            <div className="text-sm text-gray-500">{registration.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                            {registration.category}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                                            {registration.selected_plan}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(registration.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {formatDate(registration.created_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedRegistration(registration);
                                                }}
                                                className="text-primary hover:text-primary-dark flex items-center gap-1 font-semibold"
                                            >
                                                <Eye size={16} />
                                                Ver
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedRegistration && (
                <RegistrationDetail
                    registration={selectedRegistration}
                    onClose={() => setSelectedRegistration(null)}
                    onUpdate={() => {
                        setSelectedRegistration(null);
                        onUpdate();
                    }}
                />
            )}
        </>
    );
};

export default RegistrationsList;
