/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

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