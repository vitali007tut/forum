import React from 'react';
import type { Post } from '../types/post';

interface PostComponentProps {
    post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
    return (
        <div className="border rounded-lg p-4 mb-6 shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h2>
            <p className="text-gray-700 dark:text-gray-300">{post.body}</p>
        </div>
    );
};

export default PostComponent;
