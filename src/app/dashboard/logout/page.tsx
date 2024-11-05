"use client"

import { unpingActiveUserCount } from "@/app/authStore/userActions";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function Profile() {
    const router = useRouter();

    useEffect(() => {
        unpingActiveUserCount();
        localStorage.removeItem('token')
        router.push('/login');
    }, [router]);

    return (
        <></>
    );
}