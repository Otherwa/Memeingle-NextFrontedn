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
                                <Badge variant="secondary" className="text-sm hover:scale-105 transition-transform duration-200 ease-in-out">
                                    <Link href="/dashboard/profile">
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
                                    <Badge variant="secondary" className='hover:scale-105 transition-transform duration-200 ease-in-out'>
                                        <Link href="/dashboard" passHref className="text-sm ">
                                            <NavigationMenuLink>
                                                Memes <span role="img" aria-label="memes">😂</span>
                                            </NavigationMenuLink>
                                        </Link>
                                    </Badge>
                                </li>
                                <li>
                                    <Badge variant="secondary" className='hover:scale-105 transition-transform duration-200 ease-in-out'>
                                        <Link href="/dashboard/peeps" passHref className="text-sm">
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
                                <Badge variant="secondary" className='hover:scale-105 transition-transform duration-200 ease-in-out'>
                                    <Link href="/dashboard/logout" passHref className="text-sm">
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