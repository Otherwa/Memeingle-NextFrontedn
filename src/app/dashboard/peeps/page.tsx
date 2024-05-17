"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Peeps() {
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const APP_URL = "http://localhost:5000/";

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []); // Empty dependency array ensures this effect runs only once


    return (
        <div>
            <div className="p-5">
                <h2>Peeps</h2>
                {/* Display other user data */}
            </div>
        </div>
    );
}
