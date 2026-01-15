import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * User Authentication Data
 * Contains the authenticated user's information
 */
interface User {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    image: string
}

/**
 * Authentication Store State and Actions
 * Manages user authentication state across the entire app
 */
interface AuthState {
    // JWT access token (null if not logged in)
    token: string | null

    // Authenticated user data (null if not logged in)
    user: User | null

    // Set authentication (called after successful login)
    setAuth: (token: string, user: User) => void

    // Clear authentication (called when user logs out)
    logout: () => void
}

/**
 * Authentication Store
 * 
 * This Zustand store manages user authentication across the entire application.
 * It automatically persists to localStorage so users stay logged in after page refresh.
 * 
 * The token is automatically sent with all API requests via the providers setup.
 * 
 * Usage:
 * ```tsx
 * const { token, user, setAuth, logout } = useAuthStore()
 * 
 * // After successful login:
 * setAuth('jwt-token-here', { id: 1, username: 'john', ... })
 * 
 * // To logout:
 * logout()
 * ```
 */
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            // Initial state: not authenticated
            token: null,
            user: null,

            /**
             * Set Authentication
             * Stores the JWT token and user data after successful login.
             * This automatically triggers re-renders in components using this store.
             */
            setAuth: (token, user) => set({ token, user }),

            /**
             * Logout
             * Clears all authentication data.
             * Components will automatically redirect to login when they detect no token.
             */
            logout: () => set({ token: null, user: null }),
        }),
        {
            // Storage configuration
            name: 'auth-storage', // Key in localStorage

            // Note: In production, consider using httpOnly cookies instead of localStorage
            // for better security against XSS attacks
        }
    )
)
