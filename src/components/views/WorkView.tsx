import { ArrowRight } from "lucide-react";
import { ActivityGrid } from "../ActivityGrid";
import type { Day } from "@/lib/api";

export function WorkView({ github, leetcode }: { github: Day[]; leetcode: Day[] }) {
  return (
    <div className="view-inner view-inner--wide">
      {/* ── Berri ── */}
      <article className="wp-card handles">
        <div className="wp-body">
          <div className="wp-co">
            <span className="exp-ico">
              <img src="/berri-logo.png" alt="" />
            </span>
            Berri
          </div>
          <h2 className="wp-title">Less hunting. More doing.</h2>
          <p className="wp-desc">
            An always-on-top macOS workspace for notes, websites, screenshots and clipboard.
            One keystroke to bring it up, one to hide it while you share your screen.
          </p>
          <div className="wp-dash" />
          <div className="wp-stats-row">
            <div className="wp-stat-col">
              <div className="wp-stat">
                <span className="wp-stat-num">30+</span>
                <span className="wp-badge wp-badge--purple">Paying customers</span>
              </div>
              <p className="wp-stat-desc">On a one-time $20 lifetime plan, no subscriptions</p>
            </div>
            <div className="wp-stat-col">
              <div className="wp-stat">
                <span className="wp-stat-num">40+</span>
                <span className="wp-badge wp-badge--green">Active users</span>
              </div>
              <p className="wp-stat-desc">Daily users across the free and lifetime tiers</p>
            </div>
          </div>
          <div className="wp-cta-wrap">
            <a href="https://berri.in" target="_blank" rel="noopener noreferrer" className="btn primary">
              open berri.in <ArrowRight />
            </a>
          </div>
        </div>
        <div className="wp-media">
          <div className="wp-img">
            <img src="/berri-shot.png" alt="Berri landing page" />
          </div>
        </div>
      </article>

      <div className="section-sep" />

      {/* ── TS Logix WMS ── */}
      <article className="wp-card handles">
        <div className="wp-body">
          <div className="wp-co">
            <span className="exp-ico">TS</span>
            TS Logix
          </div>
          <h2 className="wp-title">Warehouse management for a Peru-based logistics client</h2>
          <p className="wp-desc">
            A full warehouse management system built for TS Logix in Peru: inbound and
            outbound flows, stock tracking, and a bilingual English and Spanish interface for
            the floor and the office. Live and operational today.
          </p>
          <div className="wp-dash" />
          <div className="wp-stats-row">
            <div className="wp-stat-col">
              <div className="wp-stat">
                <span className="wp-stat-num">Live</span>
                <span className="wp-badge wp-badge--green">In production</span>
              </div>
              <p className="wp-stat-desc">Running the client&apos;s daily warehouse operations</p>
            </div>
            <div className="wp-stat-col">
              <div className="wp-stat">
                <span className="wp-stat-num">EN / ES</span>
                <span className="wp-badge">Bilingual</span>
              </div>
              <p className="wp-stat-desc">Built for Spanish-speaking floor staff and English-speaking ops</p>
            </div>
          </div>
          <div className="wp-cta-wrap">
            <a href="https://www.tslwms.pe/" target="_blank" rel="noopener noreferrer" className="btn primary">
              open tslwms.pe <ArrowRight />
            </a>
          </div>
        </div>
        <div className="wp-media">
          <div className="wp-img">
            <img src="/tsl-shot.png" alt="TS Logix warehouse management system login" />
          </div>
        </div>
      </article>

      <div className="section-sep" />

      {/* ── JSON parser ── */}
      <article className="wp-card handles">
        <div className="wp-body">
          <div className="wp-co">
            <span className="exp-ico">{"{}"}</span>
            json-parser
          </div>
          <h2 className="wp-title">A JSON parser written from scratch in Python</h2>
          <p className="wp-desc">
            No libraries, no regex shortcuts. A hand-written lexer turns raw text into tokens
            and a recursive-descent parser turns tokens into Python values. Built to
            understand how parsers actually work, not to replace the standard library.
          </p>
          <div className="wp-dash" />
          <div className="wp-stats-row">
            <div className="wp-stat-col">
              <div className="wp-stat">
                <span className="wp-stat-num">0</span>
                <span className="wp-badge">Dependencies</span>
              </div>
              <p className="wp-stat-desc">Pure Python: lexer, tokens, parser</p>
            </div>
            <div className="wp-stat-col">
              <div className="wp-stat">
                <span className="wp-stat-num">2</span>
                <span className="wp-badge wp-badge--purple">Stages</span>
              </div>
              <p className="wp-stat-desc">Tokenise, then recursive descent</p>
            </div>
          </div>
          <div className="wp-cta-wrap">
            <a
              href="https://github.com/Monishobaid/json-parser"
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary"
            >
              view on github <ArrowRight />
            </a>
          </div>
        </div>
        <div className="wp-media">
          <div className="wp-img">
            <div className="mock mock--json">
              <span className="c"># json_parser/lexer.py</span>
              <span>
                <span className="k">text</span> = <span className="s">{'\'{"active": true, "n": 21}\''}</span>
              </span>
              <span>
                <span className="k">tokens</span> = Lexer(text).tokenize()
              </span>
              <span className="t">LBRACE STRING COLON TRUE COMMA</span>
              <span className="t">STRING COLON NUMBER RBRACE</span>
              <span className="c" style={{ marginTop: 10 }}># json_parser/parser.py</span>
              <span>
                <span className="k">result</span> = parse(text)
              </span>
              <span>
                {"{"}<span className="s">&apos;active&apos;</span>: True, <span className="s">&apos;n&apos;</span>:{" "}
                <span className="n">21</span>{"}"}
              </span>
            </div>
          </div>
        </div>
      </article>

      <div className="section-sep" />
      <div className="gh-row">
        <ActivityGrid days={github} label="GitHub activity" noun="contributions" />
        <ActivityGrid days={leetcode} label="LeetCode activity" noun="submissions" tone="amber" />
      </div>
      <div className="section-sep section-sep--flush" />
    </div>
  );
}
