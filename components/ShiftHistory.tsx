import React, { useState, useEffect } from 'react';
import { shiftService } from '../services/shiftService';
import { Shift } from '../types';
import { Folder, Calendar, ChevronRight, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ShiftHistory: React.FC = () => {
    const navigate = useNavigate();
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [view, setView] = useState<'MONTHS' | 'DAYS' | 'SHIFTS'>('MONTHS');
    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    useEffect(() => {
        const allShifts = shiftService.getShifts();
        // Sort by newest first
        allShifts.sort((a, b) => new Date(b.openedAt).getTime() - new Date(a.openedAt).getTime());
        setShifts(allShifts);
    }, []);

    // Grouping Logic
    const shiftsByMonth = shifts.reduce((acc, shift) => {
        const date = new Date(shift.openedAt);
        const key = date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
        if (!acc[key]) acc[key] = [];
        acc[key].push(shift);
        return acc;
    }, {} as Record<string, Shift[]>);

    const shiftsByDay = (monthKey: string) => {
        const monthShifts = shiftsByMonth[monthKey] || [];
        return monthShifts.reduce((acc, shift) => {
            const date = new Date(shift.openedAt);
            const key = date.toLocaleDateString('es-ES', { day: 'numeric', weekday: 'long' });
            if (!acc[key]) acc[key] = [];
            acc[key].push(shift);
            return acc;
        }, {} as Record<string, Shift[]>);
    };

    // Navigation Handlers
    const handleMonthClick = (month: string) => {
        setSelectedMonth(month);
        setView('DAYS');
    };

    const handleDayClick = (day: string) => {
        setSelectedDay(day);
        setView('SHIFTS');
    };

    const handleBack = () => {
        if (view === 'SHIFTS') {
            setView('DAYS');
            setSelectedDay(null);
        } else if (view === 'DAYS') {
            setView('MONTHS');
            setSelectedMonth(null);
        } else {
            navigate('/admin/shift');
        }
    };

    // Render Helpers
    const renderMonths = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(shiftsByMonth).map((month) => (
                <button
                    key={month}
                    onClick={() => handleMonthClick(month)}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all flex items-center space-x-4 group text-left w-full"
                >
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Folder size={24} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 capitalize">{month}</h3>
                        <p className="text-sm text-gray-500">{shiftsByMonth[month].length} cierres registrados</p>
                    </div>
                    <ChevronRight className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </button>
            ))}
            {Object.keys(shiftsByMonth).length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">
                    <Folder size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No hay historiales de cierre guardados aún.</p>
                </div>
            )}
        </div>
    );

    const renderDays = () => {
        if (!selectedMonth) return null;
        const days = shiftsByDay(selectedMonth);

        return (
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6 capitalize flex items-center gap-2">
                    <Folder className="text-gray-400" size={20} />
                    {selectedMonth}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.keys(days).map((day) => (
                        <button
                            key={day}
                            onClick={() => handleDayClick(day)}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all flex items-center space-x-4 group text-left w-full"
                        >
                            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Calendar size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 capitalize">{day}</h3>
                                <p className="text-sm text-gray-500">{days[day].length} turnos</p>
                            </div>
                            <ChevronRight className="text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    const renderShifts = () => {
        if (!selectedMonth || !selectedDay) return null;
        const days = shiftsByDay(selectedMonth);
        const dayShifts = days[selectedDay] || [];

        return (
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 capitalize flex items-center gap-2">
                    <span className="text-gray-400 flex items-center gap-2">
                        <Folder size={20} /> {selectedMonth} <ChevronRight size={16} />
                    </span>
                    {selectedDay}
                </h2>

                <div className="grid gap-4">
                    {dayShifts.map((shift) => (
                        <div key={shift.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${shift.type === 'MORNING' ? 'bg-orange-100 text-orange-600' : 'bg-indigo-100 text-indigo-600'}`}>
                                    <FileText size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">
                                        {shift.type === 'MORNING' ? 'Turno Mañana' : 'Turno Noche'}
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {new Date(shift.openedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {shift.closedAt ? new Date(shift.closedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'En curso'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 md:items-end text-sm">
                                <div className="text-right">
                                    <p className="text-gray-500">Total Declarado</p>
                                    <p className="font-bold text-gray-900">€{(shift.declaredCash + shift.declaredCard).toFixed(2)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-500">Descuadre</p>
                                    <p className={`font-bold ${shift.difference === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {shift.difference > 0 ? '+' : ''}{shift.difference.toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50/50 p-8 pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={handleBack}
                        className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Historial de Cierres</h1>
                        <p className="text-gray-500">Archivo digital de turnos pasados</p>
                    </div>
                </div>

                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {view === 'MONTHS' && renderMonths()}
                    {view === 'DAYS' && renderDays()}
                    {view === 'SHIFTS' && renderShifts()}
                </div>
            </div>
        </div>
    );
};

export default ShiftHistory;
