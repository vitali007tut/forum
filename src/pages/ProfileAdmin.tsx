import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';
import { Link, useNavigate } from 'react-router-dom';

export const ProfileAdmin = () => {
    const { users, isSuperUserSelected } = useUserStore();
    const { t } = useTranslation();
    const navigate = useNavigate();

    if (!isSuperUserSelected) navigate("/");

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                <h1 className="text-2xl font-bold text-white mb-6">{t('profile.user_management')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <Link
                            key={user.id}
                            to={`${user.id}`}
                            className="p-4 rounded-lg border border-gray-600 bg-gray-700/30 hover:border-indigo-400 hover:bg-gray-700/50 cursor-pointer transition-all duration-200"
                        >
                            <h3 className="font-semibold text-white">{user.username}</h3>
                            <p className="text-gray-300 text-sm">{user.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
