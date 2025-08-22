import { create } from 'zustand';
import type { User } from '../types/user';
import { apiUsers } from '../api/users';

interface UserState {
    users: User[];
    selectedUser: User | null;
    isSuperUserSelected: boolean;
    loading: boolean;
    error: string | null;

    fetchUsers: () => Promise<void>;
    selectUser: (user: User) => void;
    selectSuperUser: () => void;
    clearSelection: () => void;
    updateUser: (updatedUser: User) => Promise<void>;
}

const FIXED_SUPER_USER = {
    id: 0,
    name: 'Admin User',
    username: 'admin',
    email: 'admin@forum.com',
} as User;

export const useUserStore = create<UserState>((set, get) => ({
    users: [],
    selectedUser: null,
    isSuperUserSelected: false,
    loading: true,
    error: null,

    fetchUsers: async () => {
        try {
            set({ loading: true, error: null });
            const users = await apiUsers.getUsers();
            set({ users, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to load users',
                loading: false,
            });
        }
    },

    selectUser: (user: User) => {
        set({
            selectedUser: user,
            isSuperUserSelected: false,
        });
    },

    selectSuperUser: () => {
        set({
            selectedUser: FIXED_SUPER_USER,
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
            const updatedUserData = await apiUsers.updateUser(updatedUser);
            const { users } = get();
            const updatedUsers = users.map((user) =>
                user.id === updatedUserData.id ? updatedUserData : user
            );

            set({ users: updatedUsers });

            const { selectedUser } = get();
            if (selectedUser && selectedUser.id === updatedUserData.id) {
                set({ selectedUser: updatedUserData });
            }
        } catch {
            throw new Error('Failed to update user');
        }
    },
}));
