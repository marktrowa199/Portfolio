"use client";

import { Terminal, Github, ArrowUpRight, CheckCircle2, Bot, Database, Cpu } from "lucide-react";

interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  icon: any;
  command: string;
  filePath: string;
  problem: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  terminalOutput: string[];
  githubUrl: string;
}

const PROJECTS: Project[] = [
  {
    id: "agrosentinel",
    title: "AGROSENTINEL: IoT & NDVI Crop Disease Robot",
    tagline: "Autonomous Agricultural Robot with AI-Based Disease Detection & Automated Spraying",
    category: "CAPSTONE ROBOTICS & AI",
    icon: Bot,
    command: "python robot_controller.py --pi5 --esp32 --camera=ndvi0 --spray=auto",
    filePath: "~/agrosentinel/capstone/main_controller.py",
    problem: "Agricultural crop diseases often spread rapidly without early localized detection, while manual broadcast spraying wastes expensive chemical treatments and increases human hazard.",
    solution: "Co-developed an AI-powered agricultural robot utilizing a Raspberry Pi 5 central unit and ESP32 microcontroller to drive motor actuators, capture crop image data, evaluate plant health, and trigger localized automated spraying.",
    highlights: [
      "Assisted in the development of an AI-based agricultural robot with automated spraying during the capstone project",
      "Contributed to the assembly and integration of hardware components, including Raspberry Pi 5, ESP32, motor drivers, sensors, and spraying system",
      "Helped in setting up and testing the robot's movement and spraying functionality across test tracks",
      "Provided support in training the AI model for plant disease detection using image datasets",
    ],
    techStack: ["Python", "Raspberry Pi 5", "ESP32", "Motor Drivers", "Sensors", "AI Image Training", "IoT"],
    terminalOutput: [
      "[SYS] Initializing AGROSENTINEL onboard Raspberry Pi 5...",
      "[HARDWARE] ESP32 motor controller handshake: CONNECTED",
      "[CAMERA] Ingesting NDVI crop frame 1080x720 (45 FPS)",
      "[AI_INFERENCE] Scanning leaf cluster: Model confidence 94.2%",
      "[ACTUATE] Targeted anomaly confirmed -> Solenoid spray valve triggered (0.8s)",
      "[STATUS] Sector 4 inspection complete: 1 anomaly treated, robot moving to node #05",
    ],
    githubUrl: "https://github.com/marktrowa199",
  },
  {
    id: "data-pipeline",
    title: "Python & SQL Analytics Pipeline with OpenAI API",
    tagline: "Automated Data Cleaning, SQL Query Aggregation & AI Text Synthesis",
    category: "DATA & BACKEND",
    icon: Database,
    command: "python pipeline.py --ingest records.csv --db postgres --summarize-ai",
    filePath: "~/data-engineering/analytics_pipeline.py",
    problem: "Heterogeneous datasets require rigorous cleaning, relational SQL transformation, and human-readable summarization before reporting.",
    solution: "Engineered a data pipeline leveraging Python, SQL relational aggregations, and OpenAI API integration (certified via DataCamp) to process raw data batches and synthesize analytical summaries.",
    highlights: [
      "Implemented relational SQL filtering, multi-table joins, and aggregate window metrics",
      "Applied Pandas for missing-value handling, anomaly detection, and type normalization",
      "Integrated OpenAI API to generate automated executive summaries of data anomalies",
      "Backed by DataCamp Python Data Associate and SQL certifications",
    ],
    techStack: ["Python", "SQL", "Pandas", "OpenAI API", "PostgreSQL", "DataCamp"],
    terminalOutput: [
      "[INFO] Loading source records into Pandas dataframe...",
      "[CLEAN] Normalized 12,450 rows, 0 null type conflicts",
      "[SQL] Executing relational aggregation query on SQL database...",
      "[AI] Calling OpenAI API endpoint for natural language KPI summary...",
      "[SUCCESS] Pipeline executed in 0.61s. Report exported to dist/kpi_summary.md",
    ],
    githubUrl: "https://github.com/marktrowa199",
  },
  {
    id: "it-ops-toolkit",
    title: "IT Operations & Workstation Diagnostics Suite",
    tagline: "System Deployment Scripts, VPN Verification & Health Diagnostics",
    category: "ENTERPRISE SYSTEMS",
    icon: Cpu,
    command: "powershell -File ./deploy_workstation.ps1 -Profile User -VPN -AssetAudit",
    filePath: "~/sysops/deployment_automation.ps1",
    problem: "Manual workstation provisioning, VPN configuration, and hardware health troubleshooting across enterprise environments causes onboarding delays.",
    solution: "Developed operational scripts inspired by hands-on enterprise IT support at Concentrix to streamline system preparation, audit device hardware, and verify secure VPN network connectivity.",
    highlights: [
      "Automated system configuration checks, user profile setup, and VPN endpoint ping testing",
      "Standardized hardware inventory logging to assist in equipment lifecycle management",
      "Formulated clear diagnostic logging routines to reduce support ticket turnaround time",
      "Grounded in enterprise IT Operations experience at Concentrix",
    ],
    techStack: ["Python", "PowerShell", "Windows OS", "Networking / VPN", "Hardware Diagnostics"],
    terminalOutput: [
      "[DEPLOY] Reading workstation image configuration...",
      "[SECURITY] Provisioning user accounts & verifying VPN tunnel integrity...",
      "[HARDWARE] Desktop hardware diagnostics: CPU, RAM, Disk SMART check: ALL PASSED",
      "[ASSET] Serial #CTX-9481 logged to IT asset inventory database",
      "[STATUS] Workstation operational & ready for deployment",
    ],
    githubUrl: "https://github.com/marktrowa199",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-cyan dark:text-cyan light:text-[#0F766E] text-sm font-medium">
            // 03.
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
            Featured Projects &amp; Capstone
          </h2>
          <div className="h-px bg-navy-700/80 dark:bg-navy-700/80 light:bg-[#E2E6EC] flex-1 ml-4" />
        </div>

        <p className="text-slate-muted dark:text-slate-muted light:text-[#525E72] text-sm sm:text-base max-w-3xl mb-12 font-normal">
          Projects built with authentic engineering rigor, including my team capstone agricultural robot, certified SQL &amp; Python data pipelines, and IT operations automation.
        </p>

        {/* Project Cards - Terminal Framed */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => {
            const Icon = project.icon;
            return (
              <div
                key={project.id}
                className="rounded-2xl border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-800/80 dark:bg-navy-800/80 light:bg-white shadow-xl light:shadow-sm overflow-hidden card-glow-hover"
              >
                {/* Terminal Window Chrome */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-navy-900/90 dark:bg-navy-900/90 light:bg-[#EEF1F6] border-b border-navy-700/70 dark:border-navy-700/70 light:border-[#E2E6EC]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-3 font-mono text-xs text-slate-muted light:text-[#7B879C] hidden sm:inline">
                      {project.filePath}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-wider px-2.5 py-0.5 rounded-md bg-cyan/10 light:bg-[#E6F4F2] text-cyan dark:text-cyan light:text-[#0F766E] border border-cyan/20 light:border-[#B2DFDB] uppercase font-medium">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-slate-dim light:text-[#7B879C]">
                      // 0{index + 1}
                    </span>
                  </div>
                </div>

                {/* Main Card Content */}
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left: Project Narrative (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] border border-navy-700/60 light:border-[#E2E6EC] text-cyan dark:text-cyan light:text-[#0F766E] mt-1">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-sans text-cyan dark:text-cyan light:text-[#0F766E] font-medium mt-0.5">
                          {project.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Problem & Solution */}
                    <div className="space-y-3 text-xs sm:text-sm text-slate-muted dark:text-slate-muted light:text-[#525E72] font-normal">
                      <div>
                        <span className="font-sans text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold block mb-0.5 text-xs">
                          [PROBLEM &amp; CONTEXT]
                        </span>
                        <p className="leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <span className="font-sans text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold block mb-0.5 text-xs">
                          [ENGINEERED IMPLEMENTATION]
                        </span>
                        <p className="leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    {/* Key Highlights from Arthur's Resume */}
                    <div>
                      <span className="font-sans text-xs text-slate-lightest dark:text-slate-lightest light:text-[#111620] font-semibold block mb-2">
                        [MY DIRECT CONTRIBUTIONS]
                      </span>
                      <ul className="space-y-1.5 font-normal">
                        {project.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-muted dark:text-slate-muted light:text-[#525E72]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan light:text-[#0F766E] shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-xs px-2.5 py-1 rounded-lg bg-navy-900/60 dark:bg-navy-900/60 light:bg-[#EEF1F6] border border-navy-700/50 light:border-[#E2E6EC] text-slate-light dark:text-slate-lightest light:text-[#1E2530]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold border border-navy-700 dark:border-navy-700 light:border-[#E2E6EC] bg-navy-900/60 dark:bg-navy-900/60 light:bg-white text-slate-lightest dark:text-slate-lightest light:text-[#1E2530] hover:border-cyan hover:text-cyan light:hover:border-[#0F766E]/40 light:hover:text-[#0F766E] light:shadow-sm transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repository</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Simulated Terminal Output Box (5 cols) */}
                  <div className="lg:col-span-5 w-full">
                    <div className="rounded-xl bg-[#050C18] border border-navy-700/80 light:border-[#1E293B] p-4 font-mono text-xs shadow-inner">
                      {/* Shell Prompt */}
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-navy-700/50 text-slate-dim">
                        <Terminal className="w-3.5 h-3.5 text-cyan" />
                        <span className="text-[11px] text-slate-light truncate">
                          $ {project.command}
                        </span>
                      </div>

                      {/* Output Lines */}
                      <div className="space-y-2 text-[11px] leading-relaxed">
                        {project.terminalOutput.map((line, lidx) => (
                          <div
                            key={lidx}
                            className={`${
                              line.includes("[SUCCESS]") || line.includes("[ACTUATE]")
                                ? "text-emerald-400"
                                : line.includes("[WARN]")
                                ? "text-amber-400"
                                : line.includes("[AI_INFERENCE]") || line.includes("[SQL]")
                                ? "text-signal-blue"
                                : line.includes("[INFO]") || line.includes("[HARDWARE]")
                                ? "text-slate-light"
                                : "text-slate-muted"
                            }`}
                          >
                            {line}
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-navy-700/40 flex items-center justify-between text-[10px] text-slate-dim">
                        <span>PROCESS_STATUS: 0</span>
                        <span className="text-cyan animate-pulse">● OPERATIONAL</span>
                      </div>
                    </div>
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
