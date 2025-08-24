import { useEffect } from 'react';
import { usePostStore } from '../store/usePostStore';
import PostsTable from '../components/PostsTable';
import { useTranslation } from 'react-i18next';
import UserFilter from '../components/UserFilter';
import CreatePostButton from '../components/CreatePostButton';

const Posts = () => {
    const { loading, error, currentPage, postsPerPage, setCurrentPage } = usePostStore();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = t('posts.tab');
    }, [t]);

    const { filteredPosts } = usePostStore();

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    return (
        <div className="border border-gray-700 rounded-lg p-8 bg-gray-800">
            <div className="mb-4">
                <CreatePostButton />
            </div>

            <UserFilter />
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
