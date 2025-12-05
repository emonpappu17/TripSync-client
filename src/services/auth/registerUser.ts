/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

export async function registerUser(
    prevState: any,
    formData: FormData
): Promise<any> {
    // console.log({ formData });

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('fullName') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    console.log({ email, password, fullName, confirmPassword });

    // Validation
    const errors: Record<string, string[]> = {};

    if (!email) {
        errors.email = ['Email is required'];
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors.email = ['Email is invalid'];
    }

    if (!password) {
        errors.password = ['Password is required'];
    } else if (password.length < 8) {
        errors.password = ['Password must be at least 8 characters'];
    }

    if (!fullName) {
        errors.fullName = ['Full name is required'];
    }

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            errors,
        };
    }

    // try {
    //     const response = await fetch(`${API_URL}/auth/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ email, password, fullName }),
    //         credentials: 'include',
    //     });

    //     const data = await response.json();

    //     if (!response.ok) {
    //         return {
    //             success: false,
    //             message: data.message || 'Registration failed',
    //         };
    //     }

    //     revalidatePath('/', 'layout');
    //     redirect('/dashboard');
    // } catch (error: any) {
    //     return {
    //         success: false,
    //         message: error.message || 'Something went wrong',
    //     };
    // }
}