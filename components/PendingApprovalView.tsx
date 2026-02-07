
import React from 'react';
import { Clock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PendingApprovalView: React.FC = () => {
    const { logout, user } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock size={40} strokeWidth={2} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Cuenta Pendiente de Aprobación</h1>

                <p className="text-gray-600 mb-6">
                    Hola <strong>{user?.name || 'Usuario'}</strong>,<br />
                    Hemos recibido tu solicitud de registro.
                </p>

                <div className="bg-blue-50 text-blue-800 p-4 rounded-xl text-sm mb-8 text-left">
                    <p className="font-bold mb-1">Próximos pasos:</p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>El administrador revisará tus datos.</li>
                        <li>Te contactaremos para verificar tu local.</li>
                        <li>Una vez aprobado, podrás acceder al panel.</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors"
                    >
                        Verificar Estado Nuevamente
                    </button>

                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-gray-700 font-medium py-3 transition-colors"
                    >
                        <LogOut size={18} />
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            <p className="mt-8 text-xs text-gray-400">
                ID de Cuenta: {user?.id}
            </p>
        </div>
    );
};

export default PendingApprovalView;
