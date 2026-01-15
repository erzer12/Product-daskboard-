import { os, ORPCError } from '@orpc/server'

/**
 * Authentication Context
 * This type defines what auth information is available to all procedures.
 * The user object is optional because public procedures don't require authentication.
 */
export type Context = {
    user?: {
        id: number
        username: string
        token: string
    }
}

// Create the base oRPC server builder with our context type
// This ensures type safety across all procedures
export const osBuilder = os.$context<Context>()

/**
 * Logging Middleware
 * Logs every procedure call for debugging and monitoring.
 * This runs before every single procedure (both public and protected).
 */
const loggerMiddleware = osBuilder.middleware(async ({ next, path }) => {
    const procedurePath = path.join('.')
    console.log(`[oRPC Procedure] ${procedurePath}`)

    // Continue to the next middleware or procedure
    return next({})
})

/**
 * Public Procedure
 * Use this for endpoints that don't require authentication.
 * Examples: login, public product listings, categories
 */
export const publicProcedure = osBuilder.use(loggerMiddleware)

/**
 * Protected Procedure  
 * Use this for endpoints that REQUIRE authentication.
 * Examples: create product, update product, user profile
 * 
 * This middleware checks if the user is authenticated and throws an error if not.
 */
export const protectedProcedure = publicProcedure.use(async ({ next, context }) => {
    // Check if user is authenticated
    if (!context.user) {
        throw new ORPCError('UNAUTHORIZED', {
            message: 'You must be logged in to access this resource.',
        })
    }

    // User is authenticated - pass the user context to the procedure
    return next({
        context: {
            user: context.user,
        },
    })
})
