import { ArrowRight, FileText } from "lucide-react";
import { CompanyIcon } from "../CompanyIcon";
import { CopyEmail } from "../CopyEmail";
import { ActivityGrid } from "../ActivityGrid";
import type { Day } from "@/lib/api";
import { EMAIL, experience } from "@/lib/content";

export function HomeView({ github, leetcode }: { github: Day[]; leetcode: Day[] }) {
  return (
    <div className="view-inner home-v">
      <div className="hero-head">
        <div className="avatar">
          <img src="/avatar.jpg" alt="Monish Obaid" />
        </div>
        <div className="name-row">
          <h1 className="name">Monish Obaid</h1>
          <p className="subline">
            Software Developer
            <span className="sub-dot">·</span>Co-founder, Berri
            <span className="sub-dot">·</span>Still shipping
          </p>
        </div>
      </div>

      <div className="marker-sep">
        <span className="mark">✦</span>
      </div>

      <div className="bio">
        <p>
          Software developer based in Dublin, doing an MSc in Computing (AI, NLP) at Dublin
          City University and building products end-to-end: native macOS, web, React Native
          and the backend behind them. Lately most of that goes into{" "}
          <a href="https://berri.in" target="_blank" rel="noopener noreferrer" className="lnk">
            Berri
          </a>
          , an always-on-top workspace for notes, websites, screenshots and clipboard, one
          keystroke away.
        </p>
        <div className="dash" />
        <p>
          Right now I am in Dublin, going deeper into AI and NLP through the MSc, and{" "}
          <a href="#resume" data-view="resume" className="lnk">
            exploring opportunities around Dublin in AI
          </a>
          .
        </p>
      </div>

      <div className="section-sep" />

      <div className="exp-head">
        <span className="exp-label">Experience</span>
        <span className="exp-badge">
          <span className="exp-dot" />
          Open to work
        </span>
      </div>

      <div className="exp-list">
        <div className="exp-row exp-row--hand">
          <div className="exp-co">
            <span className="exp-ico exp-ico--ph" aria-hidden />
            <span className="exp-name exp-name--hand">Now?</span>
          </div>
          <span className="exp-role exp-role--hand">AI &amp; NLP, somewhere in Dublin</span>
          <span className="exp-mob exp-role--hand">AI &amp; NLP, somewhere in Dublin</span>
          <span className="exp-date">Available now</span>
        </div>

        {experience.map((e) => (
          <a
            key={`${e.company}-${e.date}`}
            className="exp-row exp-row--link"
            href={e.url ?? "#resume"}
            data-view={e.url ? undefined : "resume"}
            target={e.url ? "_blank" : undefined}
            rel={e.url ? "noopener noreferrer" : undefined}
          >
            <div className="exp-co">
              <CompanyIcon name={e.company} src={e.logo} domain={e.domain} />
              <span className="exp-name">{e.company}</span>
            </div>
            <span className="exp-role">{e.role}</span>
            <span className="exp-mob">{e.role}</span>
            <span className="exp-date">{e.date}</span>
          </a>
        ))}
      </div>

      <div className="cta-row">
        <a href="#resume" data-view="resume" className="btn primary">
          View resume <FileText />
        </a>
        <CopyEmail email={EMAIL} />
      </div>

      <div className="section-sep" />

      <div className="exp-head">
        <span className="exp-label">Work projects</span>
      </div>
      <a href="#work" data-view="work" className="wp-mini handles">
        <span className="wp-mini-img">
          <img src="/berri-shot.png" alt="Berri landing page" />
        </span>
        <span className="wp-mini-body">
          <span className="wp-mini-title">Berri · Less hunting. More doing.</span>
          <span className="wp-mini-desc">
            Always-on-top macOS workspace. 40+ active users, 30+ paying customers, one-time
            lifetime plan.
          </span>
          <span className="wp-mini-more">
            see the work <ArrowRight />
          </span>
        </span>
      </a>

      <div className="gh-row">
        <ActivityGrid days={github} label="GitHub activity" noun="contributions" />
        <ActivityGrid days={leetcode} label="LeetCode activity" noun="submissions" tone="amber" />
      </div>

      <div className="section-sep section-sep--flush" />
    </div>
  );
}
