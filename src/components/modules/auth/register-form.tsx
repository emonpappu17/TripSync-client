"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { registerUser } from "@/services/auth/registerUser";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { Loader2, Lock, Mail, User } from "lucide-react";
import InputFieldError from "@/components/shared/InputFieldError";

export default function RegisterForm() {
    const [state, formAction, isPending] = useActionState(registerUser, null);

    console.log({ state });

    useEffect(() => {
        if (state?.success === false && state?.message) {
            toast.error(state.message);
        }
    }, [state]);

    console.log({ state });

    return (
        <form action={formAction} className="space-y-6">
            <FieldGroup className="">
                {/* FULL NAME */}
                <Field>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="fullName" name="fullName" placeholder="John Doe" className="pl-10" />
                    </div>
                    {/* {state?.errors?.fullName && (
                        <p className="text-sm text-red-500">{state.errors.fullName[0]}</p>
                    )} */}
                    <InputFieldError field="fullName" state={state}></InputFieldError>
                </Field>

                {/* EMAIL */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="email" name="email" type="email" placeholder="you@example.com" className="pl-10" />
                    </div>
                    {state?.errors?.email && (
                        <p className="text-sm text-red-500">{state.errors.email[0]}</p>
                    )}
                </Field>

                {/* PASSWORD */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="password" name="password" type="password" placeholder="•••••••" className="pl-10" />
                    </div>
                    {state?.errors?.password && (
                        <p className="text-sm text-red-500">{state.errors.password[0]}</p>
                    )}
                </Field>

                {/* CONFIRM PASSWORD */}
                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="•••••••" className="pl-10" />
                    </div>
                    {state?.errors?.confirmPassword && (
                        <p className="text-sm text-red-500">{state.errors.confirmPassword[0]}</p>
                    )}
                </Field>
            </FieldGroup>

            {/* SUBMIT */}
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account...
                    </>
                ) : (
                    "Create Account"
                )}
            </Button>

            {/* <FieldDescription className="text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 hover:underline">
                    Sign in
                </a>
            </FieldDescription> */}
        </form>

        // <form action={formAction}>
        //     <FieldGroup>
        //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        //             {/* Name */}
        //             <Field>
        //                 <FieldLabel htmlFor="name">Full Name</FieldLabel>
        //                 <Input id="name" name="name" type="text" placeholder="John Doe" />
        //                 {/* <InputFieldError field="name" state={state} /> */}
        //             </Field>

        //             {/* Email */}
        //             <Field>
        //                 <FieldLabel htmlFor="email">Email</FieldLabel>
        //                 <Input
        //                     id="email"
        //                     name="email"
        //                     type="email"
        //                     placeholder="m@example.com"
        //                 />
        //                 {/* <InputFieldError field="email" state={state} /> */}
        //             </Field>
        //             {/* Password */}
        //             <Field>
        //                 <FieldLabel htmlFor="password">Password</FieldLabel>
        //                 <Input id="password" name="password" type="password" />

        //                 {/* <InputFieldError field="password" state={state} /> */}
        //             </Field>
        //             {/* Confirm Password */}
        //             <Field className="md:col-span-2">
        //                 <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
        //                 <Input
        //                     id="confirmPassword"
        //                     name="confirmPassword"
        //                     type="password"
        //                 />

        //                 {/* <InputFieldError field="confirmPassword" state={state} /> */}
        //             </Field>
        //         </div>
        //         <FieldGroup className="mt-4">
        //             <Field>
        //                 <Button type="submit" disabled={isPending}>
        //                     {isPending ? "Creating Account..." : "Create Account"}
        //                 </Button>

        //                 <FieldDescription className="px-6 text-center">
        //                     Already have an account?{" "}
        //                     <a href="/login" className="text-blue-600 hover:underline">
        //                         Sign in
        //                     </a>
        //                 </FieldDescription>
        //             </Field>
        //         </FieldGroup>
        //     </FieldGroup>
        // </form>
    );
}
