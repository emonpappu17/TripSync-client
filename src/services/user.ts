/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator"; // adjust import
import { userUpdateZodSchema } from "@/zod/user.validation";
import { revalidateTag } from "next/cache";

export async function updateUserProfile(_prevState: any, formData: FormData): Promise<any> {
    // -------------------
    // Parse arrays
    // -------------------
    // console.log('formData.getAll("interests") ==>', formData.getAll("interests"));
    const interests = formData.getAll("interests") as string[];
    const visitedCountries = formData.getAll("visitedCountries") as string[];

    // -------------------
    // Build validation payload
    // -------------------
    const validationPayload = {
        fullName: formData.get("fullName") as string,
        bio: formData.get("bio") as string,
        phone: formData.get("phone") as string,
        currentLocation: formData.get("currentLocation") as string,
        interests,
        visitedCountries,
        profileImage: formData.get("file") as File | null,
    };

    // console.log({ validationPayload });

    // -------------------
    // Validate with Zod
    // -------------------
    const validatedPayload = zodValidator(validationPayload, userUpdateZodSchema);

    if (!validatedPayload.success && validatedPayload.errors) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
            errors: validatedPayload.errors,
        };
    }

    if (!validatedPayload.data) {
        return {
            success: false,
            message: "Validation failed",
            formData: validationPayload,
        };
    }

    // -------------------
    // Prepare backend payload
    // -------------------
    const backendPayload = {
        fullName: validatedPayload.data.fullName,
        bio: validatedPayload.data.bio,
        phone: validatedPayload.data.phone,
        currentLocation: validatedPayload.data.currentLocation,
        interests: validatedPayload.data.interests,
        visitedCountries: validatedPayload.data.visitedCountries,
    }

    // const newFormData = new FormData();
    // newFormData.append("data", JSON.stringify(backendPayload));

    // console.log('formData.get("file")=>', formData.get("file"));

    // if (formData.get("file")) {
    //     newFormData.append("file", formData.get("file") as Blob);
    // }

    // console.log({ backendPayload, newFormData });

    // console.log('newFormData==>', newFormData);
    // console.log({ backendPayload });

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(backendPayload));

    const file = formData.get("file") as File | null;

    // console.log("formData.get('file') =>", file);

    if (file && file.size > 0) {
        newFormData.append("file", file);
    }

    // console.log('newFormData==>', newFormData);
    // -------------------
    // Send to backend
    // -------------------
    try {
        const response = await serverFetch.patch("/user/update-my-profile", {
            body: newFormData,
        });

        const result = await response.json();

        // if(response.ok)
        revalidateTag("user-info", { expire: 0 });
        // redirect("/profile")
        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development'
                ? error.message
                : "Registration Failed. Please try again."}`,
            formData: validationPayload,
        };
    }
}
