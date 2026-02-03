import React, { useState } from 'react';
import { ArrowLeft, Search, Star, Plus, Minus, ShoppingBag, Clock, MapPin, X, ChevronRight, Heart, Filter } from 'lucide-react';
import Button from './Button';
import ClayCard from './ClayCard';

interface DemoViewProps {
  onBack: () => void;
}

// --- Mock Data ---
const categories = [
  { id: 'popular', label: '🔥 Populares' },
  { id: 'promos', label: '🏷️ Promociones' },
  { id: 'burgers', label: '🍔 Hamburguesas' },
  { id: 'pizzas', label: '🍕 Pizzas' },
  { id: 'drinks', label: '🥤 Bebidas' },
  { id: 'desserts', label: '🍰 Postres' },
];

const products = [
  {
    id: 1,
    name: 'Pack Doble Smash',
    description: '2 Smash Burgers dobles + Patatas grandes + 2 Bebidas. Ideal para compartir.',
    price: 24.50,
    oldPrice: 28.00,
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80',
    category: 'promos',
    popular: true,
  },
  {
    id: 2,
    name: 'Super Smash Burger',
    description: 'Doble carne smash (180g), queso cheddar fundido, pepinillos, cebolla y salsa secreta.',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    category: 'burgers',
    popular: true,
  },
  {
    id: 3,
    name: 'Pizza Trufada',
    description: 'Base de crema de trufa, mozzarella fior di latte, champiñones y aceite de trufa blanca.',
    price: 14.90,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    category: 'pizzas',
    popular: false,
  },
  {
    id: 4,
    name: 'Patatas Bravas',
    description: 'Nuestras patatas cortadas a mano con salsa brava casera y un toque de alioli.',
    price: 5.90,
    image: 'https://images.unsplash.com/photo-1573080496987-a199f8cd6213?auto=format&fit=crop&w=800&q=80',
    category: 'popular',
    popular: true,
  },
  {
    id: 5,
    name: 'Cheesecake Casera',
    description: 'Tarta de queso cremosa estilo New York con mermelada de frutos rojos.',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    category: 'desserts',
    popular: false,
  },
];

// --- Types ---
type Product = typeof products[0];

