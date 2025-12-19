/* eslint-disable @typescript-eslint/no-explicit-any */

import { PLANS, SubscriptionPlan } from "@/types/subscription";
// import PlanCard from "@/components/subscriptions/PlanCard";
// import { createPaymentIntentFrontend } from "@/services/payments";
import SubscribeButton from "@/components/modules/subscriptions/SubscribeButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getMySubscription } from "@/services/payments";
import { Check } from "lucide-react";

export default async function SubscriptionPage() {
    const res = await getMySubscription();
    const currentPlan = res?.data || null;

    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-6">
                {/* Heading */}
                <div className="mx-auto max-w-2xl space-y-6 text-center">
                    <h1 className="text-4xl font-semibold lg:text-5xl">
                        Pricing that Scales with You
                    </h1>
                    <p>
                        Choose a plan that fits your needs and grow at your own pace.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="mt-8 grid gap-6 md:mt-20 md:grid-cols-3">
                    {PLANS.map((plan) => {
                        const isPopular = plan.id === SubscriptionPlan.MONTHLY;
                        const activePlan = plan.id === (currentPlan?.plan || SubscriptionPlan.FREE);
                        return (
                            <Card
                                key={plan.id}
                                className={`flex flex-col relative ${isPopular ? "ring-2 ring-primary" : ""
                                    }`}
                            >
                                {isPopular && (
                                    <span className="absolute -top-3 inset-x-0 mx-auto w-fit rounded-full bg-linear-to-br from-purple-400 to-amber-300 px-3 py-1 text-xs font-medium text-amber-950">
                                        Popular
                                    </span>
                                )}

                                <CardHeader>
                                    <CardTitle className="font-medium">
                                        {plan.label}
                                    </CardTitle>

                                    <span className="my-3 block text-2xl font-semibold">
                                        ${plan.price}
                                        <span className="text-sm font-normal text-muted-foreground">
                                            {" "} / {plan.duration}
                                        </span>
                                    </span>

                                    <CardDescription className="text-sm">
                                        Per user
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <hr className="border-dashed" />
                                    <ul className="space-y-3 text-sm">
                                        {plan.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2"
                                            >
                                                <Check className="size-3" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter className="mt-auto">
                                    <SubscribeButton
                                        isPopular={isPopular}
                                        plan={plan.id}
                                        activePlan={activePlan}
                                    />

                                </CardFooter>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>

    );
}
