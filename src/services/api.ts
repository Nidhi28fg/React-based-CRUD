import axios from 'axios';
import type { User } from '../types/user';

const API_URL = 'http://localhost:3001/users';

export const api = {
    getAllUsers: async (): Promise<User[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getUser: async (id: string): Promise<User> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    createUser: async (user: Omit<User, 'id'>): Promise<User> => {
        const response = await axios.post(API_URL, user);
        return response.data;
    },

    updateUser: async (id: string, user: Partial<User>): Promise<User> => {
        const response = await axios.put(`${API_URL}/${id}`, user);
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
