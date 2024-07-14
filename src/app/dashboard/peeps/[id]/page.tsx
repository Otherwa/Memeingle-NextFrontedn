'use client';

import { FetchMessagingUserData, getAvatarInitials, useCheckAuth } from '@/app/authStore/userActions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { useState, useEffect } from 'react';
import Chat from '../component/Chat';

interface Params {
    id: string;
}

interface UserData {
    email: string;
    avatar: string;
    bio: string;
    gender: string;
    hobbies: string;
}

export default function UserPeep({ params }: { params: Params }) {
    useCheckAuth();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserData | null>(null);
    const { id } = params;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await FetchMessagingUserData(id, setLoading);
                setUserData(data.user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    if (loading || !userData) {
        return (
            <div className="flex h-screen w-full items-center justify-center flex-col space-y-4 gap-4">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex lg:flex-row flex-col">
            <div className='p-4 w-full lg:w-1/2'>
                <h1 className="text-red-600 text-xl font-bold tracking-tight flex items-center justify-center space-x-4">{userData.email}</h1>
                <Card className="p-4 m-4 hover:bg-gray-200 transition-colors duration-200 ease-in-out border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">
                    <CardHeader className="card-header">
                        <CardTitle>
                            <Avatar>
                                <AvatarImage
                                    width={20}
                                    src={userData.avatar}
                                    alt={userData.email}
                                    className="object-cover h-[4rem] w-[4rem] rounded-full"
                                />
                                <AvatarFallback>{getAvatarInitials(userData.email)}</AvatarFallback>
                            </Avatar>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="card-body">
                        <CardDescription>
                            <p className='text-lg' ><strong className="text-black">Bio:</strong> {userData.bio}</p>
                            <p className='text-lg'><strong className="text-black">Gender:</strong> {userData.gender}</p>
                            <p className='text-lg'><strong className="text-black">Hobbies:</strong> {userData.hobbies}</p>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>
            <div className='p-4 w-full lg:w-1/2'>
                <h2 className="text-2xl p-4 font-bold">Chat</h2>
                <Chat userId={id} />
            </div>
        </div>
    );
}
