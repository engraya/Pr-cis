import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { SummaryApiResponse, GeminiApiResponse } from '@/types/article';
import { API_CONFIG } from '@/lib/constants';

const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

export const articleApi = createApi({
  reducerPath: 'articleApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_CONFIG.BASE_URL }),
  endpoints: builder => ({
    getSummary: builder.query<SummaryApiResponse, { articleUrl: string }>({
      query: ({ articleUrl }) => {
        if (!geminiApiKey) {
          console.error('[Précis] VITE_GEMINI_API_KEY is not set. API calls will fail.');
        }
        return {
          url: `models/${API_CONFIG.MODEL}:generateContent?key=${geminiApiKey ?? ''}`,
          method: 'POST',
          body: {
            contents: [
              {
                parts: [
                  {
                    text: `Provide a concise summary of the article at this URL in ${API_CONFIG.SUMMARY_SENTENCES} paragraphs, focusing on key points and main ideas: ${articleUrl}`,
                  },
                ],
              },
            ],
            tools: [{ url_context: {} }],
          },
        };
      },
      transformResponse: (response: GeminiApiResponse): SummaryApiResponse => ({
        summary: response.candidates[0]?.content?.parts[0]?.text ?? '',
      }),
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
