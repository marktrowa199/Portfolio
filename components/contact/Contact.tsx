"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Copy, FileText, Github, Linkedin, MapPin } from "lucide-react";

type Feedback = { type: "success" | "error"; message: string };

const SUCCESS_MESSAGE = "Message sent successfully! I’ll get back to you soon.";
const NETWORK_ERROR_MESSAGE = "Something went wrong. Please try again.";
const DELIVERY_ERROR_MESSAGE = "Sorry, I couldn’t send that just now. Please try again, or email me directly.";
const NOT_CONFIGURED_MESSAGE = "The contact form isn’t configured yet. Please email me directly.";

/**
 * Web3Forms endpoint and access key.
 *
 * Web3Forms requires this request to originate in the browser: it rejects server-side
 * and proxied calls with `403 This method is not allowed`, and server-side use requires a
 * paid plan plus IP safelisting. Their docs also state the access key is not a secret and
 * is safe in client-side code — it works as an alias for the destination inbox, and the
 * only real protection is the honeypot plus Web3Forms' own spam filtering.
 *
 * `NEXT_PUBLIC_` is the Next.js equivalent of Vite's `VITE_` prefix. It is inlined into the
 * public bundle at build time, which is expected here.
 */
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? "";
const EMAIL_SUBJECT_PREFIX = "Portfolio Contact";

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const inFlight = useRef(false);
  const feedbackTimer = useRef<number | null>(null);
  const email = "arthurnielzz@gmail.com";
  const phone = "(+63) 946-417-9851";

  // Success confirmations fade on their own; errors stay until the next attempt.
  useEffect(() => {
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    if (feedback?.type === "success") {
      feedbackTimer.current = window.setTimeout(() => setFeedback(null), 6000);
    }
    return () => {
      if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current);
    };
  }, [feedback]);

  const copy = async (kind: "email" | "phone", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
    } catch {
      setCopied(`${kind}-error`);
    }
    window.setTimeout(() => setCopied(null), 2500);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Guards against a second submit slipping through before the button re-renders as disabled.
    if (inFlight.current) return;

    const form = event.currentTarget;
    const values = new FormData(form);

    if (!WEB3FORMS_ACCESS_KEY) {
      setFeedback({ type: "error", message: NOT_CONFIGURED_MESSAGE });
      return;
    }

    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    // Newlines and control characters are stripped so the subject can never carry extra
    // mail headers.
    const subject = String(values.get("subject") ?? "")
      .trim()
      .replace(/[\r\n\u0000-\u001f\u007f]+/g, " ");
    const message = String(values.get("message") ?? "").trim();
    const honeypot = String(values.get("website") ?? "").trim();

    // Honeypot tripped: behave exactly like success so an automated submitter learns nothing,
    // but send nothing.
    if (honeypot) {
      form.reset();
      setFeedback({ type: "success", message: SUCCESS_MESSAGE });
      return;
    }

    inFlight.current = true;
    setSubmitting(true);
    setFeedback(null);

    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("name", name);
      payload.append("email", email);
      payload.append("subject", `${EMAIL_SUBJECT_PREFIX} — ${subject}`);
      payload.append("message", message);
      // Labels the sender in the delivered email so the inbox shows who wrote.
      payload.append("from_name", name);
      // Makes Reply-To address the visitor instead of Web3Forms' no-reply address.
      payload.append("replyto", email);
      // Web3Forms' own spam check, complementing the honeypot above.
      payload.append("botcheck", "0");

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: payload,
        headers: { Accept: "application/json" },
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; message?: string }
        | null;

      // Verified against the live API: a rejected key returns 403 with an empty body, while
      // other rejections return 200 with success:false. The status code alone is unreliable,
      // so a missing or non-success body is treated as failure either way.
      if (!response.ok || !result || result.success !== true) {
        console.error("Web3Forms submission failed:", {
          status: response.status,
          detail: result?.message ?? "no message returned",
        });
        setFeedback({ type: "error", message: DELIVERY_ERROR_MESSAGE });
        return;
      }

      form.reset();
      setFeedback({ type: "success", message: SUCCESS_MESSAGE });
    } catch {
      // Network/transport failure: the browser's own error text ("Failed to fetch") is not
      // useful to a visitor, so always show the safe fallback and keep the form intact.
      setFeedback({ type: "error", message: NETWORK_ERROR_MESSAGE });
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-space scroll-mt-20 border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <div className="section-wrap grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="eyebrow">07 · Contact</p>
          <h2 className="section-title mt-4">Let’s talk about the work.</h2>
          <p className="section-intro mt-5">I’m looking for Associate Software Engineer and Junior Software Engineer opportunities. Open to remote, on-site, or hybrid roles.</p>

          <div className="mt-8 space-y-5">
            <div>
              <h3 className="contact-detail-label">Email</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href={`mailto:${email}`} className="break-all text-lg font-medium text-[var(--text-heading)] underline decoration-[var(--border)] underline-offset-4 hover:text-[var(--accent)] sm:text-xl">{email}</a>
                <button type="button" onClick={() => copy("email", email)} className="contact-copy-button" aria-label={copied === "email" ? "Email copied" : copied === "email-error" ? "Email copy unavailable" : "Copy email address"}>
                  {copied === "email" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                  {copied === "email" ? "Copied" : copied === "email-error" ? "Copy unavailable" : "Copy"}
                </button>
              </div>
            </div>

            <div>
              <h3 className="contact-detail-label">Phone</h3>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <a href="tel:+639464179851" className="text-lg font-medium text-[var(--text-heading)] hover:text-[var(--accent)] sm:text-xl">{phone}</a>
                <button type="button" onClick={() => copy("phone", phone)} className="contact-copy-button" aria-label={copied === "phone" ? "Phone number copied" : copied === "phone-error" ? "Phone copy unavailable" : "Copy phone number"}>
                  {copied === "phone" ? <Check aria-hidden="true" className="h-4 w-4" /> : <Copy aria-hidden="true" className="h-4 w-4" />}
                  {copied === "phone" ? "Copied" : copied === "phone-error" ? "Copy unavailable" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-[var(--border)] pt-6">
            <a href="/resume.pdf" download className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--accent-ink)] hover:bg-[var(--accent-strong)]">
              <FileText aria-hidden="true" className="h-4 w-4" /> Download resume
            </a>
            <a href="https://github.com/marktrowa199" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub profile (opens in a new tab)">
              <Github aria-hidden="true" className="h-5 w-5" /> <span>GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn profile (opens in a new tab)">
              <Linkedin aria-hidden="true" className="h-5 w-5" /> <span>LinkedIn</span>
            </a>
          </div>
          <p className="mt-5 flex items-center gap-2 text-sm text-[var(--text-dim)]"><MapPin aria-hidden="true" className="h-4 w-4" /> Based in San Jose Del Monte Bulacan, Philippines</p>
        </div>

        <div className="contact-form-panel">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-[var(--text-heading)]">Communication</h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">Send a message directly to my inbox.</p>
          </div>
          <form className="contact-form" onSubmit={submit} aria-busy={submitting}>
            <div className="contact-form__fields">
              <label className="contact-field">
                <span>YOUR NAME</span>
                <input name="name" type="text" autoComplete="name" placeholder="Your name" minLength={2} maxLength={120} required disabled={submitting} />
              </label>
              <label className="contact-field">
                <span>YOUR EMAIL</span>
                <input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required disabled={submitting} />
              </label>
              <label className="contact-field contact-field--wide">
                <span>SUBJECT / POSITION</span>
                <input name="subject" type="text" placeholder="Role, opportunity, or subject" minLength={2} maxLength={160} required disabled={submitting} />
              </label>
              <label className="contact-field contact-field--wide">
                <span>MESSAGE / PROJECT BRIEF</span>
                <textarea name="message" rows={4} placeholder="Tell me a little about what you have in mind…" minLength={10} maxLength={5000} required disabled={submitting} />
              </label>
            </div>

            <div className="contact-form__honeypot" aria-hidden="true">
              <label htmlFor="contact-website">Leave this field empty</label>
              <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="contact-form__footer">
              <button className="contact-submit" type="submit" disabled={submitting}>
                {submitting ? <><span className="contact-spinner" aria-hidden="true" /> Sending…</> : "Send message"}
              </button>
              {feedback && (
                <p className={`contact-form-message contact-form-message--${feedback.type}`} role={feedback.type === "error" ? "alert" : "status"} aria-live={feedback.type === "error" ? "assertive" : "polite"}>
                  {feedback.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
