import React from "react";

import { Book } from "@/data/types";

import { Link } from "react-router-dom";

import { Star } from "lucide-react";

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link
      to={`/book/${book.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:-translate-y-1 book-shadow hover:book-shadow-hover"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={book.cover_url}
          alt={book.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-semibold backdrop-blur-sm">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {book.rating}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-xs font-medium uppercase tracking-wider text-accent">
          {book.category}
        </span>

        <h3 className="font-display text-base font-semibold leading-tight text-foreground line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-muted-foreground">{book.author}</p>

        <p className="mt-auto pt-2 font-body text-lg font-bold text-primary">
          R$ {book.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;
