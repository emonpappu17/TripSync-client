/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

// Ensure these imports are correct based on your file structure
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { revalidateTag } from "next/cache";
// NOTE: You must define this Zod schema based on the structure provided previously
// export const createTravelPlanZodSchema = z.object({...});
// Assuming it's in "@/zod/travel-plan.validation"
import { createTravelPlanZodSchema } from "@/zod/travel-plan.validation";

// NOTE: Add 'use server' at the top of this file
"use server"

export async function createTravelPlanAction(
    _prevState: any,
    formData: FormData
): Promise<any> {
    // -------------------
    // 1. Parse arrays and file
    // -------------------
    const activities = formData.getAll("activities") as string[];
    const file = formData.get("image") as File | null; // Note: using 'image' as the name from the form

    // Parse numerical values, ensuring they are treated as numbers or null/undefined if empty
    const budgetMinValue = formData.get("budgetMin");
    const budgetMaxValue = formData.get("budgetMax");
    const maxTravelersValue = formData.get("maxTravelers");

    // -------------------
    // 2. Build validation payload
    // -------------------
    const validationPayload = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        destination: formData.get("destination") as string,
        country: formData.get("country") as string,
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,

        // Convert numbers, coercing empty strings to 0 or null depending on how Zod handles optionals
        // For optional Zod numbers, `null` is often safer than 0 if the field is truly empty.
        budgetMin: budgetMinValue ? Number(budgetMinValue) : undefined,
        budgetMax: budgetMaxValue ? Number(budgetMaxValue) : undefined,
        maxTravelers: maxTravelersValue ? Number(maxTravelersValue) : undefined,

        travelType: formData.get("travelType") as string,

        // isPublic comes from the hidden input as a string "true" or "false"
        isPublic: formData.get("isPublic") === 'true',

        // The file object (will be handled by Zod using z.instanceof(File))
        image: file,

        // The array of strings
        activities: activities,
    };

    // console.log({ validationPayload });

    // -------------------
    // 3. Validate with Zod
    // -------------------
    const validatedPayload = zodValidator(validationPayload, createTravelPlanZodSchema);

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
    // 4. Prepare backend payload (separate JSON data from file)
    // -------------------

    // The image field is removed from the JSON payload as it's sent separately
    const { image, ...backendPayload } = validatedPayload.data;

    const newFormData = new FormData();
    // Append the JSON data under the key 'data' (common pattern for API uploads)
    newFormData.append("data", JSON.stringify(backendPayload));

    // Append the file if it exists and has content
    if (image && image instanceof File && image.size > 0) {
        newFormData.append("file", image, image.name); // Using 'file' as the key for the API (matching updateUserProfile)
    }

    // console.log('newFormData==>', newFormData);

    // -------------------
    // 5. Send to backend
    // -------------------
    try {
        // Use POST for creation
        const response = await serverFetch.post("/travel-plan/create-plan", {
            body: newFormData,
        });

        const result = await response.json();

        // Optional: Revalidate cache for the list of plans
        revalidateTag("travel-plans", { expire: 0 });

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
                : "Plan creation failed. Please try again."}`,
            formData: validationPayload,
        };
    }
}

export async function getMyTravelPlans() {
    try {
        const response = await serverFetch.get(`/travelPlan/my/plans`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function updateTravelPlanAction(
    planId: string,
    prevState: any,
    formData: FormData
): Promise<any> {
    const planData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        destination: formData.get('destination') as string,
        destinationCity: formData.get('destinationCity') as string || undefined,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        budgetMin: parseFloat(formData.get('budgetMin') as string) || undefined,
        budgetMax: parseFloat(formData.get('budgetMax') as string) || undefined,
        travelType: formData.get('travelType') as string,
        maxTravelers: parseInt(formData.get('maxTravelers') as string) || undefined,
    };

    // try {
    //     await serverFetch(`/travel-plans/${planId}`, {
    //         method: 'PATCH',
    //         body: JSON.stringify(planData),
    //     });

    //     revalidatePath(`/travel-plans/${planId}`);
    //     revalidatePath('/travel-plans');

    //     return {
    //         success: true,
    //         message: 'Travel plan updated',
    //     };
    // } catch (error: any) {
    //     return {
    //         success: false,
    //         message: error.message || 'Failed to update travel plan',
    //     };
    // }
}

export async function deleteTravelPlan(id: string) {
    try {
        const response = await serverFetch.delete(`/travelPlan/${id}`)
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}