import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function MemeStats({ memes }) {
    return (
        <div className="grid grid-flow-row-dense grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {memes.map((meme) => (
                // eslint-disable-next-line react/jsx-key
                <Card className='m-3'>
                    <CardHeader>
                        <CardTitle>{meme.Title}</CardTitle>
                        <CardDescription>{meme.Author}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <img src={meme.Url} alt="Meme" style={{ width: '45vw', height: '100%', objectFit: 'cover' }} />
                    </CardContent>
                    <CardFooter>
                        <p>Upvotes : <Badge variant="secondary">{meme.UpVotes}</Badge></p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}