export interface Post {
    id?: string
    user_id?: string;
    title: string;
    text: string;
    tags: string;
    created_at: Date;
}
