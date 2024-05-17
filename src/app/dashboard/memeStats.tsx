import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Meme {
    Title: number;
    Author: string;
    Url: string;
    UpVotes: string;
}

interface MemeStatsProps {
    memes: Meme[];
}

const MemeStats: React.FC<MemeStatsProps> = ({ memes }) => {
    return (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {memes.map((meme) => (
                // eslint-disable-next-line react/jsx-key
                <div className="w-full lg:w-[20vw] aspect-[9/16] m-3">
                    <Card className='m-3'>
                        <CardHeader>
                            <CardTitle>{meme.Title}</CardTitle>
                            <CardDescription>{meme.Author}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="relative max-w-[45vw] aspect-[9/16] overflow-hidden">
                                <img src={meme.Url} alt="Meme" className="w-full h-full object-contain" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <p>Upvotes : <Badge variant="secondary">{meme.UpVotes}</Badge></p>
                        </CardFooter>
                    </Card>
                </div>
            ))
            }
        </div >
    );
}

export default MemeStats;