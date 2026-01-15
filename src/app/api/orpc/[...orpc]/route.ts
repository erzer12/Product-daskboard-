import { appRouter } from '@/server/routers/root'
import { RPCHandler } from '@orpc/server/fetch'
import { NextRequest, NextResponse } from 'next/server'

// Initialize the RPC handler with our application router
// This handles all API calls from the client to our backend procedures
const handler = new RPCHandler(appRouter)

/**
 * Helper function to extract and validate authentication token from request headers
 * @param request - The incoming Next.js request
 * @returns User context if authenticated, empty object otherwise
 */
async function getAuthContext(request: NextRequest) {
    // Extract the Bearer token from the Authorization header
    const authHeader = request.headers.get('Authorization')
    const token = authHeader?.replace('Bearer ', '')

    // If we have a valid token, create a user context
    // In a real app, you'd verify the JWT and extract user info from it
    if (token && token.length > 0) {
        return {
            user: {
                id: 1,
                username: 'authenticated-user',
                token
            }
        }
    }

    // No authentication provided
    return {}
}

/**
 * GET handler for oRPC requests
 * Handles read operations and queries
 */
export async function GET(request: NextRequest) {
    console.log(`[oRPC] ${request.method} ${request.url}`)

    // @ts-ignore - RPCHandler types might be slightly off with NextRequest vs standard Request
    const result = await handler.handle(request, {
        prefix: '/api/orpc',
        context: () => getAuthContext(request) // Provide auth context for all requests
    })

    // Return the matched procedure response or 404
    if (result.matched) {
        return result.response
    }
    return new NextResponse('Not Found', { status: 404 })
}

/**
 * POST handler for oRPC requests
 * Handles mutations and write operations
 */
export async function POST(request: NextRequest) {
    console.log(`[oRPC] ${request.method} ${request.url}`)

    // @ts-ignore - RPCHandler types might be slightly off with NextRequest vs standard Request
    const result = await handler.handle(request, {
        prefix: '/api/orpc',
        context: () => getAuthContext(request) // Provide auth context for all requests
    })

    // Return the matched procedure response or 404
    if (result.matched) {
        return result.response
    }
    return new NextResponse('Not Found', { status: 404 })
}
