import Link from "next/link";
import type { Settings } from "@/lib/content/schema";
import { Calculator } from "./Calculator";
import { ContactForm } from "./ContactForm";
import { H, Pic, RidgeArt, ed, field, img, link, list, num, str, type SectionProps } from "./shared";

function Btn({ href, children, variant, className, ...rest }: { href: string; children: React.ReactNode; variant?: "ink"; className?: string } & React.HTMLAttributes<HTMLAnchorElement>) {
  const cls = `btn${variant ? ` btn--${variant}` : ""}${className ? ` ${className}` : ""}`;
  if (href.startsWith("/") && !href.startsWith("//")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {children}
    </a>
  );
}

function HeroWaterline({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const lines = [str(s, "line1"), str(s, "line2")];
  const action = link(s, "action");
  return (
    <section className="hero-w">
      <div className="hero-w__field hero-w__field--top" />
      <div className={`hero-w__field hero-w__field--bottom ${field(s, "lower", "orange")}`} />
      <div className="hero-w__copy">
        <H first={isFirst} className="hero-w__h display">
          {lines.map((l, i) => (
            <span key={i} className="hero-w__line">
              <span style={{ ["--i" as string]: i }} {...ed(i === 0 ? "line1" : "line2")}>
                {l}
              </span>
            </span>
          ))}
        </H>
      </div>
      <div className="hero-w__foot">
        <p {...ed("sentence")}>{str(s, "sentence")}</p>
        <Btn href={action.href} {...ed("action")}>
          {action.label}
        </Btn>
      </div>
    </section>
  );
}

function PrintedList({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const names = list<string>(s, "names");
  const picture = img(s, "image");
  return (
    <section className={`plist ${field(s, "field", "sky")}`}>
      <div className="plist__card" data-reveal>
        <H first={isFirst} {...ed("heading")}>
          {str(s, "heading")}
        </H>
        {picture.src && (
          <div {...ed("image")}>
            <Pic className="plist__img" src={picture.src} alt={picture.alt} width={1600} height={900} sizes="(max-width: 768px) 92vw, 50vw" />
          </div>
        )}
        <p className="plist__names" {...ed("names")}>
          {names.map((n, i) => (
            <span key={i}>
              {n}
              {i < names.length - 1 && " ·  "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

function VerbPanels({ section, isFirst }: SectionProps) {
  const panels = list<Settings>(section.settings, "panels");
  return (
    <section className="verbs" aria-label="How we work">
      {panels.map((p, i) => {
        const picture = img(p, "image");
        return (
          <div key={i} className={`verb ${field(p, "field", "night")}`} data-field={`panels.${i}`}>
            <div className="verb__pic">
              {picture.src ? (
                <Pic src={picture.src} alt={picture.alt} fill sizes="100vw" />
              ) : (
                <RidgeArt stage={i} title={`Mountain ridge, stage ${i + 1} of the climb`} />
              )}
            </div>
            <div className="verb__word-wrap">
              <H first={isFirst && i === 0} className="verb__word display">
                {str(p, "verb")}
              </H>
            </div>
            <p className="verb__sentence" data-reveal style={{ ["--d" as string]: 1 }}>
              {str(p, "sentence")}
            </p>
          </div>
        );
      })}
    </section>
  );
}

function TwoWords({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const words = [
    { word: str(s, "leftWord"), key: "left", struck: s.strikeLeft === true },
    { word: str(s, "rightWord"), key: "right", struck: false },
  ];
  const longest = Math.max(...words.map((w) => w.word.length), 4);
  return (
    <section className={`twowords wrap ${field(s, "field", "paper")}`}>
      <div className="twowords__top">
        <H first={isFirst} className="head" {...ed("heading")} data-reveal>
          {str(s, "heading")}
        </H>
        <p {...ed("paragraph")} data-reveal style={{ ["--d" as string]: 1 }}>
          {str(s, "paragraph")}
        </p>
      </div>
      <div className="twowords__specimens" style={{ ["--len" as string]: longest }}>
        {words.map((w, i) => (
          <div key={w.key} className="twowords__spec" data-reveal style={{ ["--d" as string]: i + 1 }}>
            <p className={`twowords__word display${w.struck ? " twowords__word--struck" : ""}`} {...ed(`${w.key}Word`)}>
              {w.struck ? <del>{w.word}</del> : w.word}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TacosCalculator({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`calc wrap ${field(s, "field", "lime")}`} id="calculator">
      <Calculator
        first={isFirst}
        heading={str(s, "heading")}
        intro={str(s, "intro")}
        currency={str(s, "currency", "USD")}
        sales={num(s, "sales", 120000)}
        spend={num(s, "spend", 30000)}
        target={num(s, "target", 15)}
        note={str(s, "note")}
      />
    </section>
  );
}

function ServiceTable({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const rows = list<Settings>(s, "rows");
  return (
    <section className={`stable wrap ${field(s, "field", "orange")}`} id="services">
      <H first={isFirst} className="head" {...ed("heading")} data-reveal>
        {str(s, "heading")}
      </H>
      <div role="table" aria-label={str(s, "heading")}>
        <div role="row" className="stable__row stable__head">
          <span role="columnheader">{str(s, "colService")}</span>
          <span className="stable__rest">
            <span role="columnheader">{str(s, "colWhere")}</span>
            <span role="columnheader">{str(s, "colIncludes")}</span>
            <span role="columnheader" className="stable__measure">
              {str(s, "colMeasure")}
            </span>
          </span>
        </div>
        {rows.map((r, i) => (
          <div role="row" key={i} className="stable__row" data-field={`rows.${i}`} data-reveal style={{ ["--d" as string]: i % 6 }}>
            <span role="cell" className="stable__service">
              {str(r, "service")}
            </span>
            <span className="stable__rest">
              <span role="cell">{str(r, "where")}</span>
              <span role="cell">{str(r, "includes")}</span>
              <span role="cell" className="stable__measure">
                {str(r, "measure")}
              </span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CaseFolders({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const cases = list<Settings>(s, "cases");
  return (
    <section className="folders" id="results">
      <H first={isFirst} className="head" {...ed("heading")}>
        {str(s, "heading")}
      </H>
      {cases.map((c, i) => {
        const metrics = list<Settings>(c, "metrics");
        const logo = img(c, "image");
        const fc = field(c, "field", "sky");
        return (
          <article key={i} className="folder" style={{ ["--i" as string]: i }} data-field={`cases.${i}`}>
            <h3 className={`folder__tab ${fc}`}>{str(c, "name")}</h3>
            <div className={`folder__band ${fc}`}>
              <p className="folder__strip">{str(c, "category")}</p>
              <div className="folder__body">
                <div className="folder__report" data-ui data-reveal>
                  <p className="folder__report-head">{str(c, "headline")}</p>
                  {logo.src && <Pic className="folder__logo" src={logo.src} alt={logo.alt} width={1600} height={520} sizes="(max-width: 768px) 90vw, 360px" />}
                  {metrics.length > 0 && (
                    <dl className="folder__metrics">
                      {metrics.map((m, j) => (
                        <div key={j} className="folder__metric">
                          <dt>{str(m, "label")}</dt>
                          <dd className="nums">{str(m, "value")}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
                <div className="folder__text" data-reveal style={{ ["--d" as string]: 2 }}>
                  <p>{str(c, "text")}</p>
                  {str(c, "quote") && <blockquote className="folder__quote">“{str(c, "quote")}”</blockquote>}
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

function BigFigure({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`bigfig ${field(s, "field", "night")}`}>
      <H first={isFirst} {...ed("claim")}>
        {str(s, "claim")}
      </H>
      <div>
        <p className="bigfig__figure display nums" {...ed("figure")} data-reveal>
          {str(s, "figure")}
          {str(s, "unit") && <sup>{str(s, "unit")}</sup>}
        </p>
        <p className="bigfig__caption" {...ed("caption")} data-reveal style={{ ["--d" as string]: 2 }}>
          {str(s, "caption")}
        </p>
      </div>
    </section>
  );
}

function AboutFacts({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const facts = list<Settings>(s, "facts");
  const lists = list<Settings>(s, "lists");
  const more = link(s, "link");
  return (
    <section className={`afacts ${field(s, "field", "paper")}`} id="about">
      <H first={isFirst} className="head" {...ed("heading")} data-reveal>
        {str(s, "heading")}
      </H>
      <div className="afacts__row">
        <dl className="afacts__facts" {...ed("facts")} data-reveal style={{ ["--d" as string]: 2 }}>
          {facts.map((f, i) => (
            <div key={i}>
              <dt>{str(f, "label")}</dt>
              <dd>{str(f, "value")}</dd>
            </div>
          ))}
        </dl>
        <div>
          <p className="afacts__para" {...ed("paragraph")} data-reveal>
            {str(s, "paragraph")}
          </p>
          {more.label && (
            <Link className="afacts__link link" href={more.href} {...ed("link")}>
              {more.label} →
            </Link>
          )}
        </div>
      </div>
      {lists.length > 0 && (
        <div className="afacts__row">
          <p className="afacts__word" {...ed("listsTitle")}>
            {str(s, "listsTitle")}
          </p>
          <div className="afacts__lists" {...ed("lists")}>
            {lists.map((l, i) => (
              <div key={i} className="afacts__list" data-reveal style={{ ["--d" as string]: i + 1 }}>
                <h3>{str(l, "title")}</h3>
                <ul>
                  {list<Settings>(l, "items").map((it, j) => (
                    <li key={j}>
                      <span>{str(it, "name")}</span>
                      <span>{str(it, "meta")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FaqBands({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const items = list<Settings>(s, "items");
  const a = field(s, "field", "sky");
  const b = field(s, "field2", "paper");
  return (
    <section id="questions">
      <div className={`faq__title ${a}`}>
        <H first={isFirst} className="display" {...ed("heading")}>
          {str(s, "heading")}
        </H>
      </div>
      {items.map((it, i) => (
        <div key={i} className={`faq__band ${i % 2 === 0 ? b : a}`} data-field={`items.${i}`}>
          <h3 data-reveal>{str(it, "q")}</h3>
          <p data-reveal style={{ ["--d" as string]: 1 }}>
            {str(it, "a")}
          </p>
        </div>
      ))}
    </section>
  );
}

function CtaChoice({ section, isFirst }: SectionProps) {
  const s = section.settings;
  const p = link(s, "primary");
  const q = link(s, "secondary");
  return (
    <section className={`ctachoice ${field(s, "field", "night")}`}>
      <H first={isFirst} className="sr-only">
        {`${str(s, "line1")} ${str(s, "line2")}`}
      </H>
      <p className="ctachoice__line display" aria-hidden="true" {...ed("line1")}>
        {str(s, "line1")}
      </p>
      <div className="ctachoice__mid" data-reveal>
        <div className="ctachoice__row">
          <Btn href={p.href} {...ed("primary")}>
            {p.label}
          </Btn>
          <span className="ctachoice__or">or</span>
          <Btn href={q.href} variant="ink" {...ed("secondary")}>
            {q.label}
          </Btn>
        </div>
        <p className="ctachoice__note" {...ed("note")}>
          {str(s, "note")}
        </p>
      </div>
      <p className="ctachoice__line display" aria-hidden="true" {...ed("line2")}>
        {str(s, "line2")}
      </p>
    </section>
  );
}

function PageIntro({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`pintro ${field(s, "field", "orange")}`}>
      <H first={isFirst} className="display" {...ed("title")}>
        {str(s, "title")}
      </H>
      <p {...ed("sentence")} data-reveal style={{ ["--d" as string]: 1 }}>
        {str(s, "sentence")}
      </p>
    </section>
  );
}

const TILE_FIELDS = ["f-orange", "f-sky", "f-lime", "f-night"];

function TeamGrid({ section, isFirst, data }: SectionProps) {
  const s = section.settings;
  const team = data.team;
  return (
    <section className={`team ${field(s, "field", "paper")}`}>
      <div className="team__head">
        <H first={isFirst} className="head" {...ed("heading")}>
          {str(s, "heading")}
        </H>
        {str(s, "intro") && <p {...ed("intro")}>{str(s, "intro")}</p>}
      </div>
      <ul className="team__grid">
        {team.map((m, i) => {
          const initials = m.name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join("");
          return (
            <li key={m.id} className="team__tile" data-reveal style={{ ["--d" as string]: i % 4 }}>
              <div className={`team__pic ${TILE_FIELDS[i % TILE_FIELDS.length]}`}>
                {m.photo ? (
                  <Pic src={m.photo} alt={`Portrait of ${m.name}`} width={800} height={1000} sizes="(max-width: 768px) 50vw, 25vw" />
                ) : (
                  <span className="team__initials" aria-hidden="true">
                    {initials}
                  </span>
                )}
              </div>
              <div className="team__meta">
                <p className="team__name">{m.name}</p>
                <p className="team__role">{m.role}</p>
                {m.linkedin && (
                  <a className="team__li link" href={m.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn<span className="sr-only"> profile of {m.name}</span>
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ContactFormSection({ section, isFirst }: SectionProps) {
  const s = section.settings;
  return (
    <section className={`cform ${field(s, "field", "paper")}`}>
      <div className="cform__aside">
        <H first={isFirst} className="display" {...ed("heading")}>
          {str(s, "heading")}
        </H>
        <p {...ed("intro")} data-reveal style={{ ["--d" as string]: 1 }}>
          {str(s, "intro")}
        </p>
        <ol className="cform__steps" {...ed("steps")}>
          {list<string>(s, "steps").map((step, i) => (
            <li key={i} data-reveal style={{ ["--d" as string]: i + 2 }}>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <ContactForm
        spendRanges={list<string>(s, "spendRanges")}
        services={list<string>(s, "services")}
        submitLabel={str(s, "submitLabel", "Send")}
        successHeading={str(s, "successHeading")}
        successText={str(s, "successText")}
      />
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
    <section className={`rtext ${field(s, "field", "paper")}`}>
      <H first={isFirst} className="display" {...ed("heading")}>
        {str(s, "heading")}
      </H>
      <div className="rtext__body" {...ed("body")}>
        {blocks.map((b, i) => {
          if (b.startsWith("## ")) {
            const [first, ...rest] = b.split("\n");
            return (
              <div key={i}>
                <h2>{first.slice(3)}</h2>
                {rest.length > 0 && <p>{rest.join(" ")}</p>}
              </div>
            );
          }
          return <p key={i}>{b}</p>;
        })}
      </div>
    </section>
  );
}

export const SECTION_COMPONENTS: Record<string, (p: SectionProps) => React.ReactNode> = {
  hero_waterline: HeroWaterline,
  printed_list: PrintedList,
  verb_panels: VerbPanels,
  two_words: TwoWords,
  tacos_calculator: TacosCalculator,
  service_table: ServiceTable,
  case_folders: CaseFolders,
  big_figure: BigFigure,
  about_facts: AboutFacts,
  faq_bands: FaqBands,
  cta_choice: CtaChoice,
  page_intro: PageIntro,
  team_grid: TeamGrid,
  contact_form: ContactFormSection,
  rich_text: RichText,
};
