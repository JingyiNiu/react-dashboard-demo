export interface ArticleInterface {
    id?: React.Key | null | undefined;
    title: string;
    slug: string;
    content: string;
    is_public: number;
    sort_order: number;
    tags: [];
    created_at?: string | null;
    updated_at?: string | null;
}

export const initialArticleData: ArticleInterface = {
    title: '',
    slug: '',
    content: '',
    is_public: 0,
    sort_order: 9,
    tags: [],
};