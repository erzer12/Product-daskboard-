import { create } from 'zustand'

interface FilterState {
    search: string
    category: string
    minPrice: number | null
    maxPrice: number | null
    setSearch: (search: string) => void
    setCategory: (category: string) => void
    setPriceRange: (min: number | null, max: number | null) => void
    clearFilters: () => void
}

export const useFilterStore = create<FilterState>()((set) => ({
    search: '',
    category: '',
    minPrice: null,
    maxPrice: null,
    setSearch: (search) => set({ search }),
    setCategory: (category) => set({ category }),
    setPriceRange: (minPrice, maxPrice) => set({ minPrice, maxPrice }),
    clearFilters: () => set({ search: '', category: '', minPrice: null, maxPrice: null }),
}))
