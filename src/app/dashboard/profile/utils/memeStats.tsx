import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Meme } from "./Meme";

interface MemeStatsProps {
    memes: Meme[];
}

const MemeStats: React.FC<MemeStatsProps> = ({ memes }) => {
    return (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {memes.map((meme, index) => (
                <div className="w-full lg:w-[20vw] m-3" key={index}>
                    <Card className="h-full w-full flex flex-col">
                        <CardHeader>
                            <CardTitle>{meme.Title}</CardTitle>
                            <CardDescription>{meme.Author}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <Image
                                    src={meme.Url}
                                    alt="Meme"
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Badge variant="secondary">Up Votes: {meme.UpVotes}</Badge>
                        </CardFooter>
                    </Card>
                </div>
            ))
            }
        </div >
    );
}

export default MemeStats;