import { Router } from "express";
import {
  findExerciseById,
  findExercises,
} from "../database/exercisesCollection.js";
import { parseObjectId } from "../database/parseObjectId.js";
import { parseExerciseQuery } from "../validation/exerciseQuery.js";

// The exercise library is shared reference data, so these routes don't need a login.
const exercisesRouter = Router();

exercisesRouter.get("/", async (request, response) => {
  const { errors, criteria } = parseExerciseQuery(request.query);
  if (errors.length > 0) {
    response.status(400).json({ error: errors.join(" ") });
    return;
  }
  response.json(await findExercises(criteria));
});

exercisesRouter.get("/:exerciseId", async (request, response) => {
  const exerciseId = parseObjectId(request.params.exerciseId);
  const exercise = exerciseId ? await findExerciseById(exerciseId) : null;
  if (!exercise) {
    response.status(404).json({ error: "Exercise not found." });
    return;
  }
  response.json(exercise);
});

export default exercisesRouter;
