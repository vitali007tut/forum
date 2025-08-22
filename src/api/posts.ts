import type { Post } from "../types/post";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiPosts = {
    getPosts: async (): Promise<Post[]> => {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    },
};
