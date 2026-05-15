import { Link } from 'react-router-dom';
import { BsArrowRight, BsGithub } from 'react-icons/bs';

export function LandingText() {
  return (
    <section className="page-section text-center" aria-label="Hero">
      <div className="page-container max-w-4xl mx-auto animate-fade-in">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="badge">✦ AI-Powered Summarization</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] text-slate-900 dark:text-slate-50 mb-6">
          Read Less.
          <br />
          <span className="text-indigo-600">Know More.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
          Paste any article URL and get a clear, AI-generated summary in seconds. No sign-up
          required.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/summarize" className="btn-primary text-base px-6 py-3">
            Start Summarizing
            <BsArrowRight aria-hidden="true" />
          </Link>
          <a
            href="https://github.com/engraya/QuickSum-AI"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-6 py-3"
          >
            <BsGithub aria-hidden="true" />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
