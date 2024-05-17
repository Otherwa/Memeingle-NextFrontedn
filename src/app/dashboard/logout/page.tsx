"use client"

import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function Profile() {
    const router = useRouter();

    useEffect(() => {
        localStorage.removeItem('token')
        router.push('/login');
    }, [router]);

    return (
        <></>
    );
}