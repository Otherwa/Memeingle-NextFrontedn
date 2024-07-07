import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Meme } from "./Meme";
import Link from "next/link";

interface MemeStatsProps {
    memes: Meme[];
}

const handleShare = (url: string) => {
    if (navigator.share) {
        navigator.share({
            title: 'Check out this meme!',
            url: url,
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch((error) => {
            console.error('Error sharing:', error);
        });
    } else {
        console.log('Web Share API is not supported in your browser.');
    }
};

const MemeStats: React.FC<MemeStatsProps> = ({ memes }) => {
    const handleShareClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, url: string) => {
        event.preventDefault();
        handleShare(url);
    };

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
                        <CardFooter className="flex flex-col items-start gap-2">
                            <Badge>
                                <span>
                                    <a onClick={(event) => handleShareClick(event, meme.Url)}>{meme.Url}</a>
                                </span>
                            </Badge>
                            <Badge variant="secondary">Up Votes: {meme.UpVotes}</Badge>
                        </CardFooter>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default MemeStats;
