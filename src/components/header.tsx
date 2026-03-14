import React from "react";

import { Link, useLocation } from "react-router-dom";

import { BookOpen, User, LogOut, Search } from "lucide-react";

import { useAuth } from "@/contexts/auth_context";

const Header: React.FC = () => {
  const { is_authenticated, user, logout } = useAuth();

  const location = useLocation();

  const is_reader = location.pathname.startsWith("/reader");

  if (is_reader) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-primary" />

          <span className="font-display text-xl font-bold text-foreground">
            Livraria Nova
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Catálogo
          </Link>

          {is_authenticated ? (
            <>
              <Link
                to="/bookshelf"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Minha Estante
              </Link>

              <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5">
                <User className="h-4 w-4 text-primary" />

                <span className="text-sm font-medium">{user?.name}</span>
              </div>

              <button
                onClick={logout}
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
