export interface Article {
  url: string;
  summary: string;
}

export interface SummaryApiResponse {
  summary: string;
}

export interface SummaryApiError {
  data: {
    error: string;
  };
  status: number;
}
