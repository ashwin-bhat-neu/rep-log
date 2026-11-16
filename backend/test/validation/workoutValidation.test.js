import assert from "node:assert/strict";
import { test } from "node:test";
import {
  MAXIMUM_EXERCISES_PER_WORKOUT,
  MAXIMUM_NOTES_LENGTH,
  MAXIMUM_SETS_PER_EXERCISE,
  validateWorkout,
} from "../../src/validation/workoutValidation.js";

function buildValidWorkout(overrides = {}) {
  return {
    performedOn: "2026-11-10",
    notes: "  Squats felt heavy  ",
    exercises: [
      {
        exerciseName: "  Barbell squat ",
        targetMuscleGroup: "Quadriceps",
        sets: [
          { repetitionCount: 8, weightKilograms: 60 },
          { repetitionCount: 8, weightKilograms: 62.5 },
        ],
      },
      {
        exerciseName: "Plank",
        targetMuscleGroup: "Core",
        sets: [{ repetitionCount: 1 }],
      },
    ],
    ...overrides,
  };
}

function withFirstExercise(exerciseOverrides) {
  const workout = buildValidWorkout();
  workout.exercises[0] = { ...workout.exercises[0], ...exerciseOverrides };
  return workout;
}

test("a valid workout is returned trimmed, with missing weights as null", () => {
  assert.deepEqual(validateWorkout(buildValidWorkout()), {
    workout: {
      performedOn: "2026-11-10",
      notes: "Squats felt heavy",
      exercises: [
        {
          exerciseName: "Barbell squat",
          targetMuscleGroup: "Quadriceps",
          sets: [
            { repetitionCount: 8, weightKilograms: 60 },
            { repetitionCount: 8, weightKilograms: 62.5 },
          ],
        },
        {
          exerciseName: "Plank",
          targetMuscleGroup: "Core",
          sets: [{ repetitionCount: 1, weightKilograms: null }],
        },
      ],
    },
  });
});

test("unknown fields such as userId are dropped", () => {
  const { workout } = validateWorkout(
    buildValidWorkout({ userId: "someone-else", createdAt: "yesterday" }),
  );

  assert.deepEqual(Object.keys(workout), ["performedOn", "notes", "exercises"]);
});

test("notes are optional", () => {
  const { workout } = validateWorkout(buildValidWorkout({ notes: undefined }));

  assert.equal(workout.notes, "");
});

test("invalid or impossible dates are rejected", () => {
  for (const performedOn of [
    "2026-02-30",
    "11/10/2026",
    "",
    undefined,
    20261110,
  ]) {
    assert.match(
      validateWorkout(buildValidWorkout({ performedOn })).error,
      /Date/,
    );
  }
});

test("notes over the limit are rejected", () => {
  const notes = "x".repeat(MAXIMUM_NOTES_LENGTH + 1);

  assert.match(validateWorkout(buildValidWorkout({ notes })).error, /Notes/);
});

test("a workout needs between 1 and the maximum number of exercises", () => {
  const tooMany = Array.from(
    { length: MAXIMUM_EXERCISES_PER_WORKOUT + 1 },
    () => buildValidWorkout().exercises[0],
  );
  for (const exercises of [[], tooMany, "squat", undefined]) {
    assert.match(
      validateWorkout(buildValidWorkout({ exercises })).error,
      /1 to 20 exercises/,
    );
  }
});

test("blank exercise names are rejected with the exercise's position", () => {
  assert.equal(
    validateWorkout(withFirstExercise({ exerciseName: "   " })).error,
    "Exercise 1: name must be 1 to 80 characters",
  );
});

test("muscle groups outside the shared list are rejected", () => {
  assert.match(
    validateWorkout(withFirstExercise({ targetMuscleGroup: "Pectorals" }))
      .error,
    /^Exercise 1: target muscle group must be one of Chest/,
  );
});

test("an exercise needs between 1 and the maximum number of sets", () => {
  const tooMany = Array.from({ length: MAXIMUM_SETS_PER_EXERCISE + 1 }, () => ({
    repetitionCount: 5,
  }));
  for (const sets of [[], tooMany]) {
    assert.equal(
      validateWorkout(withFirstExercise({ sets })).error,
      "Exercise 1: needs 1 to 20 sets",
    );
  }
});

test("reps must be a whole number from 1 to 100, reported with the set's position", () => {
  for (const repetitionCount of [0, 101, 7.5, "8", undefined]) {
    const sets = [{ repetitionCount: 8 }, { repetitionCount }];
    assert.equal(
      validateWorkout(withFirstExercise({ sets })).error,
      "Exercise 1, set 2: reps must be a whole number from 1 to 100",
    );
  }
});

test("weight must be empty or from 0 to 1000 kg", () => {
  for (const weightKilograms of [-1, 1000.5, "60", Number.NaN]) {
    const sets = [{ repetitionCount: 8, weightKilograms }];
    assert.match(
      validateWorkout(withFirstExercise({ sets })).error,
      /set 1: weight/,
    );
  }
  const bodyweightSets = [{ repetitionCount: 8, weightKilograms: 0 }];
  assert.ok(
    validateWorkout(withFirstExercise({ sets: bodyweightSets })).workout,
  );
});

test("a missing body is rejected instead of throwing", () => {
  assert.equal(validateWorkout(undefined).error, "Workout is missing");
  assert.equal(
    validateWorkout(buildValidWorkout({ exercises: [null] })).error,
    "Exercise 1 is missing",
  );
});
