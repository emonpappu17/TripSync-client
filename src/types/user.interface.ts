export type UserRole = "ADMIN" | "USER";
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    // OTHER = "OTHER",
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    role: UserRole;                // enum type you defined in Prisma
    isActive: boolean;
    isDeleted: boolean;

    // Profile
    fullName: string;
    profileImage?: string;
    bio?: string;
    phone?: string;
    currentLocation?: string;
    gender?: Gender;           // enum type you defined in Prisma
    isVerified: boolean;
    interests: string[];
    visitedCountries: string[];

    createdAt: Date;
    updatedAt: Date;

    // Relations
    // payments: Payment[];
    // sentRequests: TravelRequest[];
    // receivedRequests: TravelRequest[];
    // travelPlans: TravelPlan[];
    // reviewsGiven: Review[];
    // reviewsReceived: Review[];
    // subscriptions: Subscription[];
}
