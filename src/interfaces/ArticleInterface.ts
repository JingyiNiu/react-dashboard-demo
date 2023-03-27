export interface ArticleInterface {
    id?: React.Key | null | undefined;
    title: string;
    slug: string;
    content: string;
    created_at?: string | null;
    updated_at?: string | null;
}
