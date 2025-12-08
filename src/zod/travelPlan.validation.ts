// import { z } from "zod";

// export const TravelTypeEnum = z.enum(["SOLO", "FAMILY", "COUPLE", "FRIENDS"]);
// export const TripStatusEnum = z.enum([
//     "PLANNING",
//     "ONGOING",
//     "UPCOMING",
//     "COMPLETED",
//     "CANCELLED"
// ]);

// export const createTravelPlanZodSchema = z
//     .object({
//         title: z.string().min(3, "Title must be at least 3 characters"),
//         description: z.string(),
//         destination: z.string().min(2),
//         country: z.string(),

//         startDate: z.string().refine(
//             (val) => {
//                 const d = new Date(val);
//                 return !isNaN(d.getTime()) && d > new Date();
//             },
//             { message: "Start date must be a valid future date" }
//         ),

//         endDate: z.string().refine(
//             (val) => {
//                 const d = new Date(val);
//                 return !isNaN(d.getTime()) && d > new Date();
//             },
//             { message: "End date must be a valid future date" }
//         ),

//         budgetMin: z.number().positive(),
//         budgetMax: z.number().positive(),

//         travelType: TravelTypeEnum.default("SOLO"),
//         maxTravelers: z.number(),

//         // status: TripStatusEnum.default("PLANNING"),
//         isPublic: z.boolean().default(true),

//         image: z
//             .instanceof(File)
//             .or(z.null())
//             ,

//         activities: z.array(z.string()).default([]),

//         // isDeleted: z.boolean().optional()
//     })
//     .refine(
//         (data) => {
//             if (!data.startDate || !data.endDate) return true;
//             return new Date(data.endDate) > new Date(data.startDate);
//         },
//         {
//             path: ["endDate"],
//             message: "End date must be after start date"
//         }
//     );


// import { z } from "zod";

// export const TravelTypeEnum = z.enum(["SOLO", "FAMILY", "COUPLE", "FRIENDS"]);
// export const TripStatusEnum = z.enum([
//     "PLANNING",
//     "ONGOING",
//     "UPCOMING",
//     "COMPLETED",
//     "CANCELLED"
// ]);

// export const createTravelPlanZodSchema = z
//     .object({
//         title: z
//             .string({ error: "Trip title is required" })
//             .min(1, "Trip title cannot be empty")
//             .min(3, "Trip title must be at least 3 characters")
//             .max(100, "Trip title must not exceed 100 characters"),

//         description: z
//             .string({ error: "Description is required" })
//             .min(1, "Please provide a description for your trip")
//             .min(10, "Description should be at least 10 characters to give travelers a better idea")
//             .max(1000, "Description is too long. Please keep it under 1000 characters"),

//         destination: z
//             .string({ error: "Destination is required" })
//             .min(1, "Please specify where you're traveling to")
//             .min(2, "Destination name must be at least 2 characters")
//             .max(100, "Destination name is too long"),

//         country: z
//             .string({ error: "Country is required" })
//             .min(1, "Please specify the country you're visiting")
//             .min(2, "Country name must be at least 2 characters")
//             .max(100, "Country name is too long"),

//         startDate: z
//             .string({ error: "Start date is required" })
//             .min(1, "Please select when your trip begins")
//             .refine(
//                 (val) => {
//                     const d = new Date(val);
//                     return !isNaN(d.getTime());
//                 },
//                 { message: "Please enter a valid start date" }
//             )
//             .refine(
//                 (val) => {
//                     const d = new Date(val);
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0);
//                     return d >= today;
//                 },
//                 { message: "Start date cannot be in the past" }
//             ),

//         endDate: z
//             .string({ error: "End date is required" })
//             .min(1, "Please select when your trip ends")
//             .refine(
//                 (val) => {
//                     const d = new Date(val);
//                     return !isNaN(d.getTime());
//                 },
//                 { message: "Please enter a valid end date" }
//             )
//             .refine(
//                 (val) => {
//                     const d = new Date(val);
//                     const today = new Date();
//                     today.setHours(0, 0, 0, 0);
//                     return d >= today;
//                 },
//                 { message: "End date cannot be in the past" }
//             ),

