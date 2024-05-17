import Navbar from "../nav";


export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-col items-center p-6">
                {/* Menu */}
                <Navbar />
            </div>
            {children}
        </div>
    );
}