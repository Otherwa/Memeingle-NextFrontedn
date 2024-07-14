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
    // Round the score to one decimal place
    const roundedScore = Math.round(score * 10) / 10;

    switch (true) {
        case (roundedScore >= 0.9):
            return { description: 'Excellent', className: 'text-green-600' };
        case (roundedScore >= 0.8):
            return { description: 'Best Fit', className: 'text-blue-600' };
        case (roundedScore >= 0.7):
            return { description: 'Impressive', className: 'text-purple-600' };
        case (roundedScore >= 0.6):
            return { description: 'Good', className: 'text-teal-600' };
        case (roundedScore >= 0.5):
            return { description: 'Average', className: 'text-yellow-600' };
        case (roundedScore >= 0.4):
            return { description: 'Needs Improvement', className: 'text-orange-600' };
        case (roundedScore >= 0.3):
            return { description: 'Poor', className: 'text-red-600' };
        case (roundedScore >= 0.2):
            return { description: 'Very Poor', className: 'text-red-800' };
        case (roundedScore >= 0.1):
            return { description: 'Unacceptable', className: 'text-gray-600' };
        default:
            return { description: 'Very Unacceptable', className: 'text-gray-400' };
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


export const handleSendMessage = async (newMessage, setNewMessage, setMessages, userId, user) => {
    const token = localStorage.getItem('token');
    if (!newMessage.trim() || !user) return;
    console.log(user);
    const securityKey = `${userId}_${user.user._id}`;
    const messageData = {
        text: newMessage,
        senderId: user.user._id,
        timestamp: new Date().toISOString(),
        securityKey: securityKey
    };

    try {
        await axios.post(APP_URL + 'messages', messageData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        setNewMessage('');
        // Fetch updated messages after sending the message
        await fetchMessages(setMessages, userId, user);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};