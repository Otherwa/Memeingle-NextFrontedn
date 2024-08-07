"use client"
import { Badge } from '@/components/ui/badge';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from '@/components/ui/navigation-menu';
import Link from "next/link";


export default function DashboardNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>You</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[250px] lg:w-[300px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <Badge variant="secondary" className="text-sm hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                                    <Link href="/dashboard/profile" className='h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]'>
                                        Profile 😏
                                    </Link>
                                </Badge>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Content</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink>
                            <ul className="grid gap-3 p-6 md:w-[250px] lg:w-[300px]">
                                <li>
                                    <Badge variant="secondary" className='hover:bg-gray-200 transition-colors duration-200 ease-in-out'>
                                        <Link href="/dashboard" passHref className='text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]'>
                                            <NavigationMenuLink>
                                                Memes <span role="img" aria-label="memes">😂</span>
                                            </NavigationMenuLink>
                                        </Link>
                                    </Badge>
                                </li>
                                <li>
                                    <Badge variant="secondary" className='hover:bg-gray-200 transition-colors duration-200 ease-in-out'>
                                        <Link href="/dashboard/peeps" passHref className='text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]'>
                                            <NavigationMenuLink>
                                                Peeps <span role="img" aria-label="peeps">👥</span>
                                            </NavigationMenuLink>
                                        </Link>
                                    </Badge>
                                </li>
                            </ul>
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Go To</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[250px] lg:w-[300px]">
                            <li>
                                <Badge variant="secondary" className='hover:bg-gray-200 transition-colors duration-200 ease-in-out'>
                                    <Link href="/dashboard/logout" passHref className='text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]'>
                                        <NavigationMenuLink>
                                            Logout <span role="img" aria-label="logout">👀</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </Badge>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}