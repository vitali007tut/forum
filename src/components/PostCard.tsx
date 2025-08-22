import type { Post } from '../types/post';

const PostCard = ({ post }: { post: Post }) => {
    return (
        <div className="border rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-gray-900 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Post ID: {post.id} | User ID: {post.userId}{' '}
                </span>
                {post.title}
            </h3>
        </div>
    );
};

export default PostCard;
