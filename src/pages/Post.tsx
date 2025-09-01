import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiPosts } from '../shared/api/posts';
import type { Post as PostType } from '../shared/types/post';
import type { Comment } from '../shared/types/post';
import { useTranslation } from 'react-i18next';
import Comments from '../entities/Comments';
import PostComponent from '../entities/PostComponent';
import { Button } from '@/shared/shadcn/button';

const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [post, setPost] = useState<PostType | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.title = `${t('post.title')}`;
    }, [t]);

    useEffect(() => {
        if (!id) return;

        const postId = parseInt(id, 10);

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [postData, postComments] = await Promise.all([
                    apiPosts.getPost(postId),
                    apiPosts.getCommentsByPostId(postId),
                ]);

                setPost(postData);
                setComments(postComments.sort((a, b) => b.id - a.id));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) return <div className="text-gray-400">{t('loading')}</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!post) return <div className="text-gray-400">{t('post.not_found')}</div>;

    return (
        <div className="border bg-card border-border rounded-lg p-8">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-foreground ml-2">{t('post.title')}:</h1>
                <Button
                    onClick={() => navigate(-1)}
                    variant="outline"
                >
                    {t('post.back')}
                </Button>
            </div>

            <PostComponent post={post} />

            <Comments comments={comments} setComments={setComments} />
        </div>
    );
};

export default Post;
