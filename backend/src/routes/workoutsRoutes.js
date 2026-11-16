import express from "express";
import { parseObjectId } from "../database/parseObjectId.js";
import {
  createWorkout,
  deleteWorkout,
  findWorkout,
  listWorkouts,
  replaceWorkout,
  toWorkoutResponse,
} from "../database/workoutsCollection.js";
import { requireAuthentication } from "../middleware/requireAuthentication.js";
import { validateWorkoutHistoryQuery } from "../validation/workoutHistoryQueryValidation.js";
import { validateWorkout } from "../validation/workoutValidation.js";

const WORKOUT_NOT_FOUND = { error: "Workout not found" };

const router = express.Router();

router.use(requireAuthentication);

function currentUserId(request) {
  return parseObjectId(request.user.id);
}

router.get("/", async (request, response) => {
  const { error, filters } = validateWorkoutHistoryQuery(request.query);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const { workouts, totalWorkoutCount, pageCount } = await listWorkouts(
    currentUserId(request),
    filters,
  );
  response.json({
    workouts: workouts.map(toWorkoutResponse),
    page: filters.pageNumber,
    pageCount,
    totalWorkoutCount,
  });
});

router.get("/:workoutId", async (request, response) => {
  const workoutId = parseObjectId(request.params.workoutId);
  const workout =
    workoutId && (await findWorkout(currentUserId(request), workoutId));
  if (!workout) {
    response.status(404).json(WORKOUT_NOT_FOUND);
    return;
  }
  response.json({ workout: toWorkoutResponse(workout) });
});

router.post("/", async (request, response) => {
  const { error, workout } = validateWorkout(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const createdWorkout = await createWorkout(currentUserId(request), workout);
  response.status(201).json({ workout: toWorkoutResponse(createdWorkout) });
});

router.put("/:workoutId", async (request, response) => {
  const workoutId = parseObjectId(request.params.workoutId);
  if (!workoutId) {
    response.status(404).json(WORKOUT_NOT_FOUND);
    return;
  }
  const { error, workout } = validateWorkout(request.body);
  if (error) {
    response.status(400).json({ error });
    return;
  }
  const updatedWorkout = await replaceWorkout(
    currentUserId(request),
    workoutId,
    workout,
  );
  if (!updatedWorkout) {
    response.status(404).json(WORKOUT_NOT_FOUND);
    return;
  }
  response.json({ workout: toWorkoutResponse(updatedWorkout) });
});

router.delete("/:workoutId", async (request, response) => {
  const workoutId = parseObjectId(request.params.workoutId);
  const wasDeleted =
    workoutId && (await deleteWorkout(currentUserId(request), workoutId));
  if (!wasDeleted) {
    response.status(404).json(WORKOUT_NOT_FOUND);
    return;
  }
  response.status(204).end();
});

export default router;
