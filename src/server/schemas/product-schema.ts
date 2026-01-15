import { z } from 'zod'

export const productListSchema = z.object({
    limit: z.number().min(1).max(100).default(10),
    skip: z.number().min(0).default(0),
    search: z.string().optional(),
    category: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
})

export const productCreateSchema = z.object({
    title: z.string().min(3, 'Title is too short'),
    description: z.string().min(10, 'Description is too short'),
    price: z.number().positive(),
    category: z.string().optional(),
})

export const productUpdateSchema = z.object({
    id: z.number(),
    title: z.string().min(3, 'Title is too short').optional(),
    description: z.string().min(10, 'Description is too short').optional(),
    price: z.number().positive().optional(),
    category: z.string().optional(),
})

export type ProductListInput = z.infer<typeof productListSchema>
export type ProductCreateInput = z.infer<typeof productCreateSchema>
export type ProductUpdateInput = z.infer<typeof productUpdateSchema>

