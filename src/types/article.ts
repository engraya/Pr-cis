export interface Article {
  url: string;
  summary: string;
}

export interface SummaryApiResponse {
  summary: string;
}

export interface GeminiApiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
}

export interface SummaryApiError {
  data: {
    error: {
      code: number;
      message: string;
      status: string;
    };
  };
  status: number;
}
