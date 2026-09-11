"use client";

import { useState } from "react";

/**
 * Company mark. Local image when given, else the site's favicon,
 * else initials. `variant` picks the size class family.
 */
export function CompanyIcon({
  name,
  src,
  domain,
  variant = "exp",
}: {
  name: string;
  src?: string;
  domain?: string;
  variant?: "exp" | "rx";
}) {
  const [failed, setFailed] = useState(false);
  const base = variant === "rx" ? "rx-ico" : "exp-ico";
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (src) {
    return (
      <span className={base}>
        <img src={src} alt="" />
      </span>
    );
  }
  if (domain && !failed) {
    return (
      <span className={`${base} ${base}--favicon`}>
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
          alt=""
          onError={() => setFailed(true)}
        />
      </span>
    );
  }
  return (
    <span className={`${base} ${variant === "rx" ? "rx-ico--mono" : ""}`} aria-hidden>
      {initials}
    </span>
  );
}
