import { useState, useEffect, useCallback, useRef } from 'react';
import { useLazyGetSummaryQuery } from '@store/index';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { articleUrlSchema } from '@lib/validators';
import { STORAGE_KEYS, UI_CONFIG } from '@lib/constants';
import type { Article } from '@/types/article';

export function useArticleSummarizer() {
  const [url, setUrl] = useState('');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [articleHistory, setArticleHistory] = useLocalStorage<Article[]>(
    STORAGE_KEYS.ARTICLES,
    []
  );

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setValidationError(null);

      const result = articleUrlSchema.safeParse({ url });
      if (!result.success) {
        setValidationError(result.error.issues[0]?.message ?? 'Invalid URL');
        return;
      }

      const cached = articleHistory.find(item => item.url === url);
      if (cached) {
        setCurrentArticle(cached);
        return;
      }

      const { data } = await getSummary({ articleUrl: url });
      if (data?.summary) {
        const newArticle: Article = { url, summary: data.summary };
        const updated = [newArticle, ...articleHistory].slice(0, UI_CONFIG.MAX_HISTORY_ITEMS);
        setCurrentArticle(newArticle);
        setArticleHistory(updated);
      }
    },
    [url, articleHistory, getSummary, setArticleHistory]
  );

  const handleSelectFromHistory = useCallback((article: Article) => {
    setUrl(article.url);
    setCurrentArticle(article);
  }, []);

  const handleCopy = useCallback((copyUrl: string) => {
    void navigator.clipboard.writeText(copyUrl);
    setCopiedUrl(copyUrl);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => {
      setCopiedUrl(null);
    }, UI_CONFIG.COPY_FEEDBACK_DURATION_MS);
  }, []);

  const handleRetry = useCallback(() => {
    if (!url) return;
    void getSummary({ articleUrl: url });
  }, [url, getSummary]);

  const handleDeleteFromHistory = useCallback(
    (deleteUrl: string) => {
      setArticleHistory(articleHistory.filter(item => item.url !== deleteUrl));
      if (currentArticle?.url === deleteUrl) setCurrentArticle(null);
    },
    [articleHistory, currentArticle, setArticleHistory]
  );

  const handleClearHistory = useCallback(() => {
    setArticleHistory([]);
    setCurrentArticle(null);
  }, [setArticleHistory]);

  return {
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
  };
}
