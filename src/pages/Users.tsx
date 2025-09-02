import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../shared/model/useUserStore';

function Users() {
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

    useEffect(() => {
        document.title = `${t('users.forum_users')}`;
    }, [t]);

    if (loading) {
        return (
            <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                <p className="text-gray-300">{t('users.loading')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                <p className="text-red-400">
                    {t('users.error')}: {error}
                </p>
            </div>
        );
    }

    const isUserSelected = (userId: number) => {
        return selectedUser?.id === userId && !isSuperUserSelected;
    };

    return (
        <div className="border bg-card border-border rounded-lg p-8 ">
            <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div
                        onClick={selectSuperUser}
                        className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            isSuperUserSelected
                                ? 'border-chart-1 bg-chart-1/10 shadow-lg shadow-chart-1/20'
                                : 'border-border bg-secondary/30 hover:border-chart-1/80 hover:bg-secondary/50'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-chart-1/20 flex items-center justify-center">
                                <span className="text-chart-1 font-bold text-lg">★</span>
                            </div>
                            <div className="ml-4">
                                <h3 className="font-bold text-primary">{t('users.super_admin')}</h3>
                                <p className="text-primary/80 text-sm">admin</p>
                                <p className="text-primary/50 text-sm mt-1">{t('users.full_access')}</p>
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
                                    ? 'border-chart-2 bg-chart-2/20 shadow-lg'
                                    : 'border-border bg-secondary/30 hover:border-chart-2/50 hover:bg-secondary/20'
                            }`}
                        >
                            <h3 className="font-semibold text-primary">{user.name}</h3>
                            <p className="text-primary/80 text-sm">{user.username}</p>
                            <p className="text-primary/50 text-sm mt-1">{user.email}</p>
                        </div>
                    ))}
                    {selectedUser && (
                        <button
                            onClick={clearSelection}
                            className="p-4 rounded-lg border border-destructive bg-destructive/20 hover:bg-destructive/30 cursor-pointer transition-all duration-200 text-destructive font-medium"
                        >
                            {t('users.clear_selection')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;
