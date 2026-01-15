'use client'

import { useContext } from 'react'
import { ORPCContext } from '@/providers'
// import type { AppRouter } from '@/server/routers/root'
// import type { Client } from '@orpc/client'

export function useORPC() {
    const context = useContext(ORPCContext)
    if (!context) {
        throw new Error('useORPC must be used within ORPCContext.Provider')
    }
    return {
        // Return as any/inferred to avoid strict structural checks
        orpc: context.client,
        queryClient: context.queryClient
    }
}
