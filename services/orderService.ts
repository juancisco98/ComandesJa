
import { supabase } from './supabase';
import { Order, OrderItem, OrderStatus, PaymentMethod } from '../types';

export const orderService = {
    // --- CREATE ORDER ---
    createOrder: async (order: Partial<Order>, storeOwnerId: string) => {
        try {
            // 1. Insert Order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    owner_id: storeOwnerId,
                    client_name: order.customerName,
                    total_amount: order.total,
                    status: 'PENDING',
                    payment_method: order.paymentMethod,
                    order_type: order.deliveryType === 'DELIVERY' ? 'delivery' : 'pickup',
                    notes: 'Pedido desde Web' // Could be dynamic
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Insert Items
            if (order.items && order.items.length > 0) {
                const itemsToInsert = order.items.map(item => ({
                    order_id: orderData.id,
                    product_id: item.productId, // Ensure productId is valid UUID in DB
                    quantity: item.quantity,
                    price_at_purchase: item.price
                }));

                const { error: itemsError } = await supabase
                    .from('order_items')
                    .insert(itemsToInsert);

                if (itemsError) throw itemsError;
            }

            return { success: true, orderId: orderData.id };
        } catch (error) {
            console.error('Error creating order:', error);
            return { success: false, error };
        }
    },

    // --- SUBSCRIBE TO ORDERS (Realtime) ---
    subscribeToOrders: (storeOwnerId: string, onOrdersUpdated: (orders: Order[]) => void) => {
        // Initial Fetch
        const fetchOrders = async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items (
            *,
            products (name)
          )
        `)
                .eq('owner_id', storeOwnerId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching orders:', error);
                return;
            }

            // Map DB to Frontend Type
            const mappedOrders: Order[] = data.map((dbOrder: any) => ({
                id: dbOrder.id,
                tenantId: dbOrder.owner_id,
                customerName: dbOrder.client_name,
                status: mapStatus(dbOrder.status),
                total: parseFloat(dbOrder.total_amount),
                createdAt: new Date(dbOrder.created_at),
                paymentMethod: dbOrder.payment_method as PaymentMethod,
                deliveryType: dbOrder.order_type === 'delivery' ? 'DELIVERY' : 'PICKUP',
                items: dbOrder.order_items.map((item: any) => ({
                    productId: item.product_id,
                    name: item.products?.name || 'Producto desconocido',
                    quantity: item.quantity,
                    price: parseFloat(item.price_at_purchase)
                }))
            }));

            onOrdersUpdated(mappedOrders);
        };

        fetchOrders();

        // Subscribe to changes
        const subscription = supabase
            .channel('public:orders')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders', filter: `owner_id=eq.${storeOwnerId}` }, (payload) => {
                console.log('Realtime change received!', payload);
                fetchOrders(); // Refresh all on any change (Simple strategy)
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    },

    // --- UPDATE STATUS ---
    updateOrderStatus: async (orderId: string, status: OrderStatus) => {
        const dbStatus = mapStatusToDb(status);
        const { error } = await supabase
            .from('orders')
            .update({ status: dbStatus })
            .eq('id', orderId);

        if (error) console.error('Error updating status:', error);
    }
};

// Helpers
const mapStatus = (dbStatus: string): OrderStatus => {
    switch (dbStatus) {
        case 'new': return OrderStatus.PENDING;
        case 'cooking': return OrderStatus.COOKING;
        case 'ready': return OrderStatus.READY;
        case 'on_way': return OrderStatus.ON_WAY;
        case 'delivered': return OrderStatus.DELIVERED;
        case 'cancelled': return OrderStatus.CANCELLED;
        default: return OrderStatus.PENDING;
    }
};

const mapStatusToDb = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.PENDING: return 'new';
        case OrderStatus.COOKING: return 'cooking';
        case OrderStatus.READY: return 'ready';
        case OrderStatus.ON_WAY: return 'on_way';
        case OrderStatus.DELIVERED: return 'delivered';
        case OrderStatus.CANCELLED: return 'cancelled';
        default: return 'new';
    }
};
