import { describe, it, expect } from 'vitest';
import { formatDuration } from './formatDuration';

describe('formatDuration', () => {
  it('formats 0 seconds as 00:00:00', () => {
    expect(formatDuration(0)).toBe('00:00:00');
  });

  it('formats seconds only', () => {
    expect(formatDuration(42)).toBe('00:00:42');
  });

  it('formats minutes and seconds', () => {
    expect(formatDuration(125)).toBe('00:02:05');
  });

  it('formats hours, minutes and seconds', () => {
    expect(formatDuration(3661)).toBe('01:01:01');
  });

  it('formats large values', () => {
    expect(formatDuration(73840)).toBe('20:30:40');
  });

  it('returns 00:00:00 for negative values', () => {
    expect(formatDuration(-5)).toBe('00:00:00');
  });
});
