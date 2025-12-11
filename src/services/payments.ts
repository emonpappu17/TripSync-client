/* eslint-disable @typescript-eslint/no-explicit-any */
// // import { serverFetch } from "@/lib/serverFetch";
// "use server"
// import { serverFetch } from "@/lib/server-fetch";
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";

// export const createPaymentIntentFrontend = async (plan: string) => {
//     const res = await serverFetch.post(`/payment/create-intent`, {
//         body: JSON.stringify({ plan }),
//         headers: { "Content-Type": "application/json" },
//         cache: "no-store"
//     });

//     return await res.json();

//     // const result = await response.json();
//     //     return result;
// };


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