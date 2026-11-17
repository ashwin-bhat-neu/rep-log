import { todayAsCalendarDate } from "./calendarDates.js";

// Inputs hold strings while editing; React list keys keep rows stable when one is removed.
let lastRowKey = 0;
function createRowKey() {
  lastRowKey += 1;
  return lastRowKey;
}

export function createSetRow(previousSet) {
  return {
    key: createRowKey(),
    repetitionCount: previousSet?.repetitionCount ?? "",
    weightKilograms: previousSet?.weightKilograms ?? "",
  };
}

export function createExerciseRow() {
  return {
    key: createRowKey(),
    exerciseName: "",
    targetMuscleGroup: "",
    sets: [createSetRow()],
  };
}

export function toWorkoutFormState(workout) {
  if (!workout) {
    return {
      performedOn: todayAsCalendarDate(),
      notes: "",
      exercises: [createExerciseRow()],
    };
  }
  return {
    performedOn: workout.performedOn,
    notes: workout.notes,
    exercises: workout.exercises.map((exercise) => ({
      key: createRowKey(),
      exerciseName: exercise.exerciseName,
      targetMuscleGroup: exercise.targetMuscleGroup,
      sets: exercise.sets.map((set) => ({
        key: createRowKey(),
        repetitionCount: String(set.repetitionCount),
        weightKilograms:
          set.weightKilograms === null ? "" : String(set.weightKilograms),
      })),
    })),
  };
}

export function toWorkoutPayload(formState) {
  return {
    performedOn: formState.performedOn,
    notes: formState.notes.trim(),
    exercises: formState.exercises.map((exercise) => ({
      exerciseName: exercise.exerciseName.trim(),
      targetMuscleGroup: exercise.targetMuscleGroup,
      sets: exercise.sets.map((set) => ({
        repetitionCount: Number(set.repetitionCount),
        weightKilograms:
          set.weightKilograms === "" ? null : Number(set.weightKilograms),
      })),
    })),
  };
}