//         // Transform string to number, handle empty strings
//         budgetMin: z
//             .number({ error: "Minimum budget is required" })
//             .min(1, "Please enter your minimum budget")
//             .transform((val) => {
//                 const num = Number(val);
//                 if (isNaN(num)) throw new Error("Minimum budget must be a valid number");
//                 return num;
//             })
//             .pipe(
//                 z.number()
//                     .min(1, "Minimum budget must be at least $1")
//                     .max(1000000, "Budget seems unrealistic. Please enter a reasonable amount")
//             ),

//         budgetMax: z
//             .number({ error: "Maximum budget is required" })
//             .min(1, "Please enter your maximum budget")
//             .transform((val) => {
//                 const num = Number(val);
//                 if (isNaN(num)) throw new Error("Maximum budget must be a valid number");
//                 return num;
//             })
//             .pipe(
//                 z.number()
//                     .min(1, "Maximum budget must be at least $1")
//                     .max(1000000, "Budget seems unrealistic. Please enter a reasonable amount")
//             ),

//         travelType: z
//             .string({ error: "Please select your travel type" })
//             .refine((val) => ["SOLO", "FAMILY", "COUPLE", "FRIENDS"].includes(val), {
//                 message: "Please select a valid travel type (Solo, Family, Couple, or Friends)"
//             })
//             .transform((val) => val as "SOLO" | "FAMILY" | "COUPLE" | "FRIENDS"),

//         // Transform string to number
//         maxTravelers: z
//             .number({ error: "Maximum travelers is required" })
//             .min(1, "Please specify how many people can join this trip"),
//         // .transform((val) => {
//         //     const num = Number(val);
//         //     if (isNaN(num)) throw new Error("Maximum travelers must be a valid number");
//         //     return num;
//         // })
//         // .pipe(
//         //     z.number()
//         //         .int("Number of travelers must be a whole number")
//         //         .min(1, "There must be at least 1 traveler")
//         //         .max(50, "Maximum travelers cannot exceed 50 people")
//         // ),

//         // Transform string to boolean
//         isPublic: z
//             .string()
//             .or(z.boolean())
//             .transform((val) => {
//                 if (typeof val === "boolean") return val;
//                 return val === "true";
//             })
//             .pipe(z.boolean()),

//         image: z
//             .instanceof(File, { message: "Please upload a cover image for your trip" })
//             .refine((file) => file.size > 0, {
//                 message: "Please select an image file"
//             })
//             .refine((file) => file.size <= 3 * 1024 * 1024, {
//                 message: "Image is too large. Please choose an image smaller than 3MB"
//             })
//             .refine(
//                 (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(file.type),
//                 { message: "Invalid image format. Please upload a JPEG, PNG, WEBP, or GIF image" }
//             ),

//         // Transform JSON string to array
//         activities: z
//             .array(z.string().trim().min(1, "activities cannot be empty"))
//             .optional()
//             .default([]),
//     })
//     .refine(
//         (data) => {
//             const start = new Date(data.startDate);
//             const end = new Date(data.endDate);
//             return end > start;
//         },
//         {
//             path: ["endDate"],
//             message: "Your trip must end after it starts! Please select an end date that comes after the start date"
//         }
//     )
//     .refine(
//         (data) => {
//             const start = new Date(data.startDate);
//             const end = new Date(data.endDate);
//             const diffTime = Math.abs(end.getTime() - start.getTime());
//             const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//             return diffDays <= 365;
//         },
//         {
//             path: ["endDate"],
//             message: "Trip duration cannot exceed 1 year. Please adjust your dates"
//         }
//     )
//     .refine(
//         (data) => {
//             return data.budgetMax >= data.budgetMin;
//         },
//         {
//             path: ["budgetMax"],
//             message: "Maximum budget must be greater than or equal to minimum budget"
//         }
//     )
//     .refine(
//         (data) => {
//             // Warn if budget range is too narrow (less than 10% difference)
//             const difference = data.budgetMax - data.budgetMin;
//             const percentDiff = (difference / data.budgetMin) * 100;
//             return percentDiff >= 10 || difference === 0;
//         },
//         {
//             path: ["budgetMax"],
//             message: "Budget range is too narrow. Maximum should be at least 10% more than minimum for flexibility"
//         }
//     );


import { z } from "zod";

