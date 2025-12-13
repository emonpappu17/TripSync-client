"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { loginUser } from "@/services/auth/loginUser"; // <-- your server action

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import InputFieldError from "@/components/shared/InputFieldError";
import { Loader2, Lock, Mail } from "lucide-react";

export default function LoginForm({ redirect }: { redirect?: string }) {
    const [state, formAction, isPending] = useActionState(loginUser, null);

    useEffect(() => {
        if (state?.success === false && state?.message) {
            toast.error(state.message || "Login failed!");
        }
    }, [state]);

    return (
        <form action={formAction} className="space-y-6">
            {redirect && <input type="hidden" name="redirect" value={redirect} />}
            <FieldGroup>
                {/* EMAIL */}
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10"
                            defaultValue={state?.formData?.email}
                        />
                    </div>
                    <InputFieldError field="email" state={state} />
                </Field>

                {/* PASSWORD */}
                <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            required
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            defaultValue={state?.formData?.password}
                        />
                    </div>
                    <InputFieldError field="password" state={state} />
                </Field>
            </FieldGroup>

            {/* SUBMIT */}
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                    </>
                ) : (
                    "Sign In"
                )}
            </Button>
        </form>
    );
}

