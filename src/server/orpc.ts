import { os, ORPCError } from '@orpc/server'
import { z } from 'zod'

// Define context type explicitly
export type Context = {
    user?: { id: number; username: string; token: string }
}

// Define the basic builder
export const osBuilder = os.$context<Context>()

// Middleware to log requests (input might not be available yet, so omitting)
const loggerMiddleware = osBuilder.middleware(async ({ next, path }, meta) => {
    console.log(`[oRPC] ${path.join('/')} called`)
    return next({})
})

// Public Procedure
export const publicProcedure = osBuilder.use(loggerMiddleware)

// Protected Procedure
export const protectedProcedure = publicProcedure.use(async ({ next, context }) => {
    if (!context.user) {
        throw new ORPCError('UNAUTHORIZED', {
            message: 'You must be logged in to access this resource.',
        })
    }
    return next({
        context: {
            user: context.user,
        },
    })
})
