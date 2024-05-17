"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import MemeStats from "../memeStats";

interface userData {
    userStats: any;
    user: any;
}

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<userData>({ userStats: [], user: [] });
    const [loading, setLoading] = useState(true);

    const APP_URL = process.env.NEXT_PUBLIC_APP_URL_RCP;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchUserData = async (token: string) => {
        try {
            const response = await axios.get(APP_URL + '/user', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = response.data;
            console.log(data);
            setUserData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchUserData(token);
        }
    }, [fetchUserData, router]); // Empty dependency array ensures this effect runs only once



    if (loading) {
        return <div className="flex min-h-screen flex-col items-center p-6">Loading...</div>;
    }

    return (
        <div>
            <div className="flex min-h-screen flex-col items-center p-6">
                <div>
                    <Badge variant="secondary">{userData.user.email}</Badge>
                </div>
                <div>
                    <MemeStats memes={userData.userStats} />
                </div>
            </div>
        </div>
    );
}
