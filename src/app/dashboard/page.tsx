"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import '@/styles/style.css'; // Import the CSS file
import { isMobile } from 'react-device-detect';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Meme {
    id: string;
    Title: string;
    Author: string;
    Url: string;
    UpVotes: string;
}

export default function Dashboard() {
    const router = useRouter();
    const [memes, setMemes] = useState<Meme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [swingClass, setSwingClass] = useState('');

    const APP_URL = "http://localhost:5000/api/";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        const fetchData = async (token: string) => {
            try {
                const response = await axios.get(APP_URL + 'memelist', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMemes(response.data);
            } catch (error) {
                console.error('Error fetching memes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        const token = localStorage.getItem('token');

        if (!token) {
            router.push('/login');
        } else {
            fetchData(token);
        }
    }, [router]);

    const fetchMoreMemes = async () => {
        if (isFetchingMore) return; // Prevent multiple fetches
        setIsFetchingMore(true);
        const token = localStorage.getItem('token');
        try {
            const response = await axios.get(APP_URL + 'memelist', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMemes(prevMemes => [...prevMemes, ...response.data]);
        } catch (error) {
            console.error('Error fetching more memes:', error);
        } finally {
            setIsFetchingMore(false);
        }
    };

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
                fetchMoreMemes();
            }
            return newMemes;
        });
    };

    const likeMeme = async (memeId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(APP_URL + `like/${memeId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = response.data;
            console.log(data);
        } catch (error) {
            console.error('Error liking meme:', error);
        }
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

        const memeId = memes.length > 0 ? memes[0].id : "";

        setTimeout(() => {
            // remove top one
            setMemes(prevMemes => {
                const newMemes = prevMemes.slice(1);
                if (newMemes.length < 3 && !isFetchingMore) { // Fetch more memes if less than 3 are left
                    fetchMoreMemes();
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
                <div className="flex min-h-screen flex-col items-center p-6">Loading...</div>
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
                                key={meme.id}
                                onCardLeftScreen={(direction) => onCardLeftScreen(index, direction, meme.id)}
                                onSwipe={isMobile ? (direction) => handleSwipe(direction, meme.id) : () => { }}
                                preventSwipe={['up', 'down']}
                                className={index === 0 ? swingClass : ''} // Apply animation only to the first card
                            >
                                <Card className="h-full w-full flex flex-col">
                                    <CardHeader>
                                        <CardTitle>{meme.Title}</CardTitle>
                                        <CardDescription>{meme.Author}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <div className="w-full h-full overflow-hidden">
                                            <img src={meme.Url} alt="Meme" className="w-full h-full object-contain" />
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <p>Upvotes : {meme.UpVotes}</p>
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
