import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';

const Users: React.FC = () => {
    const {
        users,
        loading,
        error,
        selectUser,
        selectSuperUser,
        selectedUser,
        isSuperUserSelected,
        clearSelection,
    } = useUserStore();
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="px-4 py-6 sm:px-0">
                <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                    <p className="text-gray-300">{t('users.loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="px-4 py-6 sm:px-0">
                <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                    <p className="text-red-400">
                        {t('users.error')}: {error}
                    </p>
                </div>
            </div>
        );
    }

    const isUserSelected = (userId: number) => {
        return selectedUser?.id === userId && !isSuperUserSelected;
    };

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                <div className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div
                            onClick={selectSuperUser}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                isSuperUserSelected
                                    ? 'border-yellow-500 bg-yellow-900/20 shadow-lg shadow-yellow-500/20'
                                    : 'border-gray-600 bg-gray-700/30 hover:border-yellow-400 hover:bg-gray-700/50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                    <span className="text-yellow-400 font-bold text-lg">★</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-bold text-white">{t('users.super_admin')}</h3>
                                    <p className="text-yellow-400 text-sm">admin</p>
                                    <p className="text-gray-400 text-sm mt-1">{t('users.full_access')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => selectUser(user)}
                                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                                    isUserSelected(user.id)
                                        ? 'border-indigo-500 bg-indigo-900/20 shadow-lg'
                                        : 'border-gray-600 bg-gray-700/30 hover:border-indigo-400 hover:bg-gray-700/50'
                                }`}
                            >
                                <h3 className="font-semibold text-white">{user.name}</h3>
                                <p className="text-gray-300 text-sm">{user.username}</p>
                                <p className="text-gray-400 text-sm mt-1">{user.email}</p>
                            </div>
                        ))}
                        {selectedUser && (
                            <button
                                onClick={clearSelection}
                                className="p-4 rounded-lg border border-red-500 bg-red-900/20 hover:bg-red-900/30 cursor-pointer transition-all duration-200 text-red-400 font-medium"
                            >
                                {t('users.clear_selection')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
