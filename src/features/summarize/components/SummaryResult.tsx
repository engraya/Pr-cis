import { useState } from 'react';
import { BsExclamationTriangle, BsClipboard, BsCheck2 } from 'react-icons/bs';
import type { Article, SummaryApiError } from '@/types/article';

interface SummaryResultProps {
  isFetching: boolean;
  error: SummaryApiError | undefined;
  article: Article | null;
  onRetry: () => void;
}

function SkeletonLoader() {
  return (
    <div
      role="status"
      aria-label="Loading summary"
      className="card space-y-4 animate-pulse"
    >
      <div className="flex items-center gap-3">
        <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-4 w-40 rounded bg-slate-100 dark:bg-slate-800" />
      </div>
      <div className="space-y-2.5 pt-1">
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-[92%] rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-[96%] rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-[80%] rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-[88%] rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-[75%] rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

export function SummaryResult({ isFetching, error, article, onRetry }: SummaryResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    if (!article?.summary) return;
    navigator.clipboard.writeText(article.summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (isFetching) {
    return <SkeletonLoader />;
  }

  if (error) {
    const message = error?.data?.error?.message || 'Something went wrong. Please try again.';
    return (
      <div
        role="alert"
        className="card border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 space-y-4"
      >
        <div className="flex items-start gap-3">
          <BsExclamationTriangle
            className="h-5 w-5 text-red-500 shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="space-y-1">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Failed to summarize
            </p>
            <p className="text-sm text-red-600 dark:text-red-500">{message}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="btn-primary bg-red-600 hover:bg-red-700 focus-visible:ring-red-500"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!article?.summary) return null;

  return (
    <div className="card space-y-4" aria-live="polite">
      <div className="flex items-center justify-between">
        <span className="badge">Summary</span>
        <button
          type="button"
          onClick={handleCopySummary}
          aria-label={copied ? 'Copied to clipboard' : 'Copy summary to clipboard'}
          className="btn-ghost text-xs gap-1.5"
        >
          {copied ? (
            <>
              <BsCheck2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <BsClipboard className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      {article.url && (
        <p
          className="text-xs text-slate-400 dark:text-slate-500 truncate"
          title={article.url}
        >
          {article.url}
        </p>
      )}

      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        {article.summary}
      </p>
    </div>
  );
}
