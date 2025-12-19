/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from '@/components/ui/button';
import { createCheckoutSession } from '@/services/payments';
import { SubscriptionPlan } from '@/types/subscription';
import { toast } from 'sonner';

const SubscribeButton = ({ isPopular, plan, activePlan }: { isPopular: boolean, plan: string, activePlan: boolean }) => {

    const handleSubscribe = async (plan: string) => {
        try {
            const result = await createCheckoutSession(plan);

            if (result && !result.success) {
                toast.error(result.message || "Failed to start checkout");
            }
        } catch (err: any) {
            toast.error(err.message);
        }
    };
    return (
        <Button
            onClick={() => handleSubscribe(plan)}
            variant={isPopular ? "default" : "outline"}
            className="w-full"
            disabled={plan === SubscriptionPlan.FREE || activePlan}
        >
            {/* Get Started */}
            {`${activePlan ? 'Current plan' : 'Get Started'}`}
        </Button>
    );
};

export default SubscribeButton;