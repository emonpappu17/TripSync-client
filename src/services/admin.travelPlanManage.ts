/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

/**
 * Get all travel plans with filters and pagination (Admin)
 */
export async function getAllTravelPlans(params?: any) {
    try {
        const queryString = params ? params.toString() : '';
        const response = await serverFetch.get(`/admin/travel-plans${queryString ? `?${queryString}` : ''}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch travel plans'}`
        };
    }
}

/**
 * Get single travel plan by ID
 */
export async function getTravelPlanById(planId: string) {
    try {
        const response = await serverFetch.get(`/travelPlan/${planId}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch travel plan'}`
        };
    }
}

/**
 * Delete a travel plan (Admin)
 */
export async function deleteTravelPlanByAdmin(planId: string, reason?: string) {
    try {
        const response = await serverFetch.delete(`/travelPlan/${planId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reason: reason || "Deleted by admin",
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/travel-plans');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to delete travel plan'}`
        };
    }
}

/**
 * Update travel plan status
 */
export async function updateTravelPlanStatus(planId: string, status: string) {
    try {
        const response = await serverFetch.patch(`/travelPlan/${planId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: status,
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/travel-plans');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to update status'}`
        };
    }
}

/**
 * Toggle travel plan visibility (isPublic)
 */
export async function toggleTravelPlanVisibility(planId: string, isPublic: boolean) {
    try {
        const response = await serverFetch.patch(`/travelPlan/${planId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                isPublic: isPublic,
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/travel-plans');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to update visibility'}`
        };
    }
}