import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { usePostStore } from '../store/usePostStore';
import { useTranslation } from 'react-i18next';

const UserFilter: React.FC = () => {
    const { users, loading: usersLoading, error: usersError } = useUserStore();
    const { filterByUser } = usePostStore();
    const { t } = useTranslation();

    const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

    useEffect(() => {
        const { selectedUser, users } = useUserStore.getState();

        if (selectedUser && selectedUser.id !== 0) {
            setSelectedUserIds([selectedUser.id]);
            filterByUser([selectedUser.id]);
        } else {
            const allUserIds = users.map((user) => user.id);
            setSelectedUserIds(allUserIds);
            filterByUser(null);
        }
    }, [filterByUser]);

    useEffect(() => {
        if (selectedUserIds.length === 0) {
            filterByUser([]);
        } else if (selectedUserIds.length === users.length) {
            filterByUser(null);
        } else {
            filterByUser(selectedUserIds);
        }
    }, [selectedUserIds, users.length, filterByUser]);

    const handleUserClick = (userId: number) => {
        setSelectedUserIds((prev) => {
            if (prev.includes(userId)) {
                return prev.filter((id) => id !== userId);
            } else {
                return [...prev, userId];
            }
        });
    };

    const handleSelectAll = () => {
        const allUserIds = users.map((user) => user.id);
        setSelectedUserIds(allUserIds);
        filterByUser(null);
    };

    const handleClearAll = () => {
        setSelectedUserIds([]);
        filterByUser([]);
    };

    if (usersLoading) {
        return <div className="text-gray-400 mb-4">Loading users...</div>;
    }

    if (usersError) {
        return <div className="text-red-400 mb-4">Error loading users: {usersError}</div>;
    }

    const isAllSelected = selectedUserIds.length === users.length;
    const isNoneSelected = selectedUserIds.length === 0;

    return (
        <div className="mb-6 px-4 py-2 border border-gray-600 rounded-lg bg-gray-900">
            <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-gray-300">{t('posts.filter_by_user')}</span>
                <button
                    onClick={handleSelectAll}
                    disabled={isAllSelected}
                    className={`px-3 py-1 text-xs rounded transition-colors border ${
                        isAllSelected
                            ? 'bg-gray-500 text-gray-300 cursor-default border-gray-500'
                            : 'bg-gray-600 hover:bg-gray-700 text-white cursor-pointer border-gray-600'
                    }`}
                >
                    {t('posts.select_all')}
                </button>
                <button
                    onClick={handleClearAll}
                    disabled={isNoneSelected}
                    className={`px-3 py-1 text-xs rounded transition-colors border ${
                        isNoneSelected
                            ? 'bg-gray-500 text-gray-300 cursor-default border-gray-500'
                            : 'bg-gray-600 hover:bg-gray-700 text-white cursor-pointer border-gray-600'
                    }`}
                >
                    {t('posts.clear_all')}
                </button>
            </div>

            <div className="flex flex-wrap gap-2">
                {users.map((user) => (
                    <button
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                        className={`px-2 py-1 rounded-2xl border cursor-pointer transition-all duration-200 text-white ${
                            selectedUserIds.includes(user.id)
                                ? 'border-indigo-500 bg-indigo-900/20 shadow-lg'
                                : 'border-gray-600 bg-gray-700/30 hover:border-indigo-400 hover:bg-gray-700/50'
                        }`}
                    >
                        {user.username}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserFilter;
