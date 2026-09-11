"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}
const getTheme = () =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
const getServerTheme = () => "unknown" as const;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  if (theme === "unknown") return <div className="theme-toggle-placeholder" />;
  const dark = theme === "dark";

  const set = (next: "light" | "dark") => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      <span className="tt-thumb" aria-hidden />
      <button
        type="button"
        className={`tt-btn${!dark ? " active" : ""}`}
        onClick={() => set("light")}
        aria-label="Light mode"
        aria-pressed={!dark}
      >
        <Sun />
      </button>
      <button
        type="button"
        className={`tt-btn${dark ? " active" : ""}`}
        onClick={() => set("dark")}
        aria-label="Dark mode"
        aria-pressed={dark}
      >
        <Moon />
      </button>
    </div>
  );
}
