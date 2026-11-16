import { MUSCLE_GROUPS } from "../domain/muscleGroups.js";
import { isCalendarDate } from "./isCalendarDate.js";

export const MAXIMUM_NOTES_LENGTH = 500;
export const MAXIMUM_EXERCISES_PER_WORKOUT = 20;
export const MAXIMUM_EXERCISE_NAME_LENGTH = 80;
export const MAXIMUM_SETS_PER_EXERCISE = 20;
export const MAXIMUM_REPETITION_COUNT = 100;
export const MAXIMUM_WEIGHT_KILOGRAMS = 1000;

function isNumberInRange(value, minimum, maximum) {
  return (
    typeof value === "number" &&
    Number.isFinite(value) &&
    value >= minimum &&
    value <= maximum
  );
}

function validateSet(set, location) {
  if (typeof set !== "object" || set === null) {
    return { error: `${location} is missing` };
  }
  const { repetitionCount, weightKilograms = null } = set;
  if (
    !Number.isInteger(repetitionCount) ||
    !isNumberInRange(repetitionCount, 1, MAXIMUM_REPETITION_COUNT)
  ) {
    return {
      error: `${location}: reps must be a whole number from 1 to ${MAXIMUM_REPETITION_COUNT}`,
    };
  }
  if (
    weightKilograms !== null &&
    !isNumberInRange(weightKilograms, 0, MAXIMUM_WEIGHT_KILOGRAMS)
  ) {
    return {
      error: `${location}: weight must be from 0 to ${MAXIMUM_WEIGHT_KILOGRAMS} kg, or empty for bodyweight`,
    };
  }
  return { set: { repetitionCount, weightKilograms } };
}

function validateExercise(exercise, location) {
  if (typeof exercise !== "object" || exercise === null) {
    return { error: `${location} is missing` };
  }
  const exerciseName =
    typeof exercise.exerciseName === "string"
      ? exercise.exerciseName.trim()
      : "";
  if (
    exerciseName.length === 0 ||
    exerciseName.length > MAXIMUM_EXERCISE_NAME_LENGTH
  ) {
    return {
      error: `${location}: name must be 1 to ${MAXIMUM_EXERCISE_NAME_LENGTH} characters`,
    };
  }
  if (!MUSCLE_GROUPS.includes(exercise.targetMuscleGroup)) {
    return {
      error: `${location}: target muscle group must be one of ${MUSCLE_GROUPS.join(", ")}`,
    };
  }
  const { sets } = exercise;
  if (
    !Array.isArray(sets) ||
    sets.length === 0 ||
    sets.length > MAXIMUM_SETS_PER_EXERCISE
  ) {
    return {
      error: `${location}: needs 1 to ${MAXIMUM_SETS_PER_EXERCISE} sets`,
    };
  }
  const validatedSets = [];
  for (const [setIndex, set] of sets.entries()) {
    const result = validateSet(set, `${location}, set ${setIndex + 1}`);
    if (result.error) {
      return result;
    }
    validatedSets.push(result.set);
  }
  return {
    exercise: {
      exerciseName,
      targetMuscleGroup: exercise.targetMuscleGroup,
      sets: validatedSets,
    },
  };
}

// Returns { workout } with only known fields, trimmed, or { error } naming the first problem.
export function validateWorkout(body) {
  if (typeof body !== "object" || body === null) {
    return { error: "Workout is missing" };
  }
  if (!isCalendarDate(body.performedOn)) {
    return { error: "Date must be a valid YYYY-MM-DD date" };
  }
  const notes = body.notes ?? "";
  if (typeof notes !== "string" || notes.trim().length > MAXIMUM_NOTES_LENGTH) {
    return {
      error: `Notes must be at most ${MAXIMUM_NOTES_LENGTH} characters`,
    };
  }
  const { exercises } = body;
  if (
    !Array.isArray(exercises) ||
    exercises.length === 0 ||
    exercises.length > MAXIMUM_EXERCISES_PER_WORKOUT
  ) {
    return {
      error: `A workout needs 1 to ${MAXIMUM_EXERCISES_PER_WORKOUT} exercises`,
    };
  }
  const validatedExercises = [];
  for (const [exerciseIndex, exercise] of exercises.entries()) {
    const result = validateExercise(exercise, `Exercise ${exerciseIndex + 1}`);
    if (result.error) {
      return result;
    }
    validatedExercises.push(result.exercise);
  }
  return {
    workout: {
      performedOn: body.performedOn,
      notes: notes.trim(),
      exercises: validatedExercises,
    },
  };
}
