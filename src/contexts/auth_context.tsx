import React, { createContext, useContext, useState, useCallback } from "react";
import { UserProfile, AuthorRequest, BookSubmission, BookSubmissionStatus, AuthorRequestStatus } from "@/data/types";

interface AuthContextType {
  user: UserProfile | null;
  is_authenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  update_profile: (data: Partial<UserProfile>) => void;
  add_to_bookshelf: (book_id: string) => void;
  remove_from_bookshelf: (book_id: string) => void;
  // Author requests
  author_requests: AuthorRequest[];
  submit_author_request: (reason: string) => void;
  update_author_request: (id: string, status: AuthorRequestStatus) => void;
  // Book submissions
  book_submissions: BookSubmission[];
  submit_book: (book: Omit<BookSubmission, "id" | "author_id" | "author_name" | "status" | "created_at">) => void;
  update_book_submission: (id: string, status: BookSubmissionStatus) => void;
  // Admin
  all_users: UserProfile[];
  toggle_user_active: (user_id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const MOCK_USERS: UserProfile[] = [
  { id: "user_1", name: "Admin", email: "admin@livraria.com", phone: "(11) 99999-0000", address: "Rua Principal, 100, São Paulo", avatar_url: "", bookshelf: ["1", "3"], role: "admin", is_active: true },
  { id: "user_2", name: "Maria Silva", email: "maria@email.com", phone: "(21) 98888-1111", address: "Av. Brasil, 200, Rio de Janeiro", avatar_url: "", bookshelf: ["2"], role: "user", is_active: true },
  { id: "user_3", name: "João Autor", email: "joao@email.com", phone: "(31) 97777-2222", address: "Rua das Letras, 50, BH", avatar_url: "", bookshelf: [], role: "author", is_active: true },
  { id: "user_4", name: "Ana Costa", email: "ana@email.com", phone: "(41) 96666-3333", address: "Rua Flores, 75, Curitiba", avatar_url: "", bookshelf: ["1", "5"], role: "user", is_active: false },
];

const MOCK_AUTHOR_REQUESTS: AuthorRequest[] = [
  { id: "ar_1", user_id: "user_2", user_name: "Maria Silva", user_email: "maria@email.com", reason: "Sou escritora independente e gostaria de publicar meus contos.", status: "pending", created_at: "2026-03-10" },
];

const MOCK_BOOK_SUBMISSIONS: BookSubmission[] = [
  { id: "bs_1", author_id: "user_3", author_name: "João Autor", title: "Crônicas do Amanhecer", synopsis: "Uma coletânea de crônicas sobre a vida urbana.", category: "Ficção", cover_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop", pages: ["Capítulo 1\n\nO sol nasceu diferente naquela manhã...", "A cidade acordava lentamente..."], price: 29.9, status: "pending", created_at: "2026-03-12" },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, set_user] = useState<UserProfile | null>(null);
  const [all_users, set_all_users] = useState<UserProfile[]>(MOCK_USERS);
  const [author_requests, set_author_requests] = useState<AuthorRequest[]>(MOCK_AUTHOR_REQUESTS);
  const [book_submissions, set_book_submissions] = useState<BookSubmission[]>(MOCK_BOOK_SUBMISSIONS);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const found = MOCK_USERS.find((u) => u.email === email);
    if (found) {
      set_user(found);
    } else {
      set_user({
        id: "user_new",
        name: email.split("@")[0],
        email,
        phone: "",
        address: "",
        avatar_url: "",
        bookshelf: [],
        role: "user",
        is_active: true,
      });
    }
    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));
    const new_user: UserProfile = {
      id: `user_${Date.now()}`,
      name,
      email,
      phone: "",
      address: "",
      avatar_url: "",
      bookshelf: [],
      role: "user",
      is_active: true,
    };
    set_user(new_user);
    set_all_users((prev) => [...prev, new_user]);
    return true;
  }, []);

  const logout = useCallback(() => set_user(null), []);

  const update_profile = useCallback((data: Partial<UserProfile>) => {
    set_user((prev) => prev ? { ...prev, ...data } : prev);
  }, []);

  const add_to_bookshelf = useCallback((book_id: string) => {
    set_user((prev) => {
      if (!prev || prev.bookshelf.includes(book_id)) return prev;
      return { ...prev, bookshelf: [...prev.bookshelf, book_id] };
    });
  }, []);

  const remove_from_bookshelf = useCallback((book_id: string) => {
    set_user((prev) => {
      if (!prev) return prev;
      return { ...prev, bookshelf: prev.bookshelf.filter((id) => id !== book_id) };
    });
  }, []);

  const submit_author_request = useCallback((reason: string) => {
    if (!user) return;
    const request: AuthorRequest = {
      id: `ar_${Date.now()}`,
      user_id: user.id,
      user_name: user.name,
      user_email: user.email,
      reason,
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    };
    set_author_requests((prev) => [...prev, request]);
  }, [user]);

  const update_author_request = useCallback((id: string, status: AuthorRequestStatus) => {
    set_author_requests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
    if (status === "approved") {
      const req = author_requests.find((r) => r.id === id);
      if (req) {
        set_all_users((prev) =>
          prev.map((u) => (u.id === req.user_id ? { ...u, role: "author" } : u))
        );
        set_user((prev) => (prev && prev.id === req.user_id ? { ...prev, role: "author" } : prev));
      }
    }
  }, [author_requests]);

  const submit_book = useCallback((book: Omit<BookSubmission, "id" | "author_id" | "author_name" | "status" | "created_at">) => {
    if (!user) return;
    const submission: BookSubmission = {
      ...book,
      id: `bs_${Date.now()}`,
      author_id: user.id,
      author_name: user.name,
      status: "pending",
      created_at: new Date().toISOString().split("T")[0],
    };
    set_book_submissions((prev) => [...prev, submission]);
  }, [user]);

  const update_book_submission = useCallback((id: string, status: BookSubmissionStatus) => {
    set_book_submissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  }, []);

  const toggle_user_active = useCallback((user_id: string) => {
    set_all_users((prev) =>
      prev.map((u) => (u.id === user_id ? { ...u, is_active: !u.is_active } : u))
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        is_authenticated: !!user,
        login,
        register,
        logout,
        update_profile,
        add_to_bookshelf,
        remove_from_bookshelf,
        author_requests,
        submit_author_request,
        update_author_request,
        book_submissions,
        submit_book,
        update_book_submission,
        all_users,
        toggle_user_active,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
