import { publicProcedure, osBuilder } from '../orpc'
import { z } from 'zod'
import { loginSchema } from '../schemas/auth-schema'
import { ORPCError } from '@orpc/server'

export const authRouter = osBuilder.router({
    login: publicProcedure
        .input(loginSchema)
        .handler(async ({ input }: { input: z.infer<typeof loginSchema> }) => {
            try {
                const response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(input),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new ORPCError('UNAUTHORIZED', {
                        message: errorData.message || 'Invalid credentials',
                    })
                }

                const data = await response.json()
                return data as { accessToken: string; refreshToken: string; id: number; username: string; email: string; firstName: string; lastName: string; gender: string; image: string }
            } catch (error) {
                if (error instanceof ORPCError) throw error
                throw new ORPCError('INTERNAL_SERVER_ERROR', {
                    message: 'Failed to authenticate',
                })
            }
        }),
})
