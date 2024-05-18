"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import MemeStats from "./utils/memeStats";

interface userData {
    userStats: any;
    user: any;
}

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<userData>({ userStats: [], user: [] });
    const [loading, setLoading] = useState(true);

    const APP_URL = "http://localhost:5000/api/";

    useEffect(() => {
        const fetchUserData = async (token: string) => {
            try {
                const response = await axios.get(APP_URL + 'user', {
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

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchUserData(token);
        }
    }, [router]); // Empty dependency array ensures this effect runs only once

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
