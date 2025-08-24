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
    activeFilter: number[] | null;

    fetchPosts: (page?: number) => Promise<void>;
    filterByUser: (userId: number[] | null) => void;
    setCurrentPage: (page: number) => void;
    addPost: (newPost: Post) => void;
    orderPost: (postId: number) => void;
    movePostUp: (postId: number) => void;
    movePostDown: (postId: number) => void;
    deletePost: (postId: number) => Promise<boolean>;
}

export const usePostStore = create<PostState>((set, get) => ({
    posts: [],
    filteredPosts: [],
    loading: false,
    error: null,
    currentPage: 1,
    postsPerPage: 10,
    activeFilter: null,

    fetchPosts: async (page = 1) => {
        set({ loading: true, error: null });
        try {
            const posts = await apiPosts.getPosts();

            const orderedPosts = posts
                .sort((a, b) => b.id - a.id)
                .map((post, index) => ({ ...post, order: index + 1 }));

            set({
                posts: orderedPosts,
                filteredPosts: orderedPosts,
                currentPage: page,
                loading: false,
                activeFilter: null,
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
        let filtered: Post[];

        if (userId === null) {
            filtered = [...posts];
        } else {
            filtered = posts.filter((post) => userId.includes(post.userId));
        }

        filtered = [...filtered].sort((a, b) => a.order - b.order);

        set({ filteredPosts: filtered, currentPage: 1, activeFilter: userId });
    },

    setCurrentPage: (page) => {
        set({ currentPage: page });
    },

    addPost: (newPost) => {
        const { posts, activeFilter } = get();

        const lastId = posts.length > 0 ? Math.max(...posts.map((p) => p.id)) : 0;
        const postWithId: Post = { ...newPost, id: lastId + 1 };

        const updatedPosts = [
            { ...postWithId, order: 1 },
            ...posts.map((p) => ({ ...p, order: (p.order ?? 0) + 1 })),
        ];

        let updatedFiltered: Post[];
        if (activeFilter === null) {
            updatedFiltered = updatedPosts;
        } else {
            updatedFiltered = updatedPosts.filter((p) => activeFilter.includes(p.userId));
        }
        updatedFiltered = updatedFiltered.sort((a, b) => a.order - b.order);

        set({ posts: updatedPosts, filteredPosts: updatedFiltered });
    },

    orderPost: (postId) => {
        const { posts, activeFilter } = get();
        const target = posts.find((p) => p.id === postId);
        if (!target) return;

        const reordered = posts.map((p) =>
            p.id === target.id
                ? { ...p, order: 1 }
                : p.order < target.order
                ? { ...p, order: p.order + 1 }
                : p
        );

        const sorted = reordered.sort((a, b) => a.order - b.order);

        let updatedFiltered: Post[];
        if (activeFilter === null) {
            updatedFiltered = sorted;
        } else {
            updatedFiltered = sorted.filter((p) => activeFilter.includes(p.userId));
        }

        set({ posts: sorted, filteredPosts: updatedFiltered });
    },

    movePostUp: (postId) => {
        const { posts, activeFilter } = get();
        const target = posts.find((p) => p.id === postId);
        if (!target || target.order === 1) return;

        const above = posts.find((p) => p.order === target.order - 1);
        if (!above) return;

        const updated = posts.map((p) => {
            if (p.id === target.id) return { ...p, order: p.order - 1 };
            if (p.id === above.id) return { ...p, order: p.order + 1 };
            return p;
        });

        const sorted = updated.sort((a, b) => a.order - b.order);

        let updatedFiltered: Post[];
        if (activeFilter === null) {
            updatedFiltered = sorted;
        } else {
            updatedFiltered = sorted.filter((p) => activeFilter.includes(p.userId));
        }

        set({ posts: sorted, filteredPosts: updatedFiltered });
    },

    movePostDown: (postId) => {
        const { posts, activeFilter } = get();
        const target = posts.find((p) => p.id === postId);
        if (!target || target.order === posts.length) return;

        const below = posts.find((p) => p.order === target.order + 1);
        if (!below) return;

        const updated = posts.map((p) => {
            if (p.id === target.id) return { ...p, order: p.order + 1 };
            if (p.id === below.id) return { ...p, order: p.order - 1 };
            return p;
        });

        const sorted = updated.sort((a, b) => a.order - b.order);

        let updatedFiltered: Post[];
        if (activeFilter === null) {
            updatedFiltered = sorted;
        } else {
            updatedFiltered = sorted.filter((p) => activeFilter.includes(p.userId));
        }

        set({ posts: sorted, filteredPosts: updatedFiltered });
    },

    deletePost: async (postId: number): Promise<boolean> => {
        try {
            await apiPosts.deletePost(postId);

            const { posts, activeFilter } = get();

            const updatedPosts = posts.filter((p) => p.id !== postId);

            const reorderedPosts = updatedPosts
                .sort((a, b) => a.order - b.order)
                .map((p, idx) => ({ ...p, order: idx + 1 }));

            let updatedFiltered: Post[];
            if (activeFilter === null) {
                updatedFiltered = reorderedPosts;
            } else {
                updatedFiltered = reorderedPosts.filter((p) => activeFilter.includes(p.userId));
            }

            set({
                posts: reorderedPosts,
                filteredPosts: updatedFiltered,
            });

            return true;
        } catch {
            return false;
        }
    },
}));
