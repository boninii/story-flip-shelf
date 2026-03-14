import React, { useState } from "react";

import { Search, X } from "lucide-react";

import { CATEGORIES } from "@/data/types";

import { mock_books } from "@/data/mock_books";

import BookCard from "@/components/book_card";

const HomePage: React.FC = () => {
  const [search_query, set_search_query] = useState("");

  const [selected_category, set_selected_category] = useState<string | null>(null);

  const filtered_books = mock_books.filter((book) => {
    const matches_search =
      search_query === "" ||
      book.title.toLowerCase().includes(search_query.toLowerCase()) ||
      book.author.toLowerCase().includes(search_query.toLowerCase());

    const matches_category =
      !selected_category || book.category === selected_category;

    return matches_search && matches_category;
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border bg-secondary/50 py-16">
        <div className="container text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Descubra sua próxima <span className="text-primary">grande leitura</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Explore nossa coleção curada de livros. Compre, leia e mergulhe em novas histórias.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-lg">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={search_query}
              onChange={(e) => set_search_query(e.target.value)}
              className="w-full rounded-full border border-input bg-background py-3 pl-12 pr-10 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            {search_query && (
              <button
                onClick={() => set_search_query("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filter + Grid */}
      <section className="container py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => set_selected_category(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !selected_category
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            Todos
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                set_selected_category(selected_category === cat ? null : cat)
              }
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selected_category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered_books.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum livro encontrado.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {filtered_books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
