import { CartItem, FoodItem } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    items: CartItem[]
}

type Action = {
    addToCart: (item: FoodItem) => void
    removeFromCart: (id: number) => void
    clearCart: () => void
    setCartItems: (items: CartItem[]) => void
}

const initialState: State = {
    items: []
}

export const useCartStore = create(persist<State & Action>((set) => ({
    ...initialState,
    addToCart: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
            return {
                items: state.items.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            };
        } else {
            return { items: [{ ...item, quantity: 1 }, ...state.items] };
        }
    }),
    removeFromCart: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
    clearCart: () => set({ items: [] }),
    setCartItems: (items) => set({ items }),
}), { name: 'cart' }))

export const getTotalPrice = () => {
    const items = useCartStore.getState().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
}