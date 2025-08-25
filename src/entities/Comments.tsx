import React, { useState } from 'react';
import type { Comment } from '../shared/types/post';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../shared/model/useUserStore';

interface CommentsProps {
    comments: Comment[];
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const Comments: React.FC<CommentsProps> = ({ comments, setComments }) => {
    const { t } = useTranslation();
    const { selectedUser } = useUserStore();

    const [name, setName] = useState('');
    const [body, setBody] = useState('');

    const handleAddComment = () => {
        if (!selectedUser || !name.trim() || !body.trim()) return;

        const newComment: Comment = {
            id: comments.length ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
            postId: comments[0]?.postId ?? 0,
            name,
            email: selectedUser.email,
            body,
        };

        setComments([newComment, ...comments]);
        setName('');
        setBody('');
    };

    return (
        <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2 ml-1.5 text-gray-800 dark:text-gray-200">
                {`${t('post.comments')} (${comments.length}):`}
            </h3>

            {selectedUser ? (
                <div className="mb-4 space-y-2">
                    <input
                        type="text"
                        placeholder={t('post.comment_name') || 'Name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <textarea
                        placeholder={t('post.comment_body') || 'Comment'}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                    <button
                        onClick={handleAddComment}
                        disabled={!name.trim() || !body.trim()}
                        className="px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 cursor-pointer disabled:cursor-default"
                    >
                        {t('post.add_comment')}
                    </button>
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {t('post.select_user_to_comment') || 'Select a user to add a comment'}
                </p>
            )}

            {comments.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400">{t('post.no_comments')}</p>
            )}

            <div className="space-y-4 border rounded-lg p-3 bg-gray-100 dark:bg-gray-900 dark:border-gray-600">
                {comments.map((comment) => (
                    <div key={comment.id}>
                        <p className="text-gray-900 dark:text-white font-medium">{comment.name}</p>
                        <p className="text-gray-500 dark:text-indigo-400 text-sm">{comment.email}</p>
                        <p className="text-gray-700 dark:text-gray-200">{comment.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
