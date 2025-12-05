/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";

export async function registerUser(
    prevState: any,
    formData: FormData
): Promise<any> {
    const payload = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        fullName: formData.get('fullName') as string,
        confirmPassword: formData.get('confirmPassword') as string,
    }

    // console.log({ payload })

    // Input Validation
    // if (zodValidator(payload, registerZodSchema).success === false) {
    //     return zodValidator(payload, registerZodSchema)
    // }

    const validation = zodValidator(payload, registerZodSchema);

    if (!validation.success) {
        return {
            success: false,
            errors: validation.errors,
            formData: payload, // <-- keep submitted values
        };
    }

    const finalData = {
        email: payload.email,
        fullName: payload.fullName,
        password: payload.password
    }

    try {
        const response = await serverFetch.post("/auth/register", {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalData),
        })

        const data = await response.json();

        // console.log({ data });

        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'Registration failed',
            };
        }

        // revalidatePath('/', 'layout');
        redirect('/');
    } catch (error: any) {
        // return {
        //     success: false,
        //     message: error.message || 'Something went wrong',
        // };
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}