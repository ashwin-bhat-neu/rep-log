import { escapeRegularExpression } from "../utilities/escapeRegularExpression.js";
import { CASE_INSENSITIVE_COLLATION } from "./collations.js";
import { getDatabase } from "./databaseConnection.js";

export const EXERCISES_PER_PAGE = 20;

// The list only needs enough to show a row; the detail page loads the rest.
const LIST_PROJECTION = {
  name: 1,
  primaryMuscleGroup: 1,
  secondaryMuscleGroups: 1,
  equipment: 1,
  difficulty: 1,
};

async function getExercisesCollection() {
  const database = await getDatabase();
  return database.collection("exercises");
}

function buildExerciseFilter({ search, muscleGroup, equipment, difficulty }) {
  const filter = {};
  if (search) {
    filter.name = { $regex: escapeRegularExpression(search), $options: "i" };
  }
  if (muscleGroup) {
    filter.$or = [
      { primaryMuscleGroup: muscleGroup },
      { secondaryMuscleGroups: muscleGroup },
    ];
  }
  if (equipment) {
    filter.equipment = equipment;
  }
  if (difficulty) {
    filter.difficulty = difficulty;
  }
  return filter;
}

export async function findExercises(criteria) {
  const exercisesCollection = await getExercisesCollection();
  const filter = buildExerciseFilter(criteria);
  const [totalCount, exercises] = await Promise.all([
    exercisesCollection.countDocuments(filter),
    exercisesCollection
      .find(filter, { projection: LIST_PROJECTION })
      .collation(CASE_INSENSITIVE_COLLATION)
      .sort({ name: 1 })
      .skip((criteria.page - 1) * EXERCISES_PER_PAGE)
      .limit(EXERCISES_PER_PAGE)
      .toArray(),
  ]);
  return {
    exercises,
    page: criteria.page,
    pageCount: Math.max(1, Math.ceil(totalCount / EXERCISES_PER_PAGE)),
    totalCount,
  };
}

export async function findExerciseById(exerciseId) {
  const exercisesCollection = await getExercisesCollection();
  return exercisesCollection.findOne({ _id: exerciseId });
}
