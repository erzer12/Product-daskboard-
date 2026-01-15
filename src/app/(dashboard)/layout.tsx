'use client'

import { useAuthStore } from '@/store/use-auth-store'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    LayoutDashboard,
    ShoppingBag,
    ShoppingCart,
    Settings,
    LogOut,
    Menu,
    Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = useAuthStore((state) => state.token)
    const logout = useAuthStore((state) => state.logout)
    const router = useRouter()
    const pathname = usePathname()
    const [isHydrated, setIsHydrated] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        setIsHydrated(true)
    }, [])

    useEffect(() => {
        if (isHydrated && !token) {
            router.push('/login')
        }
    }, [token, router, isHydrated])

    if (!isHydrated || !token) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        )
    }

    const navigation = [
        { name: 'Products', href: '/products', icon: LayoutDashboard },
        { name: 'Add Product', href: '/products/add', icon: Plus },
        { name: 'My Cart', href: '/cart', icon: ShoppingCart },
    ]

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-card/50 backdrop-blur-xl sticky top-0 h-screen">
                <div className="h-16 flex items-center px-6 border-b">
                    <ShoppingBag className="w-6 h-6 text-primary mr-2" />
                    <span className="font-bold text-lg tracking-tight">NextStore</span>
                </div>

                <div className="flex-1 py-6 px-3 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-primary/10 text-primary shadow-sm"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}>
                                    <Icon size={18} />
                                    {item.name}
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className="p-4 border-t space-y-2">
                    <div className="flex items-center justify-between px-2">
                        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme</span>
                        <ModeToggle />
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                            logout()
                            router.push('/login')
                        }}
                    >
                        <LogOut size={18} />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Mobile Header & Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="md:hidden h-16 border-b bg-background/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-50">
                    <div className="flex items-center gap-2 font-bold">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        NextStore
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        <Menu className="w-5 h-5" />
                    </Button>
                </header>

                {/* Mobile Menu Overlay */}

                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b z-40 p-4 shadow-xl animate-in slide-in-from-top-2">
                        <nav className="space-y-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-sm font-medium"
                                >
                                    <item.icon size={18} className="text-primary" />
                                    {item.name}
                                </Link>
                            ))}
                            <div className="flex items-center justify-between px-4 py-3">
                                <span className="text-sm font-medium">Theme</span>
                                <ModeToggle />
                            </div>
                            <button
                                onClick={() => {
                                    logout()
                                    router.push('/login')
                                }}
                                className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 text-sm font-medium"
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </nav>
                    </div>
                )}

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <div className="max-w-7xl mx-auto animate-in fade-in-0 slide-in-from-bottom-3 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div >
    )
}
