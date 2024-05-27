"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge } from "@/components/ui/badge";
import MemeStats from "./utils/memeStats";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface userData {
    userStats: any;
    user: any;
}

export default function Profile() {
    const router = useRouter();
    const [userData, setUserData] = useState<userData>({ userStats: [], user: [] });
    const [loading, setLoading] = useState(true);

    const APP_URL = "https://memeingle-backend.onrender.com/api/";

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
                    <ToggleGroup variant="outline" type="single">
                        <ToggleGroupItem value="email" aria-label="Toggle Email">
                            {userData.user.email}
                        </ToggleGroupItem>
                        &nbsp;
                        <ToggleGroupItem value="bold" aria-label="Toggle Profile">
                            <Link href="/dashboard/profile/user">Profile</Link>
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div>
                    <MemeStats memes={userData.userStats} />
                </div>
            </div>
        </div>
    );
}
