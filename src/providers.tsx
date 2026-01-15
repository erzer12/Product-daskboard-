'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createContext, useState } from 'react'
import type { AppRouter } from '@/server/routers/root'
import { Client } from '@orpc/client'

/**
 * oRPC Context
 * Provides the type-safe oRPC client and TanStack Query client throughout the app
 */
export const ORPCContext = createContext<{
    client: any
    queryClient: QueryClient
} | null>(null)

/**
 * Get API Base URL
 * Returns the correct API URL for both development and production environments.
 * 
 * In development: http://localhost:3000
 * In production: https://your-app.vercel.app (or whatever your deployment URL is)
 */
function getApiUrl() {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
        // In production, use the current origin (e.g., https://your-app.vercel.app)
        // In development, this will be http://localhost:3000
        return `${window.location.origin}/api/orpc`
    }

    // Fallback for server-side rendering (shouldn't happen with 'use client' but just in case)
    return '/api/orpc'
}

/**
 * Providers Component
 * Wraps the entire app to provide:
 * - TanStack Query for server state management
 * - oRPC client for type-safe API calls
 * - Query devtools for debugging (development only)
 */
export function Providers({ children }: { children: React.ReactNode }) {
    // Initialize TanStack Query client (handles caching, refetching, etc.)
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // Default options for all queries
                staleTime: 60 * 1000, // Data is fresh for 1 minute
                retry: 2, // Retry failed requests twice
            },
        },
    }))

    // Initialize oRPC client with authentication
    const [orpcClient] = useState(() => {
        const link = new RPCLink({
            // Use dynamic URL that works in both dev and production
            url: getApiUrl(),

            // Automatically attach auth token to all requests
            headers: () => {
                // Only access localStorage in the browser
                if (typeof window === 'undefined') {
                    return {}
                }

                try {
                    // Get auth token from Zustand persist storage
                    const authStorage = localStorage.getItem('auth-storage')
                    if (!authStorage) {
                        return {}
                    }

                    const parsed = JSON.parse(authStorage)
                    const token = parsed?.state?.token

                    if (token) {
                        return {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                } catch (error) {
                    console.error('Failed to get auth token:', error)
                }

                return {}
            },
        })

        // Create and return the typed oRPC client
        return createORPCClient<any>(link) as any
    })

    return (
        <QueryClientProvider client={queryClient}>
            <ORPCContext.Provider value={{ client: orpcClient, queryClient }}>
                {children}
                {/* Show React Query devtools in development only */}
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </ORPCContext.Provider>
        </QueryClientProvider>
    )
}
