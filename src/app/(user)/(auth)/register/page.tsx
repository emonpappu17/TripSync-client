import LogoSvg from '@/assets/svg/logo';
import RegisterForm from "@/components/modules/auth/register-form";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
    title: 'Register - TripSync',
    description: 'Create your TripSync account',
};

export default function RegisterPage() {

    return (
        <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
            <Card className="w-full max-w-md p-8">
                <div className="flex items-center justify-center mb-3">
                    <LogoSvg className='size-10' />
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Join Travel Buddy</h1>
                    <p className="text-muted-foreground">Start your journey with fellow travelers</p>
                </div>

                <RegisterForm></RegisterForm>

                <div className=" text-center text-sm">
                    <p className="text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="text-primary font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </Card>
        </div>

    );
}