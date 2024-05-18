"use client"

import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut } from "@/components/ui/menubar";
import Link from "next/link";


export default function DashboardNav() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>You</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/dashboard/profile">
                            Profile
                        </Link>{" "} <MenubarShortcut>🏠</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Content</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/dashboard">
                            Memes
                        </Link>{" "} <MenubarShortcut>😂</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href="/dashboard/peeps">
                            Peeps
                        </Link>{" "} <MenubarShortcut>👥</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Go To</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/dashboard/logout">
                            Logout
                        </Link>{" "}
                        <MenubarShortcut>👀</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}