export const TravelTypeEnum = z.enum(["SOLO", "FAMILY", "COUPLE", "FRIENDS"]);
export const TripStatusEnum = z.enum([
    "PLANNING",
    "ONGOING",
    "UPCOMING",
    "COMPLETED",
    "CANCELLED",
]);

export const createTravelPlanZodSchema = z
    .object({
        title: z
            .string({ error: "Trip title is required" })
            .min(3, "Trip title must be at least 3 characters")
            .max(100, "Trip title must not exceed 100 characters"),

        description: z
            .string({ error: "Description is required" })
            .min(10, "Description should be at least 10 characters")
            .max(1000, "Description is too long. Please keep it under 1000 characters"),

        destination: z
            .string({ error: "Destination is required" })
            .min(2, "Destination name must be at least 2 characters")
            .max(100, "Destination name is too long"),

        country: z
            .string({ error: "Country is required" })
            .min(2, "Country name must be at least 2 characters")
            .max(100, "Country name is too long"),

        // ✅ Dates: transform string → Date
        startDate: z
            .string({ error: "Start date is required" })
            .refine((val) => !isNaN(new Date(val).getTime()), {
                message: "Please enter a valid start date",
            })
            .transform((val) => new Date(val))
            .refine(
                (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date >= today;
                },
                { message: "Start date cannot be in the past" }
            ),

        endDate: z
            .string({ error: "End date is required" })
            .refine((val) => !isNaN(new Date(val).getTime()), {
                message: "Please enter a valid end date",
            })
            .transform((val) => new Date(val))
            .refine(
                (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date >= today;
                },
                { message: "End date cannot be in the past" }
            ),

        // ✅ Numbers: start with string → transform → pipe into number
        budgetMin: z
            .number()
            .transform((val) => {
                const num = Number(val);
                if (isNaN(num)) throw new Error("Minimum budget must be a valid number");
                return num;
            })
            .pipe(
                z
                    .number()
                    .min(1, "Minimum budget must be at least $1")
                    .max(1000000, "Budget seems unrealistic. Please enter a reasonable amount")
            ),

        budgetMax: z
            .number()
            .transform((val) => {
                const num = Number(val);
                if (isNaN(num)) throw new Error("Maximum budget must be a valid number");
                return num;
            })
            .pipe(
                z
                    .number()
                    .min(1, "Maximum budget must be at least $1")
                    .max(1000000, "Budget seems unrealistic. Please enter a reasonable amount")
            ),

        travelType: z
            .string({ error: "Please select your travel type" })
            .refine((val) => ["SOLO", "FAMILY", "COUPLE", "FRIENDS"].includes(val), {
                message: "Please select a valid travel type (Solo, Family, Couple, or Friends)",
            })
            .transform((val) => val as "SOLO" | "FAMILY" | "COUPLE" | "FRIENDS"),

        maxTravelers: z
            .number()
            .transform((val) => {
                const num = Number(val);
                if (isNaN(num)) throw new Error("Maximum travelers must be a valid number");
                return num;
            })
            .pipe(
                z
                    .number()
                    .int("Number of travelers must be a whole number")
                    .min(1, "There must be at least 1 traveler")
                    .max(50, "Maximum travelers cannot exceed 50 people")
            ),

        isPublic: z
            .string()
            .or(z.boolean())
            .transform((val) => {
                if (typeof val === "boolean") return val;
                return val === "true";
            })
            .pipe(z.boolean()),

        image: z
            .instanceof(File, { message: "Please upload a cover image for your trip" })
            .refine((file) => file.size > 0, {
                message: "Please select an image file",
            })
            .refine((file) => file.size <= 3 * 1024 * 1024, {
                message: "Image is too large. Please choose an image smaller than 3MB",
            })
            .refine(
                (file) =>
                    ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(
                        file.type
                    ),
                { message: "Invalid image format. Please upload a JPEG, PNG, WEBP, or GIF image" }
            ),

        activities: z
            .array(z.string().trim().min(1, "activities cannot be empty"))
            .optional()
            .default([]),
    })
    // ✅ Cross-field refinements
    .refine(
        (data) => data.endDate > data.startDate,
        {
            path: ["endDate"],
            message:
                "Your trip must end after it starts! Please select an end date that comes after the start date",
        }
    )
    .refine(
        (data) => {
            const diffTime = Math.abs(data.endDate.getTime() - data.startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 365;
        },
        {
            path: ["endDate"],
            message: "Trip duration cannot exceed 1 year. Please adjust your dates",
        }
    )
    .refine(
        (data) => data.budgetMax >= data.budgetMin,
        {
            path: ["budgetMax"],
            message: "Maximum budget must be greater than or equal to minimum budget",
        }
    )
    .refine(
        (data) => {
            const difference = data.budgetMax - data.budgetMin;
            const percentDiff = (difference / data.budgetMin) * 100;
            return percentDiff >= 10 || difference === 0;
        },
        {
            path: ["budgetMax"],
            message:
                "Budget range is too narrow. Maximum should be at least 10% more than minimum for flexibility",
        }
    );


// For update operations - all fields optional except those that shouldn't change
// export const updateTravelPlanZodSchema = z
//     .object({
//         title: z.string().min(3, "Title must be at least 3 characters").optional(),
//         description: z.string().optional(),
//         destination: z.string().min(2, "Destination must be at least 2 characters").optional(),
//         country: z.string().optional(),

//         startDate: z
//             .string()
//             .refine(
//                 (val) => {
//                     if (!val) return true;
//                     const d = new Date(val);
//                     return !isNaN(d.getTime());
//                 },
//                 { message: "Start date must be a valid date" }
//             )
//             .optional(),

//         endDate: z
//             .string()
//             .refine(
//                 (val) => {
//                     if (!val) return true;
//                     const d = new Date(val);
//                     return !isNaN(d.getTime());
//                 },
//                 { message: "End date must be a valid date" }
//             )
//             .optional(),

//         budgetMin: z
//             .string()
//             .optional()
//             .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
//             .pipe(z.number().min(0).optional()),

//         budgetMax: z
//             .string()
//             .optional()
//             .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
//             .pipe(z.number().min(0).optional()),

//         travelType: TravelTypeEnum.optional(),

//         maxTravelers: z
//             .string()
//             .optional()
//             .transform((val) => (val === "" || val === undefined ? undefined : Number(val)))
//             .pipe(z.number().int().positive().optional()),

//         isPublic: z
//             .string()
//             .or(z.boolean())
//             .transform((val) => {
//                 if (typeof val === "boolean") return val;
//                 return val === "true";
//             })
//             .pipe(z.boolean())
//             .optional(),

//         image: z
//             .instanceof(File)
//             .refine((file) => file.size <= 3 * 1024 * 1024, {
//                 message: "Image must be smaller than 3MB"
//             })
//             .optional()
//             .or(z.null()),

//         activities: z
//             .string()
//             .optional()
//             .transform((val) => {
//                 if (!val || val === "") return undefined;
//                 try {
//                     return JSON.parse(val);
//                 } catch {
//                     return undefined;
//                 }
//             })
//             .pipe(z.array(z.string()).optional()),
//     })
//     .refine(
//         (data) => {
//             if (!data.startDate || !data.endDate) return true;
//             return new Date(data.endDate) > new Date(data.startDate);
//         },
//         {
//             path: ["endDate"],
//             message: "End date must be after start date"
//         }
//     );

// export type CreateTravelPlanInput = z.infer<typeof createTravelPlanZodSchema>;
// export type UpdateTravelPlanInput = z.infer<typeof updateTravelPlanZodSchema>;



export const updateTravelPlanZodSchema = z
    .object({
        title: z
            .string()
            .min(3, "Trip title must be at least 3 characters")
            .max(100, "Trip title must not exceed 100 characters")
            .optional(),

        description: z
            .string()
            .min(10, "Description should be at least 10 characters")
            .max(1000, "Description is too long. Please keep it under 1000 characters")
            .optional(),

        destination: z
            .string()
            .min(2, "Destination name must be at least 2 characters")
            .max(100, "Destination name is too long")
            .optional(),

        country: z
            .string()
            .min(2, "Country name must be at least 2 characters")
            .max(100, "Country name is too long")
            .optional(),

        // Dates: optional, still transform string → Date
        startDate: z
            .string()
            .refine((val) => !isNaN(new Date(val).getTime()), {
                message: "Please enter a valid start date",
            })
            .transform((val) => new Date(val))
            .refine(
                (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date >= today;
                },
                { message: "Start date cannot be in the past" }
            )
            .optional(),

        endDate: z
            .string()
            .refine((val) => !isNaN(new Date(val).getTime()), {
                message: "Please enter a valid end date",
            })
            .transform((val) => new Date(val))
            .refine(
                (date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date >= today;
                },
                { message: "End date cannot be in the past" }
            )
            .optional(),

        budgetMin: z
            .number()
            .transform((val) => {
                const num = Number(val);
                if (isNaN(num)) throw new Error("Minimum budget must be a valid number");
                return num;
            })
            .pipe(
                z
                    .number()
                    .min(1, "Minimum budget must be at least $1")
                    .max(1000000, "Budget seems unrealistic. Please enter a reasonable amount")
            )
            .optional(),

        budgetMax: z
            .number()
            .transform((val) => {
                const num = Number(val);
                if (isNaN(num)) throw new Error("Maximum budget must be a valid number");
                return num;
            })
            .pipe(
                z
                    .number()
                    .min(1, "Maximum budget must be at least $1")
                    .max(1000000, "Budget seems unrealistic. Please enter a reasonable amount")
            )
            .optional(),

        travelType: z
            .string()
            .refine((val) => ["SOLO", "FAMILY", "COUPLE", "FRIENDS"].includes(val), {
                message: "Please select a valid travel type (Solo, Family, Couple, or Friends)",
            })
            .transform((val) => val as "SOLO" | "FAMILY" | "COUPLE" | "FRIENDS")
            .optional(),

        maxTravelers: z
            .number()
            .transform((val) => {
                const num = Number(val);
                if (isNaN(num)) throw new Error("Maximum travelers must be a valid number");
                return num;
            })
            .pipe(
                z
                    .number()
                    .int("Number of travelers must be a whole number")
                    .min(1, "There must be at least 1 traveler")
                    .max(50, "Maximum travelers cannot exceed 50 people")
            )
            .optional(),

        isPublic: z
            .string()
            .or(z.boolean())
            .transform((val) => {
                if (typeof val === "boolean") return val;
                return val === "true";
            })
            .pipe(z.boolean())
            .optional(),

        image: z
            .instanceof(File)
            // .refine((file) => file.size > 0, {
            //     message: "Please select an image file",
            // })
            // .refine((file) => file.size <= 3 * 1024 * 1024, {
            //     message: "Image is too large. Please choose an image smaller than 3MB",
            // })
            // .refine(
            //     (file) =>
            //         ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"].includes(
            //             file.type
            //         ),
            //     { message: "Invalid image format. Please upload a JPEG, PNG, WEBP, or GIF image" }
            // )
            .optional(),

        activities: z
            .array(z.string().trim().min(1, "activities cannot be empty"))
            .optional(),
    })
    // Cross-field refinements only if both dates are provided
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                return data.endDate > data.startDate;
            }
            return true;
        },
        {
            path: ["endDate"],
            message:
                "Your trip must end after it starts! Please select an end date that comes after the start date",
        }
    )
    .refine(
        (data) => {
            if (data.startDate && data.endDate) {
                const diffTime = Math.abs(data.endDate.getTime() - data.startDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 365;
            }
            return true;
        },
        {
            path: ["endDate"],
            message: "Trip duration cannot exceed 1 year. Please adjust your dates",
        }
    )
    .refine(
        (data) => {
            if (data.budgetMin !== undefined && data.budgetMax !== undefined) {
                return data.budgetMax >= data.budgetMin;
            }
            return true;
        },
        {
            path: ["budgetMax"],
            message: "Maximum budget must be greater than or equal to minimum budget",
        }
    )
    .refine(
        (data) => {
            if (data.budgetMin !== undefined && data.budgetMax !== undefined) {
                const difference = data.budgetMax - data.budgetMin;
                const percentDiff = (difference / data.budgetMin) * 100;
                return percentDiff >= 10 || difference === 0;
            }
            return true;
        },
        {
            path: ["budgetMax"],
            message:
                "Budget range is too narrow. Maximum should be at least 10% more than minimum for flexibility",
        }
    );