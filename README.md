# 🛍️ NextStore Product Dashboard

A modern, feature-rich product management dashboard built with the latest web technologies. Manage your products, track inventory, and process orders with a beautiful, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)

## ✨ What Makes This Special?

- **🔒 Secure Authentication** - JWT-based login with persistent sessions
- **♾️ Infinite Scrolling** - Smooth, seamless product browsing experience
- **🎨 Beautiful UI** - Dark/Light mode with smooth Framer Motion animations
- **🔍 Smart Filtering** - Search, category, and price range filters that work together
- **✏️ Full CRUD** - Create, read, update products with form validation
- **🛒 Shopping Cart** - Add items, adjust quantities, checkout with simulation
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **⚡ Type-Safe** - End-to-end TypeScript with oRPC for API safety

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/erzer12/Product-daskboard-.git
   cd Product-daskboard-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### First-Time Login

Use these test credentials to log in:

- **Username:** `emilys`
- **Password:** `emilyspass`

> 💡 **Note:** We use DummyJSON's authentication API for demo purposes. In production, you'd replace this with your own auth system.

## 📖 How to Use

### For Shoppers

1. **Browse Products** - Scroll through the product catalog with infinite loading
2. **Search & Filter** - Use the search bar, category dropdown, or price range to find what you need
3. **View Details** - Click any product to see full information
4. **Add to Cart** - Select quantity and add items to your cart
5. **Checkout** - Review your cart and complete the simulated checkout process

### For Admins

1. **Add Products** - Click "Add Product" to create new listings with title, price, description, and category
2. **Edit Products** - Click "Edit Product" on any product detail page to update information
3. **Manage Inventory** - View stock levels and product ratings

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Authentication pages (login)
│   ├── (dashboard)/         # Protected dashboard pages
│   │   ├── products/        # Product listing & management
│   │   │   ├── [id]/       # Product detail & edit
│   │   │   └── add/        # Create new product
│   │   └── cart/           # Shopping cart & checkout
│   └── api/orpc/           # API route handlers
├── components/              # Reusable UI components
│   ├── ui/                 # Shadcn UI primitives
│   └── features/           # Feature-specific components
├── lib/                    # Utility functions
├── server/                 # Backend logic
│   ├── routers/           # oRPC API endpoints
│   └── schemas/           # Zod validation schemas
└── store/                 # Zustand state management
    ├── use-auth-store.ts  # Authentication state
    ├── use-cart-store.ts  # Shopping cart state
    └── use-filter-store.ts # Product filters state
```

## 🛠️ Tech Stack Explained

### Frontend
- **Next.js 14** - React framework with App Router for modern web apps
- **TypeScript** - Type safety throughout the codebase
- **Tailwind CSS v4** - Utility-first styling with custom color palette
- **Shadcn UI** - Beautiful, accessible component library
- **Framer Motion** - Smooth animations and transitions

### State Management
- **TanStack Query** - Server state caching, refetching, and synchronization
- **Zustand** - Simple, fast client state (auth, cart, filters)

### API Layer
- **oRPC** - Type-safe RPC framework (like tRPC but more flexible)
- **Zod** - Runtime validation for forms and API inputs
- **DummyJSON** - Mock API for product data (can be replaced with real backend)

### Forms & Validation
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation for forms and API

## 🎨 Features Deep Dive

### Infinite Scrolling
Products load 12 at a time as you scroll. An intersection observer detects when you reach the bottom and automatically fetches more. No more pagination buttons!

### Smart Filters
All filters work together seamlessly:
- **Search** - Searches across product titles and descriptions
- **Category** - Filter by product category (fetched from API)
- **Price Range** - Set minimum and maximum price limits
- **Clear Filters** - Reset everything with one click

### Shopping Cart
- Add items with custom quantities
- Update quantities with +/- buttons
- Remove items easily
- Auto-calculates totals
- Persists to localStorage (survives page refresh)
- Beautiful checkout flow with progress animation

### Authentication
- Secure JWT token storage
- Automatic token injection in API requests
- Protected routes redirect to login
- Session persists across page refreshes

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## 📝 Code Organization Principles

This codebase follows clean code principles:

1. **Descriptive Names** - Variables and functions clearly state their purpose
2. **Single Responsibility** - Each component/function does one thing well
3. **Comments** - Complex logic explained with helpful comments
4. **Type Safety** - TypeScript everywhere, no 'any' types
5. **Separation of Concerns** - UI, business logic, and API calls are separated

## 🚦 Route Protection

Routes are protected at two levels:

1. **Client-side** - Dashboard layout checks for auth token and redirects
2. **Server-side** - Middleware checks authentication (additional layer)
3. **API-level** - Protected procedures validate JWT tokens

## 🎯 Best Practices Used

- ✅ TypeScript strict mode enabled
- ✅ ESLint for code quality
- ✅ Component composition over prop drilling  
- ✅ Custom hooks for reusable logic
- ✅ Error boundaries for graceful failures
- ✅ Loading and empty states everywhere
- ✅ Responsive design mobile-first
- ✅ Accessible UI components (ARIA labels, keyboard navigation)

## 🐛 Troubleshooting

### "You must be logged in" error when creating products
**Solution:** Make sure you're logged in. The create/edit/delete operations require authentication.

### Products not loading
**Solution:** Check if `npm run dev` is running and DummyJSON API is accessible.

### Cart items disappearing
**Solution:** Check if localStorage is enabled in your browser. Private/Incognito mode may not persist cart data.

### Build errors
**Solution:** Delete `.next` folder and `node_modules`, then run `npm install` and `npm run build` again.

## 🔮 Future Enhancements

- [ ] Real-time product updates with WebSockets
- [ ] Image upload for products
- [ ] Order history page
- [ ] User profile management
- [ ] Product reviews and ratings
- [ ] Advanced analytics dashboard
- [ ] Export data to CSV/PDF
- [ ] Multi-language support

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **DummyJSON** for the mock API
- **Shadcn** for the beautiful component library
- **Vercel** for Next.js and hosting
- **The open source community** for amazing tools and libraries

## 💬 Questions or Issues?

If you encounter any problems or have questions:
1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Open a new issue with details about your problem

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
