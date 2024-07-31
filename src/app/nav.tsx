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
                                <Badge variant="secondary" className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                                    <Link href="/" passHref className="text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]">
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
                        <ul className="grid gap-3 p-6 md:w-[350px] lg:w-[300px]">
                            <li>
                                <Badge variant="secondary" className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                                    <Link href="/about" passHref className="text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]">
                                        <NavigationMenuLink>
                                            Us <span role="img" aria-label="us">👥</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </Badge>
                            </li>
                            <li>
                                <Badge variant="secondary" className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                                    <NavigationMenuLink className="text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]">
                                        The Idea <span role="img" aria-label="idea">💡</span>
                                    </NavigationMenuLink>
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
                                <Badge variant="secondary" className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                                    <Link href="/signup" className="text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]">
                                        <NavigationMenuLink>
                                            Register <span role="img" aria-label="register">👀</span>
                                        </NavigationMenuLink>
                                    </Link>
                                </Badge>
                            </li>
                            <li>
                                <Badge variant="secondary" className="hover:bg-gray-200 transition-colors duration-200 ease-in-out">
                                    <Link href="/login" className="text-sm h-12 flex flex-col justify-center md:w-[250px] lg:w-[300px]">
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