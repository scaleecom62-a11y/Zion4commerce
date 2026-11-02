"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { submitLead, type LeadState } from "@/app/(site)/contact/actions";

const initial: LeadState = { status: "idle" };

export function ContactForm(props: {
  spendRanges: string[];
  services: string[];
  submitLabel: string;
  successHeading: string;
  successText: string;
}) {
  const id = useId();
  const [state, action, pending] = useActionState(submitLead, initial);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.status === "error") formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);

  if (state.status === "ok") {
    return (
      <div className="cform__done" role="status">
        <h2 className="display">{props.successHeading}</h2>
        <p>{props.successText}</p>
      </div>
    );
  }

  const err = state.status === "error" ? state.fieldErrors ?? {} : {};
  const val = state.status === "error" ? state.values ?? {} : {};
  const f = (name: string) => `${id}-${name}`;

  return (
    <form ref={formRef} key={state.status === "error" ? JSON.stringify(val) : "fresh"} className="cform__form" action={action} noValidate>
      <div className="cform__hp" aria-hidden="true">
        <label htmlFor={f("company_url")}>Leave this empty</label>
        <input id={f("company_url")} name="company_url" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="cform__field" data-reveal style={{ ["--d" as string]: 1 }}>
        <label htmlFor={f("name")}>Your name</label>
        <input id={f("name")} name="name" defaultValue={val.name} autoComplete="name" required aria-invalid={!!err.name} aria-describedby={err.name ? f("name-err") : undefined} />
        {err.name && (
          <p id={f("name-err")} className="cform__error">
            {err.name}
          </p>
        )}
      </div>
      <div className="cform__field" data-reveal style={{ ["--d" as string]: 2 }}>
        <label htmlFor={f("email")}>Work email</label>
        <input id={f("email")} name="email" defaultValue={val.email} type="email" autoComplete="email" spellCheck={false} required aria-invalid={!!err.email} aria-describedby={err.email ? f("email-err") : undefined} />
        {err.email && (
          <p id={f("email-err")} className="cform__error">
            {err.email}
          </p>
        )}
      </div>
      <div className="cform__field" data-reveal style={{ ["--d" as string]: 3 }}>
        <label htmlFor={f("company")}>Brand or company</label>
        <input id={f("company")} name="company" defaultValue={val.company} autoComplete="organization" />
      </div>
      <div className="cform__field" data-reveal style={{ ["--d" as string]: 4 }}>
        <label htmlFor={f("website")}>Website or Amazon store link</label>
        <input id={f("website")} name="website" defaultValue={val.website} type="text" inputMode="url" autoComplete="url" />
      </div>
      <div className="cform__field" data-reveal style={{ ["--d" as string]: 5 }}>
        <label htmlFor={f("phone")}>Phone (optional)</label>
        <input id={f("phone")} name="phone" defaultValue={val.phone} type="tel" autoComplete="tel" />
      </div>
      <div className="cform__field" data-reveal style={{ ["--d" as string]: 6 }}>
        <label htmlFor={f("country")}>Country</label>
        <input id={f("country")} name="country" defaultValue={val.country} autoComplete="country-name" />
      </div>
      <div className="cform__field cform__field--wide" data-reveal style={{ ["--d" as string]: 6 }}>
        <label htmlFor={f("spend")}>Monthly ad spend</label>
        <select id={f("spend")} name="spend" defaultValue={val.spend ?? ""}>
          <option value="" disabled>
            Choose a range
          </option>
          {props.spendRanges.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <fieldset data-reveal style={{ ["--d" as string]: 6 }}>
        <legend className="cform__legend">What do you need help with?</legend>
        <div className="cform__checks">
          {props.services.map((sv) => (
            <label key={sv} className="cform__check">
              <input type="checkbox" name="services" value={sv} defaultChecked={val.services?.includes(sv)} />
              {sv}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="cform__field cform__field--wide" data-reveal style={{ ["--d" as string]: 6 }}>
        <label htmlFor={f("message")}>Anything else we should know?</label>
        <textarea id={f("message")} name="message" rows={5} defaultValue={val.message} />
      </div>
      {state.status === "error" && state.message && (
        <p className="cform__error cform__field--wide" role="alert">
          {state.message}
        </p>
      )}
      <button className="btn cform__submit" type="submit" disabled={pending}>
        {pending ? "Sending…" : props.submitLabel}
      </button>
    </form>
  );
}
