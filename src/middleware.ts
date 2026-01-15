import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Check if the path requires authentication
    const protectedPaths = ['/products', '/cart']
    const isProtectedPath = protectedPaths.some(path =>
        pathname.startsWith(path)
    )

    if (!isProtectedPath) {
        return NextResponse.next()
    }

    // Check for auth token in cookie or localStorage
    // Since localStorage is not available in middleware, we check for a cookie
    const authCookie = request.cookies.get('auth-token')

    // Also check for the auth-storage cookie that Zustand persist might set
    const authStorage = request.cookies.get('auth-storage')

    // If no auth token, redirect to login
    if (!authCookie && !authStorage) {
        // We can't read localStorage in middleware, so we'll let the client-side handle it
        // But we can add a custom header to indicate server-side auth check was attempted
        const response = NextResponse.next()
        response.headers.set('x-auth-check', 'server')
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (svg, png, jpg, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
