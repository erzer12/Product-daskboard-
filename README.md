# 🛍️ NextStore Product Dashboard

A modern, full-featured e-commerce product management dashboard built with Next.js 14, featuring type-safe APIs, infinite scrolling, advanced filtering, and a premium UI/UX with dark mode support.

![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?style=flat&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Project Overview

**NextStore** is a comprehensive product management dashboard that demonstrates modern web development practices. It provides a complete e-commerce admin interface with authentication, product CRUD operations, shopping cart functionality, and advanced filtering capabilities—all wrapped in a beautiful, responsive UI that adapts seamlessly between light and dark modes.

### ✨ Implemented Features

#### 🔐 Authentication & Authorization
- **JWT-based Authentication**: Secure login flow using DummyJSON API
- **Persistent Sessions**: Token stored in localStorage via Zustand persist middleware
- **Route Protection**: Next.js middleware guards protected routes (`/products`, `/cart`)
- **Client-side Guards**: Dashboard layout validates authentication state before rendering

#### 📦 Product Management
- **Product Listing**: Infinite scroll implementation replacing traditional pagination
- **Advanced Filtering**:
  - Real-time search across product names
  - Category-based filtering with dynamic category fetching
  - Price range filtering (min/max)
  - Clear all filters functionality
- **Product Details**: Dedicated view page with full product information
- **Add New Product**: Form with Zod validation for creating products
- **Edit Product**: Pre-populated form for updating existing products
- **Responsive Grid**: Adaptive layout (1-4 columns based on screen size)

#### 🛒 Shopping Cart
- **Cart Management**: Add, remove, update quantity
- **Persistent State**: Cart data stored in localStorage
- **Simulated Checkout**: Multi-step checkout flow with animated loading states
  - Processing Payment
  - Verifying Details
  - Success Confirmation
- **Empty State**: Beautiful prompt to start shopping
- **Real-time Updates**: Instant cart item count and total calculation

#### 🎨 UI/UX Excellence
- **Framer Motion Animations**:
  - Page transitions
  - Card hover effects
  - List item animations (staggered entrance)
  - Checkout flow micro-interactions
- **Dark/Light Mode**: Seamless theme switching with `next-themes`
- **Sticky Sidebar**: Desktop navigation stays in viewport
- **Mobile-First Design**: Collapsible mobile menu with slide-in animation
- **Premium Aesthetics**: Modern color palette, smooth gradients, and polished components

#### 🏗️ Developer Experience
- **Type-Safe APIs**: End-to-end TypeScript with oRPC
- **Schema Validation**: Zod schemas for all forms and API inputs
- **State Management**: Zustand stores for auth, cart, and filters
- **Server State**: TanStack Query for caching and optimistic updates
- **Code Quality**: ESLint configuration with Next.js best practices

---

## 🚀 Tech Stack

### Core Framework
- **[Next.js 16.1.2](https://nextjs.org/)** - React framework with App Router
- **[React 19.2.3](https://react.dev/)** - UI library
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Type safety

### API & Data Layer
- **[oRPC 1.13.4](https://orpc.dev/)** - Type-safe RPC framework
  - `@orpc/server` - Server-side procedures and middleware
  - `@orpc/client` - Client SDK generation
  - `@orpc/react` - React hooks integration
- **[TanStack Query 5.90.17](https://tanstack.com/query)** - Server state management
  - Data fetching, caching, and synchronization
  - Infinite query support for pagination
  - Optimistic updates
- **[Zod 4.3.5](https://zod.dev/)** - Runtime type validation and schema definition

### State Management
- **[Zustand 5.0.10](https://github.com/pmndrs/zustand)** - Lightweight state management
  - `use-auth-store.ts` - Authentication state with persistence
  - `use-cart-store.ts` - Shopping cart state with localStorage sync
  - `use-filter-store.ts` - Product filter state

### Styling & UI
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Utility-first CSS framework
  - `@tailwindcss/postcss` - PostCSS plugin
- **[Shadcn UI](https://ui.shadcn.com/)** - Accessible component library
  - Button, Input, Label, Card components
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI primitives
  - `@radix-ui/react-slot`
  - `@radix-ui/react-label`
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[clsx](https://github.com/lukeed/clsx)** & **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Conditional className utilities

### Animations & UX
- **[Framer Motion 12.26.2](https://www.framer.com/motion/)** - Production-ready animations
- **[next-themes 0.4.6](https://github.com/pacocoursey/next-themes)** - Dark mode support
- **[sonner 2.0.7](https://sonner.emilkowal.ski/)** - Toast notifications
- **[Lucide React 0.562.0](https://lucide.dev/)** - Icon library

### Forms & Validation
- **[React Hook Form 7.71.1](https://react-hook-form.com/)** - Performant form management
- **[@hookform/resolvers 5.2.2](https://github.com/react-hook-form/resolvers)** - Zod integration

### Development Tools
- **[ESLint 9.x](https://eslint.org/)** - Code linting
- **[eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint)** - Next.js ESLint preset
- **[tw-animate-css 1.4.0](https://github.com/ben-rogerson/twin.macro)** - Additional Tailwind animations

---

## 🛠️ Setup and Installation

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)

### Installation Steps

1. **Clone the Repository** (if applicable)
   ```bash
   git clone <repository-url>
   cd product-dashboard
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Login with Test Credentials**
   - **Username**: `emilys`
   - **Password**: `emilyspass`

### Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build production bundle
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

No environment variables required. The app uses the public DummyJSON API ([https://dummyjson.com](https://dummyjson.com)) for backend operations.

---

## 🏛️ Architecture Explanation

### Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── (auth)/                    # Authentication route group
│   │   └── login/                 # Login page
│   │       └── page.tsx
│   ├── (dashboard)/               # Protected dashboard route group
│   │   ├── layout.tsx             # Dashboard layout with sidebar & auth guard
│   │   ├── products/              # Product management routes
│   │   │   ├── page.tsx           # Product listing (infinite scroll)
│   │   │   ├── add/page.tsx       # Add new product form
│   │   │   └── [id]/              # Dynamic product routes
│   │   │       ├── page.tsx       # Product detail view
│   │   │       └── edit/page.tsx  # Edit product form
│   │   └── cart/                  # Shopping cart
│   │       └── page.tsx
│   ├── api/orpc/[...orpc]/        # oRPC route handler
│   │   └── route.ts
│   ├── layout.tsx                 # Root layout (theme provider)
│   └── page.tsx                   # Home page (redirects to /products)
│
├── components/                    # React components
│   ├── ui/                        # Shadcn UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   └── card.tsx
│   ├── product-card.tsx           # Product card with cart integration
│   ├── mode-toggle.tsx            # Dark/light mode toggle
│   └── theme-provider.tsx         # next-themes wrapper
│
├── server/                        # Backend logic (oRPC)
│   ├── routers/                   # RPC routers
│   │   ├── root.ts                # Root router combining all routers
│   │   ├── auth.ts                # Authentication procedures
│   │   └── products.ts            # Product CRUD procedures
│   ├── schemas/                   # Zod validation schemas
│   │   ├── auth-schema.ts         # Login schema
│   │   └── product-schema.ts      # Product schemas (list, create, update)
│   └── orpc.ts                    # oRPC setup (context, middleware, procedures)
│
├── store/                         # Zustand state stores
│   ├── use-auth-store.ts          # Auth state (persisted)
│   ├── use-cart-store.ts          # Cart state (persisted)
│   └── use-filter-store.ts        # Filter state (ephemeral)
│
├── lib/                           # Utility functions
│   ├── use-orpc.ts                # Custom hook for oRPC client
│   └── utils.ts                   # Utility functions (cn for classnames)
│
└── middleware.ts                  # Next.js middleware for route protection
```

### Key Architectural Decisions

#### 1. **App Router with Route Groups**
- Uses Next.js 14 App Router for improved performance and developer experience
- Route groups `(auth)` and `(dashboard)` organize routes without affecting URL structure
- Enables layout-specific logic (dashboard has sidebar, auth pages don't)

#### 2. **Type-Safe API Layer with oRPC**
```typescript
// Define procedure on server
export const productsRouter = osBuilder.router({
  list: publicProcedure
    .input(productListSchema)
    .handler(async ({ input }) => { /* ... */ })
})

// Use on client with full type inference
const { data } = useQuery({
  queryFn: () => orpc.products.list({ limit: 12, skip: 0 })
})
```
- No manual API endpoint definitions
- Automatic TypeScript inference from server to client
- Runtime validation with Zod schemas

#### 3. **State Management Strategy**
- **Server State** (TanStack Query): Remote data, caching, background refetching
- **Client State** (Zustand): UI state, form state, user preferences
  - `use-auth-store`: Persisted to localStorage for session management
  - `use-cart-store`: Persisted to localStorage for cart persistence
  - `use-filter-store`: Ephemeral state for product filters

#### 4. **Middleware-Based Route Protection**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const protectedPaths = ['/products', '/cart']
  const authStorage = request.cookies.get('auth-storage')
  
  if (!authStorage) {
    // Additional client-side check in layout.tsx
  }
}
```
- Server-side route protection via Next.js middleware
- Client-side validation in dashboard layout for hydration safety
- Dual-layer protection ensures secure access

#### 5. **Infinite Scroll Implementation**
- Uses `useInfiniteQuery` from TanStack Query
- Intersection Observer API detects when user scrolls near bottom
- Automatically fetches next page with 100px trigger margin
- Maintains scroll position during page transitions

#### 6. **Component Organization**
- **UI Components** (`components/ui/`): Reusable, unstyled primitives from Shadcn
- **Feature Components** (`components/`): Business logic components (ProductCard)
- **Page Components** (`app/`): Route-specific components with data fetching

---

## 🧩 Key Challenges and Solutions

### Challenge 1: **Type-Safe API Communication**
**Problem**: Traditional REST APIs lack end-to-end type safety, leading to runtime errors and maintenance overhead.

**Solution**: Implemented **oRPC** for type-safe RPC communication.
- Defined Zod schemas for all inputs/outputs
- Server procedures automatically generate TypeScript types
- Client receives full IntelliSense and compile-time validation
- Zero code generation step required

### Challenge 2: **Infinite Scroll with Filtering**
**Problem**: Infinite scroll and dynamic filters need to work together seamlessly without losing scroll position or duplicating data.

**Solution**: Combined TanStack Query's `useInfiniteQuery` with Zustand filter store.
```typescript
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['products', { search, category, minPrice, maxPrice }],
  queryFn: ({ pageParam = 0 }) => orpc.products.list({
    limit: 12,
    skip: pageParam,
    search, category, minPrice, maxPrice
  }),
  getNextPageParam: (lastPage, allPages) => {
    const totalFetched = allPages.reduce((sum, page) => sum + page.products.length, 0)
    return totalFetched >= lastPage.total ? undefined : totalFetched
  }
})
```
- `queryKey` includes filter params, so changing filters triggers new query
- Intersection Observer manages scroll trigger
- Query automatically resets when filters change

### Challenge 3: **Dark Mode Without Flash**
**Problem**: Dark mode implementations often show a flash of wrong theme on page load.

**Solution**: Used `next-themes` with proper SSR handling.
- Theme stored in localStorage
- Inline script blocks render before React hydration
- `suppressHydrationWarning` on `<html>` tag prevents warnings
- Theme provider wraps entire app in root layout

### Challenge 4: **Cart Persistence Across Sessions**
**Problem**: Shopping cart should persist even after browser close/refresh.

**Solution**: Zustand persist middleware with localStorage.
```typescript
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({ /* cart logic */ }),
    { name: 'cart-storage' }
  )
)
```
- Automatically syncs to localStorage
- Hydration-safe with client-only rendering checks
- Works across tabs (storage events)

### Challenge 5: **Middleware Limitations with localStorage**
**Problem**: Next.js middleware runs on edge, can't access localStorage to verify auth.

**Solution**: Hybrid authentication check.
- Middleware checks for cookies (server-side hint)
- Dashboard layout performs actual localStorage check (client-side)
- Prevents unauthorized access while handling SSR/CSR differences

### Challenge 6: **Price Filtering with DummyJSON API**
**Problem**: DummyJSON API doesn't support server-side price filtering.

**Solution**: Client-side filtering after fetch.
```typescript
if (minPrice !== undefined || maxPrice !== undefined) {
  data.products = data.products.filter((product) => {
    const price = product.price
    if (minPrice !== undefined && price < minPrice) return false
    if (maxPrice !== undefined && price > maxPrice) return false
    return true
  })
  data.total = data.products.length
}
```
- Fetch products without price filter
- Apply price filter client-side
- Update total count for accurate pagination

---

## 🤔 Assumptions Made

1. **DummyJSON API Reliability**: The app assumes DummyJSON API is available and maintains consistent response structure. In production, would implement proper error boundaries and fallback UIs.

2. **Mock Product Updates**: DummyJSON's `/products/add` and `/products/{id}` endpoints return mock responses that don't persist. The UI optimistically updates but data resets on page refresh.

3. **Single User Session**: No multi-user support or role-based access control. All authenticated users have the same permissions.

4. **Browser Compatibility**: Assumes modern browser with ES2020+ support, localStorage, and Intersection Observer API.

5. **Network Conditions**: Assumes reasonable network connectivity. No offline mode or service worker implementation.

6. **Image Hosting**: Product images are hosted on DummyJSON CDN. No image upload functionality is implemented.

7. **Cart Checkout**: The checkout flow is simulated with setTimeout. No actual payment processing or order creation occurs.

8. **Data Validation**: Trusts DummyJSON API responses. In production, would validate all incoming data with Zod schemas.

9. **Search Functionality**: Uses DummyJSON's `/products/search` endpoint which searches across multiple fields. Exact search behavior is API-dependent.

10. **Category Management**: Categories are fetched from DummyJSON and treated as static. No ability to create/edit categories.

---

## 🚧 Areas for Future Improvement

### High Priority
1. **Real Backend Integration**
   - Replace DummyJSON with production API (e.g., Supabase, Prisma + PostgreSQL)
   - Implement actual data persistence
   - Add database migrations and seeding scripts

2. **Enhanced Authentication**
   - Registration flow with email verification
   - Password reset functionality
   - OAuth providers (Google, GitHub)
   - JWT refresh token rotation
   - Role-based access control (Admin, User, Guest)

3. **Product Management Enhancements**
   - Image upload with CDN integration (Cloudinary, Uploadcare)
   - Multi-image gallery support
   - Inventory management (stock tracking)
   - Product variants (size, color, etc.)
   - Bulk operations (multi-select delete/edit)
   - CSV import/export

4. **Advanced Search & Filtering**
   - Full-text search with Algolia or Meilisearch
   - Faceted filtering (brand, rating, availability)
   - Sort options (price, date, popularity)
   - Filter presets/saved searches
   - URL-based filter state (shareable filter links)

### Medium Priority
5. **Testing**
   - Unit tests with Jest and React Testing Library
   - Integration tests for oRPC procedures
   - E2E tests with Playwright
   - Accessibility testing (axe-core)

6. **Performance Optimization**
   - Image optimization (next/image with blur placeholders)
   - Code splitting and lazy loading
   - Virtual scrolling for large product lists
   - Service worker for offline support
   - CDN caching strategy

7. **Analytics & Monitoring**
   - Error tracking (Sentry)
   - Analytics (Vercel Analytics, Google Analytics)
   - Performance monitoring (Web Vitals)
   - User behavior tracking

8. **UX Improvements**
   - Skeleton loaders instead of spinners
   - Optimistic UI updates for all mutations
   - Undo functionality for cart operations
   - Product comparison feature
   - Wishlist/favorites
   - Recently viewed products

### Low Priority
9. **Internationalization (i18n)**
   - Multi-language support with next-intl
   - Currency conversion
   - Localized date/number formatting

10. **Advanced Cart Features**
    - Promo codes and discounts
    - Saved carts
    - Cart sharing
    - Estimated delivery dates
    - Multiple payment methods

11. **Admin Dashboard**
    - Sales analytics and charts (Recharts)
    - User management
    - Order management system
    - Inventory reports
    - Audit logs

12. **Mobile App**
    - React Native companion app
    - Push notifications
    - Barcode scanning for product lookup

13. **Accessibility**
    - ARIA labels and roles
    - Keyboard navigation improvements
    - Screen reader testing
    - WCAG 2.1 AA compliance

14. **DevOps**
    - Docker containerization
    - CI/CD pipeline (GitHub Actions)
    - Automated deployments to Vercel
    - Environment-based configurations
    - Database backups

---

## 📸 Screenshots

### Login Page
![Login](https://via.placeholder.com/800x500?text=Login+Page)

### Product Listing with Filters
![Products](https://via.placeholder.com/800x500?text=Product+Listing)

### Shopping Cart
![Cart](https://via.placeholder.com/800x500?text=Shopping+Cart)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x500?text=Dark+Mode)

---

## 🔑 Login Credentials

For testing, use these DummyJSON credentials:

| Username | Password |
|----------|----------|
| `emilys` | `emilyspass` |
| `michaelw` | `michaelwpass` |
| `sophiab` | `sophiabpass` |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **[DummyJSON](https://dummyjson.com/)** - Mock REST API for development
- **[Shadcn UI](https://ui.shadcn.com/)** - Component primitives
- **[Vercel](https://vercel.com/)** - Hosting and deployment platform
- **[Next.js Team](https://nextjs.org/)** - Amazing framework

---

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Next.js and modern web technologies**
