import React, { useState, useEffect } from 'react';
import { useNotification } from '../hooks/useNotification';
import { useTranslation } from 'react-i18next';
import type { User } from '../types/user';
import { useUserStore } from '../store/useUserStore';
import { Link, useParams } from 'react-router-dom';

const Profile: React.FC = () => {
    const { selectedUser, users, isSuperUserSelected, updateUser } = useUserStore();
    const { id } = useParams();

    const { showNotification } = useNotification();
    const { t } = useTranslation();

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const displayUser = users.find((user) => user.id === Number(id));

    useEffect(() => {
        document.title = `${t('profile.profile')} | ${isSuperUserSelected ? 'Admin' : displayUser?.username}`;
    }, [displayUser?.username, isSuperUserSelected, t]);

    useEffect(() => {
        if (displayUser) {
            setEditedUser(displayUser);
            setIsEditing(false);
            setErrors({});
        }
    }, [displayUser]);

    if (displayUser && selectedUser) {
        const validateForm = () => {
            const newErrors: Record<string, string> = {};

            if (!editedUser?.name.trim()) {
                newErrors.name = t('profile.errors.name_required');
            }

            if (!editedUser?.username.trim()) {
                newErrors.username = t('profile.errors.username_required');
            }

            if (!editedUser?.email.trim()) {
                newErrors.email = t('profile.errors.email_required');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedUser.email)) {
                newErrors.email = t('profile.errors.email_invalid');
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        const handleSave = async () => {
            if (!editedUser || !validateForm()) return;

            try {
                await updateUser(editedUser);
                setIsEditing(false);
                showNotification(t('profile.update_success'), 'success');
            } catch {
                showNotification(t('profile.update_error'), 'error');
            }
        };

        const handleChange = (field: keyof User, value: string) => {
            if (editedUser) {
                setEditedUser({
                    ...editedUser,
                    [field]: value,
                });

                if (errors[field]) {
                    setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[field];
                        return newErrors;
                    });
                }
            }
        };

        const handleAddressChange = (field: keyof User['address'], value: string) => {
            if (editedUser) {
                setEditedUser({
                    ...editedUser,
                    address: {
                        ...editedUser.address,
                        [field]: value,
                    },
                });
            }
        };

        return (
            <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">
                        {isEditing ? t('profile.editing_profile') : t('profile.profile')}
                    </h1>

                    <div className="flex space-x-2">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setEditedUser(displayUser);
                                        setErrors({});
                                    }}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                                >
                                    {t('profile.cancel')}
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                                >
                                    {t('profile.save')}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium cursor-pointer"
                            >
                                {t('profile.edit')}
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {t('profile.name')}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser?.name || ''}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-700 border ${
                                        errors.name ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                            ) : (
                                <p className="text-white">{displayUser.name}</p>
                            )}
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {t('profile.username')}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser?.username || ''}
                                    onChange={(e) => handleChange('username', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-700 border ${
                                        errors.username ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                            ) : (
                                <p className="text-white">{displayUser.username}</p>
                            )}
                            {errors.username && (
                                <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {t('profile.email')}
                            </label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    value={editedUser?.email || ''}
                                    onChange={(e) => handleChange('email', e.target.value)}
                                    className={`w-full px-3 py-2 bg-gray-700 border ${
                                        errors.email ? 'border-red-500' : 'border-gray-600'
                                    } rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                />
                            ) : (
                                <p className="text-white">{displayUser.email}</p>
                            )}
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {t('profile.city')}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser?.address?.city || ''}
                                    onChange={(e) => handleAddressChange('city', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            ) : (
                                <p className="text-white">{displayUser.address?.city}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {t('profile.phone')}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser?.phone || ''}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            ) : (
                                <p className="text-white">{displayUser.phone}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                {t('profile.website')}
                            </label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editedUser?.website || ''}
                                    onChange={(e) => handleChange('website', e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            ) : (
                                <p className="text-white">{displayUser.website}</p>
                            )}
                        </div>
                    </div>
                </div>

                {isSuperUserSelected && (
                    <div className="mt-6">
                        <Link
                            to={'/profile'}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium"
                        >
                            ← {t('profile.back_to_users')}
                        </Link>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
            <h1 className="text-2xl font-bold text-white mb-4">{t('profile.no_user_selected')}</h1>
            <p className="text-gray-300">{t('profile.select_user_first')}</p>
        </div>
    );
};

export default Profile;
