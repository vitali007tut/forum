export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
    order: number;
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};
