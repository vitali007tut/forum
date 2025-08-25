import { create } from 'zustand';
import type { User } from '../types/user';
import { apiUsers } from '../api/users';

interface UserState {
    users: User[];
    selectedUser: User | null;
    isSuperUserSelected: boolean;
    superUser: User;
    loading: boolean;
    error: string | null;

    fetchUsers: () => Promise<void>;
    selectUser: (user: User) => void;
    selectSuperUser: () => void;
    clearSelection: () => void;
    updateUser: (updatedUser: User) => Promise<void>;

    toggleFavorite: (postId: number) => void;
    toggleLike: (postId: number) => void;
    toggleDislike: (postId: number) => void;
}

const FIXED_SUPER_USER = {
    id: 0,
    name: 'Admin User',
    username: 'admin',
    email: 'admin@forum.com',
    favoritePostIds: [],
    likePostIds: [],
    dislikePostIds: [],
} as unknown as User;

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    selectedUser: null,
    isSuperUserSelected: false,
    superUser: FIXED_SUPER_USER,
    loading: true,
    error: null,

    fetchUsers: async () => {
        try {
            set({ loading: true, error: null });

            const resp = await apiUsers.getUsers();

            const prevUsers = get().users;
            const favMap = new Map<number, number[]>(prevUsers.map((u) => [u.id, u.favoritePostIds ?? []]));
            const likeMap = new Map<number, number[]>(prevUsers.map((u) => [u.id, u.likePostIds ?? []]));
            const dislikeMap = new Map<number, number[]>(
                prevUsers.map((u) => [u.id, u.dislikePostIds ?? []])
            );

            const users = resp.map((u) => ({
                ...u,
                favoritePostIds: favMap.get(u.id) ?? u.favoritePostIds ?? [],
                likePostIds: likeMap.get(u.id) ?? u.likePostIds ?? [],
                dislikePostIds: dislikeMap.get(u.id) ?? u.dislikePostIds ?? [],
            }));

            set({ users, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load users',
                loading: false,
            });
        }
    },

    selectUser: (user: User) => {
        const fromStore = get().users.find((u) => u.id === user.id);
        set({
            selectedUser: fromStore
                ? {
                      ...fromStore,
                      favoritePostIds: fromStore.favoritePostIds ?? [],
                      likePostIds: fromStore.likePostIds ?? [],
                      dislikePostIds: fromStore.dislikePostIds ?? [],
                  }
                : {
                      ...user,
                      favoritePostIds: user.favoritePostIds ?? [],
                      likePostIds: user.likePostIds ?? [],
                      dislikePostIds: user.dislikePostIds ?? [],
                  },
            isSuperUserSelected: false,
        });
    },

    selectSuperUser: () => {
        const { superUser } = get();
        set({
            selectedUser: superUser,
            isSuperUserSelected: true,
        });
    },

    clearSelection: () => {
        set({
            selectedUser: null,
            isSuperUserSelected: false,
        });
    },

    updateUser: async (updatedUser: User) => {
        try {
            const { users, selectedUser } = get();
            const prevFavs =
                users.find((u) => u.id === updatedUser.id)?.favoritePostIds ??
                selectedUser?.favoritePostIds ??
                [];
            const prevLikes =
                users.find((u) => u.id === updatedUser.id)?.likePostIds ?? selectedUser?.likePostIds ?? [];
            const prevDislikes =
                users.find((u) => u.id === updatedUser.id)?.dislikePostIds ??
                selectedUser?.dislikePostIds ??
                [];

            const apiUpdated = await apiUsers.updateUser(updatedUser);
            const updatedWithFavs: User = {
                ...apiUpdated,
                favoritePostIds: prevFavs,
                likePostIds: prevLikes,
                dislikePostIds: prevDislikes,
            };

            const updatedUsers = users.map((u) => (u.id === updatedWithFavs.id ? updatedWithFavs : u));

            set({ users: updatedUsers });

            if (selectedUser && selectedUser.id === updatedWithFavs.id) {
                set({ selectedUser: updatedWithFavs });
            }
        } catch {
            throw new Error('Failed to update user');
        }
    },

    toggleFavorite: (postId: number) => {
        const { selectedUser, users, superUser } = get();
        if (!selectedUser) return;

        const currentFavs = selectedUser.favoritePostIds ?? [];
        const isFavorite = currentFavs.includes(postId);
        const nextFavs = isFavorite ? currentFavs.filter((id) => id !== postId) : [...currentFavs, postId];

        if (selectedUser.id === 0) {
            const nextSuper = { ...superUser, favoritePostIds: nextFavs };
            set({
                superUser: nextSuper,
                selectedUser: nextSuper,
            });
        } else {
            set({
                selectedUser: { ...selectedUser, favoritePostIds: nextFavs },
                users: users.map((u) => (u.id === selectedUser.id ? { ...u, favoritePostIds: nextFavs } : u)),
            });
        }
    },

    toggleLike: (postId: number) => {
        const { selectedUser, users, superUser } = get();
        if (!selectedUser) return;

        const currentLikes = selectedUser.likePostIds ?? [];
        const currentDislikes = selectedUser.dislikePostIds ?? [];
        const isLiked = currentLikes.includes(postId);

        let nextLikes = [...currentLikes];
        let nextDislikes = [...currentDislikes];

        if (isLiked) {
            nextLikes = nextLikes.filter((id) => id !== postId);
        } else {
            nextLikes = [...nextLikes, postId];
            nextDislikes = nextDislikes.filter((id) => id !== postId);
        }

        if (selectedUser.id === 0) {
            const nextSuper = {
                ...superUser,
                likePostIds: nextLikes,
                dislikePostIds: nextDislikes,
            };
            set({
                superUser: nextSuper,
                selectedUser: nextSuper,
            });
        } else {
            const updatedUser = {
                ...selectedUser,
                likePostIds: nextLikes,
                dislikePostIds: nextDislikes,
            };
            set({
                selectedUser: updatedUser,
                users: users.map((u) => (u.id === selectedUser.id ? updatedUser : u)),
            });
        }
    },

    toggleDislike: (postId: number) => {
        const { selectedUser, users, superUser } = get();
        if (!selectedUser) return;

        const currentLikes = selectedUser.likePostIds ?? [];
        const currentDislikes = selectedUser.dislikePostIds ?? [];
        const isDisliked = currentDislikes.includes(postId);

        let nextLikes = [...currentLikes];
        let nextDislikes = [...currentDislikes];

        if (isDisliked) {
            nextDislikes = nextDislikes.filter((id) => id !== postId);
        } else {
            nextDislikes = [...nextDislikes, postId];
            nextLikes = nextLikes.filter((id) => id !== postId);
        }

        if (selectedUser.id === 0) {
            const nextSuper = {
                ...superUser,
                likePostIds: nextLikes,
                dislikePostIds: nextDislikes,
            };
            set({
                superUser: nextSuper,
                selectedUser: nextSuper,
            });
        } else {
            const updatedUser = {
                ...selectedUser,
                likePostIds: nextLikes,
                dislikePostIds: nextDislikes,
            };
            set({
                selectedUser: updatedUser,
                users: users.map((u) => (u.id === selectedUser.id ? updatedUser : u)),
            });
        }
    },
}));
