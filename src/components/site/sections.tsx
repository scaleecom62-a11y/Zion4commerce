import { ArrowRight, Check, ChevronDown, Quote } from "lucide-react";
import Link from "next/link";
import type { Settings } from "@/lib/content/schema";
import { Calculator } from "./Calculator";
import { ContactForm } from "./ContactForm";
import { Icon } from "./Icon";
import { H, Pic, ed, field, img, link, list, num, str, type SectionProps } from "./shared";

/* ---------- building blocks ---------- */

function Btn({ href, children, variant = "primary", className = "" }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary" | "light" | "outline-light"; className?: string }) {
  const cls = `btn btn--${variant} ${className}`.trim();
  const inner = (
    <>
      {children}
      {variant === "primary" || variant === "light" ? <ArrowRight size={18} aria-hidden="true" /> : null}
    </>
  );
  return href.startsWith("/") && !href.startsWith("//") ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {inner}
    </a>
  );
}

function Head({ s, first, center, headingKey = "heading" }: { s: Settings; first: boolean; center?: boolean; headingKey?: string }) {
  const eyebrow = str(s, "eyebrow");
  const intro = str(s, "intro");
  return (
    <div className={`sec-head${center ? " sec-head--center" : ""}`} data-reveal>
      {eyebrow && (
        <p className="eyebrow" {...ed("eyebrow")}>
          {eyebrow}
        </p>
      )}
      <H first={first} className="h2" {...ed(headingKey)}>
        {str(s, headingKey)}
      </H>
      {intro && (
        <p className="lead" {...ed("intro")}>
          {intro}
        </p>
      )}
    </div>
  );
}

function Sec({ s, children, id, className = "" }: { s: Settings; children: React.ReactNode; id?: string; className?: string }) {
  return (
    <section id={id} className={`sec ${field(s, "field", "paper")} ${className}`.trim()}>
      <div className="container">{children}</div>
    </section>
  );
}

function Highlight({ text, word }: { text: string; word: string }) {
  if (!word || !text.includes(word)) return <>{text}</>;
  const i = text.indexOf(word);
  return (
    <>
      {text.slice(0, i)}
      <span className="hl">{word}</span>
      {text.slice(i + word.length)}
    </>
  );
}

/* ---------- hero ---------- */

