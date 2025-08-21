import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';

const Navigation: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser, isSuperUserSelected } = useUserStore();

    return (
        <nav className="flex space-x-8">
            <NavLink
                to="/"
                className={({ isActive }) => `navLink ${isActive ? 'activeLink' : 'inactiveLink'}`}
            >
                {t('navigation.select')}
            </NavLink>
            <NavLink
                to="/posts"
                className={({ isActive }) => `navLink ${isActive ? 'activeLink' : 'inactiveLink'}`}
            >
                {t('navigation.posts')}
            </NavLink>
            {selectedUser && (
                <NavLink
                    to={isSuperUserSelected ? '/profile' : `/profile/${selectedUser.id}`}
                    className={({ isActive }) => `navLink ${isActive ? 'activeLink' : 'inactiveLink'}`}
                >
                    {t('navigation.profile')}
                </NavLink>
            )}
        </nav>
    );
};

export default Navigation;
