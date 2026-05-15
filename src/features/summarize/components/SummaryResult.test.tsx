import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SummaryResult } from './SummaryResult';
import type { SummaryApiError } from '@/types/article';

describe('SummaryResult', () => {
  it('renders a spinner while fetching', () => {
    render(
      <SummaryResult isFetching={true} error={undefined} article={null} onRetry={vi.fn()} />
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the error state with a retry button', async () => {
    const onRetry = vi.fn();
    const error: SummaryApiError = { data: { error: { code: 429, message: 'Rate limit exceeded', status: 'RESOURCE_EXHAUSTED' } }, status: 429 };

    render(
      <SummaryResult isFetching={false} error={error} article={null} onRetry={onRetry} />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Rate limit exceeded')).toBeInTheDocument();

    const retryButton = screen.getByRole('button', { name: /retry/i });
    await userEvent.click(retryButton);
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('renders the summary when an article is provided', () => {
    render(
      <SummaryResult
        isFetching={false}
        error={undefined}
        article={{ url: 'https://example.com', summary: 'A concise summary of the article.' }}
        onRetry={vi.fn()}
      />
    );
    expect(screen.getByText('A concise summary of the article.')).toBeInTheDocument();
  });

  it('renders nothing when idle with no article', () => {
    const { container } = render(
      <SummaryResult isFetching={false} error={undefined} article={null} onRetry={vi.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows a generic error message when error has no message', () => {
    const error: SummaryApiError = { data: { error: { code: 500, message: '', status: 'INTERNAL' } }, status: 500 };
    render(
      <SummaryResult isFetching={false} error={error} article={null} onRetry={vi.fn()} />
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});
