import assert from "node:assert/strict";
import { test } from "node:test";
import { validateWorkoutHistoryQuery } from "../../src/validation/workoutHistoryQueryValidation.js";

test("an empty query means no filters and the first page", () => {
  assert.deepEqual(validateWorkoutHistoryQuery({}), {
    filters: {
      fromDate: null,
      toDate: null,
      exerciseNameFragment: null,
      pageNumber: 1,
    },
  });
});

test("empty strings are treated as no filter", () => {
  const { filters } = validateWorkoutHistoryQuery({
    from: "",
    to: "",
    exercise: "",
    page: "",
  });

  assert.deepEqual(filters, {
    fromDate: null,
    toDate: null,
    exerciseNameFragment: null,
    pageNumber: 1,
  });
});

test("all filters are parsed, with the exercise trimmed and the page as a number", () => {
  const { filters } = validateWorkoutHistoryQuery({
    from: "2026-10-01",
    to: "2026-10-31",
    exercise: "  squat ",
    page: "3",
  });

  assert.deepEqual(filters, {
    fromDate: "2026-10-01",
    toDate: "2026-10-31",
    exerciseNameFragment: "squat",
    pageNumber: 3,
  });
});

test("invalid dates and reversed ranges are rejected", () => {
  assert.match(
    validateWorkoutHistoryQuery({ from: "2026-13-01" }).error,
    /From/,
  );
  assert.match(validateWorkoutHistoryQuery({ to: "yesterday" }).error, /To/);
  assert.equal(
    validateWorkoutHistoryQuery({ from: "2026-10-31", to: "2026-10-01" }).error,
    "From must be on or before To",
  );
});

test("pages must be positive whole numbers", () => {
  for (const page of ["0", "-1", "2.5", "two", ["1", "2"]]) {
    assert.match(validateWorkoutHistoryQuery({ page }).error, /Page/);
  }
});

test("repeated query parameters are rejected rather than crashing", () => {
  assert.ok(
    validateWorkoutHistoryQuery({ exercise: ["squat", "bench"] }).error,
  );
});
