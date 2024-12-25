export type Article = {
  id: string
  content : string
  title: string
}

export interface ArticleResponse {
  page: number;
  per_page: number;
  is_next: boolean;
  data: Article[];
}