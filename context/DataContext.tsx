
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon } from '../types';
import { MOCK_COUPONS } from '../services/mockService';
import { productService } from '../services/productService';
import { useAuth } from './AuthContext';

interface DataContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  deleteCategory: (category: string) => Promise<void>;
  // Coupon Logic
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  useCoupon: (code: string) => void; // Incrementa uso
  isLoadingProducts: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // --- CUPONES (Nuevo Estado Global - LocalStorage por ahora) ---
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('comandesja_coupons');
    return saved ? JSON.parse(saved) : MOCK_COUPONS;
  });

  // --- FETCH PRODUCTS FROM SUPABASE ---
  useEffect(() => {
    if (user?.role === 'TENANT') { // Only fetch if tenant (owner)
      const loadProducts = async () => {
        setIsLoadingProducts(true);
        const data = await productService.getProducts(user.id);
        setProducts(data);
        setIsLoadingProducts(false);
      };
      loadProducts();
    }
  }, [user]);

  // Guardar en LocalStorage cambios de Cupones
  useEffect(() => {
    localStorage.setItem('comandesja_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // --- Product Actions (Async) ---
  const addProduct = async (product: Product) => {
    if (!user?.id) return;

    // Optimistic Update
    setProducts(prev => [product, ...prev]);

    // DB Update
    const result = await productService.createProduct(product, user.id);
    if (!result.success) {
      // Rollback if error
      console.error("Failed to add product", result.error);
      setProducts(prev => prev.filter(p => p.id !== product.id));
      alert("Error al guardar el producto.");
    } else {
      // Update ID with real DB ID if needed, though we generated one. 
      // Better to re-fetch or update state with result.
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    // Optimistic
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));

    const result = await productService.updateProduct(updatedProduct);
    if (!result.success) {
      console.error("Failed to update product", result.error);
      // Ideally revert, but for now just alert
      alert("Error al actualizar el producto.");
    }
  };

  const deleteProduct = async (id: string) => {
    // Optimistic
    const prevProducts = [...products];
    setProducts(prev => prev.filter(p => p.id !== id));

    const result = await productService.deleteProduct(id);
    if (!result.success) {
      setProducts(prevProducts); // Revert
      alert("Error al eliminar el producto.");
    }
  };

  const deleteCategory = async (category: string) => {
    // Fetch IDs to delete
    const idsToDelete = products.filter(p => p.category === category).map(p => p.id);

    // Optimistic
    setProducts(prev => prev.filter(p => p.category !== category));

    // Parallel Delete (could be better with a batch delete RPC)
    await Promise.all(idsToDelete.map(id => productService.deleteProduct(id)));
  };

  // --- Coupon Actions ---
  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const updateCoupon = (updatedCoupon: Coupon) => {
    setCoupons(prev => prev.map(c => c.id === updatedCoupon.id ? updatedCoupon : c));
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const useCoupon = (code: string) => {
    setCoupons(prev => prev.map(c => {
      if (c.code === code) {
        const newUses = c.uses + 1;
        const isStillActive = c.maxUses ? newUses < c.maxUses : true;
        return { ...c, uses: newUses, isActive: isStillActive };
      }
      return c;
    }));
  };

  return (
    <DataContext.Provider value={{
      products, addProduct, updateProduct, deleteProduct, deleteCategory,
      coupons, addCoupon, updateCoupon, deleteCoupon, useCoupon,
      isLoadingProducts
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
