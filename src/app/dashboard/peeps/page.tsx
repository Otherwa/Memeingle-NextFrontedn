"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Peeps() {
    const router = useRouter();
    const [userData, setUserData] = useState<any>([]);

    const APP_URL = "http://localhost:5000/api/";

    useEffect(() => {
        const fetchUserData = async (token: string) => {

            const response = await axios.get(APP_URL + 'user/peeps', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = response.data.peeps;

            console.log(data);
            setUserData(data);
        }



        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchUserData(token)
        }
    }, [router]);

    const getAvatarInitials = (name: string) => {
        if (!name) return '';
        return name.slice(0, 2).toUpperCase();
    };

    return (
        <div>
            <div className="p-5">
                <h1 className="text-2xl text-red-600 font-bold flex items-center justify-center space-x-4">Peeps</h1>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                    {userData.map((user: any) => (
                        <Card key={user._id} className="p-4 m-4">
                            <CardHeader className="card-header">
                                <CardTitle>
                                    <h1 className="m-2">
                                        {user.email}
                                    </h1>
                                </CardTitle>
                                <Avatar>
                                    <AvatarImage src={user.avatar} alt="@shadcn" className="object-cover" />
                                    <AvatarFallback>{getAvatarInitials(user.email)}</AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="card-body">
                                <CardDescription>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Similarity Score:</strong> {user.similarityScore}</p>
                                    <p><strong>Bio:</strong> {user.bio}</p>
                                    <p><strong>Gender:</strong> {user.gender}</p>
                                    <p><strong>Hobbies:</strong> {user.hobbies}</p>
                                    <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
