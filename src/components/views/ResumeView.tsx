import { Mail } from "lucide-react";
import { CompanyIcon } from "../CompanyIcon";
import { ActivityGrid } from "../ActivityGrid";
import type { Day } from "@/lib/api";
import { EMAIL, experience, education, resumeSkills, honours } from "@/lib/content";

export function ResumeView({ github, leetcode }: { github: Day[]; leetcode: Day[] }) {
  return (
    <div className="view-inner">
      <div className="rx-head">
        <h2 className="rx-name">Monish Obaid</h2>
        <a href={`mailto:${EMAIL}`} className="btn primary small">
          Email me <Mail />
        </a>
      </div>
      <p className="rx-intro">
        Software developer and co-founder, currently in Dublin doing an MSc in Computing (AI,
        NLP) at Dublin City University and exploring AI roles around Dublin. 2+ years shipping
        production software across macOS, web and React Native. I take products from idea to paying customers: Berri went
        from a personal tool to 40+ active users and 30+ lifetime customers, and I own its
        app, site, billing and support.
      </p>
      <div className="chips rx-skills">
        {resumeSkills.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>

      <div className="section-sep" />

      <div className="rx-timeline">
        {experience.map((e, i) => (
          <div key={`${e.company}-${e.date}`} className={`rx-item${i === experience.length - 1 ? " rx-item--last" : ""}`}>
            <CompanyIcon name={e.company} src={e.logo} domain={e.domain} variant="rx" />
            <div className="rx-co">
              <span className="rx-coname">{e.company}</span>
              <span className="rx-dot">·</span>
              <span className="rx-type">{e.type}</span>
            </div>
            <div className="rx-role">{e.role}</div>
            <div className="rx-meta">
              {e.date}
              <span className="rx-dot">·</span>
              {e.location}
              {e.duration && (
                <>
                  <span className="rx-dot">·</span>
                  {e.duration}
                </>
              )}
            </div>
            <ul className="rx-points">
              {e.points.map((p) => (
                <li key={p.text}>
                  {p.lead && <strong>{p.lead}: </strong>}
                  {p.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section-sep" />

      <div className="rx-section">Education</div>
      <div className="rx-edu-list">
        {education.map((ed) => (
          <div key={ed.school} className="rx-edu">
            <span className="rx-edu-logo">
              <img src={ed.logo} alt={ed.school} />
            </span>
            <div className="rx-edu-body">
              <div className="rx-coname">{ed.school}</div>
              <div className="rx-role">{ed.degree}</div>
              <div className="rx-meta">
                {ed.date}
                <span className="rx-dot">·</span>
                {ed.location}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-sep" />

      <div className="rx-section">Honours &amp; publications</div>
      <div className="rx-timeline">
        {honours.map((h, i) => (
          <div key={h.title} className={`rx-item${i === honours.length - 1 ? " rx-item--last" : ""}`}>
            <span className="rx-ico rx-ico--mono" style={{ background: h.color }}>
              {h.mono}
            </span>
            <div className="rx-co">
              <span className="rx-coname">{h.org}</span>
              <span className="rx-dot">·</span>
              <span className="rx-type">{h.type}</span>
            </div>
            <div className="rx-role">{h.title}</div>
            <div className="rx-meta">{h.meta}</div>
          </div>
        ))}
      </div>

      <div className="section-sep" />

      <div className="gh-row">
        <ActivityGrid days={github} label="GitHub activity" noun="contributions" />
        <ActivityGrid days={leetcode} label="LeetCode activity" noun="submissions" tone="amber" />
      </div>

      <div className="section-sep section-sep--flush" />
    </div>
  );
}
