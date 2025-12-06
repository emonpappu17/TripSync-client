// import { Button } from '@/components/ui/button';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import {
//     NavigationMenu,
//     NavigationMenuItem,
//     NavigationMenuLink,
//     NavigationMenuList
// } from '@/components/ui/navigation-menu';
// import { cn } from '@/lib/utils';
// import { MenuIcon } from 'lucide-react';
// import Link from 'next/link';
// import Logo from '../shadcn-studio/logo';

// const navigationData = [
//     { title: 'Home', href: '/' },
//     { title: 'Explore', href: '/explore' },
//     { title: 'My Plans', href: '/travel-plans' },
//     { title: 'Profile', href: '/profile' },
//     { title: 'About', href: '/about' },
// ];

// const Navbar = () => {
//     return (
//         <header className={cn('bg-background sticky top-0 z-50 h-16 border-b')}>
//             <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
//                 {/* Logo */}
//                 <Link href={'/'}>
//                     <Logo className='gap-3' />
//                 </Link>

//                 {/* Desktop Navigation */}
//                 <NavigationMenu className='max-md:hidden'>
//                     <NavigationMenuList className='flex-wrap justify-start gap-0'>
//                         {navigationData.map(navItem => (
//                             <NavigationMenuItem key={navItem.title}>
//                                 <NavigationMenuLink
//                                     href={navItem.href}
//                                     className='text-muted-foreground hover:text-primary px-3 py-1.5 text-base font-medium hover:bg-transparent'
//                                 >
//                                     {navItem.title}
//                                 </NavigationMenuLink>
//                             </NavigationMenuItem>
//                         ))}
//                     </NavigationMenuList>
//                 </NavigationMenu>

//                 {/* Desktop Login Button */}
//                 <Button className='rounded-lg max-md:hidden' asChild>
//                     <a href='/login'>Login</a>
//                 </Button>

//                 {/* Mobile Menu */}
//                 <div className='flex gap-4 md:hidden'>
//                     <Button className='rounded-lg' asChild>
//                         <a href='/login'>Login</a>
//                     </Button>

//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant='outline' size='icon'>
//                                 <MenuIcon />
//                                 <span className='sr-only'>Menu</span>
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent className='w-56' align='end'>
//                             {navigationData.map((item, index) => (
//                                 <DropdownMenuItem key={index}>
//                                     <a href={item.href}>{item.title}</a>
//                                 </DropdownMenuItem>
//                             ))}
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Navbar;


"use client"

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import { logoutUser } from '@/services/auth/logoutUser';
import { usePathname } from 'next/navigation';
import Logo from '../shadcn-studio/logo';



const Navbar = ({ role }: { role: string }) => {
    const pathname = usePathname();

    const navigationData = role ? role === 'ADMIN' ? [
        { title: 'Home', href: '/' },
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Users', href: '/manage-users' },
        { title: 'Manage Plans', href: '/manage-plans' },
        { title: 'Profile', href: '/profile' },
    ] : [
        { title: 'Home', href: '/' },
        { title: 'Explore', href: '/explore' },
        { title: 'My Plans', href: '/my-plans' },
        { title: 'Profile', href: '/profile' },
        { title: 'Dashboard', href: '/dashboard' },
    ] : [
        { title: 'Home', href: '/' },
        { title: 'Explore', href: '/explore' },
        { title: 'Find Buddy', href: '/find-buddy' },
    ]

    return (
        <nav className={cn('bg-background sticky top-0 z-50 h-16 border-b')}>
            <div className='mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8'>
                {/* Logo */}
                <Link href={'/'}>
                    <Logo className='gap-3' />
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className='max-md:hidden'>
                    <NavigationMenuList className='flex-wrap justify-start gap-0'>
                        {navigationData.map(navItem => (
                            <NavigationMenuItem key={navItem.title}>
                                <Link
                                    href={navItem.href}
                                    className={cn(
                                        'px-3 py-1.5 text-base font-medium hover:bg-transparent',
                                        pathname === navItem.href
                                            ? 'text-primary font-semibold'
                                            : 'text-muted-foreground hover:text-primary'
                                    )}
                                >
                                    {navItem.title}
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Desktop Login Button */}
                {
                    role ?
                        <Button className='rounded-lg max-md:hidden' variant={"destructive"} onClick={logoutUser}>
                            Logout
                        </Button>
                        : <Button className='rounded-lg max-md:hidden' asChild>
                            <Link href='/login'>Login</Link>
                        </Button>
                }

                {/* Mobile Menu */}
                <div className='flex gap-4 md:hidden'>
                    {
                        role ?
                            <Button className='rounded-lg' variant={"destructive"} onClick={logoutUser}>
                                Logout
                            </Button>
                            : <Button className='rounded-lg' asChild>
                                <Link href='/login'>Login</Link>
                            </Button>
                    }
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='outline' size='icon'>
                                <MenuIcon />
                                <span className='sr-only'>Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56' align='end'>
                            {navigationData.map((item, index) => (
                                <DropdownMenuItem key={index}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            pathname === item.href
                                                ? 'text-primary font-semibold'
                                                : 'text-muted-foreground'
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

