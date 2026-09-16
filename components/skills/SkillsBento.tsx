"use client";

import {
  Code2,
  Check,
  Award,
  Cpu,
  Server,
} from "lucide-react";

interface SkillCategory {
  title: string;
  subtitle: string;
  icon: any;
  colSpan?: string;
  items: { name: string; tag?: string; note?: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Software & Data Foundations",
    subtitle: "Core programming, database querying, and version control.",
    icon: Code2,
    colSpan: "lg:col-span-8",
    items: [
      { name: "Python", tag: "CertNexus Certified", note: "Scripting, algorithmic logic, backend development, and AI data processing" },
      { name: "SQL", tag: "DataCamp Certified", note: "Relational querying, schema design, filtering, and database operations" },
      { name: "Git & GitHub", tag: "Certified", note: "Version control workflows, commit history, repository management, branching" },
      { name: "OpenAI API Integration", tag: "DataCamp", note: "Interfacing with LLM endpoints, prompt handling, and AI automation" },
      { name: "Data Processing (Pandas)", tag: "DataCamp", note: "Dataset inspection, cleaning, anomaly handling, and tabular reporting" },
    ],
  },
  {
    title: "Hardware, IoT & Robotics",
    subtitle: "Hands-on integration from the AGROSENTINEL capstone.",
    icon: Cpu,
    colSpan: "lg:col-span-4",
    items: [
      { name: "Raspberry Pi 5", note: "Central robotic computing and controller setup" },
      { name: "ESP32 Microcontrollers", note: "Sensor and peripheral actuation management" },
      { name: "Motor Drivers & Actuators", note: "Movement control and automated spraying mechanisms" },
      { name: "Sensor Integration", note: "NDVI and environmental telemetry data acquisition" },
    ],
  },
  {
    title: "IT Operations & Infrastructure",
    subtitle: "Enterprise systems experience verified at Concentrix.",
    icon: Server,
    colSpan: "lg:col-span-6",
    items: [
      { name: "Windows OS Imaging & Deployment", note: "Reimaging, system preparation, and workstation provisioning" },
      { name: "Account & VPN Configuration", note: "Secure user onboarding, credential setup, and VPN tunnels" },
      { name: "Hardware Diagnostics & Upgrades", note: "Desktop component troubleshooting and preventive maintenance" },
      { name: "IT Asset Lifecycle Management", note: "Inventory tracking, equipment lifecycle, and setup/retrieval" },
      { name: "Ticket Monitoring & Resolution", note: "Enterprise ticketing workflow and issue documentation" },
    ],
  },
  {
    title: "Verified Certifications & Soft Skills",
    subtitle: "Credentials and cross-functional team capabilities.",
    icon: Award,
    colSpan: "lg:col-span-6",
    items: [
      { name: "IT Specialist: Python (CertNexus)", note: "Recognized industry certification in core Python programming" },
      { name: "Security, Compliance & Identity (Microsoft)", note: "Security fundamentals, compliance principles, access control" },
      { name: "Python Data Associate (DataCamp)", note: "Data manipulation, exploratory analysis, and data algorithms" },
      { name: "Teamwork & Collaboration", note: "Cross-functional communication across development & IT support" },
      { name: "Technical Communication", note: "Clear ticketing documentation and technical problem escalation" },
    ],
  },
];

export default function SkillsBento() {
  return (
    <section id="skills" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-cyan dark:text-cyan light:text-[#0F766E] text-sm font-medium">
            // 02.
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
            Skills &amp; Technical Capabilities
          </h2>
          <div className="h-px bg-navy-700/80 dark:bg-navy-700/80 light:bg-[#E2E6EC] flex-1 ml-4" />
        </div>

        <p className="text-slate-muted dark:text-slate-muted light:text-[#525E72] text-sm sm:text-base max-w-3xl mb-10 font-normal">
          Grounded competencies verified through academic capstone robotics, an enterprise IT internship at Concentrix, and recognized industry certifications.
        </p>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className={`${
                  cat.colSpan || "lg:col-span-6"
                } rounded-2xl border border-navy-700/80 dark:border-navy-700/80 light:border-[#E2E6EC] bg-navy-800/50 dark:bg-navy-800/50 light:bg-white p-6 card-glow-hover flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] border border-navy-700/60 light:border-[#E2E6EC] text-cyan dark:text-cyan light:text-[#0F766E]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading text-base font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-slate-dim light:text-[#7B879C]">
                      0{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-slate-muted dark:text-slate-muted light:text-[#7B879C] mb-5 font-normal">
                    {cat.subtitle}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2.5">
                    {cat.items.map((item) => (
                      <div
                        key={item.name}
                        className="group/item p-3 rounded-xl bg-navy-900/40 dark:bg-navy-900/40 light:bg-[#EEF1F6]/50 border border-navy-700/40 light:border-[#E2E6EC] hover:border-cyan/40 light:hover:border-[#0F766E]/40 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-cyan light:text-[#0F766E] shrink-0" />
                            <span className="font-sans text-xs font-semibold text-slate-lightest dark:text-slate-lightest light:text-[#1E2530]">
                              {item.name}
                            </span>
                          </div>
                          {item.tag && (
                            <span className="font-mono text-[10px] px-2 py-0.5 rounded-md bg-cyan/10 dark:bg-cyan/10 light:bg-[#E6F4F2] text-cyan dark:text-cyan light:text-[#0F766E] border border-cyan/20 light:border-[#B2DFDB] font-medium">
                              {item.tag}
                            </span>
                          )}
                        </div>
                        {item.note && (
                          <p className="text-[11px] text-slate-muted dark:text-slate-muted light:text-[#525E72] mt-1 pl-5.5 leading-snug font-normal">
                            {item.note}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-navy-700/50 dark:border-navy-700/50 light:border-[#E2E6EC] flex items-center justify-between font-mono text-[10px] text-slate-dim light:text-[#7B879C]">
                  <span>CAPABILITY DOMAIN</span>
                  <span className="text-cyan dark:text-cyan light:text-[#0F766E] font-medium">AUTHENTICATED SKILL</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
