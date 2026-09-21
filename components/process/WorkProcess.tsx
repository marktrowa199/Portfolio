import {
  ClipboardList,
  Code2,
  ListChecks,
  Wrench,
} from "lucide-react";

const PROCESS_STAGES = [
  {
    number: "01",
    title: "Understand",
    icon: ClipboardList,
    description:
      "Understand the project requirements, goals, users, and expected functionality before writing code.",
  },
  {
    number: "02",
    title: "Plan",
    icon: ListChecks,
    description:
      "Break the requirements into manageable tasks, organize the project structure, and plan the screens, features, and data flow.",
  },
  {
    number: "03",
    title: "Build",
    icon: Code2,
    description:
      "Develop the functionality step by step, focusing on clean implementation, testing, and making sure each feature works as expected.",
  },
  {
    number: "04",
    title: "Refine",
    icon: Wrench,
    description:
      "Test, debug, improve the user experience, organize the code, and document the project so it is easier to maintain and continue developing.",
  },
];

export default function WorkProcess() {
  return (
    <section id="work-process" className="py-20 lg:py-28 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-cyan dark:text-cyan light:text-[#0F766E] text-sm font-medium">
            // 03.
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-lightest dark:text-slate-lightest light:text-[#111620]">
            Work Process
          </h2>
          <div className="h-px bg-navy-700/80 dark:bg-navy-700/80 light:bg-[#E2E6EC] flex-1 ml-4" />
        </div>

        <p className="font-mono text-sm text-cyan dark:text-cyan light:text-[#0F766E] mb-3">
          How I approach a project
        </p>
        <p className="text-slate-muted dark:text-slate-muted light:text-[#525E72] text-sm sm:text-base max-w-3xl mb-10 font-normal">
          A clear process helps me turn requirements into organized screens, working features, and documentation that is easier to maintain.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="hidden lg:block absolute left-[12.5%] right-[12.5%] top-8 h-px bg-cyan/25 light:bg-[#0F766E]/25" />

          {PROCESS_STAGES.map((stage) => {
            const Icon = stage.icon;

            return (
              <article
                key={stage.number}
                className="relative rounded-2xl border border-navy-700/80 dark:border-navy-700/80 light:border-[#E2E6EC] bg-navy-800/50 dark:bg-navy-800/50 light:bg-white p-6 card-glow-hover"
              >
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-cyan/30 bg-navy-900/80 dark:bg-navy-900/80 light:bg-[#EEF1F6] light:border-[#B2DFDB] text-cyan dark:text-cyan light:text-[#0F766E]">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="font-mono text-sm font-medium text-slate-dim light:text-[#625C53]">
                    {stage.number}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-slate-lightest dark:text-slate-lightest light:text-[#111620] mb-3">
                  {stage.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-muted dark:text-slate-muted light:text-[#4F4A43]">
                  {stage.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-wider text-slate-dim light:text-[#625C53]">
          <span>Understand</span>
          <span className="text-cyan light:text-[#0F766E]" aria-hidden="true">→</span>
          <span>Plan</span>
          <span className="text-cyan light:text-[#0F766E]" aria-hidden="true">→</span>
          <span>Build</span>
          <span className="text-cyan light:text-[#0F766E]" aria-hidden="true">→</span>
          <span>Refine</span>
        </div>
      </div>
    </section>
  );
}