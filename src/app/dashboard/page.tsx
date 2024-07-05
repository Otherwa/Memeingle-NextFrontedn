"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import { Button } from '@/components/ui/button';
import { isMobile } from 'react-device-detect';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import '@/styles/style.css'; // Import the CSS file
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { useCheckAuth, fetchMemes, fetchMoreMemes, likeMeme } from '@/app/authStore/userActions';
import { Meme } from './profile/utils/Meme';

export default function Dashboard() {
    useCheckAuth();

    const [memes, setMemes] = useState<Meme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [swingClass, setSwingClass] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchMemes(setMemes, setIsLoading, router);
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
            if (newMemes.length < 3 && !isFetchingMore) { // Fetch more memes if less than 3 are left
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

        direction === "right" ? setSwingClass('swingright') : setSwingClass('swingleft'); // Add swing class to trigger animation

        const memeId = memes.length > 0 ? memes[0]._id : "";

        setTimeout(() => {
            // remove top one
            setMemes(prevMemes => {
                const newMemes = prevMemes.slice(1);
                if (newMemes.length < 3 && !isFetchingMore) { // Fetch more memes if less than 3 are left
                    fetchMoreMemes(setMemes, setIsFetchingMore);
                }
                return newMemes;
            });

            handleSwipe(direction, memeId);
            setSwingClass('');
        }, 500);
    }

    return (
        <div className="p-6 flex min-h-screen flex-col items-center overflow-y-hidden">
            <h1 className='text-2xl text-red-600 font-bold'>
                Memes
            </h1>
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
            ) : (
                <div className="flex min-h-screen flex-col items-center p-6">
                    <div className="flex flex-row items-center p-6 gap-4">
                        {!isMobile ? (
                            <>
                                <Button variant="outline" onClick={() => swipe('left')}>Dislike 👋</Button>
                                <Button variant="outline" onClick={() => swipe('right')}>Like 👍</Button>
                            </>
                        ) : null}
                    </div>
                    {memes.map((meme, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-3 h-3/5 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 aspect-[3/4] m-2"
                        >
                            <TinderCard
                                key={meme._id}
                                onCardLeftScreen={(direction) => onCardLeftScreen(index, direction, meme._id)}
                                onSwipe={isMobile ? (direction) => handleSwipe(direction, meme._id) : () => { }}
                                preventSwipe={['up', 'down']}
                                className={index === 0 ? swingClass : ''} // Apply animation only to the first card
                            >
                                <Card className="h-full w-full flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{meme.Title}</CardTitle>
                                        <CardDescription>{meme.Author}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="relative w-56 md:w-96" style={{ paddingBottom: "108.78%" }}>
                                            <Image
                                                src={meme.Url}
                                                alt="Meme"
                                                layout="fill"
                                                objectFit="contain"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Badge variant="secondary">Up Votes : {meme.UpVotes}</Badge>
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
