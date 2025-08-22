import { type User } from '../types/user';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiUsers = {
    getUsers: async (): Promise<User[]> => {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    },

    updateUser: async (updatedUser: User): Promise<User> => {
        const response = await fetch(`${API_BASE_URL}/users/${updatedUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    },
};
