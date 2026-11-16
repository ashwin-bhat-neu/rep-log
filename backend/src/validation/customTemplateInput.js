import { MUSCLE_GROUPS } from "../constants/exerciseCategories.js";

export const NAME_MAX_LENGTH = 80;
export const NOTES_MAX_LENGTH = 500;
export const SET_COUNT_MAX = 20;
export const REPETITION_COUNT_MAX = 100;

function isWholeNumberBetween(value, minimum, maximum) {
  return Number.isInteger(value) && value >= minimum && value <= maximum;
}

function readName(body, errors) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  if (!name) {
    errors.push("Name is required.");
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.push(`Name must be ${NAME_MAX_LENGTH} characters or fewer.`);
  }
  return name;
}

function readTargetMuscleGroups(body, errors) {
  const requested = Array.isArray(body.targetMuscleGroups)
    ? body.targetMuscleGroups
    : [];
  if (requested.some((muscleGroup) => !MUSCLE_GROUPS.includes(muscleGroup))) {
    errors.push(`Muscle groups must come from: ${MUSCLE_GROUPS.join(", ")}.`);
  }
  // Kept in the fixed list's order, so the same selection is always stored the same way.
  const targetMuscleGroups = MUSCLE_GROUPS.filter((muscleGroup) =>
    requested.includes(muscleGroup),
  );
  if (targetMuscleGroups.length === 0) {
    errors.push("Pick at least one target muscle group.");
  }
  return targetMuscleGroups;
}

function readNotes(body, errors) {
  if (body.notes === undefined || body.notes === null) {
    return "";
  }
  if (typeof body.notes !== "string") {
    errors.push("Notes must be text.");
    return "";
  }
  const notes = body.notes.trim();
  if (notes.length > NOTES_MAX_LENGTH) {
    errors.push(`Notes must be ${NOTES_MAX_LENGTH} characters or fewer.`);
  }
  return notes;
}

// Checks a template from the request body and returns either the cleaned fields or the problems found.
export function validateCustomTemplateInput(body) {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { errors: ["Send the template as a JSON object."], template: null };
  }

  const errors = [];
  const name = readName(body, errors);
  const targetMuscleGroups = readTargetMuscleGroups(body, errors);
  const { defaultSetCount, defaultRepetitionCount } = body;
  if (!isWholeNumberBetween(defaultSetCount, 1, SET_COUNT_MAX)) {
    errors.push(
      `Default sets must be a whole number from 1 to ${SET_COUNT_MAX}.`,
    );
  }
  if (!isWholeNumberBetween(defaultRepetitionCount, 1, REPETITION_COUNT_MAX)) {
    errors.push(
      `Default reps must be a whole number from 1 to ${REPETITION_COUNT_MAX}.`,
    );
  }
  const notes = readNotes(body, errors);

  if (errors.length > 0) {
    return { errors, template: null };
  }
  const template = {
    name,
    targetMuscleGroups,
    defaultSetCount,
    defaultRepetitionCount,
    notes,
  };
  return { errors, template };
}
