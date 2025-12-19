/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { SubscriptionPlan } from "@/types/subscription";
import { Button } from "@/components/ui/button";
import { SubscriptionPlan } from "@/types/subscription";

export default function PlanCard({ plan, onSubscribe }: any) {
    return (
        <div className="border rounded-2xl p-6 shadow-sm bg-white flex flex-col justify-between">
            <div>
                <h2 className="text-xl font-semibold">{plan.label}</h2>
                <p className="text-gray-700 mt-1">
                    {plan.price === 0 ? "Free" : `USD ${plan.price}`}{" "}
                    <span className="text-sm text-gray-500">{plan.duration}</span>
                </p>

                <ul className="mt-4 space-y-2 text-gray-600">
                    {plan.features.map((f: string, i: number) => (
                        <li key={i}>• {f}</li>
                    ))}
                </ul>
            </div>

            <Button
                className="mt-6 w-full"
                onClick={() => onSubscribe(plan.id)}
                disabled={plan.id === SubscriptionPlan.FREE}
            >
                {plan.id === SubscriptionPlan.FREE ? "Already Free" : "Subscribe"}
            </Button>
        </div>
    );
}
