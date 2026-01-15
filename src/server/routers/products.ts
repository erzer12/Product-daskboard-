import { publicProcedure, protectedProcedure, osBuilder } from '../orpc'
import { z } from 'zod'
import { productListSchema, productCreateSchema, productUpdateSchema } from '../schemas/product-schema'
import { ORPCError } from '@orpc/server'

export const productsRouter = osBuilder.router({
    list: publicProcedure
        .input(productListSchema)
        .handler(async ({ input }: { input: z.infer<typeof productListSchema> }) => {
            const { limit, skip, search, category, minPrice, maxPrice } = input
            let url = `https://dummyjson.com/products`

            if (search) {
                url += `/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
            } else if (category) {
                url += `/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
            } else {
                url += `?limit=${limit}&skip=${skip}`
            }

            const res = await fetch(url)
            let data = await res.json() as { products: any[]; total: number; skip: number; limit: number }

            // Client-side price filtering (DummyJSON doesn't support server-side price filtering)
            if (minPrice !== undefined || maxPrice !== undefined) {
                data.products = data.products.filter((product: any) => {
                    const price = product.price
                    if (minPrice !== undefined && price < minPrice) return false
                    if (maxPrice !== undefined && price > maxPrice) return false
                    return true
                })
                data.total = data.products.length
            }

            return data
        }),

    get: publicProcedure
        .input(z.object({ id: z.number() }))
        .handler(async ({ input }: { input: { id: number } }) => {
            const res = await fetch(`https://dummyjson.com/products/${input.id}`)
            if (!res.ok) {
                throw new ORPCError('NOT_FOUND', { message: 'Product not found' })
            }
            return await res.json()
        }),

    categories: publicProcedure
        .handler(async () => {
            const res = await fetch('https://dummyjson.com/products/categories')
            const data = await res.json()
            return data as { slug: string; name: string; url: string }[]
        }),

    create: protectedProcedure
        .input(productCreateSchema)
        .handler(async ({ input, context }: { input: z.infer<typeof productCreateSchema>, context: any }) => {
            const res = await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(input)
            })

            return await res.json()
        }),

    update: protectedProcedure
        .input(productUpdateSchema)
        .handler(async ({ input, context }: { input: z.infer<typeof productUpdateSchema>, context: any }) => {
            const { id, ...updateData } = input
            const res = await fetch(`https://dummyjson.com/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData)
            })

            if (!res.ok) {
                throw new ORPCError('NOT_FOUND', { message: 'Product not found' })
            }

            return await res.json()
        })
})

