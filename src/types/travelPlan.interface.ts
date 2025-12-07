export type TravelType = "SOLO" | "COUPLE" | "FRIENDS" | "FAMILY";
export type TravelStatus = "PLANNING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface ITravelPlan {
    id: string;
    userId: string;
    title: string;
    description: string;
    destination: string;
    country: string;
    startDate: string;
    endDate: string;
    budgetMin: number;
    budgetMax: number;
    travelType: TravelType;
    maxTravelers: number;
    status: TravelStatus;
    isPublic: boolean;
    image: string | null;
    activities: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    _count: {
        requests: number;
    };
}
