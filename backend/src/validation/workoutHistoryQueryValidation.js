import { isCalendarDate } from "./isCalendarDate.js";
import { MAXIMUM_EXERCISE_NAME_LENGTH } from "./workoutValidation.js";

const POSITIVE_INTEGER_PATTERN = /^[1-9]\d*$/;

function isPresent(value) {
  return value !== undefined && value !== "";
}

// Turns ?from=&to=&exercise=&page= into { filters } or { error }; empty values mean "no filter".
export function validateWorkoutHistoryQuery(query) {
  const { from, to, exercise, page } = query;
  if (isPresent(from) && !isCalendarDate(from)) {
    return { error: "From must be a valid YYYY-MM-DD date" };
  }
  if (isPresent(to) && !isCalendarDate(to)) {
    return { error: "To must be a valid YYYY-MM-DD date" };
  }
  if (isPresent(from) && isPresent(to) && from > to) {
    return { error: "From must be on or before To" };
  }
  if (
    isPresent(exercise) &&
    (typeof exercise !== "string" ||
      exercise.trim().length > MAXIMUM_EXERCISE_NAME_LENGTH)
  ) {
    return {
      error: `Exercise filter must be at most ${MAXIMUM_EXERCISE_NAME_LENGTH} characters`,
    };
  }
  if (
    isPresent(page) &&
    (typeof page !== "string" || !POSITIVE_INTEGER_PATTERN.test(page))
  ) {
    return { error: "Page must be a positive whole number" };
  }
  return {
    filters: {
      fromDate: isPresent(from) ? from : null,
      toDate: isPresent(to) ? to : null,
      exerciseNameFragment: isPresent(exercise) ? exercise.trim() : null,
      pageNumber: isPresent(page) ? Number(page) : 1,
    },
  };
}
