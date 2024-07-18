import DashboardNav from "./navigation/nav";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div suppressHydrationWarning={true}>
            <div className="flex flex-col items-center p-6">
                <DashboardNav />
            </div>
            {children}
        </div>
    );
}