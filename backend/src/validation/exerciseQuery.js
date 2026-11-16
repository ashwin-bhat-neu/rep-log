import {
  DIFFICULTY_LEVELS,
  EQUIPMENT_TYPES,
  MUSCLE_GROUPS,
} from "../constants/exerciseCategories.js";

const SEARCH_MAX_LENGTH = 80;

function readText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function readChoice(value, allowedValues, label, errors) {
  const choice = readText(value);
  if (choice && !allowedValues.includes(choice)) {
    errors.push(`${label} must be one of: ${allowedValues.join(", ")}.`);
  }
  return choice;
}

// Turns ?search=&muscleGroup=&equipment=&difficulty=&page= into search criteria. Empty values mean "any".
export function parseExerciseQuery(query) {
  const errors = [];
  const search = readText(query.search).slice(0, SEARCH_MAX_LENGTH);
  const muscleGroup = readChoice(
    query.muscleGroup,
    MUSCLE_GROUPS,
    "Muscle group",
    errors,
  );
  const equipment = readChoice(
    query.equipment,
    EQUIPMENT_TYPES,
    "Equipment",
    errors,
  );
  const difficulty = readChoice(
    query.difficulty,
    DIFFICULTY_LEVELS,
    "Difficulty",
    errors,
  );

  const pageText = readText(query.page) || "1";
  const page = Number(pageText);
  if (!Number.isInteger(page) || page < 1) {
    errors.push("Page must be a whole number of 1 or more.");
  }

  return {
    errors,
    criteria: { search, muscleGroup, equipment, difficulty, page },
  };
}
