import React from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/post';

interface PostsTableProps {
    posts: Post[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    postsPerPage: number;
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

const PostsTable: React.FC<PostsTableProps> = ({
    posts,
    loading,
    error,
    currentPage,
    postsPerPage,
    totalPages,
    setCurrentPage,
}) => {
    if (loading) return <div className="p-4">Loading posts...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="">
            <div className="grid grid-cols-1 gap-1">
                {currentPosts.length > 0 ? (
                    currentPosts.map((post) => <PostCard key={post.id} post={post} />)
                ) : (
                    <div className="p-4 text-center text-gray-400">No posts found.</div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
                    <nav className="inline-flex rounded-md shadow">
                        <button
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-2 rounded-l-md border ${
                                currentPage === 1
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-default'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                            }`}
                        >
                            <span>&#128896;</span>
                        </button>
                        {[...Array(totalPages)].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => setCurrentPage(pageNum)}
                                    className={`px-3 py-2 border-t border-b ${
                                        currentPage === pageNum
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                                    }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}
                        <button
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-2 rounded-r-md border ${
                                currentPage === totalPages
                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-default'
                                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer'
                            }`}
                        >
                            <span>&#128898;</span>
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default PostsTable;
