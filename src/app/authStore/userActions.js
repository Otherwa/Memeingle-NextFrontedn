import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const APP_URL = process.env.NEXT_PUBLIC_PUBLICAPI_KEY;

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
                Authorization: `Bearer ${token}`,
            },
        });
        const { user, userStats } = response.data;
        setUserData({ user, userStats });

        if (user.avatarBase64) {
            setBase64(`data:image/png;base64,${user.avatarBase64}`);
        }

        form.reset({
            email: user.email,
            hobbies: user.details.hobbies,
            bio: user.details.bio,
            gender: user.details.gender,
        });

        setLoading(false);
    } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
    }
};

export const submitForm = async (values, file) => {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('hobbies', values.hobbies);
        formData.append('bio', values.bio);
        formData.append('gender', values.gender);

        if (file) {
            formData.append('avatar', file);
        }

        try {
            await axios.post(APP_URL + 'user', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        } catch (error) {
            console.error('Form submission failed:', error);
        }

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
    // Round the score to one decimal place
    const roundedScore = Math.round(score * 10) / 10;

    switch (true) {
        case (roundedScore >= 0.9):
            return { description: 'Excellent 🌌', className: 'text-lime-600' };
        case (roundedScore >= 0.8):
            return { description: 'Best Fit 🤩', className: 'text-lime-600' };
        case (roundedScore >= 0.7):
            return { description: 'Impressive 😏', className: 'text-lime-600' };
        case (roundedScore >= 0.6):
            return { description: 'Good 😄', className: 'text-orange-500' };
        case (roundedScore >= 0.5):
            return { description: 'Average 🙂', className: 'text-orange-500' };
        case (roundedScore >= 0.4):
            return { description: 'Needs Improvement 😔', className: 'text-orange-500' };
        case (roundedScore >= 0.3):
            return { description: 'Poor 😭', className: 'text-red-900' };
        case (roundedScore >= 0.2):
            return { description: 'Very Poor 😭💀', className: 'text-red-900' };
        case (roundedScore >= 0.1):
            return { description: 'Unacceptable 😭😭💀', className: 'text-red-900' };
        default:
            return { description: 'Very Unacceptable 😭😭😭💀', className: 'text-red-900' };
    }
}

// messaging
export const FetchMessagingUserData = async (id, setLoading) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(APP_URL + `user/${id}`, {
            "id": id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = response.data;
        setLoading(false);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

export const fetchMessages = async (setMessages, setLoading, userId, user) => {
    try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const securityKey = `${userId}_${user.user._id}`;
        const response = await axios.get(APP_URL + `messages?securityKey=${securityKey}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setMessages(response.data);
        setLoading(false);
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
};