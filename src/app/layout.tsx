import { Inter } from "next/font/google";
import "./globals.css";



const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memeingle",
  description: "Connect with peeps",
  openGraph: {
    type: 'website',
    url: 'https://memeingle-next-frontedn.vercel.app/',
    title: 'Memeingle',
    description: 'Connect with peeps',
    images: [
      {
        url: 'https://memeingle-next-frontedn.vercel.app/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fkftzwdyauwt9%2F3cSZykppt940Q5vMHjbYd8%2Ff111f0645166996fd77bd543d4cfd238%2Fspring_updates.jpg%3Fw%3D828%26q%3D90%26fm%3Dwebp&w=1920&q=75',
        width: 800,
        height: 600,
        alt: 'Memeingle'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Memeingle',
    description: 'Connect with peeps',
    images: [
      {
        url: 'https://memeingle-next-frontedn.vercel.app/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fkftzwdyauwt9%2F3cSZykppt940Q5vMHjbYd8%2Ff111f0645166996fd77bd543d4cfd238%2Fspring_updates.jpg%3Fw%3D828%26q%3D90%26fm%3Dwebp&w=1920&q=75',
        width: 800,
        height: 600,
        alt: 'Memeingle'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>
          Memeingle
        </title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
