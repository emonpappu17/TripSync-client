/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export async function createRequest(planId: string, message: string) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.post(`/travelRequest`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                travelPlanId: planId,
                message: message,
            }),
        })
        // return response
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
export async function getSentRequests(params?: any) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.get(`/travelRequest/sent?${params.toString()}`)
        // return response
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
export async function getReceivedRequests(params?: any) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.get(`/travelRequest/received?${params.toString()}`)
        // return response
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

export async function updateRequestStatus(id: string, status: string) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.patch(`/travelRequest/${id}/status`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: status,
            }),
        })
        // return response
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
export async function cancelRequest(id: string) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.patch(`/travelRequest/${id}/cancel`)
        // return response
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