/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createCheckoutSession(plan: string) {
    try {
        const response = await serverFetch.post("/payment/create-intent", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ plan }),
        });

        const result = await response.json();

        if (!result.success) {
            return {
                success: false,
                message: result.message || "Failed to create checkout session",
            };
        }

        // Redirect to Stripe Checkout
        revalidateTag("user-info", { expire: 0 });
        // revalidateTag(`user-${id}`, { expire: 0 });


        redirect(result.data.paymentUrl);
    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }

        console.error("Checkout session error:", error);
        return {
            success: false,
            message: process.env.NODE_ENV === 'development'
                ? error.message
                : "Failed to create checkout session. Please try again.",
        };
    }
}