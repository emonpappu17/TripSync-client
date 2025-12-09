/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

export async function createReview(data: {
    toReviewerId: string;
    travelPlanId?: string;
    rating: number;
    comment: string;
    isPublic?: boolean;
}) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.post(`/review`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

export async function getMyReviews() {
    try {
        const response = await serverFetch.get(`/review/my-reviews`)
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

export async function getUserReviews(id: string) {
    try {
        const response = await serverFetch.get(`/review/user/${id}`)
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

export async function updateReview(reviewId: string,
    data: {
        rating?: number;
        comment?: string;
        isPublic?: boolean;
    }) {
    try {
        const response = await serverFetch.get(`/review/${reviewId}`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

export async function deleteReview(id: string) {
    try {
        // console.log({ planId, message });
        const response = await serverFetch.delete(`/review/${id}`)
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