function Dashboard({ s }: { s: Settings }) {
  const kpis = list<Settings>(s, "dashKpis");
  // Illustrative 6-month curve from the case study's start and end points ($50K → $192K).
  const rev = [50, 64, 88, 118, 152, 192];
  const tacos = [21, 19, 16, 14, 13, 12];
  const W = 460, Hh = 150, pad = 8;
  const x = (i: number) => pad + (i * (W - pad * 2)) / (rev.length - 1);
  const yr = (v: number) => Hh - pad - ((v - 40) / 160) * (Hh - pad * 2);
  const yt = (v: number) => Hh - pad - ((v - 8) / 16) * (Hh - pad * 2);
  const revPath = rev.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${yr(v).toFixed(1)}`).join(" ");
  const area = `${revPath} L${x(rev.length - 1)},${Hh} L${x(0)},${Hh} Z`;
  const tacosPath = tacos.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${yt(v).toFixed(1)}`).join(" ");
  return (
    <figure className="dash" aria-label={`${str(s, "dashTitle")}: ${str(s, "dashCaption")}`} data-ui>
      <div className="dash__top">
        <span className="dash__dot" aria-hidden="true" />
        <p className="dash__title" {...ed("dashTitle")}>
          {str(s, "dashTitle")}
        </p>
        <span className="chip">Client result</span>
      </div>
      <dl className="dash__kpis" {...ed("dashKpis")}>
        {kpis.map((k, i) => {
          const change = str(k, "change");
          return (
            <div key={i} className="dash__kpi">
              <dt>{str(k, "label")}</dt>
              <dd>
                <span className="dash__val nums">{str(k, "value")}</span>
                {change && <span className="dash__chg">{change}</span>}
              </dd>
            </div>
          );
        })}
      </dl>
      <div className="dash__chart">
        <div className="dash__legend" aria-hidden="true">
          <span>
            <i className="lg lg--rev" />
            Revenue
          </span>
          <span>
            <i className="lg lg--tacos" />
            TACoS
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${Hh}`} role="img" aria-label="Revenue rising from $50K to $192K a month while TACoS falls to 12%">
          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={W} y1={Hh * f} y2={Hh * f} className="dash__grid" />
          ))}
          <path d={area} className="dash__area" />
          <path d={revPath} className="dash__rev" />
          <path d={tacosPath} className="dash__tacos" />
        </svg>
        <div className="dash__months" aria-hidden="true">
          {["M1", "M2", "M3", "M4", "M5", "M6"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>
      <figcaption className="dash__cap" {...ed("dashCaption")}>
        {str(s, "dashCaption")}
      </figcaption>
    </figure>
  );
}

function Hero({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const p = link(s, "primary");
  const q = link(s, "secondary");
  const picture = img(s, "image");
  const showImage = str(s, "visual") === "image" && picture.src;
  return (
    <section className={`hero ${field(s, "field", "paper")}`}>
      <div className="container hero__grid">
        <div className="hero__copy">
          {str(s, "eyebrow") && (
            <p className="eyebrow eyebrow--chip" {...ed("eyebrow")}>
              {str(s, "eyebrow")}
            </p>
          )}
          <H first={isFirst} className="h1" {...ed("title")}>
            <Highlight text={str(s, "title")} word={str(s, "highlight")} />
          </H>
          <p className="hero__sub" {...ed("subtitle")}>
            {str(s, "subtitle")}
          </p>
          <div className="btn-row">
            {p.label && <Btn href={p.href}>{p.label}</Btn>}
            {q.label && (
              <Btn href={q.href} variant="secondary">
                {q.label}
              </Btn>
            )}
          </div>
          <ul className="badges" {...ed("badges")}>
            {list<string>(s, "badges").map((b, i) => (
              <li key={i}>
                <Check size={16} aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero__visual" data-reveal>
          {showImage ? (
            <div className="frame" {...ed("image")}>
              <Pic src={picture.src} alt={picture.alt} width={1200} height={900} sizes="(max-width: 960px) 100vw, 560px" priority />
            </div>
          ) : (
            <Dashboard s={s} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- content sections ---------- */

function Stats({ section }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`stats ${field(s, "field", "paper")}`} aria-label="Zion4Commerce in numbers">
      <div className="container">
        <dl className="stats__row card" {...ed("items")}>
          {list<Settings>(s, "items").map((it, i) => (
            <div key={i} className="stats__item" data-reveal style={{ ["--d" as string]: i }}>
              <dd className="stats__val nums">{str(it, "value")}</dd>
              <dt className="stats__label">{str(it, "label")}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function PillStrip({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`strip ${field(s, "field", "mist")}`}>
      <div className="container strip__inner">
        <H first={isFirst} className="strip__title" {...ed("heading")}>
          {str(s, "heading")}
        </H>
        <ul className="pills" {...ed("items")}>
          {list<string>(s, "items").map((t, i) => (
            <li key={i} className="pill" translate="no">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureGrid({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <Sec s={s} id="services">
      <Head s={s} first={isFirst} center />
      <ul className="grid-3">
        {list<Settings>(s, "items").map((it, i) => (
          <li key={i} className="card feature" data-field={`items.${i}`} data-reveal style={{ ["--d" as string]: i % 3 }}>
            <span className="icon-tile">
              <Icon name={str(it, "icon")} />
            </span>
            <h3 className="h3">{str(it, "title")}</h3>
            <p>{str(it, "text")}</p>
            {list<string>(it, "bullets").length > 0 && (
              <ul className="ticks">
                {list<string>(it, "bullets").map((b, j) => (
                  <li key={j}>
                    <Check size={16} aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Sec>
  );
}

function HaloDiagram() {
  const steps = [
    { t: "TikTok Shop", d: "Videos and creators create demand", icon: "shop" },
    { t: "Branded search", d: "Shoppers look you up on Amazon", icon: "search" },
    { t: "Organic rank", d: "Amazon ranks you higher", icon: "trend" },
    { t: "Lower TACoS", d: "Same sales, less ad spend", icon: "pie" },
  ];
  return (
    <ol className="halo card" aria-label="How the Halo Effect works">
      {steps.map((st, i) => (
        <li key={st.t} className="halo__step">
          <span className="icon-tile icon-tile--sm">
            <Icon name={st.icon} size={18} />
          </span>
          <div>
            <p className="halo__t">{st.t}</p>
            <p className="halo__d">{st.d}</p>
          </div>
          {i < steps.length - 1 && <ChevronDown className="halo__arrow" size={18} aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

function Split({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const picture = img(s, "image");
  const more = link(s, "link");
  const flip = s.flip === true;
  return (
    <Sec s={s}>
      <div className={`split${flip ? " split--flip" : ""}`}>
        <div className="split__copy" data-reveal>
          {str(s, "eyebrow") && (
            <p className="eyebrow" {...ed("eyebrow")}>
              {str(s, "eyebrow")}
            </p>
          )}
          <H first={isFirst} className="h2" {...ed("heading")}>
            {str(s, "heading")}
          </H>
          <p className="lead" {...ed("text")}>
            {str(s, "text")}
          </p>
          {list<string>(s, "bullets").length > 0 && (
            <ul className="ticks ticks--lg" {...ed("bullets")}>
              {list<string>(s, "bullets").map((b, j) => (
                <li key={j}>
                  <Check size={18} aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
          )}
          {more.label && (
            <Link className="text-link" href={more.href} {...ed("link")}>
              {more.label}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="split__visual" data-reveal style={{ ["--d" as string]: 1 }}>
          {str(s, "visual") === "halo" ? (
            <HaloDiagram />
          ) : picture.src ? (
            <div className="frame" {...ed("image")}>
              <Pic src={picture.src} alt={picture.alt} width={1200} height={800} sizes="(max-width: 960px) 100vw, 560px" />
            </div>
          ) : null}
        </div>
      </div>
    </Sec>
  );
}

function Steps({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <Sec s={s}>
      <Head s={s} first={isFirst} center />
      <ol className="grid-3 steps">
        {list<Settings>(s, "items").map((it, i) => (
          <li key={i} className="card step" data-field={`items.${i}`} data-reveal style={{ ["--d" as string]: i }}>
            <div className="step__top">
              <span className="step__num nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="icon-tile icon-tile--sm">
                <Icon name={str(it, "icon")} size={18} />
              </span>
            </div>
            <h3 className="h3">{str(it, "title")}</h3>
            <p>{str(it, "text")}</p>
          </li>
        ))}
      </ol>
    </Sec>
  );
}

function TacosCalculator({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <Sec s={s} id="calculator">
      <Calculator
        first={isFirst}
        eyebrow={str(s, "eyebrow")}
        heading={str(s, "heading")}
        intro={str(s, "intro")}
        currency={str(s, "currency", "USD")}
        sales={num(s, "sales", 120000)}
        spend={num(s, "spend", 30000)}
        target={num(s, "target", 15)}
        note={str(s, "note")}
      />
    </Sec>
  );
}

function CaseStudies({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <Sec s={s} id="results">
      <Head s={s} first={isFirst} center />
      <ul className="grid-3 cases">
        {list<Settings>(s, "cases").map((c, i) => {
          const logo = img(c, "image");
          const quote = str(c, "quote");
          return (
            <li key={i} className="card case" data-field={`cases.${i}`} data-reveal style={{ ["--d" as string]: i }}>
              <div className="case__head">
                {logo.src ? (
                  <Pic className="case__logo" src={logo.src} alt={logo.alt} width={320} height={104} sizes="160px" />
                ) : (
                  <p className="case__name">{str(c, "name")}</p>
                )}
                <p className="case__cat">{str(c, "category")}</p>
              </div>
              <h3 className="h3 case__headline">{str(c, "headline")}</h3>
              <p>{str(c, "text")}</p>
              {quote && (
                <blockquote className="case__quote">
                  <Quote size={18} aria-hidden="true" />
                  <p>{quote}</p>
                </blockquote>
              )}
              <dl className="case__metrics">
                {list<Settings>(c, "metrics").map((m, j) => (
                  <div key={j} className="metric">
                    <dt>{str(m, "label")}</dt>
                    <dd className="nums">{str(m, "value")}</dd>
                  </div>
                ))}
              </dl>
            </li>
          );
        })}
      </ul>
    </Sec>
  );
}

function Faq({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <Sec s={s} id="questions">
      <div className="faq">
        <Head s={s} first={isFirst} />
        <div className="faq__list">
          {list<Settings>(s, "items").map((it, i) => (
            <details key={i} className="faq__item" data-field={`items.${i}`} open={i === 0}>
              <summary>
                <span>{str(it, "q")}</span>
                <ChevronDown size={20} aria-hidden="true" className="faq__chev" />
              </summary>
              <p>{str(it, "a")}</p>
            </details>
          ))}
        </div>
      </div>
    </Sec>
  );
}

function CtaBand({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const p = link(s, "primary");
  const q = link(s, "secondary");
  return (
    <section className="sec sec--tight f-paper">
      <div className="container">
        <div className="cta" data-reveal>
          <div>
            <H first={isFirst} className="h2" {...ed("heading")}>
              {str(s, "heading")}
            </H>
            <p {...ed("text")}>{str(s, "text")}</p>
          </div>
          <div className="btn-row">
            {p.label && (
              <Btn href={p.href} variant="light">
                {p.label}
              </Btn>
            )}
            {q.label && (
              <Btn href={q.href} variant="outline-light">
                {q.label}
              </Btn>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PageIntro({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`pintro ${field(s, "field", "mist")}`}>
      <div className="container">
        {str(s, "eyebrow") && (
          <p className="eyebrow" {...ed("eyebrow")}>
            {str(s, "eyebrow")}
          </p>
        )}
        <H first={isFirst} className="h1 pintro__title" {...ed("title")}>
          {str(s, "title")}
        </H>
        <p className="lead pintro__lead" {...ed("sentence")}>
          {str(s, "sentence")}
        </p>
      </div>
    </section>
  );
}

function TeamGrid({ section, isFirst, data }: SectionProps) {
  const s = section.settings;
  return (
    <Sec s={s}>
      {(str(s, "heading") || str(s, "eyebrow")) && <Head s={s} first={isFirst} />}
      <ul className="team">
        {data.team.map((m, i) => {
          const initials = m.name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("");
          return (
            <li key={m.id} className="card member" data-reveal style={{ ["--d" as string]: i % 4 }}>
              <div className="member__pic">
                {m.photo ? (
                  <Pic src={m.photo} alt={`Portrait of ${m.name}`} width={400} height={400} sizes="96px" />
                ) : (
                  <span aria-hidden="true">{initials}</span>
                )}
              </div>
              <p className="member__name">{m.name}</p>
              <p className="member__role">{m.role}</p>
              {m.bio && <p className="member__bio">{m.bio}</p>}
              {m.linkedin && (
                <a className="text-link" href={m.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn<span className="sr-only"> profile of {m.name}</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </Sec>
  );
}

function ContactFormSection({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`sec contact ${field(s, "field", "mist")}`}>
      <div className="container contact__grid">
        <div className="contact__aside">
          {str(s, "eyebrow") && (
            <p className="eyebrow" {...ed("eyebrow")}>
              {str(s, "eyebrow")}
            </p>
          )}
          <H first={isFirst} className="h1" {...ed("heading")}>
            {str(s, "heading")}
          </H>
          <p className="lead" {...ed("intro")}>
            {str(s, "intro")}
          </p>
          <ol className="contact__steps" {...ed("steps")}>
            {list<string>(s, "steps").map((step, i) => (
              <li key={i}>
                <span className="contact__n nums">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="card contact__card">
          <ContactForm
            spendRanges={list<string>(s, "spendRanges")}
            services={list<string>(s, "services")}
            submitLabel={str(s, "submitLabel", "Send")}
            successHeading={str(s, "successHeading")}
            successText={str(s, "successText")}
          />
        </div>
      </div>
    </section>
  );
}

function RichText({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const blocks = str(s, "body")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <section className={`sec rtext ${field(s, "field", "paper")}`}>
      <div className="container container--narrow">
        <H first={isFirst} className="h1" {...ed("heading")}>
          {str(s, "heading")}
        </H>
        <div className="rtext__body" {...ed("body")}>
          {blocks.map((b, i) => {
            if (b.startsWith("## ")) {
              const [first, ...rest] = b.split("\n");
              return (
                <div key={i}>
                  <h2 className="h3">{first.slice(3)}</h2>
                  {rest.length > 0 && <p>{rest.join(" ")}</p>}
                </div>
              );
            }
            return <p key={i}>{b}</p>;
          })}
        </div>
      </div>
    </section>
  );
}

export const SECTION_COMPONENTS: Record<string, (p: SectionProps) => React.ReactNode> = {
  hero: Hero,
  stats: Stats,
  pill_strip: PillStrip,
  feature_grid: FeatureGrid,
  split: Split,
  steps: Steps,
  tacos_calculator: TacosCalculator,
  case_studies: CaseStudies,
  faq: Faq,
  cta_band: CtaBand,
  page_intro: PageIntro,
  team_grid: TeamGrid,
  contact_form: ContactFormSection,
  rich_text: RichText,
};

