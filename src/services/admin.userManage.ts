/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath, revalidateTag } from "next/cache";


export async function getAllUsers(params?: any) {
    try {
        const queryString = params ? params.toString() : '';
        const response = await serverFetch.get(
            `/admin/users${queryString ? `?${queryString}` : ''}`,
            {
                revalidate: 30, // Cache for 30 seconds
                tags: ["admin-users"],
            }
        );

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch users'}`
        };
    }
}


export async function getUserById(userId: string) {
    try {
        const response = await serverFetch.get(`/user/${userId}`, {
            revalidate: 300, // Cache for 5 minutes
            tags: [`user-${userId}`],
        });

        const result = await response.json();
        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch user'}`
        };
    }
}

export async function manageUserAction(
    userId: string,
    action: "BLOCK" | "UNBLOCK" | "DELETE" | "VERIFY",
    reason?: string
) {
    try {
        const response = await serverFetch.post(`/admin/users/action`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                action,
                reason: reason || `${action} by admin`,
            }),
        });

        const result = await response.json();

        if (result.success) {
            revalidateTag("admin-users", { expire: 0 });
            revalidateTag(`user-${userId}`, { expire: 0 });
            revalidatePath('/admin/users');
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to perform action'}`
        };
    }
}

/**
 * Convenience functions that use manageUserAction
 */
export async function blockUser(userId: string, reason?: string) {
    return manageUserAction(userId, "BLOCK", reason);
}

export async function unblockUser(userId: string, reason?: string) {
    return manageUserAction(userId, "UNBLOCK", reason);
}

export async function deleteUser(userId: string, reason?: string) {
    return manageUserAction(userId, "DELETE", reason);
}

export async function verifyUser(userId: string, reason?: string) {
    return manageUserAction(userId, "VERIFY", reason);
}