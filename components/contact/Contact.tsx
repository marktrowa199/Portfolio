"use client";

import { useState } from "react";
import { Mail, Phone, Copy, Check, Github, Linkedin, FileText, Send, Sparkles, MapPin } from "lucide-react";

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const email = "arthurnielzz@gmail.com";
  const phone = "(+63) 946-417-9851";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2200);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="font-mono text-cyan dark:text-cyan light:text-teal-700 text-sm">
            // 05.
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-navy-900">
            Establish Connection
          </h2>
        </div>

        <p className="text-center text-slate-muted dark:text-slate-muted light:text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-12">
          Seeking Associate Software Engineer &amp; Junior Software Engineer roles. Open to discussing full-time opportunities across Remote, On-site, or Hybrid setups.
        </p>

        {/* Central Terminal Connection Card */}
        <div className="rounded-2xl border border-navy-700 dark:border-navy-700 light:border-slate-200 bg-navy-800/80 dark:bg-navy-800/80 light:bg-white shadow-2xl overflow-hidden card-glow-hover">
          {/* Chrome Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-navy-900/90 dark:bg-navy-900/90 light:bg-slate-100 border-b border-navy-700/70 dark:border-navy-700/70 light:border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-slate-muted light:text-slate-500">
                arthur_contact_session.sh
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-cyan dark:text-cyan light:text-teal-700">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
              <span>STATUS: AVAILABLE FOR HIRE</span>
            </div>
          </div>

          <div className="p-8 sm:p-12 text-center space-y-8">
            <div className="max-w-xl mx-auto space-y-3">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-navy-900">
                Let&apos;s build something great together.
              </h3>
              <p className="text-sm sm:text-base text-slate-muted dark:text-slate-muted light:text-slate-600 leading-relaxed">
                Whether you need a dedicated Junior Developer eager to write clean Python and SQL code, an adaptable problem solver with enterprise IT support experience, or a collaborative team contributor, my channels are open.
              </p>
            </div>

            {/* Contact Channels Cluster */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Email Card */}
              <div className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl border border-navy-700 dark:border-navy-700 light:border-slate-200 bg-navy-900/70 dark:bg-navy-900/70 light:bg-slate-50">
                <div className="flex items-center gap-2.5 px-2 font-mono text-xs sm:text-sm text-slate-lightest dark:text-slate-lightest light:text-navy-900">
                  <Mail className="w-4 h-4 text-cyan" />
                  <span>{email}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold bg-cyan dark:bg-cyan light:bg-teal-600 text-navy-950 dark:text-navy-950 light:text-white hover:bg-cyan/90 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-navy-950" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}`}
                    className="p-2 rounded-lg border border-navy-700 dark:border-navy-700 light:border-slate-300 text-slate-light hover:text-cyan hover:border-cyan transition-colors"
                    aria-label="Send direct email"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Phone Card */}
              <div className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-3 p-3 rounded-xl border border-navy-700 dark:border-navy-700 light:border-slate-200 bg-navy-900/70 dark:bg-navy-900/70 light:bg-slate-50">
                <div className="flex items-center gap-2.5 px-2 font-mono text-xs sm:text-sm text-slate-lightest dark:text-slate-lightest light:text-navy-900">
                  <Phone className="w-4 h-4 text-signal-blue" />
                  <span>{phone}</span>
                </div>

                <button
                  onClick={copyPhone}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold border border-navy-700 dark:border-navy-700 light:border-slate-300 text-slate-light dark:text-slate-light light:text-slate-700 hover:border-cyan hover:text-cyan transition-colors"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social & Professional Profile Grid */}
            <div className="pt-6 border-t border-navy-700/60 dark:border-navy-700/60 light:border-slate-200">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://github.com/marktrowa199"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-navy-700/80 dark:border-navy-700/80 light:border-slate-300 bg-navy-900/40 dark:bg-navy-900/40 light:bg-white text-slate-light dark:text-slate-light light:text-slate-700 hover:border-cyan hover:text-cyan transition-all text-xs font-mono"
                >
                  <Github className="w-4 h-4" />
                  <span>github.com/marktrowa199</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/niel-arthur-rocacurva-874876307/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-navy-700/80 dark:border-navy-700/80 light:border-slate-300 bg-navy-900/40 dark:bg-navy-900/40 light:bg-white text-slate-light dark:text-slate-light light:text-slate-700 hover:border-cyan hover:text-cyan transition-all text-xs font-mono"
                >
                  <Linkedin className="w-4 h-4 text-signal-blue" />
                  <span>linkedin.com/in/niel-arthur-rocacurva</span>
                </a>

                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-navy-700/50 bg-navy-900/30 text-xs font-mono text-slate-muted light:text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Remote | On-site | Hybrid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
