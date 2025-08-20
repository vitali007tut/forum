import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../hooks/useUser';

const Navigation: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser } = useUser();

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
                    to="/profile"
                    className={({ isActive }) => `navLink ${isActive ? 'activeLink' : 'inactiveLink'}`}
                >
                    {t('profile.title')}
                </NavLink>
            )}
        </nav>
    );
};

export default Navigation;
