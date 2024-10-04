import { create } from "zustand"
import { persist } from "zustand/middleware"


type State = {
    showConfirmation: boolean
    orderComment: string
    tableNumber: string | null
}

type Action = {
    setShowConfirmation: (show: boolean) => void
    setOrderComment: (comment: string) => void
    setTableNumber: (tableNumber: string) => void
    logout: () => void
}

const initialState: State = {
    showConfirmation: false,
    orderComment: '',
    tableNumber: null
}

export const useAppStore = create<State & Action>()(persist((set) => ({
    ...initialState,
    setOrderComment: (comment) => set({ orderComment: comment }),
    setShowConfirmation: (show) => set({ showConfirmation: show }),
    setTableNumber: (tableNumber) => set({ tableNumber: tableNumber }),
    logout: () => set(initialState),
}), { name: 'app', partialize: (state) => ({ tableNumber: state.tableNumber }) }))