/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { PLANS } from "@/types/subscription";
// import PlanCard from "@/components/subscriptions/PlanCard";
// import { createPaymentIntentFrontend } from "@/services/payments";
import { toast } from "sonner";
import PlanCard from "@/components/modules/subscriptions/PlanCard";
import { createCheckoutSession } from "@/services/payments";

export default function SubscriptionPage() {
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSubscribe = async (plan: string) => {

        // console.log('pak==>', plan);
        try {
            setLoadingPlan(plan);
            const result = await createCheckoutSession(plan);

            console.log({ result });

            // if (!result.success) {
            //     toast.error(result.message || "Payment failed");
            //     setLoadingPlan(null);
            //     return;
            // }

            if (result && !result.success) {
                toast.error(result.message || "Failed to start checkout");
            }

            // Redirect to Stripe Checkout
            // window.location.href = result.paymentUrl;
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12">
            <h1 className="text-3xl font-bold text-center mb-10">
                Choose Your Subscription
            </h1>

            <div className="grid md:grid-cols-3 gap-8">
                {PLANS.map((plan) => (
                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        onSubscribe={handleSubscribe}
                        loading={loadingPlan === plan.id}
                    />
                ))}
            </div>
        </div>
    );
}
