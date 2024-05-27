"use client"

import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut } from "@/components/ui/menubar";
import Link from "next/link";


export default function DashboardNav() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>You</MenubarTrigger>
                <MenubarContent>
                    <Link href="/dashboard/profile">
                        <MenubarItem>
                            Profile
                            <MenubarShortcut>🏠</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Content</MenubarTrigger>
                <MenubarContent>
                    <Link href="/dashboard">
                        <MenubarItem>
                            Memes
                            <MenubarShortcut>😂</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                    <Link href="/dashboard/peeps">
                        <MenubarItem>
                            Peeps
                            <MenubarShortcut>👥</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Go To</MenubarTrigger>
                <MenubarContent>
                    <Link href="/dashboard/logout">
                        <MenubarItem>
                            Logout
                            <MenubarShortcut>👀</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}