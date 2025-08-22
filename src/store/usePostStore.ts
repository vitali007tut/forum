import { create } from 'zustand';
import type { Post } from '../types/post';
import { apiPosts } from '../api/posts';

interface PostState {
    posts: Post[];
    filteredPosts: Post[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    postsPerPage: number;

    fetchPosts: (page?: number) => Promise<void>;
    filterByUser: (userId: number | null) => void;
    setCurrentPage: (page: number) => void;
}

export const usePostStore = create<PostState>((set, get) => ({
    posts: [],
    filteredPosts: [],
    loading: false,
    error: null,
    currentPage: 1,
    postsPerPage: 10,

    fetchPosts: async (page = 1) => {
        set({ loading: true, error: null });
        try {
            const posts = await apiPosts.getPosts();
            const reversedPosts = posts.sort((a, b) => b.id - a.id)
            set({
                posts,
                filteredPosts: reversedPosts,
                currentPage: page,
                loading: false,
            });
        } catch (err) {
            set({
                error: err instanceof Error ? err.message : 'Failed to fetch posts',
                loading: false,
            });
        }
    },

    filterByUser: (userId) => {
        const { posts } = get();
        const reversedPosts = posts.sort((a, b) => b.id - a.id);
        if (!userId) {
            set({ filteredPosts: reversedPosts, currentPage: 1 });
        } else {
            const filtered = reversedPosts.filter((post) => post.userId === userId);
            set({ filteredPosts: filtered, currentPage: 1 });
        }
    },

    setCurrentPage: (page) => {
        set({ currentPage: page });
    },
}));
