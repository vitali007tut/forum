import { useState, useRef, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';
import { usePostStore } from '../store/usePostStore';
import { apiPosts } from '../api/posts';
import { useTranslation } from 'react-i18next';
import { useNotification } from '../hooks/useNotification';

interface CreatePostProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreatePost = ({ isOpen, onClose }: CreatePostProps) => {
    const { selectedUser } = useUserStore();
    const { addPost } = usePostStore();
    const { t } = useTranslation();
    const { showNotification } = useNotification();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (!selectedUser || !title.trim() || !body.trim()) return;

        setLoading(true);
        try {
            const response = await apiPosts.createPost({
                title,
                body,
                userId: selectedUser.id,
                order: 0
            });

            addPost({ ...response });

            showNotification(t('posts.create_success'), 'success');
            onClose();
            setTitle('');
            setBody('');
        } catch {
            showNotification(t('posts.create_error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    const isDisabled = loading || !title.trim() || !body.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[3px]">
            <div
                ref={modalRef}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-gray-800 shadow-md relative border border-gray-700"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 cursor-pointer"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4 text-center text-white">
                    {t('posts.create_post')}
                </h2>

                <input
                    type="text"
                    placeholder={t('posts.title')}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white"
                />

                <textarea
                    placeholder={t('posts.body')}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                    className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:text-white"
                />

                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`px-4 py-2 bg-green-600 text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50 ${
                            !isDisabled && 'hover:bg-green-700 cursor-pointer'
                        }`}
                    >
                        {loading ? t('posts.creating') : t('posts.create')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
