// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { UserRole } from './types/user.interface';
// import jwt, { JwtPayload } from 'jsonwebtoken';
// import { deleteCookie } from './services/auth/tokenHandlers';



// export async function proxy(request: NextRequest) {
//     // return NextResponse.redirect(new URL('/home', request.url))


//     const accessToken = request.cookies.get('accessToken')?.value;
//     const { pathname } = request.nextUrl;

//     console.log({ accessToken });
//     console.log({ pathname });

//     let userRole: UserRole | null = null;
//     if (accessToken) {
//         const verifiedToken: JwtPayload | string = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);

//         if (typeof verifiedToken === "string") {
//             await deleteCookie("accessToken");
//             await deleteCookie("refreshToken");
//             return NextResponse.redirect(new URL('/login', request.url));
//         }

//         userRole = verifiedToken.role;
//     }


//     console.log({ userRole });
//     // Public routes
//     const publicRoutes = ['/', '/login', '/register', '/explore', '/find-buddy'];
//     const isPublicRoute = publicRoutes.includes(pathname);

//     // Auth routes (redirect if already logged in)
//     const authRoutes = ['/login', '/register'];
//     const isAuthRoute = authRoutes.includes(pathname);

//     // Protected routes
//     const protectedRoutes = ['/dashboard', '/profile', '/requests', '/subscription'];
//     const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

//     // Admin routes
//     const adminRoutes = ['/admin'];
//     const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));



//     // Redirect logic

//     if (isAuthRoute && accessToken) {
//         return NextResponse.redirect(new URL('/dashboard', request.url));
//     }

//     if (isPublicRoute) {
//         return NextResponse.next();
//     }

//     if (!accessToken) {
//         const loginUrl = new URL("/login", request.url);
//         loginUrl.searchParams.set("redirect", pathname);
//         return NextResponse.redirect(loginUrl);
//     }


//     if (isProtectedRoute && !accessToken) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     if (isAdminRoute && userRole === 'ADMIN')

//         // For admin routes, we'll check role in the page component
//         // since we can't decode JWT in middleware without the secret

//         return NextResponse.next();
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
//     ],
// }



import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { UserRole } from './types/user.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const { pathname } = request.nextUrl;

    let userRole: UserRole | null = null;

    if (accessToken) {
        try {
            const verifiedToken: JwtPayload | string = jwt.verify(
                accessToken,
                process.env.ACCESS_TOKEN_SECRET as string
            );

            if (typeof verifiedToken !== "string") {
                userRole = verifiedToken.role;
            } else {
                // invalid token string
                const res = NextResponse.redirect(new URL('/login', request.url));
                res.cookies.delete("accessToken");
                res.cookies.delete("refreshToken");
                return res;
            }
        } catch (err) {
            console.error("JWT verification failed:", err);
            const res = NextResponse.redirect(new URL('/login', request.url));
            res.cookies.delete("accessToken");
            res.cookies.delete("refreshToken");
            return res;
        }
    }

    // Public routes
    const publicRoutes = ['/', '/login', '/register', '/explore', '/find-buddy'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // Auth routes (redirect if already logged in)
    const authRoutes = ['/login', '/register'];
    const isAuthRoute = authRoutes.includes(pathname);

    // Protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/requests', '/subscription', '/my-matches'];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

    // Admin routes
    const adminRoutes = ['/admin'];
    const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

    // Redirect logic
    if (isAuthRoute && accessToken) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isPublicRoute) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isProtectedRoute && !accessToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAdminRoute) {
        if (userRole === 'ADMIN') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // Default allow
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}
