'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productCreateSchema, ProductCreateInput } from '@/server/schemas/product-schema'
import { useORPC } from '@/lib/use-orpc'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Add Product Page
 * 
 * This page allows authenticated users (admins) to create new products.
 * It uses React Hook Form for form handling and Zod for validation.
 * The form data is sent to the backend via oRPC's protected create procedure.
 */
export default function AddProductPage() {
    const router = useRouter()
    const { orpc } = useORPC()
    const queryClient = useQueryClient()

    // Set up form with validation
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductCreateInput>({
        resolver: zodResolver(productCreateSchema),
    })

    // Set up mutation for creating product
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ProductCreateInput) => {
            console.log('Creating product with data:', data)
            return await orpc.products.create(data)
        },
        onSuccess: (createdProduct) => {
            // Show success message
            toast.success('Product created successfully!', {
                description: `"${createdProduct.title}" has been added to the catalog.`
            })

            // Clear the form
            reset()

            // Refresh the products list in the background
            queryClient.invalidateQueries({ queryKey: ['products'] })

            // Navigate back to products page after a short delay
            setTimeout(() => {
                router.push('/products')
            }, 1000)
        },
        onError: (error: any) => {
            // Log error for debugging
            console.error('Failed to create product:', error)

            // Show user-friendly error message
            const errorMessage = error?.message || 'Failed to create product. Please try again.'
            toast.error('Oops! Something went wrong', {
                description: errorMessage
            })
        }
    })

    return (
        <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    aria-label="Go back"
                >
                    <ArrowLeft size={18} />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Add New Product</h1>
                    <p className="text-sm text-muted-foreground">Fill in the details below to create a new product</p>
                </div>
            </div>

            {/* Product Form */}
            <motion.div
                className="bg-card p-6 rounded-xl border shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-6">
                    {/* Product Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">
                            Product Title <span className="text-destructive">*</span>
                        </Label>
                        <Input
                            id="title"
                            {...register('title')}
                            placeholder="e.g., Wireless Headphones"
                            disabled={isPending}
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive flex items-center gap-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Product Price */}
                    <div className="space-y-2">
                        <Label htmlFor="price">
                            Price (USD) <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                {...register('price', { valueAsNumber: true })}
                                placeholder="99.99"
                                className="pl-7"
                                disabled={isPending}
                            />
                        </div>
                        {errors.price && (
                            <p className="text-sm text-destructive">{errors.price.message}</p>
                        )}
                    </div>

                    {/* Product Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description <span className="text-destructive">*</span>
                        </Label>
                        <textarea
                            id="description"
                            {...register('description')}
                            placeholder="Describe your product in detail..."
                            className="w-full min-h-[120px] px-3 py-2 rounded-md border bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
                            disabled={isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Minimum 10 characters
                        </p>
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Product Category */}
                    <div className="space-y-2">
                        <Label htmlFor="category">Category (Optional)</Label>
                        <Input
                            id="category"
                            {...register('category')}
                            placeholder="e.g., electronics, clothing, furniture"
                            disabled={isPending}
                        />
                        <p className="text-xs text-muted-foreground">
                            Help customers find your product more easily
                        </p>
                    </div>

                    {/* Form Actions */}
                    <div className="pt-4 flex justify-end gap-3 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="min-w-[120px]"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                'Create Product'
                            )}
                        </Button>
                    </div>
                </form>
            </motion.div>

            {/* Help Text */}
            <div className="text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-1">💡 Tips for adding products:</p>
                <ul className="space-y-1 ml-4 list-disc">
                    <li>Use clear, descriptive titles that customers will search for</li>
                    <li>Set competitive prices to attract buyers</li>
                    <li>Write detailed descriptions highlighting key features and benefits</li>
                </ul>
            </div>
        </motion.div>
    )
}
