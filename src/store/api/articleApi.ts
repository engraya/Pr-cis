import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SummaryApiResponse } from '@/types/article';
import { API_CONFIG } from '@/lib/constants';

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY as string | undefined;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: headers => {
      if (!rapidApiKey) {
        console.error(
          '[QuickSum] VITE_RAPID_API_ARTICLE_KEY is not set. API calls will fail.'
        );
        return headers;
      }
      headers.set('X-RapidAPI-Key', rapidApiKey);
      headers.set('X-RapidAPI-Host', API_CONFIG.HOST);
      return headers;
    },
  }),
  endpoints: builder => ({
    getSummary: builder.query<SummaryApiResponse, { articleUrl: string }>({
      query: ({ articleUrl }) =>
        `summarize?url=${encodeURIComponent(articleUrl)}&length=${API_CONFIG.SUMMARY_LENGTH}`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
