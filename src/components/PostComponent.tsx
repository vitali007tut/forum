import React from 'react';
import type { Post } from '../types/post';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface PostComponentProps {
    post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
    const { selectedUser, toggleFavorite } = useUserStore();

    const isFavorite = selectedUser?.favoritePostIds?.includes(post.id);

    return (
        <>
            <div className="border rounded-lg p-4 mb-6 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h2>
                <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
            </div>
            {selectedUser && (
                <div className="flex gap-2">
                    <button onClick={() => toggleFavorite(post.id)}>
                        <Star
                            className={`ml-2 w-6 h-6 cursor-pointer ${
                                isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'
                            }`}
                        />
                    </button>
                    <button>
                        <ThumbsUp className={`text-gray-400`} />
                    </button>
                    <button>
                        <ThumbsDown className={`text-gray-400`} />
                    </button>
                </div>
            )}
        </>
    );
};

export default PostComponent;
