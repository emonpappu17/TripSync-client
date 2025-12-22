/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginZodSchema } from "@/zod/auth.validation";
import { parse } from "cookie";
import { setCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/types/user.interface";
import { redirect } from "next/navigation";

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get("redirect") || null;

        const payload = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // Validate once
        const validation = zodValidator(payload, loginZodSchema);
        if (!validation.success) {
            return validation;
        }

        const res = await serverFetch.post("/auth/login", {
            body: JSON.stringify(validation.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (!result.success) {
            throw new Error(result.message || "Login failed");
        }

        // Extract cookies
        const setCookieHeaders = res.headers.getSetCookie();
        if (!setCookieHeaders || setCookieHeaders.length === 0) {
            throw new Error("No Set-Cookie header found");
        }

        let accessToken: string | null = null;
        let refreshToken: string | null = null;
        let accessOptions: any = {};
        let refreshOptions: any = {};

        setCookieHeaders.forEach((cookie: string) => {
            const parsed = parse(cookie);
            if (parsed.accessToken) {
                accessToken = parsed.accessToken;
                accessOptions = parsed;
            }
            if (parsed.refreshToken) {
                refreshToken = parsed.refreshToken;
                refreshOptions = parsed;
            }
        });

        if (!accessToken || !refreshToken) {
            throw new Error("Tokens not found in cookies");
        }

        // Set cookies securely
        await setCookie("accessToken", accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessOptions["Max-Age"]) || 60 * 60, // seconds
            path: accessOptions.Path || "/",
            sameSite: accessOptions["SameSite"] || "lax",
        });

        await setCookie("refreshToken", refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(refreshOptions["Max-Age"]) || 60 * 60 * 24 * 90, // seconds
            path: refreshOptions.Path || "/",
            sameSite: refreshOptions["SameSite"] || "lax",
        });

        // Verify token
        let verifiedToken: JwtPayload;
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
            if (typeof decoded === "string") throw new Error("Invalid token");
            verifiedToken = decoded as JwtPayload;
        } catch (err) {
            throw new Error("Invalid or expired token");
        }

        const userRole: UserRole = verifiedToken.role;

        // Role-based redirect
        if (redirectTo) {
            redirect(redirectTo.toString());
        } else {
            if (userRole === "ADMIN") {
                redirect("/admin/dashboard");
            } else {
                redirect("/profile");
            }
        }
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.error("Login error:", error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Login Failed. You might have entered incorrect email or password.",
        };
    }
};
