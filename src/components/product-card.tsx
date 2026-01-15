'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useCartStore } from '@/store/use-cart-store'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface ProductCardProps {
    product: {
        id: number
        title: string
        price: number
        description: string
        category: string
        thumbnail: string
    }
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem)
    const [quantity, setQuantity] = useState(1)
    const [isAdding, setIsAdding] = useState(false)

    const handleAddToCart = async () => {
        setIsAdding(true)
        addItem({
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail
        }, quantity)
        toast.success(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`)
        setQuantity(1)

        // Reset animation state
        setTimeout(() => setIsAdding(false), 300)
    }

    const increment = () => setQuantity(q => q + 1)
    const decrement = () => setQuantity(q => Math.max(1, q - 1))

    return (
        <motion.div
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card className="flex flex-col h-full overflow-hidden group">
                <div className="aspect-square relative overflow-hidden bg-muted p-4">
                    <motion.img
                        src={product.thumbnail}
                        alt={product.title}
                        className="object-contain w-full h-full"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-lg line-clamp-1" title={product.title}>
                        {product.title}
                    </CardTitle>
                    <CardDescription className="capitalize">
                        {product.category}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-2 flex-1">
                    <p className="font-bold text-xl">${product.price}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {product.description}
                    </p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex flex-col gap-3">
                    <div className="flex w-full items-center gap-2">
                        <div className="flex items-center border rounded-md">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none rounded-l-md"
                                onClick={decrement}
                                type="button"
                            >
                                <Minus size={14} />
                            </Button>
                            <div className="h-8 w-12 flex items-center justify-center text-sm font-medium border-x">
                                {quantity}
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none rounded-r-md"
                                onClick={increment}
                                type="button"
                            >
                                <Plus size={14} />
                            </Button>
                        </div>
                        <motion.div
                            className="flex-1"
                            animate={isAdding ? { scale: [1, 0.95, 1] } : {}}
                            transition={{ duration: 0.2 }}
                        >
                            <Button className="w-full gap-2" onClick={handleAddToCart}>
                                <ShoppingCart size={16} /> Add
                            </Button>
                        </motion.div>
                    </div>
                    <Link href={`/products/${product.id}`} className="w-full">
                        <Button variant="outline" className="w-full">View Details</Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    )
}
