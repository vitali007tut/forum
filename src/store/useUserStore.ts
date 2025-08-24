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
}

const FIXED_SUPER_USER = {
    id: 0,
    name: 'Admin User',
    username: 'admin',
    email: 'admin@forum.com',
    favoritePostIds: [],
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

            const users = resp.map((u) => ({
                ...u,
                favoritePostIds: favMap.get(u.id) ?? u.favoritePostIds ?? [],
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
                ? { ...fromStore, favoritePostIds: fromStore.favoritePostIds ?? [] }
                : { ...user, favoritePostIds: user.favoritePostIds ?? [] },
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

            const apiUpdated = await apiUsers.updateUser(updatedUser);
            const updatedWithFavs: User = {
                ...apiUpdated,
                favoritePostIds: prevFavs,
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
}));