const DemoView: React.FC<DemoViewProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<{product: Product, qty: number, options: any}[]>([]);

  // Filtering
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'popular' ? p.popular : p.category === activeCategory || (activeCategory === 'promos' && p.oldPrice);
    return matchesSearch && matchesCategory;
  });

  // Handlers
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const addToCart = () => {
    if (selectedProduct) {
      setCart([...cart, { product: selectedProduct, qty: quantity, options: {} }]);
      setSelectedProduct(null);
    }
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.qty), 0);

  return (
    <div className="fixed inset-0 z-[60] bg-background overflow-y-auto font-body text-text flex flex-col">
      
      {/* --- Top Navigation --- */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          
          <div className="hidden md:flex flex-col">
            <h1 className="font-heading font-bold text-lg leading-tight">Burger Town & Grill</h1>
            <div className="flex items-center gap-2 text-xs text-gray-500">
               <span className="flex items-center text-green-600 font-bold"><Star size={12} className="fill-current mr-1"/> 4.8</span>
               <span>•</span>
               <span>Hamburguesas</span>
               <span>•</span>
               <span>20-30 min</span>
            </div>
          </div>
        </div>

        {/* Search Bar - Centered */}
        <div className="flex-1 max-w-lg mx-4">
           <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="¿Qué te apetece hoy?" 
                className="w-full bg-gray-100 border-none rounded-2xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
        </div>

        {/* Cart & Actions */}
        <div className="flex items-center gap-3">
           <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <Heart size={20} className="text-gray-400" />
              <span className="text-sm font-semibold">Guardar</span>
           </button>
           <button className="relative p-3 bg-primary text-white rounded-xl shadow-lg shadow-primary/30 hover:bg-green-600 transition-colors group">
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {cart.length}
                </span>
              )}
           </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Left Column: Menu Categories & Products --- */}
        <div className="lg:col-span-8 space-y-8">
            
            {/* Banner (Mobile visible, Desktop banner) */}
            <div className="relative h-48 md:h-64 rounded-3xl overflow-hidden shadow-clay">
                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80" alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white">
                    <div className="bg-primary px-3 py-1 rounded-lg text-xs font-bold inline-block mb-2">Envío Gratis</div>
                    <h2 className="font-heading font-extrabold text-3xl md:text-5xl">Burger Town</h2>
                    <p className="opacity-90 mt-1 flex items-center gap-2">
                        <MapPin size={16} /> Plaza Mayor, 4, Berga
                    </p>
                </div>
            </div>

            {/* Filter Pills */}
            <div className="sticky top-24 z-30 bg-background/95 backdrop-blur-sm py-2 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide flex gap-3">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`
                            whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all transform active:scale-95
                            ${activeCategory === cat.id 
                                ? 'bg-text text-white shadow-lg' 
                                : 'bg-white text-gray-600 border border-gray-100 hover:border-gray-300 shadow-sm'}
                        `}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="font-heading font-bold text-2xl text-text">
                        {categories.find(c => c.id === activeCategory)?.label}
                    </h3>
                    <span className="text-sm text-gray-500 font-semibold">{filteredProducts.length} resultados</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                        <div 
                            key={product.id} 
                            onClick={() => handleProductClick(product)}
                            className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-clay-hover hover:-translate-y-1 transition-all cursor-pointer group flex flex-col h-full"
                        >
                            <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {product.popular && (
                                    <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-extrabold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                                        <Star size={10} fill="currentColor" /> POPULAR
                                    </div>
                                )}
                                <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                    <Plus size={20} className="text-primary" />
                                </button>
                            </div>
                            
                            <div className="flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-heading font-bold text-lg leading-tight">{product.name}</h4>
                                    <span className="font-heading font-bold text-lg text-primary bg-primary/5 px-2 py-1 rounded-lg">
                                        {product.price.toFixed(2)}€
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">{product.description}</p>
                                
                                {product.oldPrice && (
                                    <div className="mt-auto pt-3 border-t border-gray-50 flex items-center gap-2">
                                        <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md">OFERTA</span>
                                        <span className="text-xs text-gray-400 line-through">{product.oldPrice.toFixed(2)}€</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 opacity-50">
                        <Search size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-bold text-gray-400">No hemos encontrado productos</p>
                    </div>
                )}
            </div>
        </div>

        {/* --- Right Column: Sticky Cart Summary (Desktop) --- */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
                
                {/* Delivery Info Card */}
                <ClayCard className="p-6 bg-white/50 backdrop-blur-md">
                   <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
                      <Clock className="text-primary" size={20} /> Tiempo de entrega
                   </h3>
                   <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Estimado</span>
                      <span className="font-bold">20 - 30 min</span>
                   </div>
                   <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                      <div className="bg-primary w-1/3 h-1.5 rounded-full"></div>
                   </div>
                   <button className="w-full py-2 border border-primary/20 text-primary font-bold rounded-xl text-sm hover:bg-primary/5 transition-colors">
                      Programar pedido
                   </button>
                </ClayCard>

                {/* Cart Summary */}
                <div className="bg-white rounded-3xl shadow-clay border border-white/60 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-heading font-bold text-xl">Tu Pedido</h3>
                        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg">{cart.length} items</span>
                    </div>

                    {cart.length > 0 ? (
                        <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-start">
                                    <div className="w-6 h-6 bg-gray-100 rounded text-xs flex items-center justify-center font-bold text-gray-500 shrink-0 mt-1">
                                        {item.qty}x
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-800">{item.product.name}</p>
                                        <p className="text-xs text-gray-500 line-clamp-1">{item.product.description}</p>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{(item.product.price * item.qty).toFixed(2)}€</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 mb-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                             <div className="bg-white p-3 rounded-full shadow-sm w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                <ShoppingBag className="text-gray-300" size={20} />
                             </div>
                             <p className="text-sm text-gray-400 font-medium">Tu cesta está vacía</p>
                        </div>
                    )}

                    <div className="space-y-2 py-4 border-t border-gray-100">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span>{cartTotal.toFixed(2)}€</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Gastos de envío</span>
                            <span className="text-green-600 font-bold">Gratis</span>
                        </div>
                    </div>

                    <div className="flex justify-between text-xl font-heading font-extrabold text-text mb-6">
                        <span>Total</span>
                        <span>{cartTotal.toFixed(2)}€</span>
                    </div>

                    <Button variant="cta" className="w-full py-4 text-lg shadow-xl shadow-green-900/10">
                        Ir a Pagar
                    </Button>
                </div>
            </div>
        </div>

        {/* --- Mobile Floating Cart Button --- */}
        {cart.length > 0 && (
            <div className="lg:hidden fixed bottom-6 left-4 right-4 z-50">
                <button className="w-full bg-text text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-slide-up">
                    <div className="flex items-center gap-3">
                        <span className="bg-primary text-white w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm">
                            {cart.length}
                        </span>
                        <span className="font-bold">Ver pedido</span>
                    </div>
                    <span className="font-bold text-lg">{cartTotal.toFixed(2)}€</span>
                </button>
            </div>
        )}

      </main>

      {/* --- Product Detail Modal (The "Solution #3" Implementation) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSelectedProduct(null)}></div>
            
            <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden relative flex flex-col animate-scale-in">
                
                {/* Header Image */}
                <div className="relative h-64 shrink-0">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                    <button 
                        onClick={() => setSelectedProduct(null)}
                        className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="font-heading font-extrabold text-3xl text-gray-900">{selectedProduct.name}</h2>
                        <span className="font-heading font-bold text-2xl text-primary">{selectedProduct.price.toFixed(2)}€</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed mb-8 text-lg">{selectedProduct.description}</p>

                    {/* Options Groups (Glovo Style) */}
                    <div className="space-y-8">
                        
                        {/* Required Option */}
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                             <div className="flex justify-between items-center mb-4">
                                 <h3 className="font-bold text-gray-800">Elige tu punto de carne</h3>
                                 <span className="bg-text text-white text-[10px] font-bold px-2 py-1 rounded uppercase">Obligatorio</span>
                             </div>
                             <div className="space-y-3">
                                 {['Poco hecha', 'Al punto', 'Muy hecha'].map((opt, i) => (
                                     <label key={i} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-white rounded-lg transition-colors">
                                         <input type="radio" name="cooking" className="w-5 h-5 text-primary focus:ring-primary border-gray-300" defaultChecked={i===1} />
                                         <span className="text-gray-700 font-medium">{opt}</span>
                                     </label>
                                 ))}
                             </div>
                        </div>

                        {/* Optional Extras */}
                        <div>
                             <h3 className="font-bold text-gray-800 mb-4 flex justify-between">
                                 <span>Extras</span>
                                 <span className="text-gray-400 text-sm font-normal">Opcional</span>
                             </h3>
                             <div className="space-y-3">
                                 {[
                                     {name: 'Bacon Extra', price: 1.50},
                                     {name: 'Queso Cheddar', price: 1.00},
                                     {name: 'Huevo Frito', price: 1.20}
                                 ].map((extra, i) => (
                                     <label key={i} className="flex items-center justify-between cursor-pointer border-b border-gray-100 pb-3 last:border-0">
                                         <div className="flex items-center gap-3">
                                             <input type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300" />
                                             <span className="text-gray-700 font-medium">{extra.name}</span>
                                         </div>
                                         <span className="text-gray-500 text-sm">+{extra.price.toFixed(2)}€</span>
                                     </label>
                                 ))}
                             </div>
                        </div>

                        {/* Drinks */}
                        <div>
                             <h3 className="font-bold text-gray-800 mb-4 flex justify-between">
                                 <span>Bebida</span>
                                 <span className="text-gray-400 text-sm font-normal">Elige 1</span>
                             </h3>
                             <div className="grid grid-cols-3 gap-3">
                                 {['Coca-Cola', 'Fanta', 'Agua'].map((drink, i) => (
                                     <div key={i} className="border border-gray-200 rounded-xl p-3 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                                         <div className="text-2xl mb-1">{i===0 ? '🥤' : i===1 ? '🍊' : '💧'}</div>
                                         <div className="text-xs font-bold text-gray-600">{drink}</div>
                                     </div>
                                 ))}
                             </div>
                        </div>

                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 md:p-6 border-t border-gray-100 bg-white flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-4 bg-gray-100 rounded-xl px-4 py-3">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className={`p-1 rounded-full hover:bg-white transition-colors ${quantity === 1 ? 'text-gray-300' : 'text-gray-800'}`}
                            disabled={quantity === 1}
                        >
                            <Minus size={20} />
                        </button>
                        <span className="font-heading font-bold text-xl min-w-[20px] text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-1 rounded-full hover:bg-white text-gray-800 transition-colors"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <Button 
                        variant="cta" 
                        className="flex-1 py-4 text-lg justify-between px-6"
                        onClick={addToCart}
                    >
                        <span>Añadir {quantity} al pedido</span>
                        <span>{(selectedProduct.price * quantity).toFixed(2)}€</span>
                    </Button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default DemoView;