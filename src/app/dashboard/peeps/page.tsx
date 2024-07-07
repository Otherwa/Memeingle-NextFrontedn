"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { fetchUserPeepsData, getAvatarInitials, getSimilarityDescription } from '@/app/authStore/userActions';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
    _id: string;
    email: string;
    avatar: string;
    similarityScore: number;
    bio: string;
    gender: string;
    hobbies: string;
    createdAt: string;
}

export default function Peeps() {
    const router = useRouter();
    const [userData, setUserData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchUserPeepsData(token)
                .then(data => {
                    setUserData(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [router]);

    return (
        <div className="p-5">
            <h1 className="text-2xl text-red-600 font-bold flex items-center justify-center space-x-4">Peeps</h1>
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
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                    {userData.map((user) => (
                        <Card key={user._id} className="p-4 m-4">
                            <CardHeader className="card-header">
                                <CardTitle>
                                    <h1 className="m-2">
                                        {user.email}
                                    </h1>
                                </CardTitle>
                                <Avatar>
                                    <AvatarImage src={user.avatar} alt={user.email} className="object-cover" />
                                    <AvatarFallback>{getAvatarInitials(user.email)}</AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="card-body">
                                <CardDescription className="p-2">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Similarity Score:</strong> {getSimilarityDescription(user.similarityScore)}</p>
                                    <p><strong>Bio:</strong> {user.bio}</p>
                                    <p><strong>Gender:</strong> {user.gender}</p>
                                    <p><strong>Hobbies:</strong> {user.hobbies}</p>
                                    <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
