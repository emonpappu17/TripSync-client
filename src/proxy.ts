/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './types/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;

    let userRole: UserRole | null = null;

    // ✅ VERIFY TOKEN
    if (accessToken) {
        try {
            const decoded = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET as string
            ) as JwtPayload;

            userRole = decoded.role;
        } catch (err) {
            const res = NextResponse.redirect(new URL("/login", request.url));
            res.cookies.delete("accessToken");
            res.cookies.delete("refreshToken");
            return res;
        }
    }

    // ✅ ROUTE GROUPS
    const publicRoutes = ["/", "/login", "/register", "/explore", "/find-buddy"];

    const authRoutes = ["/login", "/register"];

    const adminRoutes = ["/admin"];

    const userOnlyRoutes = [
        "/dashboard",
        "/requests",
        "/subscription",
        "/my-matches",
        "/travel-plans"
    ];

    const sharedRoutes = ["/profile"]; // ✅ BOTH ADMIN & USER

    const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute = authRoutes.includes(pathname);
    const isAdminRoute = adminRoutes.some(route =>
        pathname.startsWith(route)
    );
    const isUserRoute = userOnlyRoutes.some(route =>
        pathname.startsWith(route)
    );
    const isSharedRoute = sharedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // ✅ IF LOGGED IN → BLOCK LOGIN & REGISTER
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(
            new URL(userRole === "ADMIN" ? "/admin/dashboard" : "/dashboard", request.url)
        );
    }

    // ✅ PUBLIC ROUTES ALWAYS ALLOWED
    if (isPublicRoute) return NextResponse.next();

    // ✅ NOT LOGGED IN → BLOCK EVERYTHING EXCEPT PUBLIC
    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // ✅ ADMIN ROUTE PROTECTION
    if (isAdminRoute && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // ✅ USER ROUTE PROTECTION
    if (isUserRoute && userRole !== "USER") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // ✅ SHARED ROUTE (PROFILE) → ALLOW BOTH
    if (isSharedRoute && (userRole === "ADMIN" || userRole === "USER")) {
        return NextResponse.next();
    }

    // ✅ DEFAULT ALLOW
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}
