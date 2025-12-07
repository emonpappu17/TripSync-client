import { z } from "zod";

export const TravelTypeEnum = z.enum(["SOLO", "FAMILY", "COUPLE", "FRIENDS"]);
export const TripStatusEnum = z.enum([
    "PLANNING",
    "ONGOING",
    "UPCOMING",
    "COMPLETED",
    "CANCELLED"
]);

export const createTravelPlanZodSchema = z
    .object({
        title: z.string().min(3, "Title must be at least 3 characters"),
        description: z.string().optional(),
        destination: z.string().min(2),
        country: z.string().optional(),

        startDate: z.string().refine(
            (val) => {
                const d = new Date(val);
                return !isNaN(d.getTime()) && d > new Date();
            },
            { message: "Start date must be a valid future date" }
        ),

        endDate: z.string().refine(
            (val) => {
                const d = new Date(val);
                return !isNaN(d.getTime()) && d > new Date();
            },
            { message: "End date must be a valid future date" }
        ),

        budgetMin: z.number().positive().optional(),
        budgetMax: z.number().positive().optional(),

        travelType: TravelTypeEnum.default("SOLO"),
        maxTravelers: z.number().optional(),

        // status: TripStatusEnum.default("PLANNING"),
        isPublic: z.boolean().default(true),

        image: z
            .instanceof(File)
            .or(z.null())
            .optional(),

        activities: z.array(z.string()).optional().default([]),

        // isDeleted: z.boolean().optional()
    })
    .refine(
        (data) => {
            if (!data.startDate || !data.endDate) return true;
            return new Date(data.endDate) > new Date(data.startDate);
        },
        {
            path: ["endDate"],
            message: "End date must be after start date"
        }
    );