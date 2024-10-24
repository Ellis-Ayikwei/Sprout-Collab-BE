// src/services/loginService.ts
import authAxiosInstance from '../../../helper/authAxiosInstance';

// Define the login function
export const login = async (userOrEmail: { email?: string; username?: string }, password: string) => {
    try {
        console.log('Login:', userOrEmail, password);
        const payload = { ...userOrEmail, password };
        const response = await authAxiosInstance.post('/login', payload); // Send the complete payload
        return response;
    } catch (error: any) {
        // Handle and throw the error for further processing
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};
