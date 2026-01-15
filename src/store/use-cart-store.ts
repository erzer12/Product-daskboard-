import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
    thumbnail: string
}

interface CartState {
    items: CartItem[]
    addItem: (product: { id: number; title: string; price: number; thumbnail: string }, quantity?: number) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity = 1) => {
                const currentItems = get().items
                const existingItem = currentItems.find((item) => item.id === product.id)

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                        ),
                    })
                } else {
                    set({ items: [...currentItems, { ...product, quantity }] })
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
            },
            updateQuantity: (id, quantity) => {
                if (quantity <= 0) {
                    get().removeItem(id)
                    return
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
            }
        }),
        {
            name: 'cart-storage',
        }
    )
)
