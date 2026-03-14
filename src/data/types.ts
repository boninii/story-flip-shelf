export interface Book {
  id: string;

  title: string;

  author: string;

  synopsis: string;

  price: number;

  cover_url: string;

  category: string;

  pages: string[];

  rating: number;
}

export interface UserProfile {
  id: string;

  name: string;

  email: string;

  bookshelf: string[];
}

export const CATEGORIES = [
  "Ficção",
  "Romance",
  "Fantasia",
  "Terror",
  "Autoajuda",
  "Negócios",
  "Ciência",
  "História",
] as const;
