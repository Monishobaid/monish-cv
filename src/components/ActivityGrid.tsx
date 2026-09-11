import type { Day } from "@/lib/api";

/**
 * 90-day contribution grid, 7 rows (Sun..Sat) flowing by column.
 * Server-safe: pure markup, no hooks.
 */
export function ActivityGrid({
  days,
  label,
  noun,
  tone = "green",
}: {
  days: Day[];
  label: string;
  noun: string;
  tone?: "green" | "amber";
}) {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setUTCDate(start.getUTCDate() - 89);
  // pad to the previous Sunday so columns line up as weeks
  const lead = start.getUTCDay();

  const cells: (Day | null)[] = [];
  for (let i = 0; i < lead; i++) cells.push(null);
  let total = 0;
  for (let i = 0; i < 90; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    const key = d.toISOString().slice(0, 10);
    const row = byDate.get(key) ?? { date: key, count: 0, level: 0 };
    total += row.count;
    cells.push(row);
  }

  return (
    <div className="gh-activity">
      <div className="gh-label">{label}</div>
      <div className="gh-scroll">
        <div className={`gh-chart${tone === "amber" ? " gh-chart--amber" : ""}`} role="img" aria-label={`${total} ${noun} in the last 90 days`}>
          {cells.map((c, i) =>
            c ? (
              <span
                key={c.date}
                className="gh-cell"
                data-level={c.level}
                title={`${c.count} on ${c.date}`}
              />
            ) : (
              <span key={`pad-${i}`} className="gh-cell" style={{ visibility: "hidden" }} />
            )
          )}
        </div>
      </div>
      <div className="gh-caption">
        {total} {noun} in the last 90 days
      </div>
    </div>
  );
}
