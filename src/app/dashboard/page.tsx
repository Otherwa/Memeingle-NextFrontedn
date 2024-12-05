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

    return (
        <div className="p-6 flex min-h-screen flex-col items-center overflow-y-hidden">
            <h1 className="text-red-600 text-4xl font-bold tracking-tight text-center mb-5 font-serif">Memes</h1>

            <code className="text-gray-800 text-sm mb-4">(Active Users: {activeUserCount})</code>

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
                            <Image src="https://i.pinimg.com/736x/3e/e1/16/3ee116f29b21dd41483836cedcdaf576.jpg" alt="Error GIF" className="rounded-lg" width={500} height={400} />
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
                                <Card className="h-full w-full flex flex-col border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black" >
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
