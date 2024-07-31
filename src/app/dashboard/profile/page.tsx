"use client"

import { useMemo, useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import MemeStats from "./utils/memeStats";
import Link from "next/link";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useCheckAuth } from "@/app/authStore/userActions";
import { fetchUserData } from "@/app/authStore/userActions";
import { Input } from "@/components/ui/input";

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
        <div>
            <div className="flex min-h-screen flex-col items-center p-6 mb-12">
                <div className="mb-10">
                    <ToggleGroup variant="outline" type="single">
                        <ToggleGroupItem value="email" aria-label="Toggle Email">
                            {userData.user.email}
                        </ToggleGroupItem>
                        &nbsp;
                        <Link href="/dashboard/profile/user">
                            <ToggleGroupItem value="bold" aria-label="Toggle Profile">
                                Profile 🪞
                            </ToggleGroupItem>
                        </Link>
                    </ToggleGroup>
                </div>
                <br />
                <div className="w-1/2">
                    <Input
                        type="text"
                        placeholder="Search memes..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="mb-6"
                    />
                </div>
                <div>
                    <MemeStats memes={filteredMemes} />
                </div>
            </div>
        </div>
    );
}
