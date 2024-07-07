import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const APP_URL = "https://memeingle-backend.onrender.com/api/";

// ? Main Authentication

export const useCheckAuth = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, [router]);
};

// ? Meme Feed

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
        await axios.post(APP_URL + `like/${memeId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error liking meme:', error);
    }
};


// ? Profile

export const fetchUserData = async (setUserData, setIsLoading) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        const response = await axios.get(APP_URL + 'user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setUserData(response.data);
        setIsLoading(false);

    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const fetchUserProfileData = async (token, setUserData, form, setBase64, setLoading) => {
    try {
        const response = await axios.get(APP_URL + 'user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log(data);
        setUserData(data);

        // set form data
        form.setValue('email', data.user.email);
        form.setValue('hobbies', data.user.hobbies);
        form.setValue('bio', data.user.bio);
        form.setValue('gender', data.user.gender);
        setBase64(data.user.avatar);

        setLoading(false);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

export const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const submitForm = async (values, token, file, setBase64) => {
    try {
        let base64 = null;
        let data = null;

        if (file) {
            base64 = await toBase64(file);
            setBase64(base64);
            data = {
                ...values,
                avatar: base64
            };
        } else {
            data = {
                ...values,
            };
        }

        const response = await axios.post(
            APP_URL + 'user',
            {
                "data": data
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log(response);
    } catch (error) {
        console.error('Form submission failed:', error);
        // Set error message here and display it to the user
    }
};


// ? Peeps

export const fetchUserPeepsData = async (token) => {
    try {
        const response = await axios.get(APP_URL + 'user/peeps', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data.peeps;
    } catch (error) {
        console.error('Error fetching user peeps data:', error);
        throw error;
    }
};

export const getAvatarInitials = (name) => {
    if (!name) return '';
    return name.slice(0, 2).toUpperCase();
};

export const getSimilarityDescription = (score) => {
    if (score >= 0.9) {
        return 'Best Fit';
    } else if (score >= 0.7) {
        return 'Impressive';
    } else if (score >= 0.5) {
        return 'Good';
    } else {
        return 'Needs Improvement';
    }
};