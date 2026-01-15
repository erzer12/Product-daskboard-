import { create } from 'zustand'

/**
 * UI Filter Store State and Actions
 * Manages product filtering state across the products page
 */
interface FilterState {
    // Search text input (filters products by title/description)
    search: string

    // Selected category slug (e.g., 'electronics', 'clothing')
    category: string

    // Minimum price filter (null = no minimum)
    minPrice: number | null

    // Maximum price filter (null = no maximum)
    maxPrice: number | null

    // Update search term
    setSearch: (search: string) => void

    // Update selected category
    setCategory: (category: string) => void

    // Update price range (both min and max at once)
    setPriceRange: (min: number | null, max: number | null) => void

    // Reset all filters to default values
    clearFilters: () => void
}

/**
 * Filter Store
 * 
 * This Zustand store manages product filter state for the products page.
 * Unlike the cart and auth stores, this does NOT persist to localStorage
 * because filter preferences typically shouldn't carry between sessions.
 * 
 * The store enables easy state sharing between:
 * - Filter input components (search box, category dropdown, price inputs)
 * - Product list component (which uses these filters for API queries)
 * - Clear filters button (which resets everything)
 * 
 * Usage:
 * ```tsx
 * const { search, category, setSearch, clearFilters } = useFilterStore()
 * 
 * // Update filters:
 * setSearch('laptop')
 * setCategory('electronics')
 * setPriceRange(100, 500)
 * 
 * // Clear all:
 * clearFilters()
 * ```
 */
export const useFilterStore = create<FilterState>()((set) => ({
    // Initial state: no filters applied
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,

    /**
     * Set Search Term
     * Updates the text search filter
     */
    setSearch: (search) => set({ search }),

    /**
     * Set Category
     * Updates the category filter.
     * Pass empty string to show all categories.
     */
    setCategory: (category) => set({ category }),

    /**
     * Set Price Range
     * Updates both min and max price at once for convenience.
     * Pass null to remove that limit.
     */
    setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),

    /**
     * Clear All Filters
     * Resets everything to default (no filters applied)
     */
    clearFilters: () => set({
        search: '',
        category: '',
        minPrice: null,
        maxPrice: null
    }),
}))
