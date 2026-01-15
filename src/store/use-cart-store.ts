import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Shopping Cart Item
 * Represents a single product in the user's shopping cart
 */
export interface CartItem {
    id: number
    title: string
    price: number
    quantity: number
    thumbnail: string
}

/**
 * Cart Store State and Actions
 * Manages the shopping cart functionality across the entire app
 */
interface CartState {
    // Current items in the cart
    items: CartItem[]

    // Add a product to the cart (or increase quantity if already exists)
    addItem: (product: { id: number; title: string; price: number; thumbnail: string }, quantity?: number) => void

    // Remove a product completely from the cart
    removeItem: (id: number) => void

    // Update the quantity of a product (remove if quantity becomes 0)
    updateQuantity: (id: number, quantity: number) => void

    // Clear all items from the cart
    clearCart: () => void

    // Calculate the total price of all items in the cart
    getTotal: () => number
}

/**
 * Shopping Cart Store
 * 
 * This Zustand store manages the shopping cart state across the entire application.
 * It automatically persists to localStorage so the cart survives page refreshes.
 * 
 * Usage:
 * ```tsx
 * const { items, addItem, removeItem } = useCartStore()
 * addItem({ id: 1, title: 'Product', price: 99.99, thumbnail: 'url' })
 * ```
 */
export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            // Initial state: empty cart
            items: [],

            /**
             * Add Item to Cart
             * If the item already exists, increase its quantity.
             * Otherwise, add it as a new item.
             */
            addItem: (product, quantity = 1) => {
                const currentItems = get().items
                const existingItem = currentItems.find((item) => item.id === product.id)

                if (existingItem) {
                    // Item already in cart - increase quantity
                    set({
                        items: currentItems.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    })
                } else {
                    // New item - add to cart
                    set({ items: [...currentItems, { ...product, quantity }] })
                }
            },

            /**
             * Remove Item from Cart
             * Completely removes an item regardless of quantity
             */
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) })
            },

            /**
             * Update Item Quantity
             * If quantity is 0 or less, remove the item entirely
             */
            updateQuantity: (id, quantity) => {
                // Remove item if quantity is invalid
                if (quantity <= 0) {
                    get().removeItem(id)
                    return
                }

                // Update quantity
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    ),
                })
            },

            /**
             * Clear Cart
             * Removes all items (typically called after successful checkout)
             */
            clearCart: () => set({ items: [] }),

            /**
             * Calculate Cart Total
             * Sums up: (price × quantity) for all items
             */
            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + (item.price * item.quantity),
                    0
                )
            }
        }),
        {
            // Storage configuration
            name: 'cart-storage', // Key in localStorage
        }
    )
)
