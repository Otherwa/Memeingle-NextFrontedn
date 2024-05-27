import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import Link from "next/link"
export default function Navbar() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Home</MenubarTrigger>
                <MenubarContent>
                    <Link href="/">
                        <MenubarItem>
                            Home
                            <MenubarShortcut>🏠</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>About</MenubarTrigger>
                <MenubarContent>
                    <Link href="/about">
                        <MenubarItem>
                            Us
                            <MenubarShortcut>👥</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                    <MenubarItem>
                        The Idea
                        <MenubarShortcut>💡</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Signup</MenubarTrigger>
                <MenubarContent>
                    <Link href="/signup">
                        <MenubarItem>
                            Register
                            <MenubarShortcut>👀</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                    <Link href="/login">
                        <MenubarItem>
                            Login
                            <MenubarShortcut>😎</MenubarShortcut>
                        </MenubarItem>
                    </Link>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}