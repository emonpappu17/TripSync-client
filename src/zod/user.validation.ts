import z from "zod";

export const userUpdateZodSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(2, "Full name must be at least 2 characters")
        .optional(),

    // Accept either a File object or null (when no file uploaded)
    profileImage: z
        .instanceof(File)
        .or(z.null())
        .optional(),

    bio: z
        .string()
        .trim()
        .max(500, "Bio is too long")
        .optional(),

    phone: z
        .string()
        .regex(/^\+?[0-9]{7,15}$/, "Phone number must be valid")
        .optional(),

    currentLocation: z
        .string()
        .trim()
        .min(2, "Current location is too short")
        .max(200, "Current location is too long")
        .optional(),

    interests: z
        .array(z.string().trim().min(1, "Interest cannot be empty"))
        .optional()
        .default([]),

    visitedCountries: z
        .array(z.string().trim().min(1, "Country cannot be empty"))
        .optional()
        .default([]),
});
