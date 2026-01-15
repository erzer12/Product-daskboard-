import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-8 h-16 flex items-center border-b">
        <div className="flex items-center gap-2 font-bold text-xl">
          <ShoppingBag className="w-6 h-6" />
          <span>NextStore</span>
        </div>
        <nav className="ml-auto gap-4 sm:gap-6 flex">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://orpc.dev" target="_blank">oRPC</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://github.com/dummyjson/dummyjson" target="_blank">DummyJSON</Link>
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-24 md:py-32 lg:py-48 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Modern Product Management
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Built with Next.js 14, oRPC, TanStack Query, and Zustand. Completely type-safe from server to client.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Get Started <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="https://github.com/your-username/product-dashboard" target="_blank">
                  <Button variant="outline" size="lg">
                    View Code
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl shadow-sm">
                <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">End-to-End Type Safety</h3>
                <p className="text-center text-gray-500">
                  Powered by oRPC. Inputs and outputs are validated on both server and client.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl shadow-sm">
                <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Instant State</h3>
                <p className="text-center text-gray-500">
                  TanStack Query handles server caching, while Zustand manages local cart & auth persistence.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border p-6 rounded-xl shadow-sm">
                <div className="p-2 bg-green-100 rounded-full text-green-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Full Features</h3>
                <p className="text-center text-gray-500">
                  Authentication, Product Listing, Search, Filter, Pagination, and Shopping Cart.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Product Dashboard. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">Terms of Service</Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">Privacy</Link>
        </nav>
      </footer>
    </div>
  )
}
