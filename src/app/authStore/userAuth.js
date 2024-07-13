import axios from 'axios';

const APP_URL = process.env.NEXT_PUBLIC_PUBLICAPI_KEY;

export const loginUser = async (values) => {
    const { email, password } = values;
    try {
        const response = await axios.post(`${APP_URL}/login`, { email, password });
        const { token } = response.data;
        // Save token to local storage
        localStorage.setItem('token', token);
        return { success: true, token };
    } catch (error) {
        console.error('Login failed:', error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};

export const registerUser = async (values) => {
    const { email, password, confirmPassword } = values;
    try {
        if (password === confirmPassword) {
            const response = await axios.post(`${APP_URL}/register`, { email, password, confirmPassword });
            const { message } = response.data;
            return { success: true, message };
        } else {
            return { success: false, message: "Password Not Same" };
        }
    } catch (error) {
        console.error('Registration failed:', error.response?.data?.message || error.message);
        return { success: false, message: error.response?.data?.message || error.message };
    }
};