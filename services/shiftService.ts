import { Shift, ShiftType, Order, OrderStatus, PaymentMethod } from '../types';
import { MOCK_ORDERS } from './mockService';
import { authService } from './authService';

const SHIFTS_KEY = 'comandesja_shifts_db';

export const shiftService = {
    // initialize or get empty
    getShifts: (): Shift[] => {
        const stored = localStorage.getItem(SHIFTS_KEY);
        if (!stored) return [];
        return JSON.parse(stored, (key, value) => {
            if (key.endsWith('At')) return new Date(value);
            return value;
        });
    },

    saveShift: (shift: Shift) => {
        const shifts = shiftService.getShifts();
        const existingIndex = shifts.findIndex(s => s.id === shift.id);

        if (existingIndex >= 0) {
            shifts[existingIndex] = shift;
        } else {
            shifts.push(shift);
        }

        localStorage.setItem(SHIFTS_KEY, JSON.stringify(shifts));
    },

    getCurrentOpenShift: (): Shift | null => {
        const shifts = shiftService.getShifts();
        return shifts.find(s => s.status === 'OPEN') || null;
    },

    // Start a new shift (for demo purposes if none exists)
    openShift: (type: ShiftType, initialCash: number = 150): Shift => {
        const user = authService.getCurrentUser();
        // Close any existing open shifts first to be safe
        const current = shiftService.getCurrentOpenShift();
        if (current) {
            // For simplicity in this demo, we just return the current one if it matches
            if (current.type === type) return current;
            // implicitly force close? Or throw error. Let's return new for now.
            // implementation choice: simple demo logic
        }

        const newShift: Shift = {
            id: `shift-${Date.now()}`,
            type,
            status: 'OPEN',
            openedAt: new Date(),
            openedBy: user?.name || 'Unknown',
            initialCash: initialCash,
            expectedCash: 0,
            expectedCard: 0,
            declaredCash: 0,
            declaredCard: 0,
            difference: 0
        };

        shiftService.saveShift(newShift);
        return newShift;
    },

    // Calculate totals based on orders in the time range
    calculateTotals: (shift: Shift) => {
        // Filter orders for this shift's duration (or from open until now)
        const start = new Date(shift.openedAt);
        const end = shift.closedAt || new Date(); // If not closed, use now

        // Find relevant orders
        // NOTE: In a real app we would query the DB. Here we filter MOCK_ORDERS
        const orders = MOCK_ORDERS.filter(o =>
            (o.status === OrderStatus.DELIVERED || o.status === OrderStatus.READY) &&
            o.createdAt >= start &&
            o.createdAt <= end
        );

        const totalCash = orders
            .filter(o => o.paymentMethod === PaymentMethod.CASH)
            .reduce((acc, curr) => acc + curr.total, 0);

        const totalCard = orders
            .filter(o => o.paymentMethod === PaymentMethod.CARD)
            .reduce((acc, curr) => acc + curr.total, 0);

        return {
            expectedCash: totalCash + shift.initialCash, // Include float
            expectedCard: totalCard,
            salesCash: totalCash,
            salesCard: totalCard,
            orderCount: orders.length
        };
    },

    // Finalize
    closeShift: (shiftId: string, declaredCash: number, declaredCard: number, notes?: string): Shift => {
        const shifts = shiftService.getShifts();
        const shift = shifts.find(s => s.id === shiftId);

        if (!shift) throw new Error('Shift not found');

        const totals = shiftService.calculateTotals(shift);
        const user = authService.getCurrentUser();

        shift.status = 'CLOSED';
        shift.closedAt = new Date();
        shift.closedBy = user?.name || 'Unknown';
        shift.expectedCash = totals.expectedCash;
        shift.expectedCard = totals.expectedCard;
        shift.declaredCash = declaredCash;
        shift.declaredCard = declaredCard;

        // Difference: Positive means extra money, Negative means missing
        shift.difference = (declaredCash + declaredCard) - (shift.expectedCash + shift.expectedCard);

        shift.notes = notes;

        shiftService.saveShift(shift);
        return shift;
    }
};
