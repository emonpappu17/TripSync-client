/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";

export const getUserInfo = async (): Promise<IUser | any> => {
    try {
        const response = await serverFetch.get("/user/me", {
            revalidate: 300, // Cache for 5 minutes
            tags: ["user-info"],
        });

        const result = await response.json();

        if (result.success && result.data) {
            return result.data;
        }

        return null;
    } catch (error: any) {
        console.error("getUserInfo error:", error);
        return null;
    }
};
