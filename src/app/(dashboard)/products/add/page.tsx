'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productCreateSchema, ProductCreateInput } from '@/server/schemas/product-schema'
import { useORPC } from '@/lib/use-orpc'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner' // Or browser alert if not installed
import { ArrowLeft } from 'lucide-react'

export default function AddProductPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductCreateInput>({
        resolver: zodResolver(productCreateSchema),
    })
    const router = useRouter()
    const { orpc } = useORPC()

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ProductCreateInput) => {
            return await orpc.products.create(data)
        },
        onSuccess: () => {
            // toast.success('Product created!')
            router.push('/products')
        },
        onError: (err) => {
            console.error(err)
            alert('Failed to create product')
        }
    })

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft size={18} />
                </Button>
                <h1 className="text-2xl font-bold">Add New Product</h1>
            </div>

            <div className="bg-card p-6 rounded-xl border shadow-sm">
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
                        <Input className="h-24" {...register('description')} />
                        {/* Ideally Textarea, but using Input with height for safety if component missing */}
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>
                        <Input {...register('category')} placeholder="electronics" />
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
