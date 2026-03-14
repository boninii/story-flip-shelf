import React, { useRef, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import HTMLFlipBook from "react-pageflip";

import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

import { mock_books } from "@/data/mock_books";

interface PageProps {
  children: React.ReactNode;
  number: number;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children, number }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col justify-between overflow-hidden bg-[hsl(40,33%,95%)] p-8 shadow-inner"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="flex-1 overflow-y-auto font-body text-sm leading-relaxed text-foreground/90 whitespace-pre-line">
          {children}
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          — {number} —
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

const ReaderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const book_ref = useRef<any>(null);

  const [current_page, set_current_page] = useState(0);

  const book = mock_books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Livro não encontrado.</p>
      </div>
    );
  }

  const all_pages = [
    `${book.title}\n\npor ${book.author}`,
    ...book.pages,
    "— Fim —\n\nObrigado por ler!",
  ];

  const total_pages = all_pages.length;

  const handle_prev = () => {
    book_ref.current?.pageFlip()?.flipPrev();
  };

  const handle_next = () => {
    book_ref.current?.pageFlip()?.flipNext();
  };

  const on_flip = (e: any) => {
    set_current_page(e.data);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(24,10%,15%)]">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border/20 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>

        <h2 className="font-display text-sm font-medium text-foreground/80">
          {book.title}
        </h2>

        <span className="text-xs text-muted-foreground">
          {current_page + 1} / {total_pages}
        </span>
      </div>

      {/* Book */}
      <div className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="relative">
          {/* @ts-ignore - react-pageflip type issues */}
          <HTMLFlipBook
            ref={book_ref}
            width={400}
            height={550}
            size="stretch"
            minWidth={280}
            maxWidth={500}
            minHeight={400}
            maxHeight={600}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={on_flip}
            className="page-flip-container"
            style={{}}
            startPage={0}
            drawShadow={true}
            flippingTime={600}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            maxShadowOpacity={0.5}
            showPageCorners={true}
            disableFlipByClick={false}
            useMouseEvents={true}
            swipeDistance={30}
            clickEventForward={true}
          >
            {all_pages.map((content, idx) => (
              <Page key={idx} number={idx + 1}>
                {idx === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <h2 className="font-display text-2xl font-bold text-foreground">
                      {book.title}
                    </h2>

                    <p className="mt-4 text-muted-foreground">por {book.author}</p>
                  </div>
                ) : (
                  content
                )}
              </Page>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 border-t border-border/20 px-4 py-4">
        <button
          onClick={handle_prev}
          disabled={current_page === 0}
          className="flex items-center gap-1 rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/40 disabled:opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </button>

        <button
          onClick={handle_next}
          disabled={current_page >= total_pages - 1}
          className="flex items-center gap-1 rounded-lg bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/40 disabled:opacity-30"
        >
          Próxima
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ReaderPage;
