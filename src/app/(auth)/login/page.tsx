'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginInput } from '@/server/schemas/auth-schema'
import { useAuthStore } from '@/store/use-auth-store'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { useORPC } from '@/lib/use-orpc'
import { AlertCircle } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    })

    const setAuth = useAuthStore((state) => state.setAuth)
    const router = useRouter()

    const { orpc } = useORPC()

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (data: LoginInput) => {
            return await orpc.auth.login(data)
        },
        onSuccess: (data) => {
            setAuth(data.accessToken, {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image
            })
            router.push('/products')
        }
    })

    const onSubmit = (data: LoginInput) => {
        mutate(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Login to Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="emilys"
                                {...register('username')}
                            />
                            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="emilyspass"
                                {...register('password')}
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-md">
                                <AlertCircle size={16} />
                                <span>{error.message}</span>
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? 'Logging in...' : 'Sign In'}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="justify-center text-xs text-gray-500">
                    Use dummyjson credentials (user: emilys, pass: emilyspass)
                </CardFooter>
            </Card>
        </div>
    )
}
