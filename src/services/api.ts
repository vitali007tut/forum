import { type User } from '../types/user';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    },

    getUserById: async (id: number): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    },
};
