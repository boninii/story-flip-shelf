import React, { useState } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/data/types";
import { mock_books } from "@/data/mock_books";
import BookCard from "@/components/book_card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const HomePage: React.FC = () => {
  const [search_query, set_search_query] = useState("");
  const [selected_categories, set_selected_categories] = useState<string[]>([]);

  const toggle_category = (cat: string) => {
    set_selected_categories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filtered_books = mock_books.filter((book) => {
    const matches_search =
      search_query === "" ||
      book.title.toLowerCase().includes(search_query.toLowerCase()) ||
      book.author.toLowerCase().includes(search_query.toLowerCase());

    const matches_category =
      selected_categories.length === 0 || selected_categories.includes(book.category);

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

          {/* Search + Filter row */}
          <div className="relative mx-auto mt-8 flex max-w-2xl items-center gap-3">
            <div className="relative flex-1">
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-input bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                  Categorias
                  {selected_categories.length > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {selected_categories.length}
                    </span>
                  )}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {CATEGORIES.map((cat) => (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selected_categories.includes(cat)}
                    onCheckedChange={() => toggle_category(cat)}
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Active filter badges */}
          {selected_categories.length > 0 && (
            <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2">
              {selected_categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="secondary"
                  className="cursor-pointer gap-1 pl-3 pr-2 py-1"
                  onClick={() => toggle_category(cat)}
                >
                  {cat}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
              <button
                onClick={() => set_selected_categories([])}
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="container py-10">
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
