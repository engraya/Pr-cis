import { BsArrowUpRight, BsClipboard, BsCheck2, BsLink45Deg, BsTrash, BsX } from 'react-icons/bs';
import type { Article } from '@/types/article';

interface ArticleHistoryProps {
  articles: Article[];
  copiedUrl: string | null;
  onSelect: (article: Article) => void;
  onCopy: (url: string) => void;
  onDelete: (url: string) => void;
  onClear: () => void;
}

export function ArticleHistory({
  articles,
  copiedUrl,
  onSelect,
  onCopy,
  onDelete,
  onClear,
}: ArticleHistoryProps) {
  if (articles.length === 0) return null;

  return (
    <aside aria-label="Recent articles" className="card p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Recent</h2>
        <div className="flex items-center gap-2">
          <span className="badge">{articles.length}</span>
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear all history"
            title="Clear all"
            className="p-1 rounded text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            <BsTrash className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <ul className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[400px] overflow-y-auto">
        {articles.map((item, index) => (
          <li
            key={`link-${index}`}
            className="group flex items-center gap-2 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <BsLink45Deg
              className="h-3.5 w-3.5 text-slate-400 shrink-0"
              aria-hidden="true"
            />
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="flex-1 text-xs text-slate-600 dark:text-slate-400 truncate text-left hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item.url}
            </button>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-label="Open summary for this URL"
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                <BsArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onCopy(item.url);
                }}
                aria-label={copiedUrl === item.url ? 'Copied' : 'Copy URL'}
                className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                {copiedUrl === item.url ? (
                  <BsCheck2 className="h-3 w-3 text-emerald-500" aria-hidden="true" />
                ) : (
                  <BsClipboard className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  onDelete(item.url);
                }}
                aria-label="Remove from history"
                className="p-1 rounded text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                <BsX className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
