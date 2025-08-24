import { useState } from 'react';
import { useUserStore } from '../store/useUserStore';
import { useTranslation } from 'react-i18next';
import CreatePost from './CreatePost';

const CreatePostButton = () => {
    const { selectedUser } = useUserStore();
    const { t } = useTranslation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsCreateModalOpen(true)}
                disabled={!selectedUser}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                    selectedUser
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 cursor-pointer'
                        : 'bg-gray-500 text-gray-300 cursor-default'
                }`}
            >
                {selectedUser ? t('posts.create_post') : t('posts.select_user_to_create')}
            </button>

            <CreatePost isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </>
    );
};

export default CreatePostButton;
