import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when key does not exist', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', []));
    expect(result.current[0]).toEqual([]);
  });

  it('returns stored value when key exists', () => {
    localStorage.setItem('test-key', JSON.stringify(['a', 'b']));
    const { result } = renderHook(() => useLocalStorage('test-key', []));
    expect(result.current[0]).toEqual(['a', 'b']);
  });

  it('persists value to localStorage on setValue', () => {
    const { result } = renderHook(() => useLocalStorage<string[]>('test-key', []));
    act(() => {
      result.current[1](['item1']);
    });
    expect(JSON.parse(localStorage.getItem('test-key')!)).toEqual(['item1']);
  });

  it('supports functional updater form', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('test-key', [1]));
    act(() => {
      result.current[1](prev => [...prev, 2]);
    });
    expect(result.current[0]).toEqual([1, 2]);
  });

  it('recovers gracefully from corrupt JSON without throwing', () => {
    localStorage.setItem('test-key', '{ invalid json }');
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
    consoleSpy.mockRestore();
  });
});
