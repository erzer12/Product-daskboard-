'use client'

import { useQuery } from '@tanstack/react-query'
import { useORPC } from '@/lib/use-orpc'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Loader2, ArrowLeft, ShoppingCart, Plus, Minus, Edit } from 'lucide-react'
import { useCartStore } from '@/store/use-cart-store'
import { toast } from 'sonner'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ProductDetailPage() {
    const { id } = useParams()
    const { orpc } = useORPC()
    const router = useRouter()
    const addItem = useCartStore(state => state.addItem)
    const [quantity, setQuantity] = useState(1)

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            if (!id) throw new Error('No ID')
            return await (orpc.products as any).get({ id: Number(id) })
        },
        enabled: !!id
    })

    const handleAddToCart = () => {
        if (product) {
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }, quantity)
            toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`)
            setQuantity(1)
        }
    }

    const increment = () => setQuantity(q => q + 1)
    const decrement = () => setQuantity(q => Math.max(1, q - 1))

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>
    if (error) return <div className="p-8 text-red-500">Error loading product</div>

    return (
        <motion.div
            className="max-w-4xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => router.back()} className="gap-2 pl-0 hover:bg-transparent hover:text-primary">
                    <ArrowLeft size={20} /> Back to Products
                </Button>
                <Link href={`/products/${id}/edit`}>
                    <Button variant="outline" className="gap-2">
                        <Edit size={16} /> Edit Product
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                <motion.div
                    className="bg-card rounded-xl border p-8 flex items-center justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="max-h-[400px] object-contain"
                    />
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <div>
                        <h1 className="text-3xl font-bold">{product.title}</h1>
                        <p className="text-lg text-muted-foreground mt-2 capitalize">{product.category} • {product.brand}</p>
                    </div>

                    <div className="text-4xl font-bold text-green-600">
                        ${product.price}
                    </div>

                    <p className="leading-relaxed text-muted-foreground">
                        {product.description}
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-none rounded-l-md"
                                onClick={decrement}
                            >
                                <Minus size={16} />
                            </Button>
                            <div className="h-10 w-16 flex items-center justify-center text-lg font-medium border-x">
                                {quantity}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-10 w-10 rounded-none rounded-r-md"
                                onClick={increment}
                            >
                                <Plus size={16} />
                            </Button>
                        </div>
                        <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                            <ShoppingCart /> Add to Cart
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mt-8 border-t pt-8">
                        <div>
                            <span className="font-semibold block">Stock</span>
                            {product.stock} units
                        </div>
                        <div>
                            <span className="font-semibold block">Rating</span>
                            {product.rating} / 5
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

