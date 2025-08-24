import type { Post, Comment } from "../types/post";

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const apiPosts = {
    getPosts: async (): Promise<Post[]> => {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    },

    createPost: async (newPost: Omit<Post, 'id'>): Promise<Post> => {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        return response.json();
    },

    deletePost: async (postId: number): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }
    },

    getPost: async (postId: number): Promise<Post> => {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    },

    getCommentsByPostId: async (postId: number): Promise<Comment[]> => {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    },
};
