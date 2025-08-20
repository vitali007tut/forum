import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navigation: React.FC = () => {
    const { t } = useTranslation();

    return (
        <nav className="flex space-x-8">
            <NavLink
                to="/"
                className={({ isActive }) => `navLink ${isActive ? 'activeLink' : 'inactiveLink'}`}
            >
                {t('navigation.home')}
            </NavLink>
            <NavLink
                to="/posts"
                className={({ isActive }) => `navLink ${isActive ? 'activeLink' : 'inactiveLink'}`}
            >
                {t('navigation.posts')}
            </NavLink>
        </nav>
    );
};

export default Navigation;
