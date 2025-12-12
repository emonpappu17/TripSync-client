"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
    MenuIcon,
    LayoutDashboard,
    Send,
    Inbox,
    User,
    LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutUser } from "@/services/auth/logoutUser";
import Logo from "../shadcn-studio/logo";
import { IUser } from "@/types/user.interface";
// import { IUser } from "@/types/user";

interface NavbarProps {
    user: IUser | null;
}

const Navbar = ({ user }: NavbarProps) => {
    const pathname = usePathname();
    const role = user?.role;

    //CLEAN, ROLE-BASED MAIN NAV
    const navigationData =
        role === "ADMIN"
            ? [
                { title: "Home", href: "/" },
                { title: "Dashboard", href: "/admin/dashboard" },
                { title: "Manage Users", href: "/admin/users" },
                { title: "Manage Plans", href: "/admin/travel-plans" },
            ]
            : role === "USER"
                ? [
                    { title: "Home", href: "/" },
                    { title: "Explore", href: "/explore" },
                    { title: "My Plans", href: "/travel-plans" },
                    // { title: "Find Buddy", href: "/find-buddy" },
                ]
                : [
                    { title: "Home", href: "/" },
                    { title: "Explore", href: "/explore" },
                    { title: "Find Buddy", href: "/find-buddy" },
                ];

    return (
        <nav className="bg-background sticky top-0 z-50 h-16 border-b">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* ✅ LEFT: LOGO */}
                <Link href="/">
                    <Logo className="gap-3" />
                </Link>

                {/* ✅ CENTER: DESKTOP NAV */}
                <NavigationMenu className="max-md:hidden">
                    <NavigationMenuList className="flex gap-2">
                        {navigationData.map((navItem) => (
                            <NavigationMenuItem key={navItem.title}>
                                <Link
                                    href={navItem.href}
                                    className={cn(
                                        "px-3 py-1.5 text-base font-medium rounded-md transition",
                                        pathname === navItem.href
                                            ? "text-primary font-semibold"
                                            : "text-muted-foreground hover:text-primary"
                                    )}
                                >
                                    {navItem.title}
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* ✅ RIGHT: PROFILE / AUTH */}
                <div className="flex items-center gap-3">
                    {/* ✅ USER PROFILE DROPDOWN */}
                    {user ? (
                        <DropdownMenu>
                            {/* <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={user.profileImage || ""} />
                                        <AvatarFallback>
                                            {user.fullName?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:block text-sm font-medium">
                                        {user.fullName?.split(" ")[0]}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger> */}

                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Avatar
                                        className={`h-8 w-8 border-2 ${user.isVerified
                                                ? "border-blue-400 ring-2 ring-blue-400 ring-offset-2" // premium look
                                                : "border-transparent"
                                            } rounded-full`}
                                    >
                                        <AvatarImage src={user.profileImage || ""} />
                                        <AvatarFallback>
                                            {user.fullName?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:block text-sm font-medium">
                                        {user.fullName?.split(" ")[0]}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>

                            {/* <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2">
                                    <Avatar
                                        className={`h-8 w-8 rounded-full border-2 ${user.isVerified
                                                ? "border-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 p-[2px]" // premium gradient border
                                                : "border-muted"
                                            }`}
                                    >
                                        <AvatarImage
                                            src={user.profileImage || ""}
                                            className={user.isVerified ? "rounded-full bg-white" : ""}
                                        />
                                        <AvatarFallback>
                                            {user.fullName?.charAt(0) || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="hidden md:block text-sm font-medium">
                                        {user.fullName?.split(" ")[0]}
                                    </span>
                                </Button>
                            </DropdownMenuTrigger> */}


                            <DropdownMenuContent className="w-56" align="end">
                                {/* ✅ PROFILE */}
                                <DropdownMenuItem asChild>
                                    <Link href="/profile" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>

                                {/* ✅ USER DASHBOARD & REQUESTS */}
                                {role === "USER" && (
                                    <>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-2"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/requests/sent"
                                                className="flex items-center gap-2"
                                            >
                                                <Send className="h-4 w-4" />
                                                Sent Requests
                                                {/* Requests Sent */}
                                            </Link>
                                        </DropdownMenuItem>

                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/requests/received"
                                                className="flex items-center gap-2"
                                            >
                                                <Inbox className="h-4 w-4" />
                                                Received Requests
                                                {/* Requests Received */}
                                            </Link>
                                        </DropdownMenuItem>
                                    </>
                                )}



                                <DropdownMenuSeparator />

                                {/* ✅ LOGOUT */}
                                <DropdownMenuItem
                                    onClick={logoutUser}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    )}

                    {/* ✅ MOBILE MENU */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MenuIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                {navigationData.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link href={item.href}>{item.title}</Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


