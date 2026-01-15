'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useORPC } from '@/lib/use-orpc'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { motion } from 'framer-motion'

// Form schema without id field
const editFormSchema = z.object({
    title: z.string().min(3, 'Title is too short'),
    description: z.string().min(10, 'Description is too short'),
    price: z.number().positive(),
    category: z.string().optional(),
})

type EditFormInput = z.infer<typeof editFormSchema>

export default function EditProductPage() {
    const { id } = useParams()
    const router = useRouter()
    const { orpc } = useORPC()
    const queryClient = useQueryClient()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<EditFormInput>({
        resolver: zodResolver(editFormSchema),
    })

    // Fetch current product data
    const { data: product, isLoading: isLoadingProduct } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
            if (!id) throw new Error('No ID')
            return await (orpc.products as any).get({ id: Number(id) })
        },
        enabled: !!id
    })

    // Populate form when product data loads
    useEffect(() => {
        if (product) {
            reset({
                title: product.title,
                description: product.description,
                price: product.price,
                category: product.category,
            })
        }
    }, [product, reset])

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: EditFormInput) => {
            return await (orpc.products as any).update({ id: Number(id), ...data })
        },
        onSuccess: () => {
            toast.success('Product updated successfully!')
            queryClient.invalidateQueries({ queryKey: ['products'] })
            queryClient.invalidateQueries({ queryKey: ['product', id] })
            router.push(`/products/${id}`)
        },
        onError: (err) => {
            console.error(err)
            toast.error('Failed to update product')
        }
    })

    if (isLoadingProduct) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="animate-spin h-8 w-8 text-primary" />
            </div>
        )
    }

    return (
        <motion.div
            className="max-w-2xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft size={18} />
                </Button>
                <h1 className="text-2xl font-bold">Edit Product</h1>
            </div>

            <motion.div
                className="bg-card p-6 rounded-xl border shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input {...register('title')} placeholder="Product Name" />
                        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                            type="number"
                            step="0.01"
                            {...register('price', { valueAsNumber: true })}
                            placeholder="99.99"
                        />
                        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <textarea
                            {...register('description')}
                            className="w-full min-h-[100px] px-3 py-2 rounded-md border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Product description..."
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Input {...register('category')} placeholder="electronics" />
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    )
}
