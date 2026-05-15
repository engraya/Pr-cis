import { BsGithub, BsLinkedin, BsTwitterX } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <p className="font-bold text-slate-900 dark:text-slate-50">Précis</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-[220px] leading-relaxed">
              Read less, know more. AI-powered article summaries in seconds.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-600">
              &copy; {new Date().getFullYear()} Précis. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/summarize"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  Summarize
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/engraya/Pr-cis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Connect
            </p>
            <div className="flex gap-1">
              <a
                href="https://github.com/engraya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="btn-ghost p-2"
              >
                <BsGithub className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="www.linkedin.com/in/engrahmadaya"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="btn-ghost p-2"
              >
                <BsLinkedin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
