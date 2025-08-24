import { usePostStore } from '../store/usePostStore';
import { useUserStore } from '../store/useUserStore';
import { useNotification } from '../hooks/useNotification';
import { useTranslation } from 'react-i18next';
import type { Post } from '../types/post';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const PostCard = ({ post }: { post: Post }) => {
    const { orderPost, movePostUp, movePostDown, deletePost, posts } = usePostStore();
    const { isSuperUserSelected, selectedUser, users } = useUserStore();
    const { showNotification } = useNotification();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const isFirst = post.order === 1;
    const isLast = post.order === posts.length;

    const canDelete = isSuperUserSelected || (selectedUser !== null && selectedUser.id === post.userId);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const ok = await deletePost(post.id);
        if (ok) {
            showNotification(t('posts.delete_success'), 'success');
        } else {
            showNotification(t('posts.delete_error'), 'error');
        }
    };

    const handleOrderClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        orderPost(post.id);
    };

    const handleMoveUp = (e: React.MouseEvent) => {
        e.stopPropagation();
        movePostUp(post.id);
    };

    const handleMoveDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        movePostDown(post.id);
    };

    return (
        <div
            onClick={() => navigate(`/post/${post.id}`)}
            className="flex items-center justify-between border rounded-lg px-2 py-1 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer"
        >
            {isSuperUserSelected && (
                <div className="flex space-x-2 mr-3">
                    {!isFirst && (
                        <button
                            onClick={handleOrderClick}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Top
                        </button>
                    )}
                    {!isFirst && (
                        <button
                            onClick={handleMoveUp}
                            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            ↑
                        </button>
                    )}
                    {!isLast && (
                        <button
                            onClick={handleMoveDown}
                            className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            ↓
                        </button>
                    )}
                </div>
            )}

            <h3 className="flex-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    id: {post.id} | order: {post.order} | {users.find((x) => x.id === post.userId)?.username}{' '}
                </span>
                {post.title}
            </h3>

            {canDelete && (
                <button
                    onClick={handleDelete}
                >
                    <Trash2 className="w-6 h-6 text-gray-400 hover:text-red-500" />
                </button>
            )}
        </div>
    );
};

export default PostCard;
