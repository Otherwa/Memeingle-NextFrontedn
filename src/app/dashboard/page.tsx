"use client"
import { useEffect, useMemo, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import '@/styles/style.css'; // Import the CSS file
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useCheckAuth, fetchMemes, fetchMoreMemes, likeMeme, fetchActiveUserCount } from '@/app/authStore/userActions';
import { Meme } from './profile/utils/Meme';
import Image from "next/legacy/image";

export default function Dashboard() {
    useCheckAuth();

    const [memes, setMemes] = useState<Meme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [swingClass, setSwingClass] = useState('');
    const [error, setError] = useState('');
    const [activeUserCount, setActiveUserCount] = useState<number | null>(null); // State for active user count
    const router = useRouter();

    useMemo(() => {
        fetchMemes(setMemes, setIsLoading, setError, router);
        fetchActiveUserCount(setActiveUserCount);
    }, [router]);

    const handleSwipe = (direction: string, memeId: string) => {
        console.log(`Swiped ${direction} on meme with ID ${memeId}`);

        if (direction === 'right') {
            likeMeme(memeId);
        } else if (direction === 'left') {
            dislikeMeme(memeId);
        }
    };

    const onCardLeftScreen = (index: number, direction: string, memeId: string) => {
        console.log(`Card left screen at index ${index} ${direction} ${memeId}`);

        setMemes(prevMemes => {
            const newMemes = prevMemes.filter((_, i) => i !== index);
            if (newMemes.length < 3 && !isFetchingMore) { // ? Fetch more memes if less than 3 are left
                fetchMoreMemes(setMemes, setIsFetchingMore);
            }
            return newMemes;
        });
    };

    const dislikeMeme = async (memeId: string) => {
        try {
            console.log('Meme disliked:', memeId);
        } catch (error) {
            console.error('Error disliking meme:', error);
        }
    };

    const swipe = (direction: string) => {
        if (memes.length === 0) return;

        direction === "right" ? setSwingClass('swingright') : setSwingClass('swingleft'); // ? Add swing class to trigger animation

        const memeId = memes.length > 0 ? memes[0]._id : "";

        setTimeout(() => {
            setMemes(prevMemes => {
                const newMemes = prevMemes.slice(1);
                if (newMemes.length < 3 && !isFetchingMore) { // ? Fetch more memes if less than 3 are left
                    fetchMoreMemes(setMemes, setIsFetchingMore);
                }
                return newMemes;
            });
            handleSwipe(direction, memeId);
            setSwingClass('');
        }, 500);
    }

    const handleImageError = (memeId: string) => {
        setMemes(prevMemes => prevMemes.filter(meme => meme._id !== memeId));
    }

    // Function to generate random background color
    const getRandomColor = () => {
        const colors = [
            '#F8F9FA', '#E3E4E6', '#F2EFEF', '#DADADA', '#D6E3D6', '#E0D6D6', '#E8F3F3', '#D6DBD9',
            '#F0E5E5', '#E8EAEF', '#F2F2DF', '#DADBD6', '#F2E4DE', '#E2DAD5', '#F4E7D8', '#D5E3DA',
            '#F6E6E6', '#DBE5DA', '#F2DBD6', '#E4EDEB', '#DEDDE6', '#F2EEDF', '#F4E2D8', '#F4DCC2',
            '#DDE2EC', '#F2F1DA', '#EDE5D6', '#D6E6DB', '#E7E4E9', '#F3F2DF', '#EEDCC8', '#D9DDE6',
            '#F0E6CF', '#E2EAD8', '#F1E8D1', '#E4EDF3', '#E8D6D6', '#EAEAEF', '#D5E3DA', '#DED1D8',
            '#DEE3E2', '#F8EFEF', '#DCE7E6', '#E5DFE3', '#EFDACF', '#ECD8D1', '#E3DADA', '#D5DDD3',
            '#E2E2E8', '#D1D1D5', '#D5E8F3', '#E7E0E3', '#EDE4D6', '#E5E8F3', '#DBE3DA', '#EAD6D6',
            '#E9E3D8', '#F1E9E2', '#EDE7DE', '#F2EAD1', '#E6DEE0', '#E0D9DA', '#D7E0D3', '#DFE3EC',
            '#F4F2F0', '#E5D5DA', '#DED8DE', '#E3E1E6', '#E4E7D6', '#DBE3E2', '#E5DEE3', '#D9E0D3',
            '#D3DED3', '#D5D1DA', '#F3EEDF', '#E8E2D6', '#DED8E1', '#D6D8DB', '#D7E4DC', '#DED8E2',
            '#F0E2E4', '#DED8DA', '#E3DDE6', '#DBDFE1', '#DEE0D8', '#DBDBDB', '#E4E0E2', '#E1E3E3',
            '#D5D3D9', '#E3E0E3', '#F2E7DF', '#E3E7E5', '#D6E6DB', '#E3DFD5', '#F1E8E6', '#D6D8E4',
            '#F0F3F2', '#EDE8D6', '#E0DBDB', '#E8E6E6', '#EAE2DB', '#D6D9DB', '#E7E3E0', '#E2E6E1',
            '#F3F0E2', '#E4E0D3', '#D8E0D6', '#DFE8DE', '#DFE0E3', '#D5DEE6', '#E9E0D8', '#F0E8E6',
            '#EAE3D6', '#F1E9D8', '#E2D9DA', '#E6E2D5', '#E2DDE1', '#F0ECE6'
        ];

        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className="p-6 flex min-h-screen flex-col items-center overflow-y-hidden">
            <h1 className="text-red-600 text-4xl font-bold tracking-tight text-center mb-5 font-serif">Memes</h1>

            <h5 className="text-gray-800 text-sm mb-4">(Active Users: {activeUserCount})</h5>

            {isLoading ? (
                <div className="flex h-screen w-full items-center justify-center flex-col space-y-4 gap-4">
                    <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </div>
            ) : error ? (
                <div className="flex min-h-screen w-full flex-col items-center p-6">
                    <code className="text-red-500">Error loading memes. Please try again later.</code>
                    <div className="p-6 rounded-xl">
                        <Image src="https://media.tenor.com/T9V_QxP-FwYAAAAM/hopes-deleted.gif" alt="Error GIF" className="rounded-lg" width={500} height={400} />
                    </div>
                </div>
            ) : memes.length === 0 ? (
                <div className="flex min-h-screen w-full flex-col items-center p-6">
                    <p className="text-red-500">No memes available.</p>
                    <Image src="/path/to/error.gif" alt="No memes GIF" className="mt-4" layout="fill" />
                </div>
            ) : (
                <div className="flex min-h-screen w-full flex-col items-center p-6">
                    <div className="flex flex-row items-center p-6 gap-4">
                        <Button variant="outline" onClick={() => swipe('left')}>Dislike 👋</Button>
                        <Button variant="outline" onClick={() => swipe('right')}>Like 👍</Button>
                    </div>
                    {memes.map((meme, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 aspect-[3/4] m-2"
                        >
                            <TinderCard
                                key={meme._id}
                                onCardLeftScreen={(direction) => onCardLeftScreen(index, direction, meme._id)}
                                onSwipe={(direction) => handleSwipe(direction, meme._id)}
                                preventSwipe={['up', 'down']}
                                className={index === 0 ? swingClass : ''} // Apply animation only to the first card
                            >
                                <Card className="h-full w-full flex flex-col border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black" style={{ backgroundColor: getRandomColor() }}>
                                    <CardHeader>
                                        <CardTitle className='m-2'>
                                            <span>
                                                <h1 className="mt-2 w-72 text-2xl font-bold tracking-tight text-gray-900 sm:text-xl">{meme.Title}</h1>
                                            </span>
                                        </CardTitle>
                                        <CardDescription>
                                            <Badge className='m-2'>
                                                {meme.Author}
                                            </Badge>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="relative w-56 md:w-96" style={{ paddingBottom: "108.78%" }}>
                                            <Image
                                                src={meme.Url}
                                                alt="Meme"
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-lg m-2"
                                                style={{ borderRadius: "1.5rem" }}
                                                onError={() => handleImageError(meme._id)} // Handle image loading error
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <CardDescription>
                                            <Badge variant="secondary" className='m-2'>Up Votes : {meme.UpVotes}</Badge>
                                        </CardDescription>
                                    </CardFooter>
                                </Card>
                            </TinderCard>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
