"use client"

import { useMemo, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import MemeStats from "./utils/memeStats";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCheckAuth } from "@/app/authStore/userActions";
import { fetchUserData } from "@/app/authStore/userActions";
import { Input } from "@/components/ui/input";
import ProfileUser from './component/Profile';

interface userData {
    UserStats: any;
    user: any;
}

export default function Profile() {
    useCheckAuth();

    const [userData, setUserData] = useState<userData>({ UserStats: [], user: [] });
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useMemo(() => {
        fetchUserData(setUserData, setLoading);
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredMemes = userData.UserStats.filter((meme: any) =>
        meme.Title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
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
        <div className="flex flex-col min-h-screen p-6 md:flex-row">
            {/* Left Panel: Profile Info */}
            <div className="w-full h-full md:w-1/3  bg-gray-50  shadow-md mb-4 md:mr-4   hover:bg-gray-200 transition-colors duration-200 ease-in-out border-2 rounded-lg border-l-3 border-r-3 border-dashed border-black">
                {/* Add any other profile-related components here */}
                <div className="mb-10 p-4">
                    <ToggleGroup variant="outline" type="single">
                        <ToggleGroupItem value="email" aria-label="Toggle Email">
                            {userData.user.email}
                        </ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <div className="">
                    {/* Add more user details as needed */}
                    <ProfileUser />
                </div>
            </div>

            {/* Right Panel: Meme Search and Stats */}
            <div className='w-full h-full md:w-2/3'>
                <Input
                    type="text"
                    placeholder="Search memes..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="mb-6"
                />
                <div className="p-6 bg-gray-50 shadow-md  rounded-lg  overflow-y-auto">
                    <MemeStats memes={filteredMemes} />
                </div>
            </div>

        </div>
    );
}
