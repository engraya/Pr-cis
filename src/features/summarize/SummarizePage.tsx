import { BsFileText } from 'react-icons/bs';
import { useArticleSummarizer } from './hooks/useArticleSummarizer';
import { UrlForm } from './components/UrlForm';
import { ArticleHistory } from './components/ArticleHistory';
import { SummaryResult } from './components/SummaryResult';
import type { SummaryApiError } from '@/types/article';

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800">
        <BsFileText className="w-7 h-7 text-slate-400" aria-hidden="true" />
      </div>
      <p className="text-base font-medium text-slate-700 dark:text-slate-300">No summary yet</p>
      <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs leading-relaxed">
        Enter an article URL above and click Summarize to get started.
      </p>
    </div>
  );
}

export function SummarizePage() {
  const {
    url,
    setUrl,
    currentArticle,
    articleHistory,
    validationError,
    copiedUrl,
    isFetching,
    error,
    handleSubmit,
    handleSelectFromHistory,
    handleCopy,
    handleRetry,
    handleDeleteFromHistory,
    handleClearHistory,
  } = useArticleSummarizer();

  const hasContent = isFetching || !!error || !!currentArticle;

  return (
    <section className="page-section">
      <div className="page-container max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-3">
            Article Summarizer
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400">
            Paste any article URL and get an AI-powered summary in seconds.
          </p>
        </div>

        {/* URL Input */}
        <div className="mb-10">
          <UrlForm
            url={url}
            isFetching={isFetching}
            validationError={validationError}
            onUrlChange={setUrl}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Content: 2-col when history exists or content is present, else empty state */}
        {articleHistory.length > 0 || hasContent ? (
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
            <ArticleHistory
              articles={articleHistory}
              copiedUrl={copiedUrl}
              onSelect={handleSelectFromHistory}
              onCopy={handleCopy}
              onDelete={handleDeleteFromHistory}
              onClear={handleClearHistory}
            />
            <div>
              {hasContent ? (
                <SummaryResult
                  isFetching={isFetching}
                  error={error as SummaryApiError | undefined}
                  article={currentArticle}
                  onRetry={handleRetry}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </section>
  );
}
