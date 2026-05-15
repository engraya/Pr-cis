import {
  BsLightningCharge,
  BsDatabase,
  BsShieldCheck,
  BsClockHistory,
  BsUnlock,
  BsGithub,
} from 'react-icons/bs';

const features = [
  {
    Icon: BsLightningCharge,
    title: 'Instant AI Summaries',
    description:
      'Get accurate, concise summaries of any article in seconds using advanced NLP algorithms.',
  },
  {
    Icon: BsDatabase,
    title: 'Smart Caching',
    description:
      'Already-summarized articles are cached locally so repeated requests are instantaneous.',
  },
  {
    Icon: BsShieldCheck,
    title: 'URL Validation',
    description:
      'Smart URL validation ensures only valid article links are submitted, preventing errors before they happen.',
  },
  {
    Icon: BsClockHistory,
    title: 'History Browser',
    description: 'Browse and re-access up to 20 of your recent summaries without re-fetching.',
  },
  {
    Icon: BsUnlock,
    title: 'Zero Sign-Up',
    description:
      'No account, no email, no friction. Start summarizing immediately — completely free.',
  },
  {
    Icon: BsGithub,
    title: 'Open Source',
    description:
      'Fully open source on GitHub. Inspect the code, report issues, or contribute your improvements.',
  },
] as const;

export function Features() {
  return (
    <section
      className="page-section border-t border-slate-100 dark:border-slate-900"
      aria-label="Features"
    >
      <div className="page-container">
        {/* Header */}
        <div className="mb-12 text-center space-y-3">
          <span className="badge">Features</span>
          <h2 className="section-title">Everything you need</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A focused set of tools built to make reading the web faster and smarter.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950">
                <Icon
                  className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50 mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
