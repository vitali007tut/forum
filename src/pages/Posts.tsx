import { useEffect } from 'react';
import { usePostStore } from '../store/usePostStore';
import PostsTable from '../components/PostsTable';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';

const Posts = () => {
    const { loading, error, currentPage, postsPerPage, setCurrentPage, filterByUser } = usePostStore();

    const { selectedUser } = useUserStore();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('posts.title');
    }, [t]);

    useEffect(() => {
        if (selectedUser) {
            filterByUser(selectedUser.id);
        } else {
            filterByUser(null);
        }
    }, [selectedUser, filterByUser]);

    const { filteredPosts } = usePostStore();

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
            <PostsTable
                posts={filteredPosts}
                loading={loading}
                error={error}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Posts;
