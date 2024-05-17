"use client"

import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"


import Accord from "./acc";
import Navbar from "./nav";


export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center p-6">
        {/* Menu */}
        <Navbar />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between p-6">

        {/* Main Content */}
        <main className="flex min-h-screen flex-col items-center gap-5">

          <h1 className="mt-2 p-7 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Memeingle</h1>

          <div className="w-[84vw] p-2">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image
                src="https://images.ctfassets.net/kftzwdyauwt9/3cSZykppt940Q5vMHjbYd8/f111f0645166996fd77bd543d4cfd238/spring_updates.jpg?w=828&q=90&fm=webp"
                alt="Photo by Drew Beamer"
                fill
                className="rounded-md object-cover"
              />
            </AspectRatio>
          </div>

          <Accord />
        </main>
      </div>
    </div>
  );
}
