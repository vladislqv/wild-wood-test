
import { Order } from "@/types"
import { create } from "zustand"

type State = {
    orders: Order[]
}

type Action = {
    addOrder: (order: Order) => void
    removeOrder: (id: number) => void
    clearOrders: () => void
    setOrders: (orders: Order[]) => void
}

export const useOrderStore = create<State & Action>((set) => ({
    orders: [],
    addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
    removeOrder: (id) => set((state) => ({ orders: state.orders.filter((order) => order.id !== id) })),
    clearOrders: () => set({ orders: [] }),
    setOrders: (orders) => set({ orders })
}))