import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWorkoutFilterQuery } from "../../src/database/buildWorkoutFilterQuery.js";

const noFilters = { fromDate: null, toDate: null, exerciseNameFragment: null };

test("without filters only the owner is matched", () => {
  assert.deepEqual(buildWorkoutFilterQuery("user-1", noFilters), {
    userId: "user-1",
  });
});

test("a date range becomes an inclusive performedOn range", () => {
  const query = buildWorkoutFilterQuery("user-1", {
    ...noFilters,
    fromDate: "2026-10-01",
    toDate: "2026-10-31",
  });

  assert.deepEqual(query.performedOn, {
    $gte: "2026-10-01",
    $lte: "2026-10-31",
  });
});

test("either end of the date range can be used alone", () => {
  assert.deepEqual(
    buildWorkoutFilterQuery("user-1", { ...noFilters, fromDate: "2026-10-01" })
      .performedOn,
    { $gte: "2026-10-01" },
  );
  assert.deepEqual(
    buildWorkoutFilterQuery("user-1", { ...noFilters, toDate: "2026-10-31" })
      .performedOn,
    { $lte: "2026-10-31" },
  );
});

test("the exercise filter matches part of a name, ignoring case", () => {
  const query = buildWorkoutFilterQuery("user-1", {
    ...noFilters,
    exerciseNameFragment: "squat",
  });
  const pattern = new RegExp(
    query["exercises.exerciseName"].$regex,
    query["exercises.exerciseName"].$options,
  );

  assert.ok(pattern.test("Barbell Squat"));
  assert.ok(!pattern.test("Bench press"));
});

test("regular expression characters in the exercise filter are matched literally", () => {
  const query = buildWorkoutFilterQuery("user-1", {
    ...noFilters,
    exerciseNameFragment: "curl (EZ)",
  });
  const pattern = new RegExp(query["exercises.exerciseName"].$regex, "i");

  assert.ok(pattern.test("Bicep curl (EZ) slow"));
  assert.ok(!pattern.test("Bicep curl EZ"));
});
