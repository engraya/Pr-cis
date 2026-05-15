import { describe, it, expect } from 'vitest';
import { articleUrlSchema } from './validators';

describe('articleUrlSchema', () => {
  it('accepts a valid https URL', () => {
    expect(articleUrlSchema.safeParse({ url: 'https://example.com/article' }).success).toBe(true);
  });

  it('accepts a valid http URL', () => {
    expect(articleUrlSchema.safeParse({ url: 'http://example.com' }).success).toBe(true);
  });

  it('rejects an empty string', () => {
    const result = articleUrlSchema.safeParse({ url: '' });
    expect(result.success).toBe(false);
  });

  it('rejects a bare domain with no protocol', () => {
    const result = articleUrlSchema.safeParse({ url: 'example.com/article' });
    expect(result.success).toBe(false);
  });

  it('rejects an ftp URL', () => {
    const result = articleUrlSchema.safeParse({ url: 'ftp://example.com' });
    expect(result.success).toBe(false);
  });

  it('produces a human-readable error message for empty URL', () => {
    const result = articleUrlSchema.safeParse({ url: '' });
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBeTruthy();
    }
  });
});
