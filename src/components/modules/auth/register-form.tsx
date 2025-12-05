'use client';

import { useFormState, useFormStatus } from 'react-dom';
// import { registerAction } from '@/lib/actions/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { useEffect } from 'react';
import { div } from 'framer-motion/client';
// import { toast } from '@/components/ui/use-toast';

// function SubmitButton() {
//     const { pending } = useFormStatus();

//     return (
//         <Button type="submit" className="w-full" disabled={pending} size="lg">
//             {pending ? (
//                 <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Creating account...
//                 </>
//             ) : (
//                 'Create Account'
//             )}
//         </Button>
//     );
// }

export default function RegisterForm() {
    // const [state, formAction] = useFormState(registerAction, null);

    // useEffect(() => {
    //     if (state?.success === false && state?.message) {
    //         toast({
    //             title: 'Registration failed',
    //             description: state.message,
    //             variant: 'destructive',
    //         });
    //     }
    // }, [state]);

    return (
        <div>
            <form className="space-y-4">
                {/* {state?.success === false && state?.message && (
                <Alert variant="destructive">
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )} */}

                <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="pl-10"
                        />
                    </div>
                    {/* {state?.errors?.fullName && (
                    <p className="text-sm text-red-500">{state.errors.fullName[0]}</p>
                )} */}
                </div>

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
                    {/* {state?.errors?.email && (
                    <p className="text-sm text-red-500">{state.errors.email[0]}</p>
                )} */}
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
                    {/* {state?.errors?.password && (
                    <p className="text-sm text-red-500">{state.errors.password[0]}</p>
                )} */}
                    {/* <p className="text-xs text-gray-500">
                        Must be at least 8 characters with uppercase, lowercase, number and special character
                    </p> */}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Confirm Password</Label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="pl-10"
                        />
                    </div>
                    {/* {state?.errors?.password && (
                    <p className="text-sm text-red-500">{state.errors.password[0]}</p>
                )} */}
                    {/* <p className="text-xs text-gray-500">
                        Must be at least 8 characters with uppercase, lowercase, number and special character
                    </p> */}
                </div>

                {/* <SubmitButton /> */}
                {/* <Button></Button> */}

                <Button type="submit" className="w-full gradient-hero" >
                    {/* {loading ? (
           <>
             <Loader2 className="w-4 h-4 mr-2 animate-spin" />
             Creating account...
           </>
         ) : (
           'Create Account'
         )} */}
                    Create Account
                </Button>
            </form>
        </div>
    );
}