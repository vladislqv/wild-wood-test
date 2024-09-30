import { create } from "zustand"


type State = {
    showConfirmation: boolean
    orderComment: string
}

type Action = {
    setShowConfirmation: (show: boolean) => void
    setOrderComment: (comment: string) => void
}

export const useAppStore = create<State & Action>((set) => ({
    showConfirmation: false,
    orderComment: '',
    setOrderComment: (comment) => set({ orderComment: comment }),
    setShowConfirmation: (show) => set({ showConfirmation: show })
}))