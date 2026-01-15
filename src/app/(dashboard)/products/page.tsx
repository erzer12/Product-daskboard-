'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useORPC } from '@/lib/use-orpc'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { Plus, Search, Loader2, X, Filter } from 'lucide-react'
import { useFilterStore } from '@/store/use-filter-store'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProductsPage() {
    const { orpc } = useORPC()
    const observerRef = useRef<IntersectionObserver | null>(null)
    const loadMoreRef = useRef<HTMLDivElement>(null)

    // Use Zustand filter store
    const { search, category, minPrice, maxPrice, setSearch, setCategory, setPriceRange, clearFilters } = useFilterStore()

    // Fetch categories
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            return await (orpc.products as any).categories()
        }
    })

    // Infinite query for products
    const {
        data,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
        refetch
    } = useInfiniteQuery({
        queryKey: ['products', { search, category, minPrice, maxPrice }],
        queryFn: async ({ pageParam = 0 }) => {
            return await orpc.products.list({
                limit: 12,
                skip: pageParam,
                search: search || undefined,
                category: category || undefined,
                minPrice: minPrice ?? undefined,
                maxPrice: maxPrice ?? undefined,
            })
        },
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce((sum, page) => sum + page.products.length, 0)
            if (totalFetched >= lastPage.total) return undefined
            return totalFetched
        },
        initialPageParam: 0,
    })

    // Intersection observer for infinite scroll
    const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
        const [entry] = entries
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
        }
    }, [hasNextPage, isFetchingNextPage, fetchNextPage])

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect()

        observerRef.current = new IntersectionObserver(handleObserver, {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        })

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current)
        }

        return () => {
            if (observerRef.current) observerRef.current.disconnect()
        }
    }, [handleObserver])

    const allProducts = data?.pages.flatMap(page => page.products) ?? []
    const hasActiveFilters = search || category || minPrice !== null || maxPrice !== null

    return (
        <div className="space-y-6">
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground">Browse and manage your catalog</p>
                </div>
                <Link href="/products/add">
                    <Button variant="default" className="gap-2">
                        <Plus size={16} /> Add Product
                    </Button>
                </Link>
            </motion.div>

            {/* Filter Bar */}
            <motion.div
                className="flex flex-wrap items-center gap-4 bg-card p-4 rounded-lg shadow-sm border"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                {/* Search */}
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Category Filter */}
                <select
                    className="h-9 px-3 rounded-md border bg-background text-sm min-w-[150px]"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories?.map((cat: { slug: string; name: string }) => (
                        <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* Price Range */}
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Min $"
                        className="w-24 h-9"
                        value={minPrice ?? ''}
                        onChange={(e) => setPriceRange(e.target.value ? Number(e.target.value) : null, maxPrice)}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input
                        type="number"
                        placeholder="Max $"
                        className="w-24 h-9"
                        value={maxPrice ?? ''}
                        onChange={(e) => setPriceRange(minPrice, e.target.value ? Number(e.target.value) : null)}
                    />
                </div>

                {/* Clear Filters */}
                <AnimatePresence>
                    {hasActiveFilters && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="gap-1 text-muted-foreground hover:text-destructive"
                            >
                                <X size={14} /> Clear
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Products Grid */}
            {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : allProducts.length === 0 ? (
                <motion.div
                    className="flex flex-col items-center justify-center h-64 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <Filter className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold">No products found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters</p>
                    {hasActiveFilters && (
                        <Button variant="outline" className="mt-4" onClick={clearFilters}>
                            Clear Filters
                        </Button>
                    )}
                </motion.div>
            ) : (
                <>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <AnimatePresence mode="popLayout">
                            {allProducts.map((product: any, index: number) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index % 12 * 0.05 }}
                                    layout
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {/* Infinite Scroll Trigger */}
                    <div ref={loadMoreRef} className="flex justify-center py-8">
                        {isFetchingNextPage ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Loading more products...</span>
                            </div>
                        ) : hasNextPage ? (
                            <span className="text-sm text-muted-foreground">Scroll to load more</span>
                        ) : allProducts.length > 0 ? (
                            <span className="text-sm text-muted-foreground">You've reached the end</span>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    )
}
