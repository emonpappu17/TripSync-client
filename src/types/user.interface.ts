export type UserRole = "ADMIN" | "USER";
export enum Gender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    // OTHER = "OTHER",
}

// export interface IUser {
//     id: string;
//     email: string;
//     password: string;
//     role: UserRole;                // enum type you defined in Prisma
//     isActive: boolean;
//     isDeleted: boolean;

//     // Profile
//     fullName: string;
//     profileImage?: string;
//     bio?: string;
//     phone?: string;
//     currentLocation?: string;
//     gender?: Gender;           // enum type you defined in Prisma
//     isVerified: boolean;
//     interests: string[];
//     visitedCountries: string[];

//     createdAt: Date;
//     updatedAt: Date;

//     // Relations
//     // payments: Payment[];
//     // sentRequests: TravelRequest[];
//     // receivedRequests: TravelRequest[];
//     // travelPlans: TravelPlan[];
//     // reviewsGiven: Review[];
//     // reviewsReceived: Review[];
//     // subscriptions: Subscription[];
// }



export interface UserStats {
    travelPlansCount: number;
    reviewsGivenCount: number;
    reviewsReceivedCount: number;
    requestsSentCount: number;
    averageRating: number;
}

export interface UserCounts {
    travelPlans: number;
    reviewsGiven: number;
    reviewsReceived: number;
    sentRequests: number;
}

export interface ReviewRating {
    rating: number;
}

export interface IUser {
    fullName: string | null;
    profileImage: string | null;
    bio: string | null;
    phone: string | null;
    role: "USER" | "ADMIN";
    isVerified: boolean;
    currentLocation: string | null;
    gender: string | null;
    interests: string[];
    visitedCountries: string[];
    email: string;

    _count: UserCounts;
    reviewsReceived: ReviewRating[];

    stats: UserStats;
}
