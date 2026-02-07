
import { supabase } from './supabase';
import { Product } from '../types';

export const productService = {
    // --- GET PRODUCTS ---
    getProducts: async (ownerId: string): Promise<Product[]> => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('owner_id', ownerId)
            .eq('is_active', true)
            .order('category', { ascending: true }); // Default sort

        if (error) {
            console.error('Error fetching products:', error);
            return [];
        }

        return data.map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: parseFloat(p.price),
            category: p.category,
            image: p.image_url || 'https://via.placeholder.com/150',
            isDeliveryAvailable: p.is_active, // Map is_active to availability for now
            promotionalPrice: undefined, // Needs DB migration if used
            stock: 100, // Needs DB migration
            suggestedProductId: p.suggested_product_id
        }));
    },

    // --- CREATE PRODUCT ---
    createProduct: async (product: Product, ownerId: string) => {
        try {
            // Upload Image if base64 (this is simplified, ideally upload strictly)
            // For now, assume URL or Base64 string that needs handling
            let imageUrl = product.image;

            const { data, error } = await supabase
                .from('products')
                .insert({
                    owner_id: ownerId,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    image_url: imageUrl,
                    is_active: product.isDeliveryAvailable,
                    suggested_product_id: product.suggestedProductId || null
                })
                .select()
                .single();

            if (error) throw error;
            return { success: true, data };
        } catch (error) {
            console.error('Error creating product:', error);
            return { success: false, error };
        }
    },

    // --- UPDATE PRODUCT ---
    updateProduct: async (product: Product) => {
        try {
            const { error } = await supabase
                .from('products')
                .update({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    image_url: product.image,
                    is_active: product.isDeliveryAvailable,
                    suggested_product_id: product.suggestedProductId || null
                })
                .eq('id', product.id);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error updating product:', error);
            return { success: false, error };
        }
    },

    // --- DELETE PRODUCT ---
    deleteProduct: async (id: string) => {
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Error deleting product:', error);
            return { success: false, error };
        }
    }
};
