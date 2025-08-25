import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../shared/model/useUserStore';

const Navigation: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser, isSuperUserSelected } = useUserStore();

    const favoriteCount = selectedUser?.favoritePostIds?.length ?? 0;

    return (
        <nav className="flex space-x-8">
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `navLink ${isActive ? 'activeLink' : 'inactiveLink'} ${
                        isSuperUserSelected ? 'border-yellow-600' : 'border-indigo-500'
                    }`
                }
            >
                {t('navigation.select')}
            </NavLink>
            <NavLink
                to="/posts"
                className={({ isActive }) =>
                    `navLink ${isActive ? 'activeLink' : 'inactiveLink'} ${
                        isSuperUserSelected ? 'border-yellow-600' : 'border-indigo-500'
                    }`
                }
            >
                {t('navigation.posts')}
            </NavLink>
            {selectedUser && (
                <>
                    <NavLink
                        to={isSuperUserSelected ? '/profile' : `/profile/${selectedUser.id}`}
                        className={({ isActive }) =>
                            `navLink ${isActive ? 'activeLink' : 'inactiveLink'} ${
                                isSuperUserSelected ? 'border-yellow-600' : 'border-indigo-500'
                            }`
                        }
                    >
                        {t('navigation.profile')}
                    </NavLink>
                    {favoriteCount > 0 && (
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                `navLink ${isActive ? 'activeLink' : 'inactiveLink'} relative ${
                                    isSuperUserSelected ? 'border-yellow-600' : 'border-indigo-500'
                                }`
                            }
                        >
                            {t('navigation.favorites')}
                            <span className="ml-1 px-2 py-0.5 h-5 w-5 text-xs bg-blue-500 text-white rounded-full flex justify-center">
                                {favoriteCount}
                            </span>
                        </NavLink>
                    )}
                </>
            )}
        </nav>
    );
};

export default Navigation;
