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

export type UserRole = "user" | "author" | "admin";
export type AuthorRequestStatus = "pending" | "approved" | "rejected";
export type BookSubmissionStatus = "pending" | "approved" | "rejected";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar_url: string;
  bookshelf: string[];
  role: UserRole;
  is_active: boolean;
}

export interface AuthorRequest {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  reason: string;
  status: AuthorRequestStatus;
  created_at: string;
}

export interface BookSubmission {
  id: string;
  author_id: string;
  author_name: string;
  title: string;
  synopsis: string;
  category: string;
  cover_url: string;
  pages: string[];
  price: number;
  status: BookSubmissionStatus;
  created_at: string;
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
