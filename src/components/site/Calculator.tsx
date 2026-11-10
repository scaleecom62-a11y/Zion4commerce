"use client";

import { useId, useMemo, useState } from "react";

const LOCALE: Record<string, string> = { USD: "en-US", GBP: "en-GB", EUR: "de-DE", INR: "en-IN", AED: "en-AE" };

function money(v: number, currency: string) {
  return new Intl.NumberFormat(LOCALE[currency] ?? "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(Math.round(v));
}

export function Calculator(props: {
  first: boolean;
  eyebrow: string;
  heading: string;
  intro: string;
  currency: string;
  sales: number;
  spend: number;
  target: number;
  note: string;
}) {
  const id = useId();
  const [sales, setSales] = useState(props.sales);
  const [spend, setSpend] = useState(props.spend);
  const [target, setTarget] = useState(props.target);

  const { tacos, freed } = useMemo(() => {
    const t = sales > 0 ? (spend / sales) * 100 : 0;
    const f = sales > 0 ? Math.max(0, spend - (sales * target) / 100) : 0;
    return { tacos: t, freed: f };
  }, [sales, spend, target]);

  const Heading = props.first ? "h1" : "h2";
  const atTarget = freed <= 0;

  return (
    <div className="calc">
      <div className="calc__intro" data-reveal>
        {props.eyebrow && (
          <p className="eyebrow" data-field="eyebrow">
            {props.eyebrow}
          </p>
        )}
        <Heading className="h2" data-field="heading">
          {props.heading}
        </Heading>
        <p className="lead" data-field="intro">
          {props.intro}
        </p>
      </div>

      <div className="card calc__card" data-reveal style={{ ["--d" as string]: 1 }}>
        <form className="calc__form" onSubmit={(e) => e.preventDefault()} aria-label="TACoS calculator">
          <div className="field">
            <label htmlFor={`${id}-sales`}>Monthly sales, all orders ({props.currency})</label>
            <input id={`${id}-sales`} type="number" inputMode="numeric" min={0} step={1000} value={Number.isFinite(sales) ? sales : ""} onChange={(e) => setSales(Math.max(0, e.target.valueAsNumber || 0))} />
          </div>
          <div className="field">
            <label htmlFor={`${id}-spend`}>Monthly ad spend ({props.currency})</label>
            <input id={`${id}-spend`} type="number" inputMode="numeric" min={0} step={500} value={Number.isFinite(spend) ? spend : ""} onChange={(e) => setSpend(Math.max(0, e.target.valueAsNumber || 0))} />
          </div>
          <div className="field">
            <label htmlFor={`${id}-target`}>Target TACoS</label>
            <div className="calc__range">
              <input id={`${id}-target`} type="range" min={3} max={40} step={1} value={target} onChange={(e) => setTarget(e.target.valueAsNumber)} />
              <output htmlFor={`${id}-target`} className="nums">
                {target}%
              </output>
            </div>
          </div>
        </form>

        <div className="calc__result" aria-live="polite">
          <div className="calc__now">
            <span>Your TACoS today</span>
            <strong className="nums">{tacos.toFixed(1)}%</strong>
          </div>
          <p className="calc__label">{atTarget ? "You are at or below your target" : `Back in margin each month at ${target}% TACoS`}</p>
          <p className="calc__figure nums">{atTarget ? "On target" : money(freed, props.currency)}</p>
          <p className="calc__sub">{atTarget ? `You already spend ${target}% of sales or less on ads.` : `${money(freed * 12, props.currency)} a year, for the same sales.`}</p>
          <p className="calc__note" data-field="note">
            {props.note}
          </p>
        </div>
      </div>
    </div>
  );
}
