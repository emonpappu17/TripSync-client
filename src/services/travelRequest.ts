// /* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag, revalidatePath } from "next/cache";

// ============================================
// CREATE REQUEST - Mutation
// ============================================
export async function createRequest(planId: string, message: string) {
    try {
        const response = await serverFetch.post(`/travelRequest`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                travelPlanId: planId,
                message: message,
            }),
        });

        const result = await response.json();

        if (result.success) {
            // Revalidate request lists
            revalidateTag("sent-requests", { expire: 0 });
            revalidateTag("received-requests", { expire: 0 });
            revalidatePath("/requests/sent");
            revalidateTag(`travel-plan-${planId}`, { expire: 0 })

        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// GET SENT REQUESTS - Cached with short revalidation
// ============================================
export async function getSentRequests(params?: any) {
    try {
        const queryString = params ? `?${params.toString()}` : '';
        const response = await serverFetch.get(`/travelRequest/sent${queryString}`, {
            revalidate: 30, // Cache for 30 seconds
            tags: ["sent-requests"],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// GET RECEIVED REQUESTS - Cached with short revalidation
// ============================================
export async function getReceivedRequests(params?: any) {
    try {
        const queryString = params ? `?${params.toString()}` : '';
        const response = await serverFetch.get(`/travelRequest/received${queryString}`, {
            revalidate: 30, // Cache for 30 seconds
            tags: ["received-requests"],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// UPDATE REQUEST STATUS - Mutation
// ============================================
export async function updateRequestStatus(id: string, status: string) {
    try {
        const response = await serverFetch.patch(`/travelRequest/${id}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: status,
            }),
        });

        const result = await response.json();

        if (result.success) {
            // Revalidate both sent and received requests
            revalidateTag("sent-requests", { expire: 0 });
            revalidateTag("received-requests", { expire: 0 });
            revalidateTag("match-stats", { expire: 0 });
            revalidatePath("/requests/received");
            revalidatePath("/requests/sent");
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// CANCEL REQUEST - Mutation
// ============================================
export async function cancelRequest(id: string) {
    try {
        const response = await serverFetch.patch(`/travelRequest/${id}/cancel`);

        const result = await response.json();

        if (result.success) {
            revalidateTag("sent-requests", { expire: 0 });
            revalidateTag("received-requests", { expire: 0 });
            revalidatePath("/requests/sent");
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}