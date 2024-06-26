"use client"

import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Link from "next/link"

export default function Navbar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[250px] lg:w-[300px]">
                            <li>
                                <Badge variant="secondary" className="hover:scale-105 transition-transform duration-200 ease-in-out">
                                    <Link href="/" passHref className="text-sm">
                                        <NavigationMenuLink>
                                            Home <span role="img" aria-label="home">🏠</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </Badge>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>About</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[250px] lg:w-[300px]">
                            <li>
                                <Badge variant="secondary" className="hover:scale-105 transition-transform duration-200 ease-in-out">
                                    <Link href="/about" passHref className="text-sm">
                                        <NavigationMenuLink>
                                            Us <span role="img" aria-label="us">👥</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </Badge>
                            </li>
                            <li>
                                <Badge variant="secondary" className=" text-sm hover:scale-105 transition-transform duration-200 ease-in-out">
                                    The Idea <span role="img" aria-label="idea">💡</span>
                                </Badge>
                            </li>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                    <NavigationMenuTrigger>Signup</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[250px] lg:w-[300px]">
                            <li>
                                <Badge variant="secondary" className="hover:scale-105 transition-transform duration-200 ease-in-out">
                                    <Link href="/signup" className="text-sm">
                                        <NavigationMenuLink>
                                            Register <span role="img" aria-label="register">👀</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </Badge>
                            </li>
                            <li>
                                <Badge variant="secondary" className="hover:scale-105 transition-transform duration-200 ease-in-out">
                                    <Link href="/login" className="text-sm">
                                        <NavigationMenuLink>
                                            Login <span role="img" aria-label="login">😎</span>
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