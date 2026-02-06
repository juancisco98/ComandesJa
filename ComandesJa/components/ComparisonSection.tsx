import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const ComparisonSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-green-50/30 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                        ¿Por qué elegir <span className="text-primary">ComandesJa</span>?
                    </h2>
                    <p className="text-xl text-gray-600">
                        La diferencia entre sobrevivir al servicio y dominarlo.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto relative">

                    {/* Central VS Badge (Desktop) */}
                    <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full items-center justify-center font-black text-xl text-gray-300 shadow-xl border-4 border-gray-50 z-20">
                        VS
                    </div>

                    {/* Without App Card */}
                    <div className="bg-white rounded-3xl p-8 border border-red-100 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-300">
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                <XCircle size={24} />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-gray-800">
                                Sin ComandesJa
                            </h3>
                        </div>

                        <ul className="space-y-6">
                            {[
                                { title: "Pedidos Perdidos", desc: "Comandas de papel que se pierden o son ilegibles." },
                                { title: "Tiempos de Espera", desc: "Clientes esperando para pedir o pagar." },
                                { title: "Menú Estático", desc: "Cartas sucias, desactualizadas y costosas de reimprimir." },
                                { title: "Personal Saturado", desc: "Camareros corriendo y estresados." },
                                { title: "Caja Ciega", desc: "No sabes qué vendes hasta el cierre." }
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity">
                                    <XCircle className="text-red-400 shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="font-bold text-gray-700">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* With App Card */}
                    <div className="bg-white rounded-3xl p-8 border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden transform md:-translate-y-4 md:hover:-translate-y-6 transition-all duration-300 z-10">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-400"></div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-primary">
                                <CheckCircle2 size={24} />
                            </div>
                            <h3 className="font-heading font-bold text-2xl text-gray-800">
                                Con ComandesJa
                            </h3>
                        </div>

                        <ul className="space-y-6">
                            {[
                                { title: "Precisión Digital", desc: "Pedidos directos a cocina sin errores." },
                                { title: "Autogestión", desc: "El cliente pide y paga desde su móvil al instante." },
                                { title: "Menú Vivo", desc: "Cambios de precio y stock en tiempo real." },
                                { title: "Servicio Eficiente", desc: "Personal enfocado en la experiencia y upsell." },
                                { title: "Control Total", desc: "Métricas y ventas en tiempo real." }
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-4 items-start">
                                    <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                                    <div>
                                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Decoration */}
                        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
                    </div>

                </div>

                {/* Mobile VS Badge */}
                <div className="md:hidden flex justify-center -my-4 relative z-20">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-black text-gray-300 shadow-lg border-2 border-gray-50">
                        VS
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ComparisonSection;
