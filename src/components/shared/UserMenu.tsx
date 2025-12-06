// import { getCurrentUser } from '@/lib/server/auth';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
// import LogoutButton from './LogoutButton';
import { User, Settings, CreditCard } from 'lucide-react';
import { getUserInfo } from '@/services/auth/getUserInfo';

export default async function UserMenu() {
    const user = await getUserInfo();

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Link href="/login">
                    <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                    <Button>Sign Up</Button>
                </Link>
            </div>
        );
    }

    const initials = user?.fullName
        ? user?.fullName
            .split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : user.email[0].toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                        <AvatarImage src={user?.profileImage} alt={user?.fullName} />
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user?.fullName}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/profile/edit" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/subscription" className="cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Subscription
                    </Link>
                </DropdownMenuItem>
                {user.role === 'ADMIN' && (
                    <DropdownMenuItem asChild>
                        <Link href="/admin/dashboard" className="cursor-pointer">
                            Admin Dashboard
                        </Link>
                    </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    {/* <LogoutButton /> */}
                    <Button>Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}