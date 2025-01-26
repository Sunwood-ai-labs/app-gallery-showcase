export interface Author {
  id: string;
  name: string;
  username: string;
  image: string;
}

export interface Space {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  url: string;
  category: string;
  author: Author;
  clicks: number;
  daysAgo: number;
  runtime: string;
  gradient?: string;
  visibility?: string;
  createdAt?: Date;
}
