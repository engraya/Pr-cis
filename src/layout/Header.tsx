import { BsGithub, BsSun, BsMoon } from 'react-icons/bs';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '@hooks/useTheme';
import logo from '@/assets/logo.svg';

export function Header() {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 md:pt-4">
        <div className="flex items-center justify-between rounded-none md:rounded-2xl border-b md:border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-3 shadow-sm transition-colors duration-200">
          {/* Logo */}
          <Link to="/" aria-label="Go to home page" className="flex items-center gap-2 shrink-0">
            <img className="h-6 w-auto" src={logo} alt="" aria-hidden="true" />
            <span className="font-bold text-slate-900 dark:text-slate-50 text-base tracking-tight">
              Précis
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/summarize"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              Summarize
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="btn-ghost p-2"
            >
              {theme === 'dark' ? (
                <BsSun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <BsMoon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
            <a
              href="https://github.com/engraya/Pr-cis"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub"
              className="btn-secondary"
            >
              <BsGithub className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
