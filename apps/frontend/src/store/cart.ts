import { CartItem, FoodItem } from '@/types'
import { create } from 'zustand'

type State = {
    items: CartItem[]
}

type Action = {
    addToCart: (item: FoodItem) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    setCartItems: (items: CartItem[]) => void
}

export const useCartStore = create<State & Action>((set) => ({
    items: [],
    addToCart: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
            return {
                items: state.items.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            };
        } else {
            return { items: [...state.items, { ...item, quantity: 1 }] };
        }
    }),
    removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    clearCart: () => set({ items: [] }),
    setCartItems: (items) => set({ items }),
}))

export const getTotalPrice = () => {
    const items = useCartStore.getState().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}