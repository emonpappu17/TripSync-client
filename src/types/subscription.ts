export enum SubscriptionPlan {
    FREE = "FREE",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
}

export const PLANS = [
    {
        id: SubscriptionPlan.FREE,
        price: 0,
        duration: "Forever",
        label: "Free Plan",
        features: ["Basic usage", "Limited access"],
    },
    {
        id: SubscriptionPlan.MONTHLY,
        price: 29.99,
        duration: "per month",
        label: "Monthly Plan",
        features: ["Full access", "Priority support"],
    },
    {
        id: SubscriptionPlan.YEARLY,
        price: 299.99,
        duration: "per year",
        label: "Yearly Plan",
        features: ["Full access", "Priority support", "Save money"],
    },
];
