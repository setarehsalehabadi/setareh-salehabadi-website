export interface ResearchArticle {
  id: string;

  slug: string;

  title: string;

  content: string;

  description?: string;

  excerpt?: string;

  category?: string;

  research_id?: string;

  status?: string;

  date?: string;

  readingTime?: string;

  source?: string;
}