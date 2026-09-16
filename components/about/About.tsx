"use client";

import { CheckCircle2, ShieldCheck, Award, Terminal, Cpu } from "lucide-react";

export default function About() {
  const certifications = [
    { name: "Python Data Associate", issuer: "DataCamp", date: "July 2026" },
    { name: "Introduction to SQL", issuer: "DataCamp", date: "July 2026" },
    { name: "Working with the OpenAI API", issuer: "DataCamp", date: "July 2026" },
    { name: "IT Specialist: Python", issuer: "CertNexus", date: "Certified" },
    { name: "Security Compliance & Identity Fundamentals", issuer: "Microsoft", date: "July 2026" },
    { name: "Python for AI: Accelerating Innovation", issuer: "AI & Algorithms", date: "Completed" },
    { name: "Introduction to GitHub Version Control", issuer: "GitHub", date: "Certified" },
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-cyan dark:text-cyan light:text-[#0F766E] text-sm font-medium">
            // 01.
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
            About &amp; Engineering Mindset
          </h2>
          <div className="h-px bg-navy-700/80 dark:bg-navy-700/80 light:bg-[#E2E6EC] flex-1 ml-4" />
        </div>

        {/* Asymmetric 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-slate-muted dark:text-slate-muted light:text-[#525E72] leading-relaxed text-sm sm:text-base font-normal">
            <p>
              I am a motivated <strong className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold">Bachelor of Science in Information Technology graduate</strong> from <span className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold">Our Lady of Fatima University - Quezon City</span> (2022 - 2026). My technical foundation unites software development fundamentals with real-world infrastructure and systems experience.
            </p>

            <p>
              During my capstone project, <span className="text-cyan dark:text-cyan light:text-[#0F766E] font-mono font-medium">AGROSENTINEL</span>, I contributed to building an AI-based agricultural robot with automated spraying. I helped integrate hardware components including the Raspberry Pi 5, ESP32, motor drivers, and sensor arrays, tested robotic movement and spraying functionality, and supported AI model training for plant disease detection using image datasets.
            </p>

            <p>
              Complementing my software projects, I completed an internship at <strong className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold">Concentrix</strong> as an IT Operations &amp; IT Support Intern. There, I reimaged and deployed Windows OS on workstations, configured secure user accounts and VPN access, managed asset lifecycles, and resolved IT support tickets to keep operational systems running smoothly.
            </p>

            <p>
              I am eager to bring my core abilities in <strong className="text-cyan dark:text-cyan light:text-[#0F766E] font-semibold">Python, SQL, Git, and software engineering</strong> to an innovative team as an <strong className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold">Associate Software Engineer</strong> or <strong className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold">Junior Software Engineer</strong>, where I can make an immediate impact while expanding my engineering capabilities.
            </p>

            {/* Guiding Principles */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-navy-800/40 dark:bg-navy-800/40 light:bg-white border border-navy-700/60 light:border-[#E2E6EC] light:shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan light:text-[#0F766E] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-heading font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                    Strong Technical Fundamentals
                  </p>
                  <p className="text-slate-dim light:text-[#7B879C]">Python programming, SQL databases, and Git version control.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-navy-800/40 dark:bg-navy-800/40 light:bg-white border border-navy-700/60 light:border-[#E2E6EC] light:shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan light:text-[#0F766E] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-heading font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                    Systems &amp; Hardware Grounding
                  </p>
                  <p className="text-slate-dim light:text-[#7B879C]">Workstation deployment, OS imaging, and IoT robotics (RPi5/ESP32).</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Candidate Blueprint / System Specs (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-800/70 dark:bg-navy-800/70 light:bg-white p-6 shadow-xl light:shadow-sm relative overflow-hidden">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-navy-700/80 dark:border-navy-700/80 light:border-[#E2E6EC]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="font-mono text-[11px] text-slate-muted light:text-[#7B879C]">
                  niel_arthur_manifest.json
                </div>
              </div>

              {/* Specs Rows */}
              <div className="space-y-3.5 font-mono text-xs">
                <div className="p-3 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 light:bg-[#EEF1F6] border border-navy-700/40 light:border-[#E2E6EC]">
                  <span className="text-slate-dim light:text-[#7B879C] block text-[10px] uppercase font-medium">
                    // Higher Education
                  </span>
                  <p className="text-cyan dark:text-cyan light:text-[#0F766E] font-semibold mt-0.5 font-sans">
                    BS in Information Technology
                  </p>
                  <p className="text-slate-muted light:text-[#525E72] text-[11px]">
                    Our Lady of Fatima University - Quezon City (2022 - 2026)
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 light:bg-[#EEF1F6] border border-navy-700/40 light:border-[#E2E6EC]">
                  <span className="text-slate-dim light:text-[#7B879C] block text-[10px] uppercase font-medium">
                    // Industry Experience
                  </span>
                  <p className="text-slate-lightest dark:text-slate-lightest light:text-[#111620] mt-0.5 font-semibold font-sans">
                    IT Operations / IT Support Intern
                  </p>
                  <p className="text-slate-muted light:text-[#525E72] text-[11px]">Concentrix • Feb 2026 - April 2026</p>
                </div>

                <div className="p-3 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 light:bg-[#EEF1F6] border border-navy-700/40 light:border-[#E2E6EC]">
                  <span className="text-slate-dim light:text-[#7B879C] block text-[10px] uppercase font-medium">
                    // Industry Certifications
                  </span>
                  <div className="mt-1.5 space-y-1">
                    {certifications.slice(0, 4).map((cert) => (
                      <div key={cert.name} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-light dark:text-slate-light light:text-[#1E2530] truncate pr-2 font-sans">
                          • {cert.name}
                        </span>
                        <span className="text-cyan dark:text-cyan light:text-[#0F766E] text-[10px] shrink-0 font-mono font-medium">
                          {cert.issuer}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-navy-900/60 dark:bg-navy-900/60 light:bg-[#EEF1F6] border border-navy-700/40 light:border-[#E2E6EC]">
                  <span className="text-slate-dim light:text-[#7B879C] block text-[10px] uppercase font-medium">
                    // Work Modality
                  </span>
                  <p className="text-emerald-400 light:text-emerald-700 font-semibold mt-0.5 font-sans">
                    Remote | On-site | Hybrid
                  </p>
                </div>
              </div>

              {/* Verified Badge */}
              <div className="mt-5 pt-4 border-t border-navy-700/60 dark:border-navy-700/60 light:border-[#E2E6EC] flex items-center justify-between text-[11px] font-mono text-slate-muted light:text-[#7B879C]">
                <span className="flex items-center gap-1.5 text-emerald-400 light:text-emerald-700 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Credentials</span>
                </span>
                <span className="text-slate-dim light:text-[#7B879C]">QC, PHILIPPINES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
