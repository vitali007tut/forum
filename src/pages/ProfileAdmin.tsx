import { useTranslation } from 'react-i18next';
import { useUserStore } from '../shared/model/useUserStore';
import { useEffect } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

export const ProfileAdmin = () => {
    const { users, isSuperUserSelected } = useUserStore();
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${t('profile.user_management')}`;
    }, [t]);

    if (!isSuperUserSelected) navigate({from: '/'});

    return (
        <div className="border border-border rounded-lg p-8 bg-card">
            <h1 className="text-2xl font-bold text-card-foreground mb-6">{t('profile.user_management')}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user) => (
                    <Link
                        key={user.id}
                        to="/profile/$id"
                        className="p-4 rounded-lg border border-border bg-secondary hover:border-chart-2 hover:bg-secondary/50 cursor-pointer transition-all duration-200"
                        params={{ id: String(user.id) }}
                    >
                        <h3 className="font-semibold text-card-foreground">{user.username}</h3>
                        <p className="text-card-foreground/50 text-sm">{user.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
