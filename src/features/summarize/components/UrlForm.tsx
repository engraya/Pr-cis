import { BsLink45Deg, BsArrowRight, BsExclamationCircle } from 'react-icons/bs';
import { Spinner } from '@components/index';

interface UrlFormProps {
  url: string;
  isFetching: boolean;
  validationError: string | null;
  onUrlChange: (url: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function UrlForm({
  url,
  isFetching,
  validationError,
  onUrlChange,
  onSubmit,
}: UrlFormProps) {
  return (
    <div className="space-y-2">
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2"
        aria-label="Article URL submission form"
        noValidate
      >
        <label htmlFor="article-url" className="sr-only">
          Article URL
        </label>
        <div className="relative flex-1">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <BsLink45Deg className="h-4 w-4 text-slate-400" aria-hidden="true" />
          </span>
          <input
            id="article-url"
            placeholder="https://example.com/article"
            type="url"
            value={url}
            onChange={e => onUrlChange(e.target.value)}
            disabled={isFetching}
            aria-describedby={validationError ? 'url-error' : undefined}
            aria-invalid={!!validationError}
            className={`input-field pl-9 ${
              validationError
                ? 'border-red-400 focus:ring-red-500 dark:border-red-700'
                : ''
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={isFetching}
          aria-label={isFetching ? 'Summarizing article' : 'Summarize article'}
          className="btn-primary shrink-0"
        >
          {isFetching ? (
            <>
              <Spinner size="sm" label="" />
              <span>Summarizing…</span>
            </>
          ) : (
            <>
              <span>Summarize</span>
              <BsArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
      </form>

      {validationError && (
        <p
          id="url-error"
          role="alert"
          className="flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400"
        >
          <BsExclamationCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {validationError}
        </p>
      )}
    </div>
  );
}
