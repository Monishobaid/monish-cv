"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Home, Briefcase, User, FileText, BookOpen } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";
import { Code2 } from "lucide-react";

export type ViewKey = "home" | "work" | "about" | "resume" | "reading";

const NAV: { key: ViewKey; label: string; Icon: typeof Home }[] = [
  { key: "home", label: "home", Icon: Home },
  { key: "work", label: "work projects", Icon: Briefcase },
  { key: "about", label: "about", Icon: User },
  { key: "resume", label: "resume", Icon: FileText },
  { key: "reading", label: "reading", Icon: BookOpen },
];

const isView = (s: string): s is ViewKey => NAV.some((n) => n.key === s);

const clockFmt = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "Europe/Dublin",
});

function Socials({ className = "social" }: { className?: string }) {
  return (
    <>
      <a href="https://www.linkedin.com/in/monish-o-35176917b/" target="_blank" rel="noopener noreferrer" className={className} aria-label="LinkedIn">
        <LinkedInIcon size={20} />
      </a>
      <a href="https://github.com/Monishobaid" target="_blank" rel="noopener noreferrer" className={className} aria-label="GitHub">
        <GitHubIcon size={20} />
      </a>
      <a href="https://leetcode.com/u/monishobaid/" target="_blank" rel="noopener noreferrer" className={className} aria-label="LeetCode">
        <Code2 size={20} />
      </a>
    </>
  );
}

export function Shell({ views }: { views: Record<ViewKey, ReactNode> }) {
  const [view, setView] = useState<ViewKey>("home");
  const [time, setTime] = useState("--:--");
  const mainRef = useRef<HTMLElement>(null);

  // hash <-> view
  useEffect(() => {
    const read = () => {
      const h = window.location.hash.replace("#", "");
      setView(isView(h) ? h : "home");
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const go = useCallback((key: ViewKey) => {
    if (window.location.hash !== `#${key}`) {
      history.pushState(null, "", `#${key}`);
    }
    setView(key);
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, []);

  // expose for in-content links (e.g. "View resume")
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[data-view]") as HTMLAnchorElement | null;
      if (!a) return;
      const key = a.dataset.view ?? "";
      if (isView(key)) {
        e.preventDefault();
        go(key);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [go]);

  // clock
  useEffect(() => {
    const tick = () => setTime(clockFmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const idx = NAV.findIndex((n) => n.key === view);

  return (
    <>
      {/* Mobile header */}
      <header className="m-header">
        <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); go("home"); }}>
          <img src="/avatar.jpg" alt="" className="logo" />
          hello you!
        </a>
        <div className="m-actions">
          <div className="m-socials">
            <Socials />
          </div>
          <span className="m-sep" />
          <ThemeToggle />
        </div>
      </header>

      <div className="app">
        {/* ── Sidebar ── */}
        <aside className="panel sidebar">
          <div className="side-head">
            <a href="#home" className="brand" onClick={(e) => { e.preventDefault(); go("home"); }}>
              <img src="/avatar.jpg" alt="Monish Obaid" className="logo" />
              hello you!
            </a>
          </div>
          <div className="side-dash" />

          <nav className="nav" aria-label="Sections">
            <span
              className="nav-highlight"
              style={{ transform: `translateY(${idx * 40}px)` }}
              aria-hidden
            />
            {NAV.map((n) => (
              <button
                key={n.key}
                type="button"
                className={`nav-item${view === n.key ? " active" : ""}`}
                onClick={() => go(n.key)}
                aria-current={view === n.key ? "page" : undefined}
              >
                {n.label}
                {n.key === "reading" && <BookOpen />}
              </button>
            ))}
          </nav>

          <div className="side-foot">
            <div className="socials">
              <Socials />
            </div>
            <div className="foot-dash" />
            <div className="foot-meta">
              <span className="clock" suppressHydrationWarning>
                {time}
              </span>
              <span className="loc">Dublin, IRELAND</span>
            </div>
            <p className="credit">
              design inspired by{" "}
              <a href="https://www.heybhaskar.com/" target="_blank" rel="noopener noreferrer">
                heybhaskar.com
              </a>
            </p>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="panel main" ref={mainRef}>
          <div className="main-top">
            <div className="status">
              <span className="status-avail">Open to AI roles · Dublin</span>
              <span className="status-sep">·</span>
              <span className="status-role">
                Software <span className="dim">(product)</span> Developer
              </span>
            </div>
            <ThemeToggle />
          </div>

          <section className="view" key={view}>
            {views[view]}
          </section>
          <p className="credit credit--mobile">
            design inspired by{" "}
            <a href="https://www.heybhaskar.com/" target="_blank" rel="noopener noreferrer">
              heybhaskar.com
            </a>
          </p>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="bottom-nav" aria-label="Sections">
        {NAV.map(({ key, label, Icon }) => (
          <button
            key={key}
            type="button"
            className={`bnav-item${view === key ? " active" : ""}`}
            onClick={() => go(key)}
            aria-label={label}
          >
            <Icon />
            <span className="bnav-label">{label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
