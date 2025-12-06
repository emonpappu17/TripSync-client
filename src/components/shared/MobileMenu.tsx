'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Explore', href: '/explore' },
    { name: 'My Plans', href: '/travel-plans' },
    { name: 'Requests', href: '/requests/received' },
    { name: 'Notifications', href: '/notifications' },
    { name: 'Settings', href: '/profile/edit' },
    { name: 'Subscription', href: '/subscription' },
];

export default function MobileMenu() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
                <nav className="flex flex-col space-y-1 mt-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                pathname === item.href
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}