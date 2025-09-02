import { useTranslation } from 'react-i18next';
import { usePostStore } from '../shared/model/usePostStore';
import { useUserStore } from '../shared/model/useUserStore';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

const Favorites = () => {
    const { selectedUser } = useUserStore();
    const { posts } = usePostStore();
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `${t('navigation.favorites')}`;
    }, [t]);

    if (!selectedUser) {
        return <div className="p-6 text-center text-card-foreground">{t('header.no_user')}</div>;
    }

    const favoritePosts = posts.filter((p) => selectedUser.favoritePostIds?.includes(p.id));

    if (favoritePosts.length === 0) {
        return <div className="p-6 text-center text-card-foreground">{t('posts.no_favorites')}</div>;
    }

    return (
        <div className="border bg-card border-border rounded-lg p-8  list-none">
            {favoritePosts.map((post) => (
                <li
                    key={post.id}
                    onClick={() => navigate({ from: '/post/$id', params: { id: String(post.id) } })}
                    className="text-center text-xl font-semibold mb-2 ml-1.5 text-card-foreground cursor-pointer hover:underline"
                >
                    {post.title}
                </li>
            ))}
        </div>
    );
};

export default Favorites;
