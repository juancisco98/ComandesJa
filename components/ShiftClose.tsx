import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { shiftService } from '../services/shiftService';
import { Shift, ShiftType } from '../types';
import { Printer, Sun, Moon, CheckCircle2, AlertTriangle, Calculator, ArrowRight, Lock, DollarSign, CreditCard, Save, Folder } from 'lucide-react';

const ShiftClose: React.FC = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    // Steps: 'SELECT' -> 'COUNT' -> 'REVIEW' -> 'RECEIPT'
    const [step, setStep] = useState<'SELECT' | 'COUNT' | 'REVIEW' | 'RECEIPT'>('SELECT');
    const [selectedShiftType, setSelectedShiftType] = useState<ShiftType | null>(null);
    const [currentShift, setCurrentShift] = useState<Shift | null>(null);

    // Blind Count State
    const [declaredCash, setDeclaredCash] = useState<string>('');
    const [declaredCard, setDeclaredCard] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    // Calculated for review
    const [comparison, setComparison] = useState<{
        expectedCash: number;
        expectedCard: number;
        diffCash: number;
        diffCard: number;
        totalDiff: number;
    } | null>(null);

    // Initial load check
    useEffect(() => {
        // ideally check if there is already an open shift
    }, []);

    const handleShiftSelect = (type: ShiftType) => {
        setSelectedShiftType(type);
        // For demo: We essentially "start" the closing process for this shift type.
        // In a real app we might fetch the *actual* open shift for this type.
        // Here we simulate getting/creating one to close it.
        const shift = shiftService.openShift(type, 150); // Default float 150
        setCurrentShift(shift);
        setStep('COUNT');
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentShift) return;

        const dCash = parseFloat(declaredCash) || 0;
        const dCard = parseFloat(declaredCard) || 0;

        // Calculate expected based on current data
        const totals = shiftService.calculateTotals(currentShift);

        // Compare
        // Diff = Declared - Expected
        // Cash Expected = Sales + Initial Float
        const diffCash = dCash - totals.expectedCash;
        const diffCard = dCard - totals.expectedCard;

        setComparison({
            expectedCash: totals.expectedCash,
            expectedCard: totals.expectedCard,
            diffCash,
            diffCard,
            totalDiff: diffCash + diffCard
        });

        setStep('REVIEW');
    };

    const handleFinalize = () => {
        if (!currentShift || !comparison) return;

        const dCash = parseFloat(declaredCash) || 0;
        const dCard = parseFloat(declaredCard) || 0;

        const closedShift = shiftService.closeShift(currentShift.id, dCash, dCard, notes);
        setCurrentShift(closedShift);
        setStep('RECEIPT');
    };

    const [hasPrinted, setHasPrinted] = useState(false);

    const handlePrint = () => {
        setHasPrinted(true);
        window.print();
    };

    const handleLogout = () => {
        if (!hasPrinted) {
            alert("Por favor, imprime el comprobante antes de salir.");
            return;
        }
        logout();
        navigate('/login');
    };

    // --- RENDER HELPERS ---

    const renderStepSelect = () => (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Cierre de Turno</h2>
                    <p className="text-gray-500">Selecciona el turno que deseas cerrar.</p>
                </div>
                <button
                    onClick={() => navigate('/admin/history')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                    <Folder size={20} />
                    Ver Historial
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                    onClick={() => handleShiftSelect('MORNING')}
                    className="p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 transition-all group text-left shadow-sm hover:shadow-md cursor-pointer"
                >
                    <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Sun size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Turno Mañana</h3>
                    <p className="text-gray-500">Cierre de caja matutino</p>
                </button>

                <button
                    onClick={() => handleShiftSelect('NIGHT')}
                    className="p-8 rounded-2xl border-2 border-gray-100 bg-white hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group text-left shadow-sm hover:shadow-md cursor-pointer"
                >
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Moon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Turno Noche</h3>
                    <p className="text-gray-500">Cierre de caja nocturno</p>
                </button>
            </div>
        </div>
    );

    const renderStepCount = () => (
        <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setStep('SELECT')} className="text-gray-400 hover:text-gray-600 mb-6 flex items-center text-sm font-medium">
                ← Volver
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                        <Calculator size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Conteo Ciego</h2>
                        <p className="text-gray-500 text-sm">Ingresa el dinero que hay en caja sin ver el sistema.</p>
                    </div>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                            Efectivo Total en Caja (€)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={declaredCash}
                                onChange={(e) => setDeclaredCash(e.target.value)}
                                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-xl font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-2 ml-1">* Incluye el fondo de caja inicial</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                            Total Vouchers / Tarjeta (€)
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <CreditCard className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="number"
                                step="0.01"
                                required
                                value={declaredCard}
                                onChange={(e) => setDeclaredCard(e.target.value)}
                                className="block w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-xl font-medium focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-blue-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        >
                            <span>Verificar Cuadre</span>
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    const renderStepReview = () => {
        if (!comparison) return null;
        const isPerfect = Math.abs(comparison.totalDiff) < 0.5;

        return (
            <div className="max-w-3xl mx-auto animate-in zoom-in-95 duration-300">
                <button onClick={() => setStep('COUNT')} className="text-gray-400 hover:text-gray-600 mb-6 flex items-center text-sm font-medium">
                    ← Corregir Conteo
                </button>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Revisión de Caja</h2>
                            {isPerfect ? (
                                <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-2">
                                    <CheckCircle2 size={16} />
                                    Cuadre Perfecto
                                </span>
                            ) : (
                                <span className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-bold rounded-full flex items-center gap-2">
                                    <AlertTriangle size={16} />
                                    Descuadre: €{comparison.totalDiff.toFixed(2)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            {/* CASH SECTION */}
                            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <DollarSign size={18} /> Efectivo
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Declarado:</span>
                                        <span className="font-medium">€{parseFloat(declaredCash).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Esperado:</span>
                                        <span className="font-medium">€{comparison.expectedCash.toFixed(2)}</span>
                                    </div>
                                    <div className={`flex justify-between text-base font-bold pt-3 border-t ${comparison.diffCash === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>Diferencia:</span>
                                        <span>{comparison.diffCash > 0 ? '+' : ''}{comparison.diffCash.toFixed(2)} €</span>
                                    </div>
                                </div>
                            </div>

                            {/* CARD SECTION */}
                            <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                                <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                    <CreditCard size={18} /> Tarjeta
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Declarado:</span>
                                        <span className="font-medium">€{parseFloat(declaredCard).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Esperado:</span>
                                        <span className="font-medium">€{comparison.expectedCard.toFixed(2)}</span>
                                    </div>
                                    <div className={`flex justify-between text-base font-bold pt-3 border-t ${comparison.diffCard === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        <span>Diferencia:</span>
                                        <span>{comparison.diffCard > 0 ? '+' : ''}{comparison.diffCard.toFixed(2)} €</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes Section for Variance */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Comentarios / Justificación</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                                rows={3}
                                placeholder="Explica cualquier descuadre o añade notas del turno..."
                            ></textarea>
                        </div>

                        <button
                            onClick={handleFinalize}
                            className={`w-full flex items-center justify-center space-x-2 py-4 rounded-xl text-lg font-bold shadow-lg transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer ${!isPerfect && !notes
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 text-white shadow-green-200'
                                }`}
                            disabled={!isPerfect && !notes}
                        >
                            <Save size={20} />
                            <span>Confirmar y Cerrar Turno</span>
                        </button>
                        {!isPerfect && !notes && (
                            <p className="text-center text-xs text-red-500 mt-3">Debes añadir un comentario para justificar el descuadre.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const renderStepReceipt = () => {
        if (!currentShift) return null;

        return (
            <div className="max-w-xl mx-auto text-center animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">¡Turno Cerrado!</h2>
                <p className="text-gray-500 mb-8">El turno se ha guardado correctamente. No olvides imprimir el comprobante.</p>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={handlePrint}
                        className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                        <Printer size={20} /> Imprimir Z-Report
                    </button>
                    <button
                        onClick={handleLogout}
                        disabled={!hasPrinted}
                        className={`w-full border py-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer ${hasPrinted
                            ? 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        <Lock size={20} /> Salir del Sistema
                    </button>
                    {!hasPrinted && (
                        <p className="text-xs text-red-500">Debes imprimir el comprobante para habilitar la salida.</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <div className="min-h-screen bg-gray-50/50 p-6 no-print">
                {step === 'SELECT' && renderStepSelect()}
                {step === 'COUNT' && renderStepCount()}
                {step === 'REVIEW' && renderStepReview()}
                {step === 'RECEIPT' && renderStepReceipt()}
            </div>

            {/* PRINT RECEIPT - PORTAL */}
            {step === 'RECEIPT' && currentShift && createPortal(
                <div id="thermal-receipt" className="hidden print:block fixed inset-0 bg-white z-[9999] p-0 text-black m-0">
                    <div className="max-w-[800px] mx-auto pt-8">
                        {/* HEADER */}
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 print-flex">
                            <div>
                                <h1 className="text-3xl font-bold uppercase text-gray-900">ComandesJa - Cierre</h1>
                                <p className="text-gray-500">Comprobante de Turno</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">{new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-xl font-bold">{new Date().toLocaleTimeString()}</p>
                            </div>
                        </div>

                        {/* SUMMARY BADGE */}
                        <div className="mb-8 print-flex justify-between items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <div>
                                <h3 className="text-lg font-bold">Estado del Cierre</h3>
                                <p className="text-sm text-gray-500 uppercase">{currentShift.type === 'MORNING' ? 'Turno Mañana' : 'Turno Noche'}</p>
                            </div>
                            <div>
                                {Math.abs(currentShift.difference) < 0.5 ? (
                                    <span className="px-6 py-2 bg-green-100 text-green-800 font-bold rounded-full border border-green-200">
                                        ✓ CUADRE PERFECTO
                                    </span>
                                ) : (
                                    <span className="px-6 py-2 bg-red-100 text-red-800 font-bold rounded-full border border-red-200">
                                        ⚠ DESCUADRE: €{currentShift.difference.toFixed(2)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* DETAILS GRID */}
                        <div className="grid grid-cols-2 gap-8 mb-8 print-grid">
                            {/* CASH */}
                            <div className="p-6 rounded-xl border border-gray-200 bg-white">
                                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 text-lg">Efectivo (Cash)</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Declarado:</span>
                                        <span className="font-bold text-lg">€{currentShift.declaredCash.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Esperado:</span>
                                        <span className="font-medium">€{currentShift.expectedCash.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t text-sm">
                                        <span>Diferencia:</span>
                                        <span className={currentShift.declaredCash - currentShift.expectedCash !== 0 ? 'text-red-600 font-bold' : 'text-green-600'}>
                                            €{(currentShift.declaredCash - currentShift.expectedCash).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CARD */}
                            <div className="p-6 rounded-xl border border-gray-200 bg-white">
                                <h3 className="font-bold text-gray-800 mb-4 border-b pb-2 text-lg">Tarjeta / Banco</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Declarado:</span>
                                        <span className="font-bold text-lg">€{currentShift.declaredCard.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Esperado:</span>
                                        <span className="font-medium">€{currentShift.expectedCard.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t text-sm">
                                        <span>Diferencia:</span>
                                        <span className={currentShift.declaredCard - currentShift.expectedCard !== 0 ? 'text-red-600 font-bold' : 'text-green-600'}>
                                            €{(currentShift.declaredCard - currentShift.expectedCard).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* JUSTIFICATION / NOTES */}
                        <div className="mb-12">
                            <h3 className="font-bold text-gray-800 mb-2">Comentarios / Justificación</h3>
                            <div className="p-4 border border-gray-200 rounded-xl bg-gray-50 min-h-[100px]">
                                {currentShift.notes ? (
                                    <p className="text-gray-700">{currentShift.notes}</p>
                                ) : (
                                    <p className="text-gray-400 italic">Sin comentarios adicionales.</p>
                                )}
                            </div>
                        </div>

                        {/* SIGNATURE */}
                        <div className="flex justify-between mt-12 pt-12 border-t border-gray-200 print-flex">
                            <div className="text-center w-1/3">
                                <div className="border-t border-black pt-2">Firma Encargado</div>
                            </div>
                            <div className="text-center w-1/3">
                                <div className="border-t border-black pt-2">Firma Admin / Revisor</div>
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

export default ShiftClose;
