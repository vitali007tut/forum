import { useState } from 'react';
import { useUserStore } from '../shared/model/useUserStore';
import { useTranslation } from 'react-i18next';
import CreatePost from './CreatePost';
import { Button } from '@/shared/shadcn/button';

const CreatePostButton = () => {
    const { selectedUser } = useUserStore();
    const { t } = useTranslation();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsCreateModalOpen(true)}
                disabled={!selectedUser}
                variant='outline'
                className={`px-4 py-2 text-sm font-medium rounded-md`}
            >
                {selectedUser ? t('posts.create_post') : t('posts.select_user_to_create')}
            </Button>

            <CreatePost isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
        </>
    );
};

export default CreatePostButton;
