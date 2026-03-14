import React, { createContext, useContext, useState, useCallback } from "react";

import { UserProfile } from "@/data/types";

interface AuthContextType {
  user: UserProfile | null;

  is_authenticated: boolean;

  login: (email: string, password: string) => Promise<boolean>;

  register: (name: string, email: string, password: string) => Promise<boolean>;

  logout: () => void;

  add_to_bookshelf: (book_id: string) => void;

  remove_from_bookshelf: (book_id: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, set_user] = useState<UserProfile | null>(null);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));

    set_user({
      id: "user_1",
      name: email.split("@")[0],
      email,
      bookshelf: ["1", "3"],
    });

    return true;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 800));

    set_user({
      id: "user_1",
      name,
      email,
      bookshelf: [],
    });

    return true;
  }, []);

  const logout = useCallback(() => {
    set_user(null);
  }, []);

  const add_to_bookshelf = useCallback((book_id: string) => {
    set_user((prev) => {
      if (!prev) return prev;

      if (prev.bookshelf.includes(book_id)) return prev;

      return { ...prev, bookshelf: [...prev.bookshelf, book_id] };
    });
  }, []);

  const remove_from_bookshelf = useCallback((book_id: string) => {
    set_user((prev) => {
      if (!prev) return prev;

      return { ...prev, bookshelf: prev.bookshelf.filter((id) => id !== book_id) };
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        is_authenticated: !!user,
        login,
        register,
        logout,
        add_to_bookshelf,
        remove_from_bookshelf,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
