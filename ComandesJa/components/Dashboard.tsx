import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  Store, 
  LogOut, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChefHat, 
  ShoppingBag,
  TrendingUp,
  MoreVertical,
  Search,
  Plus,
  Power,
  Bell,
  Bike,
  AlertTriangle,
  ChevronDown,
  Volume2,
  Users,
  Megaphone,
  Settings,
  Receipt,
  BarChart3,
  LayoutGrid,
  ExternalLink,
  Eye,
  Percent,
  Trash2
} from 'lucide-react';
import ClayCard from './ClayCard';
import Button from './Button';

interface DashboardProps {
  onLogout: () => void;
}

// Mock Data Enhanced
const initialOrders = [
  { 
    id: '#8925', 
    client: 'Marta G.', 
    items: ['2x Smash Burger', '1x Patatas Bravas'], 
    total: '18.40€', 
    status: 'new', 
    time: '0 min', 
    type: 'delivery',
    notes: 'Sin cebolla por favor',
    payment: 'Pagado Online'
  },
  { 
    id: '#8924', 
    client: 'Josep L.', 
    items: ['1x Pizza Margarita', '1x Coca-Cola'], 
    total: '12.50€', 
    status: 'cooking', 
    time: '12 min', // Tiempo restante
    type: 'pickup',
    rider: null
  },
  { 
    id: '#8923', 
    client: 'Laia P.', 
    items: ['3x Tacos Pastor', '1x Nachos'], 
    total: '24.00€', 
    status: 'cooking', 
    time: '5 min', 
    type: 'delivery',
    rider: { name: 'Kevin R.', status: 'Llegando', eta: '3 min', vehicle: 'Moto' }
  },
  { 
    id: '#8920', 
    client: 'Ana R.', 
    items: ['1x Ensalada César'], 
    total: '9.90€', 
    status: 'ready', 
    time: 'Hace 10 min', 
    type: 'pickup',
    rider: null
  },
];

