"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Book = {
  title?: string;
  link?: string;
  cover?: string | null;
  author?: string;
  rating?: string;
  avgRating?: string;
  published?: string;
};

const PAGE_SIZE = 6;

export function BookPaginator({
  currentlyReading,
  readBooks,
}: {
  currentlyReading: Book[];
  readBooks: Book[];
}) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(readBooks.length / PAGE_SIZE);
  const visible = readBooks.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <div className="book-paginator">
      {/* Currently reading */}
      {currentlyReading.length > 0 && (
        <div className="currently-reading-section">
          <p className="shelf-label">currently reading</p>
          <div className="books-row">
            {currentlyReading.map((book, i) => (
              <BookCard key={i} book={book} size="large" />
            ))}
          </div>
        </div>
      )}

      {/* Read shelf */}
      {readBooks.length > 0 && (
        <div className="read-section">
          <div className="shelf-header">
            <p className="shelf-label">read</p>
            {totalPages > 1 && (
              <div className="pagination-arrows">
                <button
                  className="arrow-btn"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="page-indicator">{page + 1} / {totalPages}</span>
                <button
                  className="arrow-btn"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
          <div className="books-grid">
            {visible.map((book, i) => (
              <BookCard key={`${page}-${i}`} book={book} size="small" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BookCard({ book, size }: { book: Book; size: "large" | "small" }) {
  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`book-card book-card--${size}`}
      title={`${book.title} by ${book.author}`}
    >
      <div className="book-cover-wrap">
        {book.cover ? (
          <img src={book.cover} alt={book.title ?? ""} className="book-cover" />
        ) : (
          <div className="book-cover-fallback">
            <span>{book.title?.substring(0, 24)}</span>
          </div>
        )}
        {book.rating && book.rating !== "0" && (
          <div className="book-rating">★ {book.rating}</div>
        )}
      </div>
      <p className="book-title">{book.title}</p>
      <p className="book-author">{book.author}</p>
    </a>
  );
}
