import { isCalendarDate } from "./isCalendarDate.js";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
// A year is the longest range the page asks for; the cap keeps one request from reading a whole history.
const MAXIMUM_RANGE_DAYS = 366;

function daysBetween(fromDate, toDate) {
  return (
    (new Date(`${toDate}T00:00:00Z`) - new Date(`${fromDate}T00:00:00Z`)) /
    MILLISECONDS_PER_DAY
  );
}

// Both ends are required because "the last 7 days" depends on the user's local date, which only the browser knows.
export function validateTrainingBreakdownQuery({ from, to }) {
  if (!isCalendarDate(from) || !isCalendarDate(to)) {
    return { error: "From and To must both be valid YYYY-MM-DD dates" };
  }
  if (from > to) {
    return { error: "From must be on or before To" };
  }
  if (daysBetween(from, to) > MAXIMUM_RANGE_DAYS) {
    return {
      error: `The range can be at most ${MAXIMUM_RANGE_DAYS} days`,
    };
  }
  return { range: { fromDate: from, toDate: to } };
}