const menuItems = [
  { 
    id: 1, 
    name: 'Pizza Margarita', 
    cat: 'Pizzas', 
    price: '12.50', 
    active: true, 
    stock: 15, 
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    description: 'Tomate, mozzarella, albahaca fresca.'
  },
  { 
    id: 2, 
    name: 'Pizza 4 Quesos', 
    cat: 'Pizzas', 
    price: '14.00', 
    active: true, 
    stock: 15, 
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    description: 'Mozzarella, gorgonzola, parmesano y emmental.'
  },
  { 
    id: 3, 
    name: 'Burger Clásica', 
    cat: 'Hamburguesas', 
    price: '10.90', 
    active: true, 
    stock: 42, 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    description: 'Carne 100% vacuno, lechuga, tomate, queso cheddar.'
  },
  { 
    id: 4, 
    name: 'Burger BBQ', 
    cat: 'Hamburguesas', 
    price: '12.90', 
    active: true, 
    stock: 42, 
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    description: 'Doble carne, bacon, aros de cebolla y salsa BBQ.'
  },
  { 
    id: 5, 
    name: 'Dürüm Kebab', 
    cat: 'Kebab', 
    price: '7.50', 
    active: true, 
    stock: 100, 
    image: 'https://images.unsplash.com/photo-1647427060118-4a11aa7c767f?auto=format&fit=crop&w=800&q=80',
    description: 'Rollo de pan con carne mixta, lechuga y salsa de yogur.'
  },
];

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'menu' | 'stats' | 'crm' | 'marketing' | 'settings'>('orders');
  const [orders, setOrders] = useState(initialOrders);
  
  // Store Status Logic (The "Panic Button")
  const [storeStatus, setStoreStatus] = useState<'open' | 'busy' | 'closed'>('open');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [busyUntil, setBusyUntil] = useState<Date | null>(null);

  // Group menu items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    if (!acc[item.cat]) {
      acc[item.cat] = [];
    }
    acc[item.cat].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  // Helper to move orders
  const moveOrder = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const addTime = (id: string) => {
    // Mock functionality to visually update time
    alert("Se han añadido 5 minutos. El cliente y el rider han sido notificados.");
  };

  const handleStatusChange = (status: 'open' | 'busy' | 'closed', durationMinutes: number = 0) => {
    setStoreStatus(status);
    setShowStatusMenu(false);
    if (status === 'busy' && durationMinutes > 0) {
        const date = new Date();
        date.setMinutes(date.getMinutes() + durationMinutes);
        setBusyUntil(date);
    } else {
        setBusyUntil(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0fdf4] flex flex-col md:flex-row font-body text-text overflow-hidden">
      
      {/* Sidebar Navigation - Replicated from Screenshot */}
      <aside className="w-full md:w-64 bg-white/90 backdrop-blur-xl border-r border-gray-200 flex flex-col z-20 shadow-lg h-full">
        
        {/* New Header */}
        <div className="pt-8 pb-6 px-4 flex flex-col items-center border-b border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-primary mb-3 shadow-inner">
            <Store size={32} strokeWidth={2} />
          </div>
          <h2 className="font-heading font-extrabold text-xl text-gray-800 tracking-tight">
            Comandes<span className="text-primary">Ja</span>
          </h2>
          <p className="text-gray-400 text-sm font-semibold">La Pizzeria de Berga</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 space-y-1 py-6 overflow-y-auto custom-scrollbar">
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'orders' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutGrid size={18} />
            <span>Cuina (Pedidos)</span>
            {orders.filter(o => o.status === 'new').length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {orders.filter(o => o.status === 'new').length}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'menu' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <UtensilsCrossed size={18} />
            <span>Menú Editor</span>
          </button>

          <button 
            onClick={() => setActiveTab('crm')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'crm' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Users size={18} />
            <span>Clientes (CRM)</span>
          </button>

          <button 
            onClick={() => setActiveTab('stats')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'stats' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <BarChart3 size={18} />
            <span>Analítica</span>
          </button>

           <button 
            onClick={() => setActiveTab('marketing')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'marketing' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Megaphone size={18} />
            <span>Marketing</span>
          </button>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
              ${activeTab === 'settings' ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Settings size={18} />
            <span>Configuración</span>
          </button>

           <button 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-gray-600 hover:bg-gray-50"
          >
            <Receipt size={18} />
            <span>Cierre de Turno</span>
          </button>

        </nav>

        {/* Footer Area */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm shadow-sm border border-blue-100">
             <ExternalLink size={16} />
             VISTA PREVIA TIENDA
          </button>
          
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-xs font-bold">
            <LogOut size={14} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden h-screen">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Top Header - THE CONTROL CENTER */}
        <header className="h-20 px-4 md:px-8 flex items-center justify-between bg-white/40 backdrop-blur-sm border-b border-white/50 shrink-0">
          <h2 className="font-heading font-bold text-2xl hidden md:block">
            {activeTab === 'orders' && 'Cocina en Tiempo Real'}
            {activeTab === 'menu' && ''} {/* Blank header for Menu tab as it has its own custom header inside */}
            {activeTab === 'stats' && 'Métricas del Negocio'}
            {activeTab === 'crm' && 'Base de Clientes'}
            {activeTab === 'marketing' && 'Campañas y Promos'}
            {activeTab === 'settings' && 'Configuración del Local'}
          </h2>

          <div className="flex items-center gap-4 ml-auto">
            
            {/* --- PANIC BUTTON / STORE STATUS --- */}
            <div className="relative">
                <button 
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-full border shadow-sm transition-all active:scale-95
                        ${storeStatus === 'open' ? 'bg-green-100 border-green-200 text-green-800' : ''}
                        ${storeStatus === 'busy' ? 'bg-orange-100 border-orange-200 text-orange-800' : ''}
                        ${storeStatus === 'closed' ? 'bg-red-100 border-red-200 text-red-800' : ''}
                    `}
                >
                    <div className={`w-3 h-3 rounded-full ${storeStatus === 'open' ? 'bg-green-500 animate-pulse' : storeStatus === 'busy' ? 'bg-orange-500' : 'bg-red-500'}`}></div>
                    <span className="font-bold text-sm">
                        {storeStatus === 'open' ? 'ABIERTO' : storeStatus === 'busy' ? `PAUSADO (${busyUntil?.getHours()}:${String(busyUntil?.getMinutes()).padStart(2,'0')})` : 'CERRADO'}
                    </span>
                    <ChevronDown size={16} />
                </button>

                {/* Status Dropdown */}
                {showStatusMenu && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 animate-fade-in-down">
                        <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase">Control de Disponibilidad</div>
                        <button onClick={() => handleStatusChange('open')} className="w-full text-left px-3 py-2 hover:bg-green-50 rounded-xl text-green-700 font-bold flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div> Abierto Normal
                        </button>
                        <div className="my-1 border-t border-gray-100"></div>
                        <div className="px-3 py-1 text-xs text-gray-400">Pausar pedidos (Cocina Saturada)</div>
                        <button onClick={() => handleStatusChange('busy', 30)} className="w-full text-left px-3 py-2 hover:bg-orange-50 rounded-xl text-orange-700 font-medium text-sm">
                           ✋ Pausar 30 min
                        </button>
                        <button onClick={() => handleStatusChange('busy', 60)} className="w-full text-left px-3 py-2 hover:bg-orange-50 rounded-xl text-orange-700 font-medium text-sm">
                           ✋ Pausar 1 hora
                        </button>
                        <div className="my-1 border-t border-gray-100"></div>
                        <button onClick={() => handleStatusChange('closed')} className="w-full text-left px-3 py-2 hover:bg-red-50 rounded-xl text-red-700 font-bold flex items-center gap-2">
                             <Power size={14} /> Cerrar Tienda
                        </button>
                    </div>
                )}
            </div>

            <div className="h-8 w-px bg-gray-300/50 mx-2"></div>

            <div className="flex items-center gap-2 text-gray-500 text-xs font-bold bg-white/50 px-3 py-1.5 rounded-full border border-white/60">
                <Volume2 size={14} className="text-primary" />
                <span>ON</span>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all">
              <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=60" alt="Local Profile" />
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide">
          
          {/* ----- ORDER VIEW (KANBAN) ----- */}
          {activeTab === 'orders' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[500px]">
              
              {/* Column 1: New Orders (ALERT MODE) */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2 px-2 bg-red-50 p-3 rounded-xl border border-red-100">
                  <h3 className="font-heading font-extrabold text-lg text-red-600 flex items-center gap-2 uppercase tracking-wide">
                    <Bell size={20} className="animate-swing" />
                    Entrantes
                  </h3>
                  <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">{orders.filter(o => o.status === 'new').length}</span>
                </div>
                
                <div className="space-y-4">
                  {orders.filter(o => o.status === 'new').map(order => (
                    <ClayCard key={order.id} className="p-0 border-2 border-red-500 shadow-xl overflow-hidden group animate-pulse-slow">
                      {/* High Alert Header */}
                      <div className="bg-red-500 p-3 flex justify-between items-center text-white">
                          <span className="font-bold animate-pulse">¡NUEVO PEDIDO!</span>
                          <span className="text-xs bg-red-700 px-2 py-1 rounded font-mono">00:34</span>
                      </div>
                      
                      <div className="p-5">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-heading font-extrabold text-2xl text-gray-800">{order.id}</h4>
                              <p className="text-base font-bold text-gray-600">{order.client}</p>
                              <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-xs font-bold text-gray-500 uppercase">
                                  {order.type === 'delivery' ? <Bike size={12}/> : <ShoppingBag size={12}/>} 
                                  {order.type}
                              </div>
                            </div>
                            <div className="text-right">
                                <span className="block font-heading font-extrabold text-2xl text-primary">{order.total}</span>
                                <span className="text-xs text-green-600 font-bold flex items-center gap-1 justify-end"><CheckCircle size={10}/> {order.payment}</span>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-3 rounded-xl mb-4 text-sm space-y-2 border border-gray-100">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex gap-2 font-medium text-gray-700">
                                  <span className="text-gray-400">1x</span> {item}
                              </div>
                            ))}
                            {order.notes && (
                                <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-xs font-bold rounded border border-yellow-100 flex gap-2">
                                    <AlertTriangle size={14} /> Nota: {order.notes}
                                </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                             <button className="p-3 rounded-xl border-2 border-red-100 text-red-500 font-bold hover:bg-red-50 transition-colors">
                                Rechazar
                             </button>
                             <Button 
                                variant="cta" 
                                className="w-full justify-center shadow-lg shadow-green-500/20"
                                onClick={() => moveOrder(order.id, 'cooking')}
                             >
                                ACEPTAR
                             </Button>
                          </div>
                      </div>
                    </ClayCard>
                  ))}
                  {orders.filter(o => o.status === 'new').length === 0 && (
                     <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-white/30">
                       <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                           <Clock size={32} className="text-gray-400" />
                       </div>
                       <p className="font-bold text-gray-400">Esperando pedidos...</p>
                       <p className="text-xs text-gray-400">El sonido está activado</p>
                     </div>
                  )}
                </div>
              </div>

              {/* Column 2: In Kitchen (TIMING & RIDERS) */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2 px-2 bg-orange-50 p-3 rounded-xl border border-orange-100">
                  <h3 className="font-heading font-extrabold text-lg text-orange-600 flex items-center gap-2 uppercase tracking-wide">
                    <ChefHat size={20} />
                    Cocina
                  </h3>
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">{orders.filter(o => o.status === 'cooking').length}</span>
                </div>

                <div className="space-y-4">
                  {orders.filter(o => o.status === 'cooking').map(order => (
                    <ClayCard key={order.id} className="p-5 border-l-4 border-orange-400 relative">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-xl">{order.id}</h4>
                          <p className="text-sm font-semibold text-gray-500">{order.client}</p>
                        </div>
                        <div className="text-right">
                           <div className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-lg">
                                <Clock size={14} />
                                <span className="font-bold font-mono">{order.time}</span>
                           </div>
                        </div>
                      </div>
                      
                      {/* Rider Info Section */}
                      {order.type === 'delivery' && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                             {order.rider ? (
                                 <>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold text-xs">
                                            {order.rider.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-blue-900">{order.rider.name}</p>
                                            <p className="text-[10px] font-bold text-blue-500 uppercase">{order.rider.vehicle} • {order.rider.status}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase">Llega en</p>
                                        <p className="text-sm font-bold text-blue-700">{order.rider.eta}</p>
                                    </div>
                                 </>
                             ) : (
                                 <div className="flex items-center gap-2 text-gray-500 text-sm">
                                     <div className="animate-spin w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full"></div>
                                     Buscando repartidor...
                                 </div>
                             )}
                          </div>
                      )}

                      <div className="bg-gray-50 p-3 rounded-lg mb-4 text-sm space-y-1 opacity-90 border border-gray-100">
                        {order.items.map((item, idx) => (
                          <p key={idx} className="font-medium text-gray-700">• {item}</p>
                        ))}
                      </div>

                      <div className="flex gap-2">
                          <button 
                            onClick={() => addTime(order.id)}
                            className="px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition-colors"
                          >
                             +5 min
                          </button>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            className="flex-1 justify-center bg-orange-500 hover:bg-orange-600 border-none"
                            onClick={() => moveOrder(order.id, 'ready')}
                          >
                            Marcar Listo
                          </Button>
                      </div>
                    </ClayCard>
                  ))}
                </div>
              </div>

              {/* Column 3: Ready/Delivery */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2 px-2 bg-green-50 p-3 rounded-xl border border-green-100">
                  <h3 className="font-heading font-extrabold text-lg text-green-700 flex items-center gap-2 uppercase tracking-wide">
                    <CheckCircle size={20} />
                    Listos
                  </h3>
                  <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">{orders.filter(o => o.status === 'ready').length}</span>
                </div>

                <div className="space-y-4">
                  {orders.filter(o => o.status === 'ready').map(order => (
                    <ClayCard key={order.id} className="p-5 border-l-4 border-green-500 opacity-75 grayscale-[30%] hover:grayscale-0 transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-[10px] font-extrabold text-white bg-green-500 px-2 py-0.5 rounded uppercase mb-1 inline-block">
                            {order.type === 'delivery' ? 'Esperando Rider' : 'Para llevar'}
                          </span>
                          <h4 className="font-bold text-lg text-gray-600">{order.id}</h4>
                        </div>
                        <CheckCircle size={24} className="text-green-500" />
                      </div>
                      <p className="text-sm font-bold text-gray-700 mb-2">{order.client}</p>
                      
                      <div className="bg-gray-50 p-2 rounded-lg text-xs space-y-1 text-gray-500">
                        {order.items.map((item, idx) => (
                          <p key={idx}>• {item}</p>
                        ))}
                      </div>
                    </ClayCard>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ----- MENU VIEW (VERTICAL GRID WITH IMAGES) ----- */}
          {activeTab === 'menu' && (
            <div className="max-w-6xl mx-auto space-y-8 pb-12">
               
               {/* Menu Header */}
               <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <div>
                    <h2 className="font-heading font-extrabold text-3xl text-gray-800">Menú Digital</h2>
                    <p className="text-gray-500 mt-1 font-medium">Organiza tu carta, cambia precios y gestiona ofertas.</p>
                  </div>
                  <Button variant="cta" size="sm" className="shadow-lg shadow-green-600/20 whitespace-nowrap">
                    <Plus size={18} /> Nuevo Producto
                  </Button>
               </div>
               
               {/* Loop through categories */}
               {Object.entries(groupedMenu).map(([category, items]) => (
                  <div key={category}>
                      {/* Category Title with Divider */}
                      <div className="flex items-center gap-4 mb-6">
                         <h3 className="font-heading font-bold text-xl text-gray-800 bg-white px-5 py-2 rounded-xl shadow-sm border border-gray-100">{category}</h3>
                         <div className="h-px bg-gray-200 flex-1"></div>
                      </div>

                      {/* Vertical Card Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                         {items.map(item => (
                            <div key={item.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                               {/* Image Area */}
                               <div className="h-56 relative overflow-hidden">
                                  <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                                  
                                  {/* Badges */}
                                  <span className={`absolute top-4 right-4 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wide shadow-sm
                                      ${item.active ? 'bg-green-400 text-white' : 'bg-gray-400 text-white'}`}>
                                      {item.active ? 'ACTIVO' : 'INACTIVO'}
                                  </span>
                               </div>
                               
                               {/* Content */}
                               <div className="p-6 flex-1 flex flex-col">
                                  <div className="flex-1">
                                      <h4 className="font-heading font-bold text-xl text-gray-800 mb-2 leading-tight">{item.name}</h4>
                                      <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-3">{item.description}</p>
                                  </div>
                                  
                                  {/* Price Input Area */}
                                  <div className="flex items-center justify-between mb-6 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                     <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider ml-1">Precio Base</span>
                                     <div className="flex items-center gap-1 font-heading font-bold text-xl text-gray-800 bg-white px-4 py-1.5 rounded-xl border border-gray-200 shadow-sm min-w-[80px] justify-center">
                                        <span className="text-gray-400 text-sm">$</span> {item.price}
                                     </div>
                                  </div>

                                  {/* Action Bar */}
                                  <div className="flex items-center gap-3 border-t border-gray-100 pt-5 mt-auto">
                                     <button 
                                        className="flex-1 py-2.5 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                                        title="Visibilidad"
                                     >
                                        <Eye size={20} />
                                     </button>
                                     <div className="w-px h-6 bg-gray-200"></div>
                                     <button 
                                        className="flex-1 py-2.5 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                                        title="Ofertas"
                                     >
                                        <Percent size={20} />
                                     </button>
                                     <div className="w-px h-6 bg-gray-200"></div>
                                     <button 
                                        className="flex-1 py-2.5 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                        title="Eliminar"
                                     >
                                        <Trash2 size={20} />
                                     </button>
                                  </div>
                               </div>
                            </div>
                         ))}
                      </div>
                  </div>
               ))}
            </div>
          )}

          {/* ----- STATS VIEW ----- */}
          {activeTab === 'stats' && (
             <div className="max-w-5xl mx-auto space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <ClayCard className="p-6">
                      <p className="text-sm text-gray-500 font-bold mb-1">Ventas Hoy</p>
                      <h3 className="text-4xl font-extrabold text-primary">485.50€</h3>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded mt-2 inline-block">↑ 12% vs ayer</span>
                   </ClayCard>
                   <ClayCard className="p-6">
                      <p className="text-sm text-gray-500 font-bold mb-1">Pedidos Totales</p>
                      <h3 className="text-4xl font-extrabold text-text">24</h3>
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-2 inline-block">~ Promedio normal</span>
                   </ClayCard>
                   <ClayCard className="p-6">
                      <p className="text-sm text-gray-500 font-bold mb-1">Ticket Medio</p>
                      <h3 className="text-4xl font-extrabold text-accent">20.22€</h3>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded mt-2 inline-block">↑ 2€ vs semana pasada</span>
                   </ClayCard>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-clay border border-white/50 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 flex items-end justify-between px-12 pb-12 opacity-50">
                      {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                         <div key={i} className="w-8 bg-gradient-to-t from-primary to-accent rounded-t-lg transition-all hover:opacity-100 hover:scale-110" style={{ height: `${h}%` }}></div>
                      ))}
                   </div>
                   <p className="relative z-10 text-gray-400 font-bold">Gráfico de Pedidos por Hora (Demo)</p>
                </div>
             </div>
          )}

          {/* ----- PLACEHOLDERS FOR NEW TABS ----- */}
          {(activeTab === 'crm' || activeTab === 'marketing' || activeTab === 'settings') && (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                      {activeTab === 'crm' && <Users size={40} className="text-gray-400" />}
                      {activeTab === 'marketing' && <Megaphone size={40} className="text-gray-400" />}
                      {activeTab === 'settings' && <Settings size={40} className="text-gray-400" />}
                  </div>
                  <h3 className="font-heading font-extrabold text-3xl text-gray-800 mb-2">Próximamente</h3>
                  <p className="text-gray-500 max-w-md">Esta función estará disponible en la versión completa. En esta demo solo puedes gestionar Pedidos, Menú y ver Estadísticas.</p>
              </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;