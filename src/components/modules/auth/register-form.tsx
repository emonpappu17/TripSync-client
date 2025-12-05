"use client";

import { useActionState, useEffect, useRef } from "react";
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
                        <Input required id="fullName" name="fullName" placeholder="John Doe" className="pl-10" defaultValue={state?.formData?.fullName} />
                    </div>
                    <InputFieldError field="fullName" state={state}></InputFieldError>
                </Field>

                {/* EMAIL */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input required id="email" name="email" type="email" placeholder="you@example.com" className="pl-10" defaultValue={state?.formData?.email} />
                    </div>
                    <InputFieldError field="email" state={state}></InputFieldError>

                </Field>

                {/* PASSWORD */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input required id="password" name="password" type="password" placeholder="•••••••" className="pl-10" defaultValue={state?.formData?.password} />
                    </div>
                    <InputFieldError field="password" state={state}></InputFieldError>

                </Field>

                {/* CONFIRM PASSWORD */}
                <Field>
                    <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input required id="confirmPassword" name="confirmPassword" type="password" placeholder="•••••••" className="pl-10" defaultValue={state?.formData?.confirmPassword} />
                    </div>
                    <InputFieldError field="confirmPassword" state={state}></InputFieldError>

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
        </form>
    );
}
