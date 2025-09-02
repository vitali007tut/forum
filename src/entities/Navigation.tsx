import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../shared/model/useUserStore';
import { NavLink } from '@/shared/ui/NavLink';

const Navigation: React.FC = () => {
    const { t } = useTranslation();
    const { selectedUser, isSuperUserSelected } = useUserStore();

    const favoriteCount = selectedUser?.favoritePostIds?.length ?? 0;

    return (
        <nav className="flex space-x-8">
            <NavLink to="/">{t('navigation.select')}</NavLink>
            <NavLink to="/posts">{t('navigation.posts')}</NavLink>

            {selectedUser && (
                <>
                    <NavLink
                        to={isSuperUserSelected ? '/profile' : '/profile/$id'}
                        params={{ id: String(selectedUser.id) }}
                    >
                        {t('navigation.profile')}
                    </NavLink>

                    {favoriteCount > 0 && (
                        <NavLink to="/favorites">
                            {t('navigation.favorites')}
                            <span className="ml-1 h-5 w-5 text-xs bg-primary-foreground text-primary border border-border rounded-full flex justify-center">
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
