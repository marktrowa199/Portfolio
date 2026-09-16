"use client";

import { GraduationCap, Briefcase, Bot, CheckCircle2, Calendar, MapPin, Building2 } from "lucide-react";

interface Milestone {
  type: "education" | "experience" | "capstone";
  title: string;
  roleOrDegree: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const MILESTONES: Milestone[] = [
  {
    type: "experience",
    title: "Work Experience",
    roleOrDegree: "IT Operations / IT Support Intern",
    institution: "Concentrix",
    period: "Feb. 2026 - April 2026",
    location: "Quezon City, Philippines",
    description: "Enterprise IT support practicum managing workstation deployment, secure user access provisioning, hardware troubleshooting, and ticketing efficiency.",
    highlights: [
      "Reimaged and installed Windows OS on workstations, preparing systems for deployment",
      "Configured user accounts and VPN access, enabling secure and timely user onboarding",
      "Deployed, upgraded, and troubleshot desktops and hardware, ensuring operational readiness",
      "Managed IT asset inventory and equipment lifecycle, maintaining accurate tracking records",
      "Processed workstation setup, retrieval, and replacement requests, supporting daily IT operations",
      "Monitored and documented IT support tickets, improving issue tracking and resolution efficiency",
    ],
    tags: ["Windows OS Imaging", "VPN Configuration", "Hardware Troubleshooting", "IT Asset Tracking", "Ticketing"],
  },
  {
    type: "capstone",
    title: "Capstone Engineering Project",
    roleOrDegree: "Hardware Integration & AI Support Contributor",
    institution: "AGROSENTINEL Project Team",
    period: "Dec. 2025",
    location: "Fatima Robotics Lab",
    description: "IoT & NDVI-based crop disease detection and automated spraying robotic platform designed to protect agricultural yields.",
    highlights: [
      "Assisted in the development of an AI-based agricultural robot with automated spraying during the capstone project",
      "Contributed to the assembly and integration of hardware components, including Raspberry Pi 5, ESP32, motor drivers, sensors, and spraying system",
      "Helped in setting up and testing the robot's movement and spraying functionality",
      "Provided minor support in training the AI model for plant disease detection using image data",
    ],
    tags: ["Raspberry Pi 5", "ESP32", "AI Model Training", "Motor Drivers", "Sensors", "Automated Spraying"],
  },
  {
    type: "education",
    title: "Higher Education",
    roleOrDegree: "Bachelor of Science in Information Technology (BSIT)",
    institution: "Our Lady of Fatima University - Quezon City",
    period: "2022 - 2026",
    location: "Quezon City, Philippines",
    description: "Four-year degree encompassing software development, relational database systems, networking, and systems administration.",
    highlights: [
      "Built grounded proficiency in Python programming, SQL databases, and Git version control",
      "Completed hands-on coursework in systems analysis, web development, and information security",
      "Successfully defended graduation capstone project in IoT robotics and AI image detection",
    ],
    tags: ["Software Engineering", "Python", "SQL", "Networking", "Database Systems"],
  },
];

export default function Timeline() {
  return (
    <section id="journey" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-cyan dark:text-cyan light:text-teal-700 text-sm">
            // 04.
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-navy-900">
            Experience &amp; Education Journey
          </h2>
          <div className="h-px bg-navy-700/80 dark:bg-navy-700/80 light:bg-slate-200 flex-1 ml-4" />
        </div>

        <p className="text-slate-muted dark:text-slate-muted light:text-slate-600 text-sm sm:text-base max-w-3xl mb-14">
          A sequential timeline tracing my enterprise internship at Concentrix, capstone robotics development, and academic degree at Our Lady of Fatima University.
        </p>

        {/* Signal Line Timeline Container */}
        <div className="relative border-l-2 border-navy-700 dark:border-navy-700 light:border-slate-300 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {MILESTONES.map((item, index) => {
            const isEdu = item.type === "education";
            const isExp = item.type === "experience";

            return (
              <div key={index} className="relative group">
                {/* Checkpoint Node on Signal Line */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full border-2 border-cyan bg-[#0A192F] dark:bg-[#0A192F] light:bg-white flex items-center justify-center shadow-lg shadow-cyan/20 group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 rounded-full bg-cyan" />
                </div>

                {/* Milestone Card */}
                <div className="rounded-xl border border-navy-700/80 dark:border-navy-700/80 light:border-slate-200 bg-navy-800/60 dark:bg-navy-800/60 light:bg-white p-6 sm:p-7 shadow-lg card-glow-hover">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 rounded-md bg-navy-900/80 dark:bg-navy-900/80 light:bg-slate-100 border border-navy-700/60 text-cyan dark:text-cyan light:text-teal-700">
                        {isEdu ? (
                          <GraduationCap className="w-4 h-4" />
                        ) : isExp ? (
                          <Briefcase className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </span>
                      <span className="font-mono text-xs text-slate-dim light:text-slate-400 uppercase tracking-wider">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-slate-muted light:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan" />
                        <span>{item.period}</span>
                      </span>
                      <span className="hidden sm:inline">•</span>
                      <span className="hidden sm:flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-slate-lightest dark:text-slate-lightest light:text-navy-900">
                    {item.roleOrDegree}
                  </h3>

                  <p className="font-mono text-xs text-cyan dark:text-cyan light:text-teal-700 mt-0.5 mb-3 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{item.institution}</span>
                  </p>

                  <p className="text-xs sm:text-sm text-slate-muted dark:text-slate-muted light:text-slate-600 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-5">
                    {item.highlights.map((point, pidx) => (
                      <div key={pidx} className="flex items-start gap-2 text-xs text-slate-muted dark:text-slate-muted light:text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skill Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-navy-700/40 dark:border-navy-700/40 light:border-slate-100">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] px-2.5 py-0.5 rounded bg-navy-900/60 dark:bg-navy-900/60 light:bg-slate-100 text-slate-light dark:text-slate-light light:text-navy-900 border border-navy-700/40 light:border-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
