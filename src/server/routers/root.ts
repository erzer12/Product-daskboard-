import { osBuilder } from '../orpc'
import { authRouter } from './auth'
import { productsRouter } from './products'

export const appRouter = osBuilder.router({
    auth: authRouter,
    products: productsRouter,
    health: osBuilder.handler(async () => 'OK'),
})

export type AppRouter = typeof appRouter
