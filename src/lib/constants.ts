export const STORAGE_KEYS = {
  ARTICLES: 'quicksum_articles',
} as const;

export const API_CONFIG = {
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/',
  MODEL: 'gemini-3-flash-preview',
  SUMMARY_SENTENCES: 3,
} as const;

export const UI_CONFIG = {
  COPY_FEEDBACK_DURATION_MS: 3000,
  MAX_HISTORY_ITEMS: 20,
} as const;
