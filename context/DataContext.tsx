
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Coupon } from '../types';
import { MOCK_PRODUCTS, MOCK_COUPONS } from '../services/mockService';

interface DataContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  deleteCategory: (category: string) => void;
  // Coupon Logic
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  updateCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: string) => void;
  useCoupon: (code: string) => void; // Incrementa uso
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- PRODUCTOS ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('comandesja_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  // --- CUPONES (Nuevo Estado Global) ---
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('comandesja_coupons');
    return saved ? JSON.parse(saved) : MOCK_COUPONS;
  });

  // Guardar en LocalStorage cambios de Productos
  useEffect(() => {
    localStorage.setItem('comandesja_products', JSON.stringify(products));
  }, [products]);

  // Guardar en LocalStorage cambios de Cupones
  useEffect(() => {
    localStorage.setItem('comandesja_coupons', JSON.stringify(coupons));
  }, [coupons]);

  // --- Product Actions ---
  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const deleteCategory = (category: string) => {
      setProducts(prev => prev.filter(p => p.category !== category));
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
        coupons, addCoupon, updateCoupon, deleteCoupon, useCoupon
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
