/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTravelPlanZodSchema } from "@/zod/travelPlan.validation";

export async function createTravelPlanAction(
    _prevState: any,
    formData: FormData
): Promise<any> {

    const activities = formData.getAll("activities");
    const file = formData.get("image") as File | null;
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
        budgetMin: budgetMinValue ? Number(budgetMinValue) : undefined,
        budgetMax: budgetMaxValue ? Number(budgetMaxValue) : undefined,
        maxTravelers: maxTravelersValue ? Number(maxTravelersValue) : undefined,
        travelType: formData.get("travelType") as string,
        isPublic: true,
        // isPublic: formData.get("isPublic") === 'true',
        image: file,
        // The array of strings
        activities,
    };

    // console.log({ validationPayload });

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


    const { image, ...backendPayload } = validatedPayload.data;

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(backendPayload));

    if (image && image instanceof File && image.size > 0) {
        newFormData.append("file", image, image.name);
    }

    // console.log('backendPayload==>', backendPayload);
    // console.log('newFormData==>', newFormData);

    // -------------------
    // 5. Send to backend
    // -------------------
    try {
        // Use POST for creation
        const response = await serverFetch.post("/travelPlan", {
            body: newFormData,
        });

        const result = await response.json();

        // Optional: Revalidate cache for the list of plans
        // revalidateTag("travel-plans", { expire: 0 });

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
        const response = await serverFetch.get(`/travelPlan/my/plans`, {
            cache: "no-store",
            // next: { tags: ["travel-plans"] }
        })
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