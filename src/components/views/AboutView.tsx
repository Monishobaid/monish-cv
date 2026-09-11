import { ActivityGrid } from "../ActivityGrid";
import type { Day } from "@/lib/api";
import { skills } from "@/lib/content";

type Book = { title?: string; cover?: string | null; author?: string; link?: string };

export function AboutView({ github, leetcode, books }: { github: Day[]; leetcode: Day[]; books: Book[] }) {
  const covers = books.filter((b) => b.cover).slice(0, 4);

  return (
    <div className="view-inner">
      <div className="about-head">
        <h2 className="about-title">hey! I&apos;m Monish.</h2>
        <p className="about-sub">what is this, my portfolio?</p>
      </div>

      <div className="about-strip">
        <div className="about-track">
          <div className="about-item handles">
            <img src="/avatar.jpg" alt="Monish" />
          </div>
          <div className="about-item about-item--sher handles">
            <p>sab hamāre liye zanjīr liye phirte haiñ</p>
            <p>ham sar-e-zulf-e-girah-gīr liye phirte haiñ</p>
            <small>a sher I have no business quoting, but do</small>
          </div>
          <div className="about-item handles">
            <img src="/berri-shot.png" alt="Berri landing page" />
          </div>
          {covers.map((b) => (
            <a key={b.title} className="about-item handles" href={b.link} target="_blank" rel="noopener noreferrer">
              <img src={b.cover!} alt={b.title ?? ""} />
            </a>
          ))}
        </div>
      </div>

      <div className="about-copy">
        <p className="about-line">
          developer by day 🌞 and <span className="about-em">Berri’s entire support team</span> post the 6:30 cycle 🌘
        </p>
        <p className="about-line about-em">(def not a unicorn yet 🦄)</p>
      </div>

      <div className="section-sep" />

      <div className="about-story">
        <h3 className="about-role">
          engineer turned builder <span className="about-role-em">(turning “owner”)</span>
        </h3>
        <p className="about-body">greetings, visitors! 👋</p>
        <p className="about-body">
          I studied computer science at NIET in Greater Noida and spent college on the usual
          mix: competitive programming, a policy competition final, a hackathon award. My
          first real job was at FuelBuddy, first as an apprentice doing UI, then full-time
          owning the driver app and everything around it, and moving the customer app from
          Vue 3 to React Native.
        </p>
        <p className="about-body">
          Then I co-founded Berri. It started as the tool I wanted on my own Mac and turned
          into a product with paying customers. That changed how I think about code: it is
          only done when someone pays for it and keeps using it.
        </p>
        <p className="about-body">
          Now I am in Dublin, doing an MSc in Computing at DCU with a focus on AI and NLP,
          running Berri from a different time zone, and exploring opportunities around
          Dublin where I can go deeper into AI and NLP.
        </p>
      </div>

      <div className="section-sep" />

      <div className="about-grid">
        <div className="about-grid-media">
          {covers.slice(0, 2).map((b) => (
            <img key={b.title} className="book handles" src={b.cover!} alt={b.title ?? ""} />
          ))}
        </div>
        <div className="about-grid-copy">
          <h3 className="about-grid-title">books, films and beyond</h3>
          <p className="about-body">
            In my downtime I read more than I ship. The shelf on this site is live from
            Goodreads, so whatever is there is what I am actually reading, not what I wish I
            was. Chekhov, partition-era memoirs and Urdu poetry show up a lot.
          </p>
          <p className="about-body">
            Otherwise I watch films like it is a second job, keep a LeetCode streak alive for
            no good reason, and collect sher I have no business quoting. Swap a book
            recommendation with me and we are friends.
          </p>
        </div>
      </div>

      <div className="section-sep" />

      <div className="skills">
        <span className="gh-label">Craft &amp; build</span>
        <div className="chips">
          {skills.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="gh-row">
        <ActivityGrid days={github} label="GitHub activity" noun="contributions" />
        <ActivityGrid days={leetcode} label="LeetCode activity" noun="submissions" tone="amber" />
      </div>

      <div className="section-sep section-sep--flush" />
    </div>
  );
}
