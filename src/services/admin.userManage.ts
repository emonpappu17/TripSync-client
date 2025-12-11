/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

/**
 * Get all users with filters and pagination
 */
export async function getAllUsers(params?: any) {
    try {
        const queryString = params ? params.toString() : '';
        const response = await serverFetch.get(`/admin/users${queryString ? `?${queryString}` : ''}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch users'}`
        };
    }
}

/**
 * Get single user by ID
 */
export async function getUserById(userId: string) {
    try {
        const response = await serverFetch.get(`/user/${userId}`);
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to fetch user'}`
        };
    }
}

/**
 * Block a user
 */
export async function blockUser(userId: string, reason?: string) {
    try {
        const response = await serverFetch.post(`/admin/users/action`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                action: "BLOCK",
                reason: reason || "Blocked by admin",
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/users');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to block user'}`
        };
    }
}

/**
 * Unblock a user
 */
export async function unblockUser(userId: string, reason?: string) {
    try {
        const response = await serverFetch.post(`/admin/users/action`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                action: "UNBLOCK",
                reason: reason || "Unblocked by admin",
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/users');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to unblock user'}`
        };
    }
}

/**
 * Delete a user (soft delete)
 */
export async function deleteUser(userId: string, reason?: string) {
    try {
        const response = await serverFetch.post(`/admin/users/action`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                action: "DELETE",
                reason: reason || "Deleted by admin",
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/users');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to delete user'}`
        };
    }
}

/**
 * Verify a user
 */
export async function verifyUser(userId: string, reason?: string) {
    try {
        const response = await serverFetch.post(`/admin/users/action`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                action: "VERIFY",
                reason: reason || "Verified by admin",
            }),
        });
        const result = await response.json();

        if (result.success) {
            revalidatePath('/admin/users');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to verify user'}`
        };
    }
}

/**
 * Generic manage user action (for flexibility)
 */
export async function manageUserAction(userId: string, action: "BLOCK" | "UNBLOCK" | "DELETE" | "VERIFY", reason?: string) {
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
            revalidatePath('/admin/users');
        }

        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Failed to perform action'}`
        };
    }
}