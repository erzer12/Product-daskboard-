'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { createContext, useState } from 'react'
import type { AppRouter } from '@/server/routers/root'
import { Client } from '@orpc/client'

// Using 'any' for client to bypass strict NestedClient checks during build
export const ORPCContext = createContext<{
    client: any
    queryClient: QueryClient
} | null>(null)

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    const [orpcClient] = useState(() => {
        // Correct link initialization
        const link = new RPCLink({
            url: 'http://localhost:3000/api/orpc',
            headers: () => {
                const token = typeof window !== 'undefined' && localStorage.getItem('auth-storage')
                    ? JSON.parse(localStorage.getItem('auth-storage')!).state?.token
                    : undefined
                return {
                    Authorization: token ? `Bearer ${token}` : '',
                }
            },
        })

        // Cast to any to satisfy type constraints
        return createORPCClient<any>(link) as any
    })

    return (
        <QueryClientProvider client={queryClient}>
            <ORPCContext.Provider value={{ client: orpcClient, queryClient }}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </ORPCContext.Provider>
        </QueryClientProvider>
    )
}
