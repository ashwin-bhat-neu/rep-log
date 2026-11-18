import { validateWorkout } from "../src/validation/workoutValidation.js";
import {
  DEMO_LIFTERS,
  EXERCISES,
  PROGRAMS,
  SESSION_NOTES,
  SESSIONS,
} from "./workoutPrograms.js";

const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const DAYS_PER_WEEK = 7;
const OPTIONAL_EXERCISE_PROBABILITY = 0.7;
// Neglected groups still turn up now and then, so the breakdown shows them as least trained.
const NEGLECTED_EXERCISE_PROBABILITY = 0.08;
const NOTE_PROBABILITY = 0.2;
const LAST_SET_REPETITION_DROP_PROBABILITY = 0.4;
// Plates make 2.5 kg the smallest jump on most gym equipment.
const WEIGHT_INCREMENT_KILOGRAMS = 2.5;
const MAXIMUM_WEIGHT_WOBBLE_INCREMENTS = 1;
// Workouts get logged in the evening, between 5 and 9 p.m. UTC.
const EARLIEST_LOGGING_HOUR_UTC = 17;
const LOGGING_WINDOW_MINUTES = 4 * 60;

function integerBetween(nextRandom, minimum, maximum) {
  return minimum + Math.floor(nextRandom() * (maximum - minimum + 1));
}

function pickOne(nextRandom, items) {
  return items[Math.floor(nextRandom() * items.length)];
}

function roundToIncrement(weightKilograms) {
  return (
    Math.round(weightKilograms / WEIGHT_INCREMENT_KILOGRAMS) *
    WEIGHT_INCREMENT_KILOGRAMS
  );
}

function addDays(calendarDate, dayCount) {
  const date = new Date(`${calendarDate}T00:00:00Z`);
  return new Date(date.getTime() + dayCount * MILLISECONDS_PER_DAY)
    .toISOString()
    .slice(0, 10);
}

function workingWeight(nextRandom, exercise, lifter, weeksTrained) {
  if (exercise.startingWeightKilograms === null) {
    return null;
  }
  const trendWeight =
    (exercise.startingWeightKilograms +
      exercise.weeklyIncreaseKilograms * weeksTrained) *
    lifter.strengthMultiplier;
  const wobbleIncrements = integerBetween(
    nextRandom,
    -MAXIMUM_WEIGHT_WOBBLE_INCREMENTS,
    MAXIMUM_WEIGHT_WOBBLE_INCREMENTS,
  );
  return Math.max(
    WEIGHT_INCREMENT_KILOGRAMS,
    roundToIncrement(trendWeight) +
      wobbleIncrements * WEIGHT_INCREMENT_KILOGRAMS,
  );
}

function buildSets(nextRandom, exercise, weightKilograms) {
  const [fewestRepetitions, mostRepetitions] = exercise.repetitionRange;
  const repetitionCount = integerBetween(
    nextRandom,
    fewestRepetitions,
    mostRepetitions,
  );
  return Array.from({ length: exercise.setCount }, (unused, setIndex) => {
    const isLastSet = setIndex === exercise.setCount - 1;
    const isTiredLastSet =
      isLastSet &&
      repetitionCount > 1 &&
      nextRandom() < LAST_SET_REPETITION_DROP_PROBABILITY;
    return {
      repetitionCount: isTiredLastSet ? repetitionCount - 1 : repetitionCount,
      weightKilograms,
    };
  });
}

function shouldIncludeExercise(nextRandom, exerciseName, isOptional, lifter) {
  const { targetMuscleGroup } = EXERCISES[exerciseName];
  if (lifter.neglectedMuscleGroups.includes(targetMuscleGroup)) {
    return nextRandom() < NEGLECTED_EXERCISE_PROBABILITY;
  }
  return !isOptional || nextRandom() < OPTIONAL_EXERCISE_PROBABILITY;
}

function buildWorkout(nextRandom, sessionName, lifter, weeksTrained) {
  const session = SESSIONS[sessionName];
  const plannedExercises = [
    ...session.coreExercises.map((exerciseName) => [exerciseName, false]),
    ...session.optionalExercises.map((exerciseName) => [exerciseName, true]),
  ];
  const exercises = plannedExercises
    .filter(([exerciseName, isOptional]) =>
      shouldIncludeExercise(nextRandom, exerciseName, isOptional, lifter),
    )
    .map(([exerciseName]) => {
      const exercise = EXERCISES[exerciseName];
      const weightKilograms = workingWeight(
        nextRandom,
        exercise,
        lifter,
        weeksTrained,
      );
      return {
        exerciseName,
        targetMuscleGroup: exercise.targetMuscleGroup,
        sets: buildSets(nextRandom, exercise, weightKilograms),
      };
    });
  const notes =
    nextRandom() < NOTE_PROBABILITY ? pickOne(nextRandom, SESSION_NOTES) : "";
  return { notes, exercises };
}

function loggedAt(nextRandom, performedOn) {
  const minutesAfterEarliest = integerBetween(
    nextRandom,
    0,
    LOGGING_WINDOW_MINUTES,
  );
  const loggedAtDate = new Date(`${performedOn}T00:00:00Z`);
  loggedAtDate.setUTCHours(EARLIEST_LOGGING_HOUR_UTC, minutesAfterEarliest);
  return loggedAtDate;
}

function generateLifterWorkouts(nextRandom, lifter, endDate) {
  const program = PROGRAMS[lifter.programName];
  const startDate = addDays(endDate, -lifter.weeksOfHistory * DAYS_PER_WEEK);
  const workouts = [];
  let sessionIndex = 0;
  for (
    let dayOffset = 0;
    dayOffset <= lifter.weeksOfHistory * DAYS_PER_WEEK;
    dayOffset += 1
  ) {
    const performedOn = addDays(startDate, dayOffset);
    const weekday = new Date(`${performedOn}T00:00:00Z`).getUTCDay();
    const isTrainingDay = program.trainingWeekdays.includes(weekday);
    if (!isTrainingDay || nextRandom() >= lifter.attendanceProbability) {
      continue;
    }
    const sessionName =
      program.sessionNames[sessionIndex % program.sessionNames.length];
    sessionIndex += 1;
    const weeksTrained = Math.floor(dayOffset / DAYS_PER_WEEK);
    const draft = {
      performedOn,
      ...buildWorkout(nextRandom, sessionName, lifter, weeksTrained),
    };
    // Generated data goes through the same rules as the API, so it can't hold anything the app would reject.
    const { error, workout } = validateWorkout(draft);
    if (error) {
      throw new Error(
        `Generated an invalid workout for ${lifter.username} on ${performedOn}: ${error}`,
      );
    }
    const createdAt = loggedAt(nextRandom, performedOn);
    workouts.push({ ...workout, createdAt, updatedAt: createdAt });
  }
  return workouts;
}

// Deterministic for a given random sequence and end date.
export function generateSeedWorkouts(nextRandom, endDate) {
  return DEMO_LIFTERS.map((lifter) => ({
    username: lifter.username,
    workouts: generateLifterWorkouts(nextRandom, lifter, endDate),
  }));
}
