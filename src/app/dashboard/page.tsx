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
    const [swingClass, setSwingClass] = useState('');

    const APP_URL = "https://memeingle-backend.onrender.com/api/"
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        const fetchData = async (token: string) => {
            try {
                const response = await axios.get(APP_URL + '/memelist', {
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
        setMemes(prevMemes => prevMemes.filter((_, i) => i !== index));
    };

    const likeMeme = async (memeId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(APP_URL + `/like/${memeId}`, {}, {
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
            setMemes(prevMemes => prevMemes.slice(1));
            handleSwipe(direction, memeId);
            setSwingClass('');
        }, 500);
    }

    return (
        <div className="p-6 flex min-h-screen flex-col items-center p-6">
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
                                <Button variant="outline" onClick={() => swipe('left')}>Swipe left!</Button>
                                <Button variant="outline" onClick={() => swipe('right')}>Swipe right!</Button>
                            </>
                        ) : null}
                    </div>
                    {memes.map((meme, index) => (
                        <TinderCard
                            key={meme.id}
                            onCardLeftScreen={(direction) => onCardLeftScreen(index, direction, meme.id)}
                            onSwipe={isMobile ? (direction) => handleSwipe(direction, meme.id) : () => { }}
                            preventSwipe={['up', 'down']}
                            className={index === 0 ? swingClass : ''} // Apply animation only to the first card
                        >
                            <Card className='m-3'>
                                <CardHeader>
                                    <CardTitle>{meme.Title}</CardTitle>
                                    <CardDescription>{meme.Author}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img src={meme.Url} alt="Meme" style={{ width: '45vw', height: '100%', objectFit: 'cover' }} />
                                </CardContent>
                                <CardFooter>
                                    <p>Upvotes : {meme.UpVotes}</p>
                                </CardFooter>
                            </Card>
                        </TinderCard>
                    ))}
                </div>
            )}
        </div>
    );
}
