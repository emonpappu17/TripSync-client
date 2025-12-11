// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server"

// import { serverFetch } from "@/lib/server-fetch";

// /**
//  * Get all matches for the authenticated user
//  * GET /api/v1/travelMatch/my-matches
//  */
// export async function getMyMatches(params?: any) {
//     try {
//         const queryString = params ? `?${params.toString()}` : '';
//         const response = await serverFetch.get(`/travelMatch/my-matches${queryString}`, {
//             cache: "no-store",
//         });
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// /**
//  * Get all matches for a specific travel plan
//  * GET /api/v1/travelMatch/plan/:planId
//  */
// export async function getMatchesByPlanId(planId: string) {
//     try {
//         const response = await serverFetch.get(`/travelMatch/plan/${planId}`, {
//             cache: "no-store",
//         });
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// /**
//  * Get a specific match by ID
//  * GET /api/v1/travelMatch/:matchId
//  */
// export async function getMatchById(matchId: string) {
//     try {
//         const response = await serverFetch.get(`/travelMatch/${matchId}`, {
//             cache: "no-store",
//         });
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// /**
//  * Deactivate a match (soft delete)
//  * DELETE /api/v1/travelMatch/:matchId
//  */
// export async function deactivateMatch(matchId: string) {
//     try {
//         const response = await serverFetch.delete(`/travelMatch/${matchId}`);
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// /**
//  * Check if matched with another user for a specific plan
//  * GET /api/v1/travelMatch/check/:planId/:otherUserId
//  */
// export async function checkMatch(planId: string, otherUserId: string) {
//     try {
//         const response = await serverFetch.get(`/travelMatch/check/${planId}/${otherUserId}`, {
//             cache: "no-store",
//         });
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }

// /**
//  * Get match statistics for the authenticated user
//  * GET /api/v1/travelMatch/statistics
//  */
// export async function getMatchStatistics() {
//     try {
//         const response = await serverFetch.get('/travelMatch/statistics', {
//             cache: "no-store",
//         });
//         const result = await response.json();
//         return result;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             success: false,
//             message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
//         };
//     }
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag, revalidatePath } from "next/cache";

// ============================================
// GET MY MATCHES - Cached
// ============================================
export async function getMyMatches(params?: any) {
    try {
        const queryString = params ? `?${params.toString()}` : '';
        const response = await serverFetch.get(`/travelMatch/my-matches${queryString}`, {
            revalidate: 60, // Cache for 1 minute
            tags: ["my-matches"],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// GET MATCHES BY PLAN ID - Cached
// ============================================
export async function getMatchesByPlanId(planId: string) {
    try {
        const response = await serverFetch.get(`/travelMatch/plan/${planId}`, {
            revalidate: 60, // Cache for 1 minute
            tags: [`plan-${planId}-matches`, "my-matches"],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// GET MATCH BY ID - Cached
// ============================================
export async function getMatchById(matchId: string) {
    try {
        const response = await serverFetch.get(`/travelMatch/${matchId}`, {
            revalidate: 120, // Cache for 2 minutes
            tags: [`match-${matchId}`, "my-matches"],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// CHECK MATCH - Dynamic (no cache)
// ============================================
export async function checkMatch(planId: string, otherUserId: string) {
    try {
        const response = await serverFetch.get(
            `/travelMatch/check/${planId}/${otherUserId}`,
            {
                cache: "no-store", // Always fetch fresh data
            }
        );

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// GET MATCH STATISTICS - Cached
// ============================================
export async function getMatchStatistics() {
    try {
        const response = await serverFetch.get('/travelMatch/statistics', {
            revalidate: 120, // Cache for 2 minutes
            tags: ["match-stats"],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

// ============================================
// DEACTIVATE MATCH - Mutation
// ============================================
export async function deactivateMatch(matchId: string) {
    try {
        const response = await serverFetch.delete(`/travelMatch/${matchId}`);

        const result = await response.json();

        if (result.success) {
            revalidateTag("my-matches", { expire: 0 });
            revalidateTag(`match-${matchId}`, { expire: 0 });
            revalidateTag("match-stats", { expire: 0 });
            revalidatePath("/matches");
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}