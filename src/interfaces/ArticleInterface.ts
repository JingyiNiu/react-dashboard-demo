export interface ArticleInterface {
    id?: React.Key | null | undefined;
    slug: string;
    sort_order: number;
    is_public: number;
    title: string;
    content: string;
    title_zh: string;
    content_zh: string;
    tags: [];
    created_at?: string | null;
    updated_at?: string | null;
}

export const initialArticleData: ArticleInterface = {
    slug: '',
    sort_order: 9,
    is_public: 0,
    title: '',
    content: '',
    title_zh: '',
    content_zh: '',
    tags: [],
};