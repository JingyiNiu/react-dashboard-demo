export interface ArticleInterface {
    id: React.Key | null | undefined;
    title: String;
    slug: String;
    content: String;
    created_at: String;
    updated_at: String | null;
}
