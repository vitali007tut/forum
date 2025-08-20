import React, { createContext, useState, useEffect } from 'react';
import type { User } from '../types/user';
import { api } from '../services/api';

interface UserContextType {
    users: User[];
    selectedUser: User | null;
    isSuperUserSelected: boolean;
    loading: boolean;
    error: string | null;
    selectUser: (user: User) => void;
    selectSuperUser: () => void;
    clearSelection: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const FIXED_SUPER_USER = {
    id: 0,
    name: 'Admin User',
    username: 'admin',
} as User;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isSuperUserSelected, setIsSuperUserSelected] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const usersData = await api.getUsers();
                setUsers(usersData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const selectUser = (user: User) => {
        setSelectedUser(user);
        setIsSuperUserSelected(false);
    };

    const selectSuperUser = () => {
        setSelectedUser(FIXED_SUPER_USER);
        setIsSuperUserSelected(true);
    };

    const clearSelection = () => {
        setSelectedUser(null);
        setIsSuperUserSelected(false);
    };

    return (
        <UserContext.Provider
            value={{
                users,
                selectedUser,
                isSuperUserSelected,
                loading,
                error,
                selectUser,
                selectSuperUser,
                clearSelection,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export { UserContext };
