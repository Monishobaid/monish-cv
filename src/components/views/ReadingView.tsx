import { BookPaginator } from "../BookPaginator";
import { ActivityGrid } from "../ActivityGrid";
import type { Day } from "@/lib/api";

type Book = {
  title?: string;
  link?: string;
  cover?: string | null;
  author?: string;
  rating?: string;
};

export function ReadingView({
  currentlyReading,
  readBooks,
  github,
  leetcode,
}: {
  currentlyReading: Book[];
  readBooks: Book[];
  github: Day[];
  leetcode: Day[];
}) {
  return (
    <div className="view-inner">
      <div className="about-head">
        <h2 className="about-title">reading</h2>
        <p className="about-sub">
          live from{" "}
          <a
            href="https://www.goodreads.com/user/show/199476200-monish-obaid"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Goodreads
          </a>
          , so this is what I am actually reading
        </p>
      </div>

      <div className="section-sep" />

      {currentlyReading.length === 0 && readBooks.length === 0 ? (
        <p className="about-body">Goodreads is not answering right now. Check back in a bit.</p>
      ) : (
        <BookPaginator currentlyReading={currentlyReading} readBooks={readBooks} />
      )}

      <div className="section-sep" />
      <div className="gh-row">
        <ActivityGrid days={github} label="GitHub activity" noun="contributions" />
        <ActivityGrid days={leetcode} label="LeetCode activity" noun="submissions" tone="amber" />
      </div>
      <div className="section-sep section-sep--flush" />
    </div>
  );
}
