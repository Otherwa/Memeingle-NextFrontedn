"use client";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup, } from "@/components/ui/resizable"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { SiNextdotjs, SiNeo4J, SiMongodb, SiNodedotjs } from "react-icons/si";
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

          <div className="p-2 m-2 border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">

            <div className="flex flex-col sm:flex-row">

              <div className="sm:w-[60vw] w-[84vw] p-2">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <Image
                    src="https://images.ctfassets.net/kftzwdyauwt9/3cSZykppt940Q5vMHjbYd8/f111f0645166996fd77bd543d4cfd238/spring_updates.jpg?w=828&q=90&fm=webp"
                    alt="Photo by Drew Beamer"
                    fill
                    className="rounded-md object-cover"
                  />
                </AspectRatio>
              </div>

              <div className="sm:w-[30vw] w-[84vw]">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🌐 Is it accessible?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Yes! Memeingle follows accessibility best practices, including adherence to the WAI-ARIA design pattern. Our goal is to ensure that everyone can enjoy swiping memes with ease and joy.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🤔 How does it work?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Memeingle matches users based on their meme preferences. Swipe right if you love a meme, and left if you`re not feeling it. If you both swipe right, it`s a match! Get ready to find your meme-loving match and laugh together.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🎉 Why Memeingle?
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Memeingle is where meme enthusiasts come to connect and laugh. It`s more than just swiping—it`s about finding someone who gets your humor and shares your passion for memes. Join Memeingle and discover your meme-loving soulmate today!
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🔒 Privacy and Security
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Your privacy is our priority. Memeingle encrypts your data and protects it from unauthorized access. We never share your information without your consent, so you can swipe memes with peace of mind.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🤝 Community Guidelines
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Join a friendly community of meme lovers! Our guidelines promote respect and positivity. Spread laughs, not hate—let`s make Memeingle a welcoming place for everyone.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🌟 Contributors
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Meet the awesome people who made Memeingle possible:
                      <ul className="list-disc ml-6 mt-2">
                        <li>Atharv Desai - FrontEnd Developer</li>
                        <li>Jane Smith - UX/UI Designer</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-7">
                    <AccordionTrigger>
                      <span className="flex items-center">
                        🔗 Repository Link
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      Explore our codebase on GitHub:
                      <div className="mt-2">
                        <a href="https://github.com/your-username/memeingle" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          github.com/your-username/memeingle
                        </a>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

            </div>

          </div>

          <div className="p-2 w-full">
            <h1 className="mt-2 p-7 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Tech Stack</h1>
            <br />
            <br />
            <div className="h-[30rem] p-2">
              <ResizablePanelGroup direction="horizontal" className="w-full h-full border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={75}>
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <SiNextdotjs size={32} />
                          <p className="mt-2 text-sm font-semibold">Next.Js</p>
                          <p className="text-xs text-gray-600">Fronted Framework.</p>
                        </div>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75}>
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <SiNodedotjs size={32} />
                          <p className="mt-2 text-sm font-semibold">Node</p>
                          <p className="text-xs text-gray-600">JavaScript Runtime.</p>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>


                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={75}>
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <SiNeo4J size={32} />
                          <p className="mt-2 text-sm font-semibold">Neo4j</p>
                          <p className="text-xs text-gray-600">Neo4j is a graph database management system.</p>
                        </div>
                      </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={75}>
                      <div className="flex h-full items-center justify-center p-6">
                        <div className="text-center">
                          <SiMongodb size={32} />
                          <p className="mt-2 text-sm font-semibold">MongoDB</p>
                          <p className="text-xs text-gray-600">MongoDB is a NoSQL database program.</p>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>

          <div className="p-2">
            <code className="p-1 text-dark"><em>Code &amp; Design by Atharv Desai</em></code>
          </div>
        </main>
      </div>
    </div>
  );
}
