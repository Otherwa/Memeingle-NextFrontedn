import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const APP_URL = "http://localhost:5000/api/";

export const useCheckAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);
};

export const fetchMemes = async (setMemes, setIsLoading, router) => {
    const token = localStorage.getItem('token');
    if (!token) {
        router.push('/login');
        return;
    }

    try {
        const response = await axios.get(APP_URL + 'memelist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setMemes(response.data);
    } catch (error) {
        console.error('Error fetching memes:', error);
    } finally {
        setIsLoading(false);
    }
};

export const fetchMoreMemes = async (setMemes, setIsFetchingMore) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setIsFetchingMore(true);
    try {
        const response = await axios.get(APP_URL + 'memelist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setMemes(prevMemes => [...prevMemes, ...response.data]);
    } catch (error) {
        console.error('Error fetching more memes:', error);
    } finally {
        setIsFetchingMore(false);
    }
};

export const likeMeme = async (memeId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await axios.post(APP_URL + `like/${memeId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log(data);
    } catch (error) {
        console.error('Error liking meme:', error);
    }
};
