import { 
  parseLocalDateToUtc, 
  formatUtcToLocalDateTime, 
  formatUtcToLocalDate, 
  parseLocalTimeToUtc, 
  getMonthNameFromDateString, 
  isTodayInLocalZone, 
  parseSafeLocalDate 
} from '../../src/utils/date';

describe('date utilities', () => {
  test('formatUtcToLocalDateTime with UTC timezone', () => {
    const res = formatUtcToLocalDateTime('2025-06-07T15:00:00Z', 'UTC');
    expect(res).toContain('7 de junio de 2025');
  });

  test('formatUtcToLocalDate returns only date part', () => {
    expect(formatUtcToLocalDate('2025-06-07T12:00:00Z', 'UTC')).toBe('2025-06-07');
  });

  test('getMonthNameFromDateString returns month name', () => {
    const res = getMonthNameFromDateString('2025-06-07', 'UTC');
    expect(res).toBe('7 de junio de 2025');
  });

  test('isTodayInLocalZone matches current day', () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-02T12:00:00Z'));
    expect(isTodayInLocalZone('2020-01-02T05:00:00Z', 'UTC')).toBe(true);
    expect(isTodayInLocalZone('2020-01-01T05:00:00Z', 'UTC')).toBe(false);
    jest.useRealTimers();
  });

  test('parseSafeLocalDate returns correct Date object', () => {
    const d = parseSafeLocalDate('2020-02-29');
    expect(d.getFullYear()).toBe(2020);
    expect(d.getMonth()).toBe(1);
    expect(d.getDate()).toBe(29);
  });
});