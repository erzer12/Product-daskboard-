import { appRouter } from '@/server/routers/root'
import { RPCHandler } from '@orpc/server/fetch'
import { NextRequest, NextResponse } from 'next/server'

// Create handler once
const handler = new RPCHandler(appRouter)

export async function GET(request: NextRequest) {
    console.log(`[oRPC] ${request.method} ${request.url}`)
    // @ts-ignore - RPCHandler types might be slightly off with NextRequest vs Request
    const result = await handler.handle(request, {
        prefix: '/api/orpc',
        context: async () => ({})
    })

    if (result.matched) {
        return result.response
    }
    return new NextResponse('Not Found', { status: 404 })
}

export async function POST(request: NextRequest) {
    // @ts-ignore
    const result = await handler.handle(request, {
        prefix: '/api/orpc',
        context: async () => {
            const token = request.headers.get('Authorization')?.replace('Bearer ', '')
            // Simple mock user if token exists
            if (token) {
                return { user: { id: 1, username: 'mock', token } }
            }
            return {}
        },
    })

    if (result.matched) {
        return result.response
    }
    return new NextResponse('Not Found', { status: 404 })
}
