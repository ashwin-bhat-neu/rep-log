const CALENDAR_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// True for real YYYY-MM-DD dates; rejects shapes like 2026-02-30 that Date would roll over.
export function isCalendarDate(value) {
  if (typeof value !== "string" || !CALENDAR_DATE_PATTERN.test(value)) {
    return false;
  }
  const parsedDate = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value
  );
}
