import React from "react";

import { Link, Navigate } from "react-router-dom";

import { BookOpen, Trash2 } from "lucide-react";

import { useAuth } from "@/contexts/auth_context";

import { mock_books } from "@/data/mock_books";

const BookshelfPage: React.FC = () => {
  const { is_authenticated, user, remove_from_bookshelf } = useAuth();

  if (!is_authenticated) {
    return <Navigate to="/login" replace />;
  }

  const owned_books = mock_books.filter(
    (b) => user?.bookshelf.includes(b.id)
  );

  return (
    <div className="container py-10">
      <h1 className="font-display text-3xl font-bold text-foreground">
        Minha Estante
      </h1>

      <p className="mt-2 text-muted-foreground">
        {owned_books.length} livro{owned_books.length !== 1 ? "s" : ""} na sua coleção
      </p>

      {owned_books.length === 0 ? (
        <div className="mt-16 text-center">
          <BookOpen className="mx-auto h-16 w-16 text-border" />

          <p className="mt-4 text-lg text-muted-foreground">
            Sua estante está vazia.
          </p>

          <Link
            to="/"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {owned_books.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary/50"
            >
              <img
                src={book.cover_url}
                alt={book.title}
                className="h-24 w-16 rounded-md object-cover book-shadow"
              />

              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {book.title}
                </h3>

                <p className="text-sm text-muted-foreground">{book.author}</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/reader/${book.id}`}
                  className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <BookOpen className="h-4 w-4" />
                  Ler
                </Link>

                <button
                  onClick={() => remove_from_bookshelf(book.id)}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookshelfPage;
