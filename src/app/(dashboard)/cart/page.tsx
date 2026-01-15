'use client'

import { useCartStore } from '@/store/use-cart-store'
import { Button } from '@/components/ui/button'
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, CheckCircle2, Loader2, ArrowRight, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export default function CartPage() {
    const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [checkoutStep, setCheckoutStep] = useState<'idle' | 'processing' | 'verifying' | 'success'>('idle')
    const [isHydrated, setIsHydrated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    const handleCheckout = async () => {
        if (items.length === 0) return

        setIsCheckingOut(true)
        setCheckoutStep('processing')

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000))
        setCheckoutStep('verifying')

        // Simulate verification
        await new Promise(resolve => setTimeout(resolve, 1500))
        setCheckoutStep('success')

        // Finalize
        await new Promise(resolve => setTimeout(resolve, 1000))

        clearCart()
        toast.success('Order placed successfully!')

        setTimeout(() => {
            setIsCheckingOut(false)
            setCheckoutStep('idle')
            router.push('/products')
        }, 1200)
    }

    if (!isHydrated) return null

    if (items.length === 0 && !isCheckingOut) {
        return (
            <motion.div
                className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
            >
                <motion.div
                    className="bg-gray-100 p-6 rounded-full dark:bg-gray-800"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.1, type: "spring" }}
                >
                    <ShoppingBag className="w-12 h-12 text-gray-400" />
                </motion.div>
                <h2 className="text-2xl font-bold tracking-tight">Your cart is empty</h2>
                <p className="text-muted-foreground max-w-sm">
                    Looks like you haven't added anything to your cart yet.
                </p>
                <Link href="/products">
                    <Button size="lg" className="mt-4 gap-2">
                        Start Shopping <ArrowRight size={16} />
                    </Button>
                </Link>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="max-w-5xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Checkout Buffer Panel / Loading Overlay */}
            <AnimatePresence>
                {isCheckingOut && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-card border shadow-2xl rounded-2xl p-8 max-w-md w-full mx-4 space-y-8 text-center"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                        >
                            {checkoutStep === 'success' ? (
                                <motion.div
                                    className="space-y-4"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >
                                    <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={40} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-green-700">Order Confirmed!</h3>
                                        <p className="text-muted-foreground mt-2">Thank you for your purchase.</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="space-y-6">
                                    <motion.div
                                        className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center relative"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Loader2 size={32} />
                                    </motion.div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold">
                                            {checkoutStep === 'processing' ? 'Processing Payment...' : 'Verifying Details...'}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Please do not close this window.</p>
                                    </div>
                                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            initial={{ width: "0%" }}
                                            animate={{ width: checkoutStep === 'processing' ? "50%" : "100%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="flex items-center gap-2 mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <ShoppingCart className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <span className="ml-2 text-sm bg-secondary px-2 py-0.5 rounded-full text-muted-foreground">
                    {items.length} items
                </span>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item): React.JSX.Element => (
                            <motion.div
                                key={item.id}
                                className="group bg-card border rounded-xl p-4 flex gap-4 transition-shadow hover:shadow-md"
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            >
                                <div className="h-24 w-24 bg-secondary rounded-lg overflow-hidden shrink-0">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
                                            <p className="text-primary font-bold mt-1">${item.price}</p>
                                        </div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-destructive h-8 w-8"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </motion.div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 rounded-md"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus size={12} />
                                            </Button>
                                            <span className="w-8 text-center text-sm font-medium tabular-nums">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 rounded-md"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus size={12} />
                                            </Button>
                                        </div>
                                        <div className="ml-auto text-sm font-medium text-muted-foreground">
                                            Total: <span className="text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <motion.div
                    className="bg-card border rounded-xl p-6 space-y-6 lg:sticky lg:top-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="font-semibold text-lg">Order Summary</h2>

                    <div className="space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>${getTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${getTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            size="lg"
                            className="w-full gap-2 text-base shadow-lg shadow-primary/20"
                            onClick={handleCheckout}
                        >
                            Checkout <CreditCard size={18} />
                        </Button>
                    </motion.div>

                    <p className="text-xs text-center text-muted-foreground">
                        Secure checkout powered by oRPC
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}
