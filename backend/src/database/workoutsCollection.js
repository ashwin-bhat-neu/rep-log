import { buildWorkoutFilterQuery } from "./buildWorkoutFilterQuery.js";
import { getDatabase } from "./databaseConnection.js";

export const WORKOUTS_PER_PAGE = 20;
const NEWEST_FIRST = { performedOn: -1, createdAt: -1 };

// Prepared once per server instance so the index exists before the first query.
let workoutsCollectionPromise;

async function prepareWorkoutsCollection() {
  const database = await getDatabase();
  const workouts = database.collection("workouts");
  // Serves the history list, the date range filter, and the breakdown query.
  await workouts.createIndex({ userId: 1, performedOn: -1 });
  return workouts;
}

export function getWorkoutsCollection() {
  workoutsCollectionPromise ??= prepareWorkoutsCollection().catch((error) => {
    workoutsCollectionPromise = undefined;
    throw error;
  });
  return workoutsCollectionPromise;
}

export function toWorkoutResponse(workout) {
  return {
    id: workout._id.toString(),
    performedOn: workout.performedOn,
    notes: workout.notes,
    exercises: workout.exercises,
    createdAt: workout.createdAt,
    updatedAt: workout.updatedAt,
  };
}

export async function listWorkouts(userId, filters) {
  const workouts = await getWorkoutsCollection();
  const query = buildWorkoutFilterQuery(userId, filters);
  const [workoutDocuments, totalWorkoutCount] = await Promise.all([
    workouts
      .find(query)
      .sort(NEWEST_FIRST)
      .skip((filters.pageNumber - 1) * WORKOUTS_PER_PAGE)
      .limit(WORKOUTS_PER_PAGE)
      .toArray(),
    workouts.countDocuments(query),
  ]);
  return {
    workouts: workoutDocuments,
    totalWorkoutCount,
    pageCount: Math.max(1, Math.ceil(totalWorkoutCount / WORKOUTS_PER_PAGE)),
  };
}

export async function findWorkout(userId, workoutId) {
  const workouts = await getWorkoutsCollection();
  return workouts.findOne({ _id: workoutId, userId });
}

export async function createWorkout(userId, workout) {
  const workouts = await getWorkoutsCollection();
  const now = new Date();
  const document = { userId, ...workout, createdAt: now, updatedAt: now };
  const { insertedId } = await workouts.insertOne(document);
  return { _id: insertedId, ...document };
}

// Returns null when the workout doesn't exist or belongs to someone else.
export async function replaceWorkout(userId, workoutId, workout) {
  const workouts = await getWorkoutsCollection();
  return workouts.findOneAndUpdate(
    { _id: workoutId, userId },
    { $set: { ...workout, updatedAt: new Date() } },
    { returnDocument: "after" },
  );
}

// Returns false when the workout doesn't exist or belongs to someone else.
export async function deleteWorkout(userId, workoutId) {
  const workouts = await getWorkoutsCollection();
  const { deletedCount } = await workouts.deleteOne({ _id: workoutId, userId });
  return deletedCount === 1;
}
