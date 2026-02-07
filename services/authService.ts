
import { supabase } from './supabase';
import { User, UserRole } from '../types';

export const authService = {
    // Register new user
    register: async (email: string, password: string, name: string, role: UserRole): Promise<{ user: User | null; error: any }> => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                    role,
                    // Generate storeSlug if tenant
                    store_slug: role === 'TENANT' ? name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : undefined,
                },
            },
        });

        if (error) return { user: null, error };

        if (data.user) {
            const user: User = {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata.name || name,
                role: data.user.user_metadata.role || role,
                storeSlug: data.user.user_metadata.store_slug,
                businessType: data.user.user_metadata.business_type // Optional
            };
            return { user, error: null };
        }

        return { user: null, error: 'Registration failed' };
    },

    // Login
    login: async (email: string, password: string): Promise<{ user: User | null; error: any }> => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) return { user: null, error };

        if (data.user) {
            const user: User = {
                id: data.user.id,
                email: data.user.email!,
                name: data.user.user_metadata.name,
                role: data.user.user_metadata.role || 'CUSTOMER',
                storeSlug: data.user.user_metadata.store_slug,
                businessType: data.user.user_metadata.business_type
            };
            return { user, error: null };
        }
        return { user: null, error: 'Login failed' };
    },

    // Logout
    logout: async () => {
        await supabase.auth.signOut();
    },

    // Get current session
    getCurrentUser: async (): Promise<User | null> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return null;

        return {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata.name,
            role: session.user.user_metadata.role || 'CUSTOMER',
            storeSlug: session.user.user_metadata.store_slug,
            businessType: session.user.user_metadata.business_type
        };
    }
};
