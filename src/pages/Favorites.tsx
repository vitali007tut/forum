import { useTranslation } from 'react-i18next';
import { usePostStore } from '../shared/model/usePostStore';
import { useUserStore } from '../shared/model/useUserStore';
import { useNavigate } from 'react-router-dom';
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
        return <div className="p-6 text-center text-gray-600 dark:text-gray-300">{t('header.no_user')}</div>;
    }

    const favoritePosts = posts.filter((p) => selectedUser.favoritePostIds?.includes(p.id));

    if (favoritePosts.length === 0) {
        return (
            <div className="p-6 text-center text-gray-600 dark:text-gray-300">{t('posts.no_favorites')}</div>
        );
    }

    return (
        <div className="border border-gray-700 rounded-lg p-8 bg-gray-800 list-none">
            {favoritePosts.map((post) => (
                <li
                    key={post.id}
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="text-center text-xl font-semibold mb-2 ml-1.5 text-gray-800 dark:text-gray-200 cursor-pointer hover:underline"
                >
                    {post.title}
                </li>
            ))}
        </div>
    );
};

export default Favorites;
