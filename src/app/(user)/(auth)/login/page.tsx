/* eslint-disable react/no-unescaped-entities */
import LogoSvg from '@/assets/svg/logo';
import LoginForm from "@/components/modules/auth/login-form";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
    title: 'Login - Travel Sync',
    description: 'Login to your Travel Sync account',
};


export  default async function LoginPage({
    searchParams,
}: {
    searchParams?: Promise<{ redirect?: string }>
}) {
    const params = (await searchParams) || {}

    return (
        <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8">
                <div className="flex items-center justify-center mb-3">
                    <LogoSvg className='size-10' />
                </div>

                <div className="text-center ">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                    <p className="text-muted-foreground">Sign in to continue your journey</p>
                </div>

                <LoginForm redirect={params.redirect}></LoginForm>

                <div className=" text-center text-sm">
                    <p className="text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary font-medium hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>

                <div className=" p-4 bg-muted/50 rounded-lg text-sm">
                    <p className="font-medium mb-2">Demo Credentials:</p>
                    <p className="text-muted-foreground">Admin: admin@tripSync.com / Admin123!</p>
                    <p className="text-muted-foreground">User: user1@tripSync.com / user123</p>
                    <p className="text-muted-foreground">User: user2@tripSync.com / user123</p>
                </div>
            </Card>
        </div>
    );
}
