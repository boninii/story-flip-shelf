import React from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import { ArrowLeft, ShoppingCart, BookOpen, Star } from "lucide-react";

import { mock_books } from "@/data/mock_books";

import { useAuth } from "@/contexts/auth_context";

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { is_authenticated, user, add_to_bookshelf } = useAuth();

  const book = mock_books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-lg text-muted-foreground">Livro não encontrado.</p>
      </div>
    );
  }

  const is_owned = user?.bookshelf.includes(book.id) ?? false;

  const handle_buy = () => {
    if (!is_authenticated) {
      navigate("/login");
      return;
    }

    add_to_bookshelf(book.id);
  };

  const handle_read = () => {
    navigate(`/reader/${book.id}`);
  };

  return (
    <div className="container py-8">
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar ao catálogo
      </Link>

      <div className="grid gap-10 md:grid-cols-[320px_1fr]">
        {/* Cover */}
        <div className="book-shadow overflow-hidden rounded-xl">
          <img
            src={book.cover_url}
            alt={book.title}
            className="aspect-[2/3] w-full object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            {book.category}
          </span>

          <h1 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">
            {book.title}
          </h1>

          <p className="mt-1 text-lg text-muted-foreground">por {book.author}</p>

          <div className="mt-3 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(book.rating)
                    ? "fill-accent text-accent"
                    : "text-border"
                }`}
              />
            ))}

            <span className="ml-2 text-sm text-muted-foreground">{book.rating}</span>
          </div>

          <p className="mt-6 max-w-xl leading-relaxed text-foreground/90">
            {book.synopsis}
          </p>

          <p className="mt-6 font-display text-3xl font-bold text-primary">
            R$ {book.price.toFixed(2)}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {is_owned ? (
              <button
                onClick={handle_read}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <BookOpen className="h-4 w-4" />
                Ler agora
              </button>
            ) : (
              <button
                onClick={handle_buy}
                className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <ShoppingCart className="h-4 w-4" />
                Comprar
              </button>
            )}

            {is_owned && (
              <span className="flex items-center rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-muted-foreground">
                ✓ Na sua estante
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
