"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { fetchUserPeepsData, getAvatarInitials, getSimilarityDescription, useCheckAuth } from '@/app/authStore/userActions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger, } from "@/components/ui/hover-card"
import Link from "next/link";

interface User {
    _id: string;
    email: string;
    avatar: string;
    avatarBase64: string;
    likedmemes: number;
    details: {
        liked: string[];
        hobbies: string;
        gender: string;
        bio: string;
    };
    similarityScore: string;
    createdAt: string;
}


export default function Peeps() {
    const router = useRouter();
    const [userData, setUserData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useCheckAuth();

    useEffect(() => {
        fetchUserPeepsData()
            .then(data => {
                setUserData(data);
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [router]);

    return (
        <div className="p-5">
            <h1 className="text-red-600 text-3xl font-bold tracking-tight flex items-center justify-center space-x-4">Peeps</h1>
            {loading ? (
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
                <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                    {userData.map((user) => (
                        <Link key={user._id} href={`./peeps/${user._id}`} className="w-full">
                            <Card key={user._id} className="p-4 m-4  hover:bg-gray-200 transition-colors duration-200 ease-in-out border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">
                                <CardHeader className="card-header">
                                    <CardTitle>
                                        <Avatar>
                                            <AvatarImage
                                                width={20}
                                                src={`data:image/png;base64,${user.avatarBase64}`}
                                                alt={user.email}
                                                className="object-cover h-auto"  // Ensure the image maintains aspect ratio
                                            />
                                            <AvatarFallback>{getAvatarInitials(user.email)}</AvatarFallback>
                                        </Avatar>

                                        <br />
                                        <h1>
                                            {user.email}
                                        </h1>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="card-body">
                                    <CardDescription>
                                        <HoverCard>
                                            <HoverCardTrigger><p><strong className="text-black">Email:</strong> {user.email}</p></HoverCardTrigger>
                                            <HoverCardContent>
                                                <p><strong className="text-black">Bio:</strong> {user.details.bio}</p>
                                            </HoverCardContent>
                                        </HoverCard>
                                        <p><strong className="text-black">Similarity Score:</strong> <span className={`font-bold ${getSimilarityDescription(user.similarityScore).className}`}>{getSimilarityDescription(user.similarityScore).description}</span></p>
                                        <p><strong className="text-black">Gender:</strong> {user.details.gender}</p>
                                        <p><strong className="text-black">Hobbies:</strong> {user.details.hobbies}</p>
                                        <p><strong className="text-black">Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
