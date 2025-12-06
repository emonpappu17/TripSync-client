// import { getCurrentUser } from '@/lib/server/auth';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
    Home,
    Compass,
    MapPin,
    Users,
    Bell,
    Settings,
    CreditCard,
    LayoutDashboard,
} from 'lucide-react';
import { getUserInfo } from '@/services/auth/getUserInfo';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Explore', href: '/explore', icon: Compass },
    { name: 'My Plans', href: '/travel-plans', icon: MapPin },
    { name: 'Requests', href: '/requests/received', icon: Users },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Settings', href: '/profile/edit', icon: Settings },
    { name: 'Subscription', href: '/subscription', icon: CreditCard },
];

const adminNavigation = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
];

export default async function Sidebar() {
    const user = await getUserInfo();

    return (
        <aside className="hidden lg:flex lg:flex-col w-64 border-r bg-card h-[calc(100vh-4rem)]">
            <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                            'text-muted-foreground hover:text-foreground hover:bg-accent'
                        )}
                    >
                        <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                        {item.name}
                    </Link>
                ))}

                {user?.role === 'ADMIN' && (
                    <>
                        <div className="my-4 border-t" />
                        {adminNavigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                                    'text-red-600 hover:text-red-700 hover:bg-red-50'
                                )}
                            >
                                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                {item.name}
                            </Link>
                        ))}
                    </>
                )}
            </nav>
        </aside>
    );
}