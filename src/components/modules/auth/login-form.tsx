'use client';

import { useFormState, useFormStatus } from 'react-dom';
// import { loginAction } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock } from 'lucide-react';
import { useEffect } from 'react';
// import { toast } from '@/components/ui/use-toast';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" className="w-full" disabled={pending} size="lg">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                </>
            ) : (
                'Sign In'
            )}
        </Button>
    );
}

export default function LoginForm() {
    // const [state, formAction] = useFormState(loginAction, null);

    // useEffect(() => {
    //     if (state?.success === false && state?.message) {
    //         toast({
    //             title: 'Login failed',
    //             description: state.message,
    //             variant: 'destructive',
    //         });
    //     }
    // }, [state]);

    return (
        <form className="space-y-4">
            {/* {state?.success === false && state?.message && (
                <Alert variant="destructive">
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )} */}

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="pl-10"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        className="pl-10"
                    />
                </div>
            </div>

            <SubmitButton />
        </form>
    );
}
