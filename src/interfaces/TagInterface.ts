export interface TagInterface {
    id?: React.Key | null | undefined;
    name: string;
    slug: string;
    description: string;
    created_at?: string | null;
    updated_at?: string | null;
}
