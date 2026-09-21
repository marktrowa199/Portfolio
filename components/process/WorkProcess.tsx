import React from 'react';

export default function WorkProcess() {
  const steps = [
    {
      number: '01',
      title: 'Understand',
      description:
        'Understand the project requirements, goals, users, and expected functionality before writing code.',
    },
    {
      number: '02',
      title: 'Plan',
      description:
        'Break the requirements into manageable tasks, organize the project structure, and plan the screens, features, and data flow.',
    },
    {
      number: '03',
      title: 'Build',
      description:
        'Develop the functionality step by step, focusing on clean implementation, testing, and making sure each feature works as expected.',
    },
    {
      number: '04',
      title: 'Refine',
      description:
        'Test, debug, improve the user experience, organize the code, and document the project so it is easier to maintain and continue developing.',
    },
  ];

  return (
    <section className="w-full py-20 bg-slate-50 dark:bg-[#0B1120] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 max-w-2xl">
          <h2 className="text-xs font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 uppercase mb-2">
            Work Process
          </h2>
          <p className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-4">
            How I approach a project
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            A clear process helps me turn requirements into organized screens, working features, and documentation that is easier to maintain.
          </p>
        </div>

        {/* Process Progression Grid */}
        <div className="relative">
          
          {/* Progression Line (Desktop only) */}
          <div 
            aria-hidden="true" 
            className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-slate-200 dark:bg-slate-800 z-0" 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="group flex flex-col justify-between p-6 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all duration-200"
              >
                <div>
                  {/* Step Indicator & Number */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-mono font-semibold text-cyan-600 dark:text-cyan-400">
                      {step.number}
                    </span>
                    {/* Small minimal visual accent dot */}
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-cyan-500 transition-colors duration-200" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Vertical progression indicator for mobile list flow */}
                {index < steps.length - 1 && (
                  <div 
                    aria-hidden="true" 
                    className="block lg:hidden w-[1px] h-4 bg-slate-200 dark:bg-slate-800 my-4 mx-auto" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}