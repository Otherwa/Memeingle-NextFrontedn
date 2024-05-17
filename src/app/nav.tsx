import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import Link from "next/link"
export default function Navbar() {
    return (
        <Menubar>
            <MenubarMenu>
                <MenubarTrigger>Home</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/">
                            Home
                        </Link>{" "} <MenubarShortcut>🏠</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>About</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/about">
                            Us
                        </Link>{" "} <MenubarShortcut>👥</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        The Idea <MenubarShortcut>💡</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
                <MenubarTrigger>Signup</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        <Link href="/signup">
                            Register
                        </Link>{" "}
                        <MenubarShortcut>👀</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        <Link href="/login">
                            Login
                        </Link>{" "}
                        <MenubarShortcut>😎</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    );